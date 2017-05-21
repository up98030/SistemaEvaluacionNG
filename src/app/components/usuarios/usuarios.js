let app;
function usuariosController($scope, $http, $state, tareasModel, usuarioModel, ngDialog) {
    app = this;
    this.$http = $http;
    this.$scope = $scope;
    this.usuarioModel = usuarioModel;
    this.$scope.titulo = "asdf";
    this.usuarioEliminar = {};
    console.log('ngDialog', ngDialog);
    this.ngDialog = ngDialog;
    this.$scope.periodoActivo = "";
    this.gridOptions = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        multiSelect: false,
        columnDefs: [
            { name: 'idUsuario', visible: true, displayName: 'Id', width: 50 },
            { name: 'nombreCompleto', visible: true, displayName: 'Nombre Completo', width: 200 },
            { name: 'nombreUsuario', visible: false },
            { name: 'correoUsuario', width: 250 },
            { name: 'estado', visible: true, width: 250 },
            { name: 'idPerfil', width: 200, displayName: 'Perfil' },
            { name: 'idModulo', width: 200, displayName: 'Modulo' },
            {
                name: 'acciones', width: 150, visible: true,
                cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;" ng-click="grid.appScope.eliminarUsuario(row.entity)"><i class="fa fa-trash" style="color:#cc3333;" aria-hidden="true"></i></div>'
            }
        ],
        data: null
    };


    /***************** INICIO CONTROLADOR DIALOGOS PERFILES ******************** */
    this.seleccionarPerfil = function () {
        this.ngDialog.open({
            template: 'app/components/usuarios/perfiles/perfilesModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.gridOptionsPerfiles = {
                    enableRowSelection: true,
                    enableFullRowSelection: false,
                    rowHeader: false,
                    enableSelectAll: true,
                    rowHeight: 30,
                    multiSelect: false,
                    columnDefs: [
                        { name: 'idPerfil', visible: true, displayName: 'Id', width: 50 },
                        { name: 'nombrePerfil', visible: true, displayName: 'Nombre', width: '*', minWidth: 200 },
                    ]
                }
                $scope.gridOptionsPerfiles.onRegisterApi = function (gridApi) {
                    gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
                        console.log("Grid API");
                        console.log(row.entity);
                        usuarioModel.perfilNuevoUsuario = row.entity;
                    });
                };

                $scope.acceptPerfiles = function () {
                    console.log(usuarioModel.moduloNuevoUsuario);
                    ngDialog.close();
                }

                $scope.cancelPerfiles = function () {
                    usuarioModel.perfilNuevoUsuario = null;
                    ngDialog.close();
                }

                this.obtenerPerfiles = function () {
                    console.log(this.moduloObj);
                    $http.get('http://localhost:8080/sistEval/ws/perfiles/').then(function (data) {
                        console.log('Perfiles', data);
                        $scope.gridOptionsPerfiles.data = data.data;
                    }, function (error) {
                        toastr.error('Error al obtener perfiles');
                    });
                }
                this.obtenerPerfiles();
            }
            ]
        });
        this.$scope
    }
    /***************** FIN CONTROLADOR PERFILES ******************** */

    /***************** INICIO CONTROLADOR MODULOS ******************** */
    this.seleccionarModulo = function () {
        this.ngDialog.open({
            template: 'app/components/usuarios/modulos/modulosModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.gridOptionsModulos = {
                    enableRowSelection: true,
                    enableFullRowSelection: false,
                    rowHeader: false,
                    enableSelectAll: true,
                    rowHeight: 30,
                    multiSelect: false,
                    columnDefs: [
                        { name: 'idModulo', visible: true, displayName: 'Id', width: 50 },
                        { name: 'nombreModulo', visible: true, displayName: 'Nombre', width: '*', minWidth: 200 },
                        { name: 'estado', visible: false, width: 200 },
                    ]
                }

                $scope.gridOptionsModulos.onRegisterApi = function (gridApi) {
                    gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
                        // console.log("Grid API");
                        // console.log(row.entity);
                        usuarioModel.moduloNuevoUsuario = row.entity;
                    });
                };

                $scope.acceptModulos = function () {
                    console.log(usuarioModel.moduloNuevoUsuario);
                    ngDialog.close();
                }

                $scope.cancelModulos = function () {
                    usuarioModel.moduloNuevoUsuario = null;
                    ngDialog.close();
                }

                this.obtenerModulos = function () {
                    console.log(this.moduloObj);
                    $http.get('http://localhost:8080/sistEval/ws/modulos/').then(function (data) {
                        console.log('MODULOS', data);
                        $scope.gridOptionsModulos.data = data.data;
                    }, function (error) {
                        toastr.error('Error al obtener modulos');
                    });
                }
                this.obtenerModulos();
            }
            ]
        });
    }
    /***************** FIN CONTROLADOR MODULOS ******************** */

    this.gridOptions.onRegisterApi = function (gridApi) {
        console.log("Grid API");
        console.log(gridApi);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
            console.log(gridApi);
            console.log("Grid API");
            console.log(row.entity);
            app.usuarioEliminar = row.entity;
            tareasModel.tarea = row.entity;
            var tarea = row.entity;
            $scope.test = tarea.nombreTarea;
        }));
        console.log(gridApi.selection.getSelectedRows());
    };

    this.$scope.eliminarUsuario = function (entity) {
        // var index = app.$scope.gridOptions.data.indexOf(app.usuarioEliminar);
        console.log(app.usuarioEliminar);
        delete app.usuarioEliminar.$$hashKey;
        entity.estado = 'INA';

        app.$http.post('http://localhost:8080/sistEval/ws/crearUsuario/', entity).then(function (data) {
            console.log("usuario");
            console.log(data);
            toastr.success('Usuario eliminado');
            //app.$scope.gridOptions.data.splice(index, 1);
            app.consultarUsuarios();

        }, function (data) {
            console.log("ERROR");
            toastr.error('Error eliminando usuario');
        });

    }


    this.guardarUsuario = function () {
        this.usuarioData = {
            'nombreUsuario': this.$scope.nombreUsuario,
            'correoUsuario': this.$scope.correoUsuario,
            'password': this.$scope.password,
            'nombreCompleto': this.$scope.nombresUsuario + " " + this.$scope.apellidosUsuario,
            'idPerfil': this.usuarioModel.perfilNuevoUsuario.idPerfil,
            'estado': 'ACT',
            'idModulo': this.usuarioModel.moduloNuevoUsuario.idModulo,
        };
        /*   this.userId = this.$scope.idUsuario;
           this.userNom = this.$scope.nombreUsuario;
           this.userPwd = this.$scope.userpwd;
           this.nombres = this.$scope.nombresUsuario;
           this.apellidos = this.$scope.apellidosUsuario;
           this.userRol = this.$scope.userrol;
           this.userData = this.userId + "," + this.userNom + "," + this.userPwd + "," + this.nombres + "," + this.apellidos + "," + this.userRol;*/
        if (!app.validarCampos()) {
            return false;
        }
        this.$http.post('http://localhost:8080/sistEval/ws/crearUsuario/', this.usuarioData).then(function (data) {
            console.log("usuario");
            console.log(data);
            toastr.success('Usuario creado');
            app.limpiarCampos();


        }, function (data) {
            console.log("ERROR");
            toastr.error('Error insertando usuario');
        });

    }

    this.validarCampos = function () {
        if (!this.$scope.nombreUsuario || !this.$scope.correoUsuario || !this.$scope.password || !this.$scope.nombresUsuario || !this.$scope.apellidosUsuario) {
            toastr.error('Debe llenar todos los campos');
            return false;
        } else {
            return true;
        }
    }

    this.limpiarCampos = function () {
        this.$scope.nombreUsuario = "";
        this.$scope.correoUsuario = "";
        this.$scope.password = "";
        this.$scope.nombresUsuario = "";
        this.$scope.apellidosUsuario = "";
        this.$scope.perfilUsuario = "";
        this.$scope.moduloUsuario = "";
        this.$scope.$apply();
        this.usuarioModel.perfilNuevoUsuario = {};
        this.usuarioModel.moduloNuevoUsuario = {};
    }

    this.consultarUsuarios = function () {
        app.$http.get('http://localhost:8080/sistEval/ws/usuarios/').
            success(function (data) {
                tareasData = data;
                completo = true;
                app.gridOptions.data = data;
                console.log("grid data usuarios");
                console.log(app.gridOptions.data);
            });
    };
    this.consultarUsuarios();

}


usuariosController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', 'ngDialog'];
module.exports = usuariosController; 