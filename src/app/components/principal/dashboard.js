let app;
angular.module('myApp.principal', ['ngDialog'])
    .controller('principalCtrl', ['$scope', 'ngDialog', '$http', 'tareasModel', 'usuarioModel', '$localStorage', '$sessionStorage', function ($scope, ngDialog, $http, tareasModel, usuarioModel, $localStorage, $sessionStorage) {
        this.aboutText = 'This is the about component!';
        app = this;
        this.$scope = $scope;
        this.ngDialog = ngDialog;
        this.criterios = {};
        this.resumenNoEntregadas = 0;
        this.usuarioModel = usuarioModel;
        this.$localStorage = $localStorage;
        this.$sessionStorage = $sessionStorage;
        this.userData = this.$sessionStorage.userData;
        this.$scope.tareasPendientes = this.$localStorage.userSummary.tareasPendientes;
        this.$scope.reunionesPendientes = this.$localStorage.userSummary.reunionesPendientes;
        this.$scope.PromedioNotas = this.$localStorage.userSummary.PromedioNotas;
        this.$scope.nombreUsuario = this.$sessionStorage.userData.nombreCompleto;
        console.log("LocalStorage DASSHH", this.$localStorage);
        console.log('SessionStorage >> ', this.$sessionStorage);

        this.$http = $http;
        this.ngDialog = ngDialog;

        this.cargarReportes = function () {
            var estado = null;
            var idUsuario = null;
            var idModulo = null;
            this.criterios = {
                "estado": estado,
                "idUsuario": app.usuarioModel.datosUsuario.idUsuario,
                "idModulo": app.usuarioModel.datosUsuario.idModulo
            };

            this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', app.criterios).then(function (data) {
                console.log("########### REPORTE NOTAS ##############");
                console.log(data.data);
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].estado.localeCompare("CLF") == 0) {
                        app.resumenCalificadas++;
                        app.resumenEntregadas++;
                        app.resumenPromedio += data.data[i].calificacion;
                    }
                    if (data.data[i].estado.localeCompare("ENV") == 0) {
                        app.resumenEntregadas++;
                    }
                    if (data.data[i].estado.localeCompare("CRE") == 0) {
                        app.resumenNoEntregadas++;
                    }

                }
                if (app.resumenCalificadas > 0) {
                    app.resumenPromedio = app.resumenPromedio / app.resumenCalificadas;
                }
                //app.gridOptions.data = data.data;
            });
        }


        this.cargarReportes();
    }]);
/*
  
dashboardCtrl.$inject = ['$scope','$http','tareasModel','usuarioModel'];

module.exports = dashboardCtrl; */