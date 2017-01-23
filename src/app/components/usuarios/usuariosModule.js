var usuariosController = require('./usuarios.js');

var usuariosModule = angular.module('myApp.usuarios', ['ngAnimate','ngMaterial']);

usuariosModule.controller('usuariosCtrl', usuariosController);

usuariosModule.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
    .state('listaUsuarios',{
        url:"/usuarios",
        views:{
             "": {
                templateUrl:"app/components/usuarios/listaUsuarios.html"
            },
            "left@listaUsuarios":{
                templateUrl:"app/shared/header/usuariosHeader.html"
            },
            "header@listaUsuarios":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@listaUsuarios":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('nuevoUsuario',{
    	url:"/nuevoUsuario",
    	views:{
    		"":{
    			templateUrl:"app/components/usuarios/nuevoUsuario.html"
    		},
            "left@nuevoUsuario":{
                templateUrl:"app/shared/header/usuariosHeader.html"
            },
            "header@nuevoUsuario":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@nuevoUsuario":{
                templateUrl:"app/shared/footer.html"
            }
    	}
    })   
    ;
});

module.exports = usuariosModule;