var notasController = require('./notasController.js');

var notasModule = angular.module('myApp.notas', ['ngAnimate','ngMaterial']);

notasModule.controller('notasCtrl', notasController);

notasModule.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
    .state('misNotas',{
        url:"/misNotas",
        views:{
             "": {
                templateUrl:"app/components/notas/views/misNotas.html"
            },
            "left@misNotas":{
                templateUrl:"app/shared/header/notasHeader.html"
            },
            "header@misNotas":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    .state('notasDocentes',{
    	url:"/resumen",
    	views:{
    		"":{
                templateUrl:"app/components/notas/views/resumenNotas.html"
    		},
            "left@notasDocentes":{
                templateUrl:"app/shared/header/notasHeader.html"
            },
            "header@notasDocentes":{
                templateUrl:"app/shared/header/header.html"
            }
    	}
    })
    .state('reportes',{
    	url:"/reportes",
    	views:{
    		"":{
    			templateUrl:"app/components/notas/views/notasMensuales.html"
    		},
            "left@reportes":{
                templateUrl:"app/shared/header/notasHeader.html"
            },
            "header@reportes":{
                templateUrl:"app/shared/header/header.html"
            }
    	}
    })
    ;
});

module.exports = notasModule;