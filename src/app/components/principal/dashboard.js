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
        // this.$scope.tareasPendientes = this.$localStorage.userSummary.tareasPendientes;
        // this.$scope.reunionesPendientes = this.$localStorage.userSummary.reunionesPendientes;
        // this.$scope.PromedioNotas = this.$localStorage.userSummary.PromedioNotas;
        this.$scope.nombreUsuario = this.$sessionStorage.userData.nombreCompleto;
        this.$scope.perfilUsuario = this.$sessionStorage.userData.idPerfil;
        console.log("LocalStorage DASSHH", this.$localStorage);
        console.log('SessionStorage >> ', this.$sessionStorage);
        this.passwordConfirmation = "";

        this.$http = $http;
        this.ngDialog = ngDialog;

        this.logOut = function(){
            this.$sessionStorage = null;
            this.$localStorage = null;
            this.userData = null;
            this.$scope = null;
        }

        this.actualizarUsuario = function () {
            console.log('PASSWORD ', this.userData.password);
            if (this.userData.password && this.userData.password !== undefined && this.userData.password !== null && this.userData.password !== "" && this.userData.password !== " ") {
                if (this.passwordConfirmation !== this.userData.password) {
                    toastr.error('Las contraseñas no coinciden');
                    return;
                }
            }
            console.log('this.userData >>>>>>>>>>>>> ', this.userData);
            this.$http.post('http://localhost:8080/sistEval/ws/actualizarUsuario/', this.userData).then(function (data) {
                if(app.userData.password){
                    app.userData.password = "";
                    app.passwordConfirmation = "";
                }
                toastr.success('Usuario actualizado');
            }, function (error) {
                toastr.error('Error al actualizar datos usuario');
            });
        }

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


        // this.cargarReportes();
    }]);
/*
  
dashboardCtrl.$inject = ['$scope','$http','tareasModel','usuarioModel'];

module.exports = dashboardCtrl; */