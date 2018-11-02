"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_HASHTAGPUBLICATION = firebase.database().ref('hashtagpublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');
var USERNAME = "Invitado";
var USERID = "random1";
var USERLOGIN = false;
var CURRENTLIKE = true;
var IP = "http://18.221.96.170:3005/";//comentario

//Comentando para integracion condinua

(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {

        firebase.auth().onAuthStateChanged(function(firebaseUser)
        {
            if(firebaseUser)
            {
                console.log("logeado", firebaseUser);
                //comentario
                var email = firebaseUser.email;

                
                var user = $firebaseArray(REF_USUARIOS.orderByChild("correo").equalTo(email));
                user.$loaded().then(function()
                {
                    var loggedUser = user[0];
                    USERNAME = loggedUser.nombre;
                    USERLOGIN = true;
                    $scope.logedin = USERLOGIN;
                    USERID = loggedUser.$id;
                    $scope.text = "Hola "+USERNAME+" !";
                    console.log(USERID);
                });
            }
            else
            {
                $scope.logedin = USERLOGIN;
                console.log("No loggeado");
            }
        });

        // LUIS
        $scope.logOut = function()
        {
            firebase.auth().signOut();
            location.reload();
        }


        // LUIS
        $scope.setLike = async function(idPublication, idUser)
        {
            console.log("prelike...");
            if(CURRENTLIKE)
            {
                console.log("like! "+idPublication+" autor: "+idUser);
                if(idUser !== USERID)
                {
                    CURRENTLIKE = false;
                    REF_LIKEPUBLICATION
                    .child(USERID)
                    .child(idPublication)
                    .once("value")
                    .then(function(snapshot)
                    {
                        var like_post = snapshot.val();
                        var xhr = new XMLHttpRequest();
                        var url = IP+"likePublication";
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.onreadystatechange = function () 
                        {
                            if (xhr.readyState === 4 && xhr.status === 200) 
                            {
                                console.log("Respuesta recibida, procedimiento terminado: "+xhr.responseText);
                                CURRENTLIKE = true;
                            }
                        };
                        var like = {};
                        like.id = idPublication;
                        like.userid = USERID;
                        if(like_post)
                        {
                            like.like = -1;
                            var data = JSON.stringify(like);
                            xhr.send(data);
                        }
                        else
                        {
                            like.like = 1;
                            var data = JSON.stringify(like);
                            xhr.send(data);
                        }
                    });
                }
                else
                {
                    console.log("No puedes darte autolike");
                }
            }
        }

        // LUIS
        $scope.setDislike = function(idPublication, idUser)
        {
            console.log("dislike! "+idPublication+" autor: "+idUser);
            if(idUser !== USERID)
            {
                REF_DISLIKEPUBLICATION
                .child(USERID)
                .child(idPublication)
                .once("value")
                .then(function(snapshot)
                {
                    var like_post = snapshot.val();
                    var xhr = new XMLHttpRequest();
                    var url = IP+"dislikePublication";
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    var like = {};
                    like.id = idPublication;
                    like.userid = USERID;
                    if(like_post)
                    {
                        like.like = -1;
                        var data = JSON.stringify(like);
                        xhr.send(data);
                    }
                    else
                    {
                        like.like = 1;
                        var data = JSON.stringify(like);
                        xhr.send(data);
                    }
                });
            }
            else
            {
                console.log("No puedes darte autoDISlike");
            }
        }
        //LUIS
        $scope.publishTest =  function()
        {
            console.log("publicando");
            var fecha = new Date();
            
            var xhr = new XMLHttpRequest();
            var url = IP+"postPublication";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4 && xhr.status === 200) 
                {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json.estado);
                }
            };
            var publication = {};
            
            publication.contenido = "Contenido enviado desde la web!";
            publication.fecha = fecha.getTime();
            publication.hashtags = [{nombre:"hash1"}];
            publication.usuario = "usuarioWebId";
            publication.imagen = "https://i.blogs.es/b2bab0/crash1/1366_2000.jpeg";

            var data = JSON.stringify(publication);
            xhr.send(data);
        }

        $scope.openModal = function(post)
        {
            console.log("Abriendo...", post);
            $scope.modalPost = post;
            $(".modal").modal("open");
        }

        $scope.searchPost = function(hashtagPost)
        {
            if(hashtagPost !== "")
            {
                console.log(hashtagPost);
                var realTimeFilteredPosts = [];
                var filteredPosts = $firebaseArray(REF_HASHTAGPUBLICATION.orderByChild(hashtagPost).equalTo(true));
                
                filteredPosts.$loaded().then(function()
                {
                    //console.log(filteredPosts);
                    filteredPosts.forEach(p => 
                    {
                        var realTimePost = $firebaseObject(REF_PUBLICATIONS.child(p.$id));
                        realTimeFilteredPosts.push(realTimePost);
                    });
                    $scope.publications = realTimeFilteredPosts;
                });
            }
            else
            {
                var publications = $firebaseArray(REF_PUBLICATIONS.orderByChild("fecha").limitToLast(8));
                $scope.publications = publications;
            }
        }

        // LUIS
        $(document).ready(function () 
        {
            $('.collapsible').collapsible();
            $('.sidenav').sidenav();
            $('.tabs').tabs();
            $('.modal').modal();

            var publications = $firebaseArray(REF_PUBLICATIONS.orderByChild("fecha").limitToLast(10));
            $scope.publications = publications;
            publications.$loaded().then(function()
            {
                /*publicaciones.forEach(p => 
                {
                    console.log(p);
                });*/
            });
        });

      });
})()

