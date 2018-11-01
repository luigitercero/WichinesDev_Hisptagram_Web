"use strict";

var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var REF_LIKEPUBLICATION = firebase.database().ref('likepublicacion');
var REF_DISLIKEPUBLICATION = firebase.database().ref('dislikepublicacion');
var REF_USUARIOS = firebase.database().ref('usuarios');
var USERNAME = "Invitado";
var USERID = "random1";
var USERLOGIN = true;
var URL = "http://18.221.96.170:3005/"+"";
(function () {
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function ($scope, $firebaseArray, $firebaseObject) {

        $scope.logedin = 'canche marica';
        $scope.username = USERNAME;


        //LUIS
        function loadUserValues() {
            var user = $firebaseObject(REF_USUARIOS.child(USERID));
            $scope.user = user;
            user.$loaded().then(function () {
                $scope.username = user.nombre;
                USERNAME = user.nombre;
            });
        }
        //luigitercero
        $scope.createUser = function () {

            var xhr = new XMLHttpRequest();
            var url = URL + "createUser";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    location.reload();
                }
            };
            var userToUpdate = {};
            console.log($scope.user.age);
            userToUpdate.correo = $scope.user.email;
            userToUpdate.edad = $scope.user.age;
            userToUpdate.nombre = $scope.user.name;
            userToUpdate.pass = $scope.user.password;
            console.log(userToUpdate);

            var data = JSON.stringify(userToUpdate);
            xhr.send(data);
        }

        // LUIS
        $(document).ready(function () {
            $('.collapsible').collapsible();
            $('.sidenav').sidenav();
            $('.tabs').tabs();

            loadUserValues();
        });
    });
})()

