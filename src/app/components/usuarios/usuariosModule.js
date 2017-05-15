var usuariosController = require('./usuarios.js');

var usuariosModule = angular.module('myApp.usuarios', ['ngAnimate','ngMaterial','ngDialog']);

usuariosModule.controller('usuariosCtrl', usuariosController);

usuariosModule.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
    .state('nuevoModulo',{
        url:"/nuevoModulo",
        views:{
             "": {
                templateUrl:"app/components/modulos/nuevoModulo.html"
            },
            "left@nuevoModulo":{
                templateUrl:"app/shared/header/modulosHeader.html"
            },
            "header@nuevoModulo":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@nuevoModulo":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('listaModulos',{
        url:"/modulos",
        views:{
             "": {
                templateUrl:"app/components/modulos/modulos.html"
            },
            "left@listaModulos":{
                templateUrl:"app/shared/header/modulosHeader.html"
            },
            "header@listaModulos":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@listaModulos":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
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