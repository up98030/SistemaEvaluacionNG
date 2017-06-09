let app;
function tareasController($scope, $http, $state, tareasModel, usuarioModel, $localStorage, $sessionStorage) {
    app = this;
    this.test = "TESTSS";
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.tareasModel = tareasModel;
    this.$localStorage = $localStorage;
    this.$sessionStorage = $sessionStorage;
    this.observacionesDocente;
    this.usuarioModel = usuarioModel;
    console.log("DATOS USUARIO tareasCtrl");
    console.log(this.usuarioModel.datosUsuario);
    this.$scope.tareasModel = {};
    this.$scope.tareasModel.categoriasTareas = [];
    this.$scope.tareasModel.gruposTareas = [];
    this.tareasModel.usuarios = [];
    this.tareasModel.categoriasColors = [];
    // this.tareasModel.habilitarAdjuntarArchivo = false;
    this.tareasModel.categoriasTareasColor = [];
    this.coloresCategorias = function () {
        let celeste = { 'fondo': '#43A5CF', 'borde': '#3584a5', 'sombra': '#3c94ba' }
        this.tareasModel.categoriasColors.push(celeste);
        let verde = { 'fondo': '#00d27f', 'borde': '#00a865', 'sombra': '#00bd72' }
        this.tareasModel.categoriasColors.push(verde);
        let purpura = { 'fondo': '#BE29EC', 'borde': '#9820bc', 'sombra': '#ab24d4' }
        this.tareasModel.categoriasColors.push(purpura);
        let rosa = { 'fondo': '#FF00A9', 'borde': '#cc0087', 'sombra': '#e50098' }
        this.tareasModel.categoriasColors.push(rosa);
        let tomate = { 'fondo': '#F27D0C', 'borde': '#c16409', 'sombra': '#d9700a' }
        this.tareasModel.categoriasColors.push(tomate);
        let navy = { 'fondo': '#2E4045', 'borde': '#243337', 'sombra': '#29393e' }
        this.tareasModel.categoriasColors.push(navy);
        let rojo = { 'fondo': '#E42F43', 'borde': '#b62535', 'sombra': '#cd2a3c' }
        this.tareasModel.categoriasColors.push(rojo);
        let azul = { 'fondo': '#3A329B', 'borde': '#2e287c', 'sombra': '#342d8b' }
        this.tareasModel.categoriasColors.push(azul);
        // let cafe = {'fondo': '', 'borde':'','sombra':''}
    }
    this.coloresCategorias();

    /****************  CARGAR CATEGORÍAS **************** */
    this.obtenerCategorias = function () {
        $http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then(function (data) {
            app.tareasModel.categoriasTareas = data.data;
            for (let i = 0; i < app.tareasModel.categoriasTareas.length; i++) {
                // for (let j = 0; j < app.tareasModel.categoriasColors.length; j++) {
                let tiposObj = {
                    'nombreTipoTarea': app.tareasModel.categoriasTareas[i]['nombreTipoTarea'],
                    'idTiposTareas': app.tareasModel.categoriasTareas[i]['idTiposTareas'],
                    'color': app.tareasModel.categoriasColors[i]
                };
                app.tareasModel.categoriasTareasColor.push(tiposObj);
                app.$scope.tareasModel.categoriasTareas.push(tiposObj);
                // }
            }
            console.log('Categorias>>>>> ', app.tareasModel.categoriasTareasColor);
            // $scope.gridOptionsCriterios.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener categorias');
        });
    }
    this.obtenerCategorias();

    this.obtenerModulos = function () {
        console.log(this.moduloObj);
        this.$http.get('http://localhost:8080/sistEval/ws/modulos/').then(function (data) {
            console.log('MODULOS', data);
            for (let i = 0; i < data.data.length; i++) {
                let modulosObj = {
                    'idModulo': data.data[i].idModulo,
                    'nombreModulo': data.data[i].nombreModulo
                }
                app.$scope.tareasModel.gruposTareas.push(modulosObj);
            }
        }, function (error) {
            toastr.error('Error al obtener modulos');
        });
    }

    this.obtenerModulos();

    this.consultarUsuarios = function () {
        app.$http.get('http://localhost:8080/sistEval/ws/usuarios/').
            success(function (data) {
                console.log('app.tareasModel.usuarios', app.tareasModel.usuarios);
                app.tareasModel.usuarios = data;
                console.log('app.tareasModel.usuarios', app.tareasModel.usuarios);
                console.log('usuarios >>>', data);
            });
    };
    this.consultarUsuarios();

    this.$scope.obtenerResponsableGrid = function (index) {
        console.log('index', index);
        for (let i = 0; i < app.tareasModel.usuarios.length; i++) {
            console.log(app.tareasModel.usuarios[i]['idUsuario']);
            console.log(app.tareasModel.usuarios[i]['correoUsuario']);
            if (app.tareasModel.usuarios[i]['idUsuario'] === index) {
                return app.tareasModel.usuarios[i]['nombreCompleto'];
            }
        }
    }

    this.$scope.obtenerCategoriaGrid = function (index) {
        for (let i = 0; i < this.tareasModel.categoriasTareas.length; i++) {
            if (this.tareasModel.categoriasTareas[i]['idTiposTareas'] === index) {
                return this.tareasModel.categoriasTareas[i]['nombreTipoTarea'];
            }
        }
    }
    this.$scope.obtenerGrupoGrid = function (index) {
        for (let i = 0; i < this.tareasModel.gruposTareas.length; i++) {
            if (this.tareasModel.gruposTareas[i]['idModulo'] === index) {
                return this.tareasModel.gruposTareas[i]['nombreModulo'];
            }
        }
    }

    /************************FIN CARGAR CATEGORÍAS********************** */
    this.filterCategories = [
        { 'idTipoTarea': 1 },
        { 'idTipoTarea': 2 },
        { 'idTipoTarea': 3 },
    ];
    /************************** Grid de tareas **************************/
    this.gridOptions = {
        enableRowSelection: true,
        enableFullRowSelection: true,
        rowHeader: false,
        enableFiltering: true,
        enableSelectAll: false,
        rowHeight: 35,
        multiSelect: false,
        columnDefs: [
            { name: 'usuariosEntity.nombreCompleto', width: 250, displayName: 'Nombre', enableFiltering: false, visible: false },
            { name: 'tareasEntity.nombreTarea', width: 250, displayName: 'Tarea' },
            { name: 'archivo', visible: false },
            { name: 'archivoAdjunto', visible: false },
            { name: 'calificacion', visible: false },
            { name: 'tareasEntity.descripcionTarea', width: 300, displayName: 'Descripcion Tarea', visible: false },
            {
                name: 'tareasEntity.idTipoTarea',
                width: 300,
                displayName: 'Categoría',
                visible: true,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerCategoriaGrid(row.entity.tareasEntity.idTipoTarea)}}</div>',
                // cellFilter: 'mapGender',
                // editDropdownValueLabel: 'Tipo',
                // editDropdownOptionsArray: app.$scope.tareasModel.categoriasTareas,
                filter: {
                    type: 'select',
                    selectOptions: this.filterCategories,
                }
            },
            { name: 'estado', visible: false },
            { name: 'observacionesDocente', visible: false },
            { name: 'fechaEnvio', visible: false },
            { name: 'tareasEntity.fechaInicio', width: 200, displayName: 'Fecha Inicio', visible: true },
            { name: 'tareasEntity.fechaFin', width: 200, displayName: 'Fecha Entrega' },
            {
                name:
                'tareasEntity.idModulo',
                width: 200,
                visible: true,
                displayName: 'Grupo',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerGrupoGrid(row.entity.tareasEntity.idModulo)}}</div>',
            },
            {
                name:
                'tareasEntity.idCreadorTarea',
                width: 200,
                visible: true,
                displayName: 'Responsable',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerResponsableGrid(row.entity.tareasEntity.idCreadorTarea)}}</div>'
            },
            { name: 'idTarea', visible: false },
            { name: 'observaciones', width: 300, visible: false },
            { name: 'observacionCalificacion', width: 300, displayName: 'Observación', visible: false }

        ],
        data: tareasData,

    };
    var tareasData = [];
    var completo = false;

    /************************** Cuando selecciona una tarea **************************/
    this.gridOptions.onRegisterApi = function (gridApi) {
        // gridApi.grid.modifyRows(app.gridOptions.data);
        //gridApi.selection.selectRow(app.gridOptions.data[0]);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope, function (row) {
            tareasModel.tarea = row.entity;
            console.log("DATOS TAREA");
            console.log(tareasModel.tarea);
            var tarea = row.entity;
            app.criterio = tarea.tareasEntity.criterios;
            app.archivoAdjunto = tarea.archivoAdjunto;
            app.descripcionTarea = tarea.descripcionTarea;
            app.fechaFin = tarea.fechaFin;
            app.fechaInicio = tarea.fechaInicio;
            app.nombreTarea = tarea.nombreTarea;
            $scope.test = tarea.nombreTarea;
            console.log("NOMBRE TAREA");
            console.log(app.nombreTarea);
            $scope.$apply();
            app.$scope.$digest();
            app.tareasModel.habilitarAdjuntarArchivo = false;
            if (row.entity.tareasEntity.criterios.localeCompare("1") === 0 || row.entity.tareasEntity.criterios.localeCompare("3") === 0) {
                app.tareasModel.habilitarAdjuntarArchivo = true;
            }
            app.$state.go('tarea');
            app.$scope.$watch();

        }));

        console.log(gridApi.selection.getSelectedRows());
    };

    /************************** Consulta las tareas del usuario **************************/
    this.cargarTareas = function (estadoTarea) {
        console.log('Storage tareas >>>', this.$sessionStorage.userData);
        this.tareasUsuariosVO = {
            "idUsuario": this.$sessionStorage.userData.idUsuario,
            "estado": estadoTarea,
            // "tareasEntity": {
            //     "tipoTarea": 'TAREA'
            // }
        }
        console.log(this.tareasUsuariosVO);
        let loading_screen = pleaseWait({
            backgroundColor: '#666666',
            loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
        });
        this.$http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data) {
            console.log("########### TAREAS USUARIO ##############");
            console.log(data.data);
            let tareasUsuario = data.data;
            for (let i = 0; i < app.tareasModel.categoriasTareasColor.length; i++) {
                app.tareasModel.categoriasTareasColor[i].numeroTareasUsuario = 0;
                for (let j = 0; j < tareasUsuario.length; j++) {
                    if (tareasUsuario[j].tareasEntity.idTipoTarea === app.tareasModel.categoriasTareasColor[i].idTiposTareas) {
                        app.tareasModel.categoriasTareasColor[i].numeroTareasUsuario++;
                    }
                }
            }
            loading_screen.finish();
            console.log('Categorias tareas  contadors', app.tareasModel.categoriasTareas);
            app.gridOptions.data = data.data;
        });
    }
    this.cargarTareas('CRE');


    this.descargarArchivoTarea = function () {
        console.log(tareasModel.tarea);

        // var binary = '';
        // var bytes = new Uint8Array(256);
        // var len = bytes.byteLength;
        // for (var i = 0; i < len; i++) {
        //     binary += String.fromCharCode(bytes[i]);
        // }
        // console.log(bytes);

        // var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(tareasModel.tarea.tareasEntity.archivoAdjunto)));

        var string = new TextDecoder('utf-8').decode(tareasModel.tarea.tareasEntity.archivoAdjunto);

        // var bb = new BlobBuilder();
        // bb.append(tareasModel.tarea.tareasEntity.archivoAdjunto);
        // var f = new FileReader();
        // f.onload = function (e) {
        //     callback(e.target.result)
        // }
        // f.readAsText(bb.getBlob());

        console.log(string);
        var binaryString = window.atob(string);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }

        var blob = new Blob([byte]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName + ".gif";
        link.download = fileName;
        link.click();



        // let headers = {
        //     'Accept': 'application/octet-stream',
        //     'Content-Type': 'application/octet-stream',
        // };
        // this.$http.get('http://localhost:8080/sistEval/ws/tareas/' + tareasModel.tarea.idTarea + '/' + tareasModel.tarea.idUsuario,
        //     headers).then(function (data) {
        //         // app.$scope.tiposTareas = data.data;
        //         saveAs(data);
        //         console.log("TIPOSTAREAS");
        //         console.log(data);
        //     });
    }


    /************************** Envia Tarea **************************/
    this.enviarTarea = function () {
        tareasModel.tarea.estado = 'ENV';
        tareasModel.tarea.observacionesDocente = this.observacionesDocente;
        tareasModel.tarea.tareasEntity.fechaFin = new Date();
        tareasModel.tarea.tareasEntity.fechaInicio = new Date();
        delete tareasModel.tarea.ObservacionesDocente;
        console.log("########## TAREA A ENVIAR ##############================");
        console.log(tareasModel.tarea);

        let file = document.getElementById('file-inputDetalle');
        console.log(file.files);
        // formData.append('file', file.files[0]);
        if (file.files && file.files != null && file.files != undefined && file.files.length > 0 && file.files['length'] > 0) {
            filename = file.files[0].name.split('.').pop();

            var reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
                let archivoBase64 = reader.result;
                var arrayBuffer = this.result,

                    array = new Uint8Array(arrayBuffer),
                    binaryString = btoa(String.fromCharCode.apply(null, array));
                this.archivoAdjuntoDetalle = binaryString;
                tareasModel.tarea.archivoAdjunto = archivoBase64;

                app.$http.post('http://localhost:8080/sistEval/ws/enviarTarea/', tareasModel.tarea).then(function (data) {
                    console.log("########### TAREAS USUARIO ENVIADA ##############");
                    console.log(data.data);
                    toastr.success('Tarea Enviada');
                    $state.go('listaTareas');
                });

            }
        } else {
            app.$http.post('http://localhost:8080/sistEval/ws/enviarTarea/', tareasModel.tarea).then(function (data) {
                console.log("########### TAREAS USUARIO ENVIADA ##############");
                console.log(data.data);
                toastr.success('Tarea Enviada');
                $state.go('listaTareas');
            });
        }
        console.log('fileee>> ', file.files[0]);
        // let filename = file.files[0].name;
    }
    this.cambioTab = function () {
        alert("asdf");
    }

    this.selectedIndex = 0;

}

tareasController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', '$localStorage', '$sessionStorage'];

module.exports = tareasController; 