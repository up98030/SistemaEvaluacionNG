var nuevaTareaController = require('./nuevaTarea/nuevaTarea.js');
var tareasController = require('./tareasController.js');
var calificarTareaController = require('./calificarTarea/calificarTarea.js');
var reunionesController = require('./reuniones/reuniones.js');

var tareasModule = angular.module('myApp.tareas', ['ngAnimate','ngMaterial','ngDialog']);

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
            },
            "footer@nuevaTarea":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('listaTareas',{
    	url:"/listaTareas",
    	views:{
    		"":{
    			templateUrl:"app/components/tareas/listaTareas.html"
    		},
            "left@listaTareas":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@listaTareas":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@listaTareas":{
                templateUrl:"app/shared/footer.html"
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
            },
            "footer@tareas":{
                templateUrl:"app/shared/footer.html"
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
            },
            "footer@tareasEnviadas":{
                templateUrl:"app/shared/footer.html"
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
            },
            "footer@calificarTarea":{
                templateUrl:"app/shared/footer.html"
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
                templateUrl:"app/shared/header/reunionesHeader.html"
            },
            "header@reuniones":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@reuniones":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('nuevaReunion',{
        url:"/nuevaReunion",
        views:{
            "":{
                templateUrl:"app/components/tareas/reuniones/nuevaReunion.html"
            },
            "left@nuevaReunion":{
                templateUrl:"app/shared/header/reunionesHeader.html"
            },
            "header@nuevaReunion":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@nuevaReunion":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('detalleReunion',{
        url:"/detalleReunion",
        views:{
            "":{
                templateUrl:"app/components/tareas/reuniones/detalleReunion.html"
            },
            "left@detalleReunion":{
                templateUrl:"app/shared/header/reunionesHeader.html"
            },
            "header@detalleReunion":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@detalleReunion":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    ;
});

module.exports = tareasModule;