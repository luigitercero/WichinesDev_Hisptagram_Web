"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var USERNAME = "Invitado";
var USERID = "random2";
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

        // LUIS
        $(document).ready(function () 
        {
            $('.collapsible').collapsible();
            $('.sidenav').sidenav();
            $('.tabs').tabs();

            $scope.text = "Hola "+USERNAME+" !";
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

