require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
//require('bootstrap');
//require('jQuery');
require('angular-material');

//require('angular-ui-grid');
require('./components/home/home.js');
require('./components/about/about.js');
//require('./components/tareas/tareas.js');
require('./components/principal/dashboard.js');
require('./components/modulos/modulos.js');
require('./components/calendario/calendario.js');
//require('./components/reuniones/reuniones.js');

var tareasModule = require('./components/tareas/tareasModule.js');
var notasModule = require('./components/notas/notasModule.js');

require('./components/tareas/detalleTarea.js');
require('./components/usuarios/usuarios.js');
require('./components/usuarios/roles.js');


require('../../node_modules/angular-ui-grid/ui-grid.js');
require('../../node_modules/angular-sanitize/angular-sanitize.js');
require('../../node_modules/angular-material-calendar/angular-material-calendar.js');
var tareasModel = require('./models/tareasModel.js');
var usuarioModel = require('./models/usuarioModel.js');
//require('../../node_modules/angular-ui-grid/ui-grid.css');

var app = angular.module('myApp', 
    [
    'ui.router','ngSanitize','ui.grid','ui.grid.selection','ngMaterial','materialCalendar','myApp.home',/*'myApp.reuniones',*/'myApp.calendario',
    'myApp.modulos','myApp.about', 'myApp.principal',/*'myApp.tareas',*/tareasModule.name, notasModule.name,'myApp.tarea','myApp.usuarios','myApp.roles'

    ]);

app.factory('tareasModel', tareasModel);
app.factory('usuarioModel', usuarioModel);

//app.value('tareasModel', new tareasModel());

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html"
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
		.state('principal', {
			url:"/dashboard",
			views: {
				"": {
					templateUrl:"app/components/principal/dashboard.html"
				},
				"header@principal":{
					templateUrl:"app/shared/header/header.html"
				}
			}
		})
   /* .state('tareas', {
        url:"/tareas",
        views : {
            "": {
                templateUrl:"app/components/tareas/tareas.html"
            },
            "left@tareas":{
                templateUrl:"app/components/tareas/left.html"
            },
            "header@tareas":{
                templateUrl:"app/shared/header/header.html"
            }
        }
        
    })*/
    .state('tarea', {
        url:"/tarea",
        views : {
            "": {
                templateUrl:"app/components/tareas/detalleTarea.html"
            },
            "left@tarea":{
                templateUrl:"app/shared/header/tareasHeader.html"
            },
            "header@tarea":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    .state('modulos',{
        url:"/modulos",
        views : {
            "": {
                templateUrl:"app/components/modulos/modulos.html"
            },
            "header@modulos":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
    .state('calendario',{
        url:"/calendario",
        views : {
            "":{
                templateUrl:"app/components/calendario/calendario.html"
            },
            "header@calendario":{
                templateUrl:"app/shared/header/header.html"
            }
        }
    })
	/*.state('reuniones', {
		url: "/reuniones",
		views : {
			"" : {
				templateUrl:"app/components/reuniones/reuniones.html"
			},
			"header@reuniones":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})*/
    .state('usuarios',{
        url:"/usuarios",
        views: {
            "": {
                templateUrl:"app/components/usuarios/usuarios.html"
            },
            "header@usuarios":{
                templateUrl: "app/shared/header/header.html"
            },
            "left@usuarios":{
                templateUrl: "app/components/usuarios/leftUsuarios.html"
            }
        }
    })
    .state('nuevoUsuario',{
        url:"/nuevoUsuario",
        views: {
            "": {
                templateUrl:"app/components/usuarios/nuevoUsuario.html"
            },
            "header@nuevoUsuario":{
                templateUrl: "app/shared/header/header.html"
            },
            "left@nuevoUsuario":{
                templateUrl: "app/components/usuarios/leftUsuarios.html"
            }
        }
    })
    .state('roles',{
        url:"/roles",
        views: {
            "": {
                templateUrl:"app/components/usuarios/roles.html"
            },
            "header@roles":{
                templateUrl: "app/shared/header/header.html"
            },
            "left@roles":{
                templateUrl: "app/components/usuarios/leftUsuarios.html"
            }
        }
    });
});