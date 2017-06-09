var usuariosController = require('./usuarios.js');
var settingsController = require('../settings/settings.js');

var usuariosModule = angular.module('myApp.usuarios', ['ngAnimate','ngMaterial','ngDialog']);

usuariosModule.controller('usuariosCtrl', usuariosController);
usuariosModule.controller('settingsCtrl', settingsController);

usuariosModule.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
    .state('editarUsuario',{
        url:"/editarUsuario",
        views:{
             "": {
                templateUrl:"app/components/usuarios/editarUsuario.html"
            },
            "left@editarUsuario":{
                templateUrl:"app/shared/header/usuariosHeader.html"
            },
            "header@editarUsuario":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@editarUsuario":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('categorias',{
        url:"/categorias",
        views:{
             "": {
                templateUrl:"app/components/settings/categorias/categorias.html"
            },
            "left@categorias":{
                templateUrl:"app/shared/header/settingsHeader.html"
            },
            "header@categorias":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@categorias":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('settings',{
        url:"/settings",
        views:{
             "": {
                templateUrl:"app/components/settings/settings.html"
            },
            "left@settings":{
                templateUrl:"app/shared/header/settingsHeader.html"
            },
            "header@settings":{
                templateUrl:"app/shared/header/header.html"
            },
            "footer@settings":{
                templateUrl:"app/shared/footer.html"
            }
        }
    })
    .state('nuevoModulo',{
        url:"/nuevoGrupo",
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
        url:"/grupos",
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