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
            $scope.user.$save().then(function()
            {
                location.reload();
            });
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

