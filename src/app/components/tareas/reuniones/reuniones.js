let app;
function reunionesController($scope, $http, $state, tareasModel, usuarioModel, ngDialog) {
    this.Titulo = "Reuniones";
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
    this.ngDialog = ngDialog;
    app = this;
    this.tareasModel = tareasModel;
    this.currentNavItem = 'page1';
    this.$scope.usuariosModulo = [];
    this.usuariosSeleccionados = [];
    this.$scope.usuariosSelected = [];
    var tareasData = [];
    var fechaActual = new Date();
    this.$scope.hora = fechaActual;
    this.gridOptions = {
        enableRowSelection: true,
        enableFullRowSelection: true,
        rowHeader: false,
        enableSelectAll: false,
        rowHeight: 35,
        multiSelect: false,
        columnDefs: [
            { name: 'usuariosEntity.nombreCompleto', visible: false, width: 250, displayName: 'Nombre' },
            { name: 'tareasEntity.nombreTarea', width: 250, displayName: 'Reunión' },
            { name: 'archivo', visible: false },
            { name: 'archivoAdjunto', visible: false },
            { name: 'calificacion', visible: false },
            { name: 'tareasEntity.descripcionTarea', width: 300, displayName: 'Asunto' },
            { name: 'estado', visible: false },
            { name: 'observacionesDocente', visible: false },
            { name: 'fechaEnvio', visible: false },
            { name: 'tareasEntity.fechaFin', width: 200, displayName: 'Fecha', visible: true },
            { name: 'tareasEntity.fechaInicio', width: 200, displayName: 'Fecha', visible: false },
            { name: 'tareasEntity.idModulo', visible: false },
            { name: 'tareasEntity.idCreadorTarea', visible: false },
            { name: 'idTarea', visible: false },
            { name: 'observaciones', width: 300, visible: false }
        ],
        data: null,

    };

    /************************** Cuando selecciona una tarea **************************/
    this.gridOptions.onRegisterApi = function (gridApi) {
        // gridApi.grid.modifyRows(app.gridOptions.data);
        //gridApi.selection.selectRow(app.gridOptions.data[0]);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
            tareasModel.tarea = row.entity;
            console.log("DATOS TAREA");
            console.log(tareasModel.tarea);
            var tarea = row.entity;
            console.log("VARIABLE TAREA");
            console.log(tarea);
            app.archivoAdjunto = tarea.tareasEntity.archivoAdjunto;
            app.descripcionTarea = tarea.tareasEntity.descripcionTarea;
            app.fechaFin = tarea.tareasEntity.fechaFin;
            app.fechaInicio = tarea.tareasEntity.fechaInicio;
            app.nombreTarea = tarea.tareasEntity.nombreTarea;
            $scope.test = tarea.tareasEntity.nombreTarea;
            console.log("NOMBRE TAREA");
            console.log(app.nombreTarea);
            $scope.$apply();
            app.$scope.$digest();
            app.$state.go('detalleReunion');
            app.$scope.$watch();

        }));

        console.log(gridApi.selection.getSelectedRows());
    };

    console.log("****************** OBJETO GRIDOPTIONS *************");
    console.log(this.gridOptions);

    this.cargarReuniones = function (tipoReunion) {
        var fechaEnvio = null;
        var fechaFin = null;
        if (tipoReunion.localeCompare("PROX") == 0) {
            fechaFin = new Date().toString();
        } else {
            fechaEnvio = new Date().toString();
        }


        this.tareasUsuariosVO = {
            "idUsuario": usuarioModel.datosUsuario.idUsuario,
            "estado": 'CRE',
            "fechaEnvio": fechaEnvio,
            "fechaFin": fechaFin,
            "tareasEntity": {
                "tipoTarea": 'REUNION'
            }
        }
        this.$http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data) {
            console.log("########### REUNIONES USUARIO ##############");
            // console.log(data.data);
            console.log(app.gridOptions);

            app.gridOptions.data = data.data;
        });
    }
    this.cargarReuniones("PROX");

    this.datosModulo = { 'idModulo': 1 };
    this.$http.post('http://localhost:8080/sistEval/ws/buscarUsuariosModulo/', this.datosModulo).then(function (data) {
        console.log("########### USUARIOS DE MODULO ##############");
        // console.log(data.data);

        app.$scope.usuariosModulo = data.data;
        app.tareasModel.usuariosModulo = data.data;
    });

    /******************** CHECKBOX USUARIOS *******************************/
    this.$scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
        this.usuariosSeleccionados = list;
        tareasModel.usuariosSeleccionados = list;

        console.log("########## USUARIOS SELECCIONADOS1 ##########");
        console.log(this.usuariosSeleccionados);
    };
    this.$scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    function resetFields() {
        app.$scope.nombreTarea = null;
        app.$scope.descripcionTarea = null;
        app.$scope.fechaFin = null;
        app.archivoAdjunto = null;
        app.tareasModel.usuariosSeleccionados = [];
        app.criteriosSeleccionados = [];
        app.usuariosSeleccionados = [];
    };

    /**************************************************************** DIALOGO >>>>>>>>>>>>>>>>>>>>>>>>>  ************** */
    this.seleccionarUsuarios = function () {
        console.log(this.ngDialog);
        this.ngDialog.open({
            template: 'app/components/tareas/reuniones/usuariosReunionModal.html',
            showClose: false,
            className: 'ngdialog-theme-default',
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.usuariosModulo = tareasModel.usuariosModulo;
                this.usuariosSelected = [];
                this.usuariosSeleccionados = [];
                this.test = function () {
                    console.log(usuarioModel);
                    console.log(tareasModel);
                }

                this.cancel = function () {
                    this.usuariosSeleccionados = [];
                    tareasModel.usuariosSeleccionados = [];
                    ngDialog.close();
                }
                this.accept = function () {
                    tareasModel.usuariosSeleccionados = this.usuariosSeleccionados;
                    ngDialog.close();
                }
                this.marcarTodos = function () {
                    for (let i = 0; i < tareasModel.usuariosModulo; i++) {
                        this.usuariosSeleccionados.push(tareasModel.usuariosModulo[i]);
                        this.exists($scope.usuariosModulo[i]);
                    }
                }
                /******************** CHECKBOX USUARIOS *******************************/
                this.toggle = function (item) {
                    console.log("Tooogle>>>>");
                    console.log(item);
                    var idx = this.usuariosSeleccionados.indexOf(item);
                    if (idx > -1) {
                        this.usuariosSeleccionados.splice(idx, 1);
                    }
                    else {
                        this.usuariosSeleccionados.push(item);
                    }
                    console.log("########## USUARIOS SELECCIONADOS1 ##########");
                    console.log(this.usuariosSeleccionados);
                };
                this.exists = function (item) {
                    debugger;
                    console.log(">¿<zzzzzzzzzzzzzzz Exists  ");
                    console.log(item);
                    console.log(this.usuariosSeleccionados.indexOf(item));
                    return this.usuariosSeleccionados.indexOf(item) > -1;
                };
            }],
            controllerAs: 'usrsReunionModalCtrl'
        }
        );
    };


    /********************** CREAR REUNION *****************/
    this.guardarTarea = function (form) {
        console.log(tareasModel.usuariosSeleccionados);
        if (form.$valid) {
            if (tareasModel.usuariosSeleccionados != undefined && tareasModel.usuariosSeleccionados.length > 0) {

                console.log(app.$scope.tipoTarea);
                var usuariosSeleccionados = tareasModel.usuariosSeleccionados.slice(0);
                usuariosSeleccionados.forEach(function (e) {
                    delete e.$$hashKey;
                    delete e.correoUsuario;
                    delete e.idModulo;
                    delete e.idPerfil;
                    delete e.nombreCompleto;
                    delete e.nombreUsuario;
                    delete e.password;
                    delete e.idCriterio;
                    delete e.nombreCriterio;
                    delete e.valorCriterio;
                    delete e.descripcionCriterio;
                });
                console.log("########## USUARIOS SELECCIONADOS ##########");
                console.log(usuariosSeleccionados);

                let criteriosSeleccionados = "";


                this.nombreTarea = app.$scope.nombreTarea;
                this.descripcionTarea = app.$scope.descripcionTarea;
                this.fechaFin = app.$scope.fechaFin;
                this.tareaData = {
                    'nombreTarea': this.nombreTarea,
                    'descripcionTarea': this.descripcionTarea,
                    'idModulo': usuarioModel.datosUsuario.idModulo,
                    'tipoTarea': 'REUNION',
                    'idCreadorTarea': usuarioModel.datosUsuario.idUsuario,
                    'estado': 'ACT',
                    'criterios': criteriosSeleccionados,
                    'fechaInicio': new Date(),
                    'fechaFin': this.$scope.fechaFin,
                    'archivoAdjunto': this.archivoAdjunto,
                    'tareasUsuarios': tareasModel.usuariosSeleccionados
                };
                console.log("OBJETO TAREA #$$#$#$#$#$#$#$$#$#");
                console.log(this.tareaData);

                console.log("ARCHIVO:....");
                var uploaded = document.getElementById("file-input");
                var reader = new FileReader();

                app.$scope.fechaFin.setHours(app.$scope.hora.getHours(), app.$scope.hora.getMinutes(), 00, 00);
                this.tareaData = {
                    'nombreTarea': app.$scope.nombreTarea,
                    'descripcionTarea': app.$scope.descripcionTarea,
                    'idModulo': usuarioModel.datosUsuario.idModulo,
                    'tipoTarea': 'REUNION',
                    'idCreadorTarea': usuarioModel.datosUsuario.idUsuario,
                    'estado': 'ACT',
                    'criterios': criteriosSeleccionados,
                    'fechaInicio': new Date(),
                    'fechaFin': app.$scope.fechaFin,
                    'archivoAdjunto': this.archivoAdjunto,
                    'tareasUsuarios': tareasModel.usuariosSeleccionados
                };
                //debugger;
                app.$http.post('http://localhost:8080/sistEval/ws/crearTarea/', this.tareaData).then(function (data) {
                    console.log("tarea");
                    console.log(data);
                    toastr.success('Reunión creada');
                    resetFields();
                }, function (data) {
                    console.log("ERROR");
                    toastr.error('Error creando reunión');
                });
                console.log(binaryString);

                // reader.onload = function () {
                //     debugger;
                //     var arrayBuffer = this.result,
                //         array = new Uint8Array(arrayBuffer),
                //         binaryString = btoa(String.fromCharCode.apply(null, array));
                //     this.archivoAdjunto = binaryString;
                //     //Setea las horas a la fechafin
                // }
                // if(uploaded){
                //     reader.readAsArrayBuffer(uploaded.files[0]);
                // }
            } else {
                toastr.warning('Seleccione los asistentes a la reunión');
            }
        } else {
            toastr.warning('Complete todos los campos');
        }

    };


}


reunionesController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', 'ngDialog'];

module.exports = reunionesController; 