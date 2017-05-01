let app;
angular.module('myApp.principal', ['ngDialog'])
    .controller('principalCtrl', ['$scope', 'ngDialog', '$http', 'tareasModel', 'usuarioModel', function ($scope, ngDialog, $http, tareasModel, usuarioModel) {
        this.aboutText = 'This is the about component!';
        app = this;
        this.$scope = $scope;
        this.ngDialog = ngDialog;
        this.criterios = {};
        this.resumenNoEntregadas = 0;
        this.usuarioModel = usuarioModel;
        this.Mydata = [{ name: "Moroni", age: 50 },
        { name: "Tiancum", age: 43 },
        { name: "Jacob", age: 27 },
        { name: "Nephi", age: 29 },
        { name: "Enos", age: 34 }];
        this.gridOptions = {
            data: this.Mydata,
            enableRowSelection: true
        };
        this.$http = $http;
        this.ngDialog = ngDialog;

        this.$scope.openDialog = function () {
            alert('asdf');
            console.log(this.ngDialog);
            this.ngDialog.open(
                { template: 'app/components/principal/dialog.html',
                    constroller:[$scope,function($scope){
                        console.log('hihi');
                    }],
                 className: 'ngdialog-theme-default' }
                );
        };

        this.openD = function () {
            alert('asdf');
            console.log(this.ngDialog);
            this.ngDialog.open(
                { template: 'app/components/principal/dialog.html',
                    constroller:[$scope,function($scope){
                        console.log('hihi');
                    }],
                 className: 'ngdialog-theme-default' }
                );
        };

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