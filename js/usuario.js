"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');
var USERNAME = "Invitado";
var USERID = "random1";
var USERLOGIN = true;

(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {

        $scope.logedin = USERLOGIN;
        $scope.username = USERNAME;

        //LUIS
        function loadUserValues()
        {
            var user = $firebaseObject(REF_USUARIOS.child(USERID));
            $scope.user = user;
            user.$loaded().then(function()
            {
                $scope.username = user.nombre;
                USERNAME = user.nombre;
            });
        }

        $scope.updateUser = function()
        {
            var xhr = new XMLHttpRequest();
            var url = "http://192.168.0.10:3005/updateUser";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4 && xhr.status === 200) 
                {
                    location.reload();
                }
            };
            var userToUpdate = {};
            
            userToUpdate.id = USERID;
            userToUpdate.edad = $scope.user.edad;
            userToUpdate.nombre = $scope.user.nombre;
            userToUpdate.pass = $scope.user.pass;
            console.log(userToUpdate);

            var data = JSON.stringify(userToUpdate);
            xhr.send(data);
        }

        //LUIS
        $scope.deleteUser = function()
        {
            console.log("Borrando...");
            var xhr = new XMLHttpRequest();
            var url = "http://192.168.0.10:3005/updateUser";
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
            
            loadUserValues();
        });



    });
})()

