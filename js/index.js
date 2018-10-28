"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_HASHTAGPUBLICATION = firebase.database().ref('hashtagpublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');
var USERNAME = "Invitado";
var USERID = "random1";
var USERLOGIN = true;

(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {

        $scope.logedin = USERLOGIN;
        // LUIS
        $scope.setLike = async function(idPublication, idUser)
        {
            console.log("like! "+idPublication+" autor: "+idUser);
            if(idUser !== USERID)
            {
                REF_LIKEPUBLICATION
                .child(USERID)
                .child(idPublication)
                .once("value")
                .then(function(snapshot)
                {
                    var like_post = snapshot.val();
                    var xhr = new XMLHttpRequest();
                    var url = "http://192.168.0.10:3005/likePublication";
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
                console.log("No puedes darte autolike");
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
                    var url = "http://192.168.0.10:3005/dislikePublication";
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
            var url = "http://192.168.0.10:3005/postPublication";
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
                var publications = $firebaseArray(REF_PUBLICATIONS.orderByChild("fecha").limitToFirst(8));
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

            var user = $firebaseObject(REF_USUARIOS.child(USERID));
            user.$loaded().then(function()
            {
                USERNAME = user.nombre;
                $scope.text = "Hola "+USERNAME+" !";
            });

            var publications = $firebaseArray(REF_PUBLICATIONS.orderByChild("fecha").limitToFirst(8));
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

