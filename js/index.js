
var ref_Publicaciones = firebase.database().ref('publicacion');

(function () 
{
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function($scope, $firebaseArray, $firebaseObject) {

        // var ref = firebase.database().ref();
        // download the data into a local object
        // $scope.data = $firebaseObject(ref);
        // putting a console.log here won't work, see below



        $(document).ready(function () 
        {
            $scope.texto = "Hola Luis!";
            var publicaciones = $firebaseArray(ref_Publicaciones.orderByChild("fecha").limitToFirst(8));
            publicaciones.$loaded().then(function()
            {
                publicaciones.forEach(p => 
                {
                    console.log(p);
                });
            });
        });


      });
})()