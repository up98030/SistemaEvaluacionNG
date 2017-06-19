var notasController = require('./notasController.js');
var reportesController = require('./reportesController.js');

var notasModule = angular.module('myApp.notas', ['ngAnimate','ngMaterial']);

notasModule.controller('notasCtrl', notasController);
notasModule.controller('reportesCtrl', reportesController);

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
            },
            "footer@misNotas":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('reportes',{
    	url:"/reportes",
    	views:{
    		"":{
                templateUrl:"app/components/notas/views/reportes.html"
    		},
            "left@reportes":{
                templateUrl:"app/shared/header/notasHeader.html"
            },
            "header@reportes":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@reportes":{
                templateUrl:"app/shared/footer.html"
            }
    	}
    })
    // .state('reportes',{
    // 	url:"/reportes",
    // 	views:{
    // 		"":{
    // 			templateUrl:"app/components/notas/views/notasMensuales.html"
    // 		},
    //         "left@reportes":{
    //             templateUrl:"app/shared/header/notasHeader.html"
    //         },
    //         "header@reportes":{
    //             templateUrl:"app/shared/header/header.html"
    //         },
    //         "footer@reportes":{
    //             templateUrl:"app/shared/footer.html"
    //         }
    // 	}
    // })
    ;
});

module.exports = notasModule;