let app;
function usuariosController($scope, $http, $state, tareasModel, usuarioModel, ngDialog) {
    app = this;
    this.$http = $http;
    this.$scope = $scope;
    this.usuarioModel = usuarioModel;
    this.$state = $state;
    this.$scope.titulo = "asdf";
    this.passwordConfirmation = "";
    this.usuarioEliminar = {};
    console.log('ngDialog', ngDialog);
    this.ngDialog = ngDialog;
    app.usuarioModel.perfilesUsuario = [];
    app.usuarioModel.modulosUsuario = [];
    this.$scope.periodoActivo = "";
    this.gridOptionsGrupos = [];
    app.gridOptionsGrupos = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        multiSelect: true,
        columnDefs: [
            { name: 'idModulo', visible: false, displayName: 'Id', width: 50 },
            { name: 'nombreModulo', visible: true, displayName: 'Grupos Asignados', width: '*', minWidth: 200 },
            { name: 'estado', visible: false, width: 200 },
        ]
    }

    app.gridOptionsGrupos.onRegisterApi = function (gridApi) {
        app.gridOptionsGrupos['gridApi'] = gridApi;
    }

    this.gridOptions = {
        enableRowSelection: false,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: false,
        rowHeight: 30,
        multiSelect: false,
        columnDefs: [
            { name: 'idUsuario', visible: true, displayName: 'Id', width: 50 },
            { name: 'nombreCompleto', visible: true, displayName: 'Nombres', minWidth: 200, width: '*' },
            { name: 'nombreUsuario', visible: false },
            { name: 'correoUsuario', width: 250 },
            {
                name: 'estado',
                visible: false,
                width: 250,
            },
            {
                name: 'idPerfil',
                minWidth: 200,
                width: '*',
                displayName: 'Perfil',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerPerfilesGrid(row.entity.idPerfil)}}</div>',
            },
            {
                name:
                'idModulo',
                minWidth: 200,
                width: '*',
                displayName: 'Modulo',
                visible: false,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerModulosGrid(row.entity.idModulo)}}</div>',
            },
            {
                name: 'acciones', width: 150, visible: true,
                cellTemplate: '<div class="ui-grid-cell-contents" style="text-align:center;"><i title="Eliminar" ng-click="grid.appScope.eliminarUsuario(row.entity)" class="fa fa-trash" style="color:#cc3333;padding:0 1em;" aria-hidden="true"></i> <i title="Editar" ng-click="grid.appScope.editarUsuario(row.entity)" class="fa fa-pencil-square" style="color:#494949;" aria-hidden="true"></i> </div>'
            }
        ],
        data: null
    };

    this.$scope.editarUsuario = function (entity) {
        console.log("Entity");
        console.log(entity);
        app.usuarioModel.userData = entity;
        app.$http.post('http://localhost:8080/sistEval/ws/obtenerGruposUsuario/', entity).then(function (data) {
            console.log("Response Grupo");
            console.log(data);
            let gruposUsuarios = data.data;
            $http.get('http://localhost:8080/sistEval/ws/modulos/').then(function (data) {
                console.log('MODULOS', data);
                app.gridOptionsGrupos.data = data.data;
                for (let i = 0; i < gruposUsuarios.length; i++) {
                    for (let j = 0; j < app.gridOptionsGrupos.data.length; j++) {
                        if (app.gridOptionsGrupos.data[j].idModulo === gruposUsuarios[i].idModulo) {
                            app.gridOptionsGrupos['gridApi'].grid.modifyRows(app.gridOptionsGrupos.data);
                            app.gridOptionsGrupos['gridApi'].selection.selectRow(app.gridOptionsGrupos.data[j]);
                        }
                    }
                }
                // app.gridOptionsGrupos.onRegisterApi = function (gridApi) {
                //     alert('asdf');
                //     app.gridOptionsGrupos['gridApi'] = gridApi;
                //     console.log("app.gridOptionsGrupos['gridApi']");
                //     console.log(app.gridOptionsGrupos['gridApi']);
                //     gridApi.selection.on.rowSelectionChanged(app.$scope, (row) => {
                //         console.log("Grupo usuarios");
                //         console.log(row);
                //         // debugger;

                //         console.log("app.gridOptionsGrupos.data");
                //         console.log(app.gridOptionsGrupos.data);
                //     })
                // }
            }, function (error) {
                toastr.error('Error al obtener modulos');
            });
            app.$state.go('editarUsuario');
        }, function (error) {
            toastr.error('Error al obtener grupo');
        });
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
            if (app.userData.password) {
                app.userData.password = "";
                app.passwordConfirmation = "";
            }
            toastr.success('Usuario actualizado');
        }, function (error) {
            toastr.error('Error al actualizar datos usuario');
        });
    }

    this.gridOptions.onRegisterApi = function (gridApi) {
        this.gridOptions['gridApi'] = gridApi;
        gridApi.selection.on.rowSelectionChanged(app.$scope, (row) => {
            // app.usuariosModel.usuarioSeleccionado = row.entity;
            console.log("Usuarios selection");
            // console.log(app.usuariosModel.usuarioSeleccionado);
        })
    }

    this.obtenerPerfiles = function () {
        console.log(this.moduloObj);
        $http.get('http://localhost:8080/sistEval/ws/perfiles/').then(function (data) {
            app.usuarioModel.perfilesUsuario = data.data;
        }, function (error) {
            toastr.error('Error al obtener perfiles');
        });
    }
    this.obtenerPerfiles();

    this.obtenerModulos = function () {
        console.log(this.moduloObj);
        $http.get('http://localhost:8080/sistEval/ws/modulos/').then(function (data) {
            console.log('MODULOS', data);
            app.usuarioModel.modulosUsuario = data.data;
        }, function (error) {
            toastr.error('Error al obtener modulos');
        });
    }
    this.obtenerModulos();


    this.$scope.obtenerPerfilesGrid = function (index) {
        for (let i = 0; i < app.usuarioModel.perfilesUsuario.length; i++) {
            if (app.usuarioModel.perfilesUsuario[i]['idPerfil'] === index) {
                return app.usuarioModel.perfilesUsuario[i]['nombrePerfil'];
            }
        }
    }

    this.$scope.obtenerModulosGrid = function (index) {
        for (let i = 0; i < app.usuarioModel.modulosUsuario.length; i++) {
            if (app.usuarioModel.modulosUsuario[i]['idModulo'] === index) {
                return app.usuarioModel.modulosUsuario[i]['nombreModulo'];
            }
        }
    }

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
                    multiSelect: true,
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
                    console.log(usuarioModel.perfiles);
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
        this.usuarioModel.modulos = [];
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
                    multiSelect: true,
                    columnDefs: [
                        { name: 'idModulo', visible: true, displayName: 'Id', width: 50 },
                        { name: 'nombreModulo', visible: true, displayName: 'Nombre', width: '*', minWidth: 200 },
                        { name: 'estado', visible: false, width: 200 },
                    ]
                }

                $scope.gridOptionsModulos.onRegisterApi = function (gridApi) {
                    $scope.gridOptionsModulos['gridApi'] = gridApi;
                    gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
                        // console.log("Grid API");
                        // console.log(row.entity);
                        usuarioModel.moduloNuevoUsuario = row.entity;
                        app.userData = row.entity;
                    });
                };

                $scope.crearGrupo = function () {
                    ngDialog.close();
                }

                $scope.acceptModulos = function () {
                    usuarioModel.modulos = $scope.gridOptionsModulos['gridApi'].selection.getSelectedRows();
                    console.log(usuarioModel.modulos);
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

    /******************* GRID API DE LISTA USUARIOS ******************************* */
    this.gridOptions.onRegisterApi = function (gridApi) {
        console.log("Grid API");
        console.log(gridApi);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
            console.log(gridApi);
            // app.usuarioModel.usuarioSeleccionado = row.entity
            // console.log("Usuario seleccionado");
            // app.$state.go('editarUsuario');
            // console.log(row.entity);
            // app.usuarioEliminar = row.entity;
            // tareasModel.tarea = row.entity;
            // app.userData = row.entity;
            // console.log('UserData >>> ', app.userData);
            // var tarea = row.entity;
            // $scope.test = tarea.nombreTarea;
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
            'modulos': this.usuarioModel.modulos
        }
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
        let header = {
            "Accept": "text/plain;charset=UTF-8",
            // "Accept-Charset": "charset=utf-8"
        };
        app.$http.get('http://localhost:8080/sistEval/ws/usuarios/', header).
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