
var REF_PUBLICATIONS = firebase.database().ref('publicacion');
var USERNAME = "Invitado";

(function () 
{
    var app = angular.module("app", ["firebase"]);

    app.controller("ctrl", function($scope, $firebaseArray, $firebaseObject) {

        // LUIS
        $scope.setLike = function(idPublication)
        {
            console.log("like! "+idPublication);
        }

        // LUIS
        $scope.setDislike = function(idPublication)
        {
            console.log("dislike! "+idPublication);
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