var nuevaTareaController = require('./nuevaTarea/nuevaTarea.js');
var tareasController = require('./tareasController.js');
var calificarTareaController = require('./calificarTarea/calificarTarea.js');
var reunionesController = require('./reuniones/reuniones.js');

var tareasModule = angular.module('myApp.tareas', ['ngAnimate','ngMaterial']);

tareasModule.controller('nuevaTareaCtrl', nuevaTareaController);
tareasModule.controller('tareasCtrl', tareasController);
tareasModule.controller('calificarTareaCtrl', calificarTareaController);
tareasModule.controller('reunionesCtrl', reunionesController);

tareasModule.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
    .state('nuevaTarea',{
        url:"/nuevaTarea",
        views:{
             "": {
                templateUrl:"app/components/tareas/nuevaTarea/nuevaTarea.html"
            },
            "left@nuevaTarea":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@nuevaTarea":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    .state('tareas',{
    	url:"/tareas",
    	views:{
    		"":{
    			templateUrl:"app/components/tareas/tareas.html"
    		},
            "left@tareas":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@tareas":{
                templateUrl:"app/shared/header/header.html"
            }
    	}
    })
    .state('tareasEnviadas',{
    	url:"/tareasEnviadas",
    	views:{
    		"":{
    			templateUrl:"app/components/tareas/calificarTarea/tareasEnviadas.html"
    		},
            "left@tareasEnviadas":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@tareasEnviadas":{
                templateUrl:"app/shared/header/header.html"
            }
    	}
    })
    .state('calificarTarea',{
        url:"/calificar",
        views:{
            "":{
                templateUrl:"app/components/tareas/calificarTarea/calificarTarea.html"
            },
            "left@calificarTarea":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@calificarTarea":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    .state('reuniones',{
        url:"/reuniones",
        views:{
            "":{
                templateUrl:"app/components/tareas/reuniones/reuniones.html"
            },
            "left@reuniones":{
                templateUrl:"app/components/tareas/left.html"
            },
            "header@reuniones":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    ;
});

module.exports = tareasModule;