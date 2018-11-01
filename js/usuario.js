"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');
var USERNAME = "Invitado";
var USERID = "random1";
var USERLOGIN = true;
var IP = "http://18.221.96.170:3005/";


(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {

        firebase.auth().onAuthStateChanged(function(firebaseUser)
        {
            if(firebaseUser)
            {
                console.log("logeado");
                var email = firebaseUser.email;

                var user = $firebaseArray(REF_USUARIOS.orderByChild("correo").equalTo(email));
                user.$loaded().then(function()
                {
                    
                    var loggedUser = user[0];
                    $scope.user = loggedUser;
                    USERNAME = loggedUser.nombre;
                    $scope.username = USERNAME;
                    USERLOGIN = true;
                    $scope.logedin = USERLOGIN;
                    USERID = loggedUser.$id;
                    $scope.text = "Hola "+USERNAME+" !";
                    console.log(loggedUser);
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

        $scope.updateUser = function()
        {
            console.log("Haciendo update!");
            var xhr = new XMLHttpRequest();
            var url = IP+"updateUser";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4 && xhr.status === 200) 
                {
                    console.log("Nos respondieron el update");
                    location.reload();
                }
            };
            var userToUpdate = {};
            
            userToUpdate.id = USERID;
            userToUpdate.edad = $scope.user.edad;
            userToUpdate.nombre = $scope.user.nombre;
            userToUpdate.pass = $scope.user.pass;
            //console.log(userToUpdate);

            var data = JSON.stringify(userToUpdate);
            xhr.send(data);
        }

        //LUIS
        $scope.deleteUser = function()
        {
            console.log("Borrando...");
            var xhr = new XMLHttpRequest();
            var url = IP+"updateUser";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4 && xhr.status === 200) 
                {
                    location.reload();
                }
            };
            var userToDelete = {};
            
            userToDelete.id = USERID;
            console.log(userToDelete);

            var data = JSON.stringify(userToDelete);
            xhr.send(data);
        }
        // LUIS
        $(document).ready(function () 
        {
            $('.collapsible').collapsible();
            $('.sidenav').sidenav();
            $('.tabs').tabs();
            
        });



    });
})()

