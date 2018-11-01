"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_HASHTAGPUBLICATION = firebase.database().ref('hashtagpublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');

var USERNAME = "Luis Gil";
var USERID = "-LPwIAfY8evamJd7oeD9";
var USERLOGIN = true;
var IP = "http://18.221.96.170:3005/";

(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {
  
        firebase.auth().onAuthStateChanged(function(firebaseUser)
        {
            if(firebaseUser)
            {
                console.log("logeado", firebaseUser);
                var email = firebaseUser.email;

                
                var user = $firebaseArray(REF_USUARIOS.orderByChild("correo").equalTo(email));
                user.$loaded().then(function()
                {
                    var loggedUser = user[0];
                    USERNAME = loggedUser.nombre;
                    USERLOGIN = true;
                    $scope.logedin = USERLOGIN;
                    $scope.username = USERNAME;
                    USERID = loggedUser.$id;
                    $scope.text = "Hola "+USERNAME+" !";
                    console.log(USERID);
                    var posts = $firebaseArray(REF_PUBLICATIONS
                        .orderByChild("usuario")
                        .equalTo(USERID)
                        .limitToFirst(25));
                    $scope.posts = posts;
                });
            }
            else
            {
                USERLOGIN = false;
                $scope.logedin = USERLOGIN;
                console.log("No loggeado");
                document.location = "index.html";
            }
        });

        // LUIS
        $scope.logOut = function()
        {
            firebase.auth().signOut();
            location.reload();
        }

        // LUIS
        $scope.publishPost = function()
        {
            console.log("Publicar!");
            $(".modal").modal("open");
        }

        // LUIS
        fileButton.addEventListener('change', function (e) {
            //obtener el archivo
            console.log("Subiendo archivo");
            if($scope.textPost.length > 128)
            {
                return;
            }
            var file = e.target.files[0];
            //crer una referencia al storage de firebase
            var storageRef = firebase.storage().ref('myPhotos/' + file.name);
            //subir archivo
            var task = storageRef.put(file);
        
            task.on('state_changed',
                function progress(snapshot) 
                {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                    console.log(snapshot);
                },
                function error(err) 
                {
        
                },
                function complete() 
                {
                    console.log("Subiendo imagen");
                    task.snapshot.ref.getDownloadURL().then(function (downloadURL) 
                    {
                        console.log('File available at', downloadURL);
                        var newPost = {};
                        newPost.contenido = $scope.textPost;
                        var textHashtag = $scope.postHashtags;
                        var hashArray = textHashtag.split(",");
                        var hashtags = [];
                        for(let h in hashArray)
                        {
                            var hashtag = {};
                            hashtag.nombre = hashArray[h];
                            hashtags.push(hashtag);
                        }
                        newPost.hashtags = hashtags;
                        newPost.usuario = USERID;
                        newPost.nombre = USERNAME;
                        newPost.imagen = downloadURL;
                        console.log(newPost);

                        var xhr = new XMLHttpRequest();
                        var url = IP+"postPublication";
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        var data = JSON.stringify(newPost);
                        xhr.send(data);
                        $scope.textPost = "";
                        $scope.postHashtags = "";
                        $(".modal").modal("close");
                    });
                    //console.log("adios");
                }
            )
        });

        // LUIS
        $scope.deletePost = function(idPost)
        {
            console.log("Eliminando post! "+idPost);
            var deletePost = {};
            deletePost.id = idPost;
            var xhr = new XMLHttpRequest();
            var url = IP+"deletePublication";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            var data = JSON.stringify(deletePost);
            xhr.send(data);
        }

        // LUIS
        $(document).ready(function () 
        {
            $('.collapsible').collapsible();
            $('.sidenav').sidenav();
            $('.tabs').tabs();
            $('.modal').modal();

            
            /*posts.$loaded().then(function()
            {
                posts.forEach(p => 
                {
                    console.log(p);
                });
            });*/
        });

      });
})()

