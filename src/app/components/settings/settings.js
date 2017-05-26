let app;
function settingsController($scope, $http, $state, tareasModel, usuarioModel, ngDialog) {
    app = this;
    this.$http = $http;
    this.$scope = $scope;
    this.usuarioModel = usuarioModel;
    this.tareasModel = tareasModel;
    this.ngDialog = ngDialog;
    this.$scope.periodoActivo = "";
    this.tareasModel.nuevaCategoria = {
        'calificacion': 100
    };
    this.categorias = [];
    // this.test = [ {name:'John', age:25, gender:'boy'},{name:'Jessie', age:30, gender:'girl'}];
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
    this.CryptoJS = CryptoJS;
    console.log('jijiji', CryptoJS);
    /************************ CATEGORIAS *********************** */

    this.obtenerCategorias = function () {
        $http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then(function (data) {
            app.categorias = data.data;
            console.log('Categorias', app.categorias);
            for (let i = 0; i < app.categorias.length; i++) {
                let gravatar = app.CryptoJS.MD5(app.categorias[i].nombreTipoTarea);
                app.categorias[i].imagen = 'http://www.gravatar.com/avatar/' + gravatar + '?s=50&d=identicon';
            }
            console.log(app.categorias);
            // $scope.gridOptionsCriterios.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener categorias');
        });
    }
    this.obtenerCategorias();

    this.eliminarCategoria = function (id) {
        let categoriaObj = {
            'idTiposTareas':id,
            'estado':'INA'
        }
        $http.post('http://localhost:8080/sistEval/ws/crearTipoTarea/', categoriaObj).then(function (data) {
            toastr.success('Categoría eliminada');
            app.obtenerCategorias();
        }, function (error) {
            toastr.error('Error al eliminar categoría');
        });
    }

    this.crearCategoria = function () {
        this.ngDialog.open({
            template: 'app/components/settings/categorias/criteriosCategoriaModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.gridOptionsCriterios = {
                    enableRowSelection: true,
                    enableFullRowSelection: false,
                    rowHeader: false,
                    enableSelectAll: true,
                    rowHeight: 30,
                    multiSelect: true,
                    columnDefs: [

                        { name: 'idCriterio', visible: true, displayName: 'Id', width: 50 },
                        { name: 'valorCriterio', visible: true, displayName: 'Nombre', minWidth: 150, width: '*' },
                        // { name: 'descripcionCriterio', visible: true, displayName: 'Descripción', width: 150, minWidth: 200 },
                    ]
                }
                let criteriosSeleccionadosArray = [];
                $scope.calificacion = 100;
                $scope.descripcionTipoTarea = "";
                $scope.gridOptionsCriterios.onRegisterApi = function (gridApi) {
                    gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
                        console.log("Grid API");
                        console.log(row.entity);
                        // criteriosSeleccionadosArray.push(row.entity.idCriterio)
                        console.log(gridApi.selection.getSelectedRows());
                        criteriosSeleccionadosArray = gridApi.selection.getSelectedRows();
                        // usuarioModel.perfilNuevoUsuario = row.entity;
                    });
                };

                $scope.acceptNuevaCategoria = function () {
                    tareasModel.nuevaCategoria.calificacion = $scope.calificacion;
                    tareasModel.nuevaCategoria.criterios = [];
                    tareasModel.nuevaCategoria.estado = 'ACT';
                    for (let i = 0; i < criteriosSeleccionadosArray.length; i++) {
                        tareasModel.nuevaCategoria.criterios.push(criteriosSeleccionadosArray[i]['idCriterio']);
                    }
                    tareasModel.nuevaCategoria.criterios = tareasModel.nuevaCategoria.criterios.toString();
                    console.log(tareasModel.nuevaCategoria);
                    $http.post('http://localhost:8080/sistEval/ws/crearTipoTarea/', tareasModel.nuevaCategoria).then(function (data) {
                        toastr.success('Categoría creada');
                        app.obtenerCategorias();
                        tareasModel.nuevaCategoria = null;
                    }, function (error) {
                        toastr.error('Error al crear categoría');
                    });
                    ngDialog.close();
                }

                $scope.cancelNuevaCategoria = function () {
                    tareasModel.nuevaCategoria = null;
                    ngDialog.close();
                }

                this.obtenerCriterios = function () {
                    $http.get('http://localhost:8080/sistEval/ws/getCriterios/').then(function (data) {
                        console.log('Perfiles', data);
                        $scope.gridOptionsCriterios.data = data.data;
                    }, function (error) {
                        toastr.error('Error al obtener criterios');
                    });
                }
                this.obtenerCriterios();
            }
            ]
        });
    }
    /**************Lista de categorias ********************/
    this.createFilterFor = function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(contact) {
            return (contact._lowername.indexOf(lowercaseQuery) != -1);
        };
    }

    this.querySearch = function querySearch(criteria) {
        return criteria ? this.allContacts.filter(this.createFilterFor(criteria)) : [];
    }

    this.loadContacts = function loadContacts() {
        var contacts = [
            'Marina Augustine',
            'Oddr Sarno',
            'Nick Giannopoulos',
            'Narayana Garner',
            'Anita Gros',
            'Megan Smith',
            'Tsvetko Metzger',
            'Hector Simek',
            'Some-guy withalongalastaname'
        ];
        return contacts.map(function (c, index) {
            var cParts = c.split(' ');
            var email = cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com';
            var hash = app.CryptoJS.MD5(email);

            var contact = {
                name: c,
                email: email,
                image: 'http://www.gravatar.com/avatar/' + hash + '?s=50&d=retro'
            };
            contact._lowername = contact.name.toLowerCase();
            return contact;
        });
    }
    this.allContacts = this.loadContacts();
    this.contacts = [this.allContacts[0]];
    console.log('Contacts', this.allContacts);

    /************************ FIN CATEGORIAS *********************** */

    /************************ PERIODOS *********************** */
    this.consultarPeriodos = function () {
        let periodoActivo = "";
        app.$http.get('http://localhost:8080/sistEval/ws/periodos/').
            success(function (data) {
                console.log("Periodos");
                console.log(data);
                data.filter(function (p) {
                    console.log('PP>> ', p);
                    if (p.estado === 'ACT') {
                        periodoActivo = p;
                    }
                });
                console.log('Periodo activo >> ', periodoActivo);
                app.$scope.periodoActivo = periodoActivo['nombrePeriodo'];
            });
    };
    this.consultarPeriodos();

    this.nuevoPeriodo = function () {
        this.ngDialog.open({
            template: 'app/components/settings/nuevoPeriodoModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.nombrePeriodo = "";
                $scope.acceptNuevoPeriodo = function () {
                    let periodosObj = {
                        'nombrePeriodo': $scope.nombrePeriodo,
                        'estado': 'INA'
                    };
                    console.log(usuarioModel.moduloNuevoUsuario);
                    $http.post('http://localhost:8080/sistEval/ws/crearPeriodo/', periodosObj).then(function (data) {
                        toastr.success('Período creado');
                        app.consultarPeriodos();
                    }, function (error) {
                        toastr.error('Error al crear período');
                    });
                    ngDialog.close();
                }

                $scope.cancelNuevoPeriodo = function () {
                    ngDialog.close();
                }
            }
            ]
        });
        this.$scope
    }

    this.seleccionarPeriodo = function () {
        this.ngDialog.open({
            template: 'app/components/settings/periodosModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.gridOptionsPeriodos = {
                    enableRowSelection: true,
                    enableFullRowSelection: false,
                    rowHeader: false,
                    enableSelectAll: true,
                    rowHeight: 30,
                    multiSelect: false,
                    columnDefs: [
                        { name: 'idPeriodo', visible: true, displayName: 'Id', width: 50 },
                        { name: 'nombrePeriodo', visible: true, displayName: 'Nombre', width: '*', minWidth: 200 },
                        { name: 'estado', visible: true, displayName: 'Estado', width: '*', minWidth: 150 },
                    ]
                }
                $scope.gridOptionsPeriodos.onRegisterApi = function (gridApi) {
                    gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
                        console.log("Grid API");
                        console.log(row.entity);
                        usuarioModel.periodoActivo = row.entity;
                    });
                };

                $scope.acceptPeriodos = function () {
                    console.log(usuarioModel.moduloNuevoUsuario);
                    $http.post('http://localhost:8080/sistEval/ws/actualizarPeriodoActivo/', usuarioModel.periodoActivo).then(function (data) {
                        toastr.success('Período activo actualizado');
                        app.consultarPeriodos();
                    }, function (error) {
                        toastr.error('Error al actualizar período');
                    });
                    ngDialog.close();
                }

                $scope.cancelPeriodos = function () {
                    ngDialog.close();
                }

                this.obtenerPeriodos = function () {
                    console.log(this.moduloObj);
                    $http.get('http://localhost:8080/sistEval/ws/periodos/').then(function (data) {
                        console.log('Perfiles', data);
                        $scope.gridOptionsPeriodos.data = data.data;
                    }, function (error) {
                        toastr.error('Error al obtener perfiles');
                    });
                }
                this.obtenerPeriodos();
            }
            ]
        });
        this.$scope
    }
    /************************ FIN PERIODOS *********************** */


}


settingsController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', 'ngDialog'];
module.exports = settingsController; 