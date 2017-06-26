let app;
function reportesController($scope, $http, $state, reportesModel, $sessionStorage) {
    app = this;
    this.$scope = $scope;
    this.reportesModel = reportesModel;
    this.$http = $http;
    this.showPromedio = false;
    this.promedio = 0;
    this.estadoTarea = '';
    this.reportesModel.categoriasData = [];
    console.log('this.reportesModel.categoriasData');
    console.log(this.reportesModel.categoriasData);
    this.gridOptionsUsuarios = {};
    this.gridOptionsUsuarios = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        showHeader: false,
        multiSelect: true,
        columnDefs: [
            { name: 'idUsuario', visible: false, displayName: 'Id', width: 50 },
            { name: 'nombreCompleto', visible: true, displayName: 'Docente', minWidth: 200, width: '*' },
        ]
    }
    this.gridOptionsUsuarios.onRegisterApi = (gridApi) => {
        this.gridOptionsUsuarios['gridApi'] = gridApi;
    }
    this.gridOptionsUsuarios.data = [];
    this.gridOptionsGrupos = {};
    this.gridOptionsGrupos = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        showHeader: false,
        multiSelect: true,
        columnDefs: [
            { name: 'idModulo', visible: false, displayName: 'Id', width: 50 },
            { name: 'nombreModulo', visible: true, displayName: 'Nombre', minWidth: 200, width: '*' },
        ]
    }
    this.gridOptionsGrupos.onRegisterApi = (gridApi) => {
        this.gridOptionsGrupos['gridApi'] = gridApi;
    }
    this.gridOptionsCategorias = {};
    this.gridOptionsCategorias = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        showHeader: false,
        multiSelect: true,
        columnDefs: [
            { name: 'idTiposTareas', visible: false, displayName: 'Id', width: 50 },
            { name: 'nombreTipoTarea', visible: true, displayName: 'Nombre', minWidth: 200, width: '*' },
        ]
    }
    this.gridOptionsCategorias.onRegisterApi = (gridApi) => {
        this.gridOptionsCategorias['gridApi'] = gridApi;
    }
    this.gridOptionsTareas = {
        enableRowSelection: true,
        enableFullRowSelection: false,
        rowHeader: false,
        enableSelectAll: true,
        rowHeight: 30,
        showHeader: false,
        multiSelect: true,
        columnDefs: [
            { name: 'idTarea', visible: false, displayName: 'Id', width: 50 },
            { name: 'nombreTarea', visible: true, displayName: 'Nombre', minWidth: 200, width: '*' },
        ]
    }
    this.gridOptionsTareas.onRegisterApi = (gridApi) => {
        this.gridOptionsTareas['gridApi'] = gridApi;
    }
    this.showGridReportes = false;
    this.gridOptionsReporte = {};
    this.gridOptionsReporte = {
        enableRowSelection: false,
        enableFullRowSelection: false,
        rowHeader: true,
        enableSelectAll: true,
        rowHeight: 30,
        showHeader: true,
        aggregationHideLabel: false,
        multiSelect: true,
        columnDefs: [
            { name: 'usuariosEntity.nombreCompleto', visible: true, displayName: 'Docente', minWidth: 200, width: '*' },
            { name: 'tareasEntity.nombreTarea', visible: true, displayName: 'Tarea', minWidth: 200, width: '*' },
            {
                name: 'estado',
                visible: true,
                displayName: 'Estado',
                minWidth: 100,
                width: '*',
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerEstadosTareas(row.entity.estado)}}</div>',
            },
            { name: 'FechaEnvio', visible: true, displayName: 'Fecha envío', minWidth: 200, width: '*' },
            // { name: 'tareasEntity.tiposTareasEntity.nombreTipoTarea', visible: true, displayName: 'Categoría', minWidth: 200, width: '*' },
            // { name: 'tareasEntity.descripcionTarea', visible: true, displayName: 'Nombre', minWidth: 200, width: '*' },
            // { name: 'tareasEntity.idModulo', visible: true, displayName: 'Grupo', minWidth: 200, width: '*' },
            {
                name: 'tareasEntity.idTipoTarea',
                width: 300,
                displayName: 'Categoría',
                visible: true,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.obtenerCategoriaGrid(row.entity.tareasEntity.idTipoTarea)}}</div>',
            },
            { name: 'calificacion', visible: true, displayName: 'Calificación', minWidth: 100, width: '*' },
        ]
    };
    this.gridOptionsReporte.onRegisterApi = (gridApi) => {
        this.gridOptionsReporte['gridApi'] = gridApi;
    }

    /**************** CARGA USUARIOS **************************/
    this.cargarUsuarios = function () {
        let header = {
            "Accept": "text/plain;charset=UTF-8",
        };
        this.$http.get('http://localhost:8080/sistEval/ws/usuarios/', header).then((data) => {
            console.log("Usuarios");
            console.log(data);
            this.gridOptionsUsuarios.data = data.data;
            console.log('gridUsuarios', this.gridOptionsUsuarios);
        });
    }
    this.cargarUsuarios();
    /****************** CARGA GRUPOS ******************************/
    this.cargarGrupos = function () {
        $http.get('http://localhost:8080/sistEval/ws/modulos/').then((data) => {
            console.log('MODULOS');
            console.log(data);
            this.gridOptionsGrupos.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener modulos');
        });
    }
    this.cargarGrupos();
    /*********************** CARGA CATEGORIAS *************************/
    this.cargarCategorias = function () {
        $http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then((data) => {
            console.log('Categorias');
            console.log(data);
            this.reportesModel.categoriasData = data.data;
            this.gridOptionsCategorias.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener categorias');
        });
    }
    this.cargarCategorias();
    /*********************** CARGA TAREAS *************************/
    this.cargarTareas = function () {
        $http.get('http://localhost:8080/sistEval/ws/tareasActivas/').then((data) => {
            console.log('Tareas');
            console.log(data);
            this.gridOptionsTareas.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener tareas');
        });
    }
    this.cargarTareas();

    this.$scope.obtenerCategoriaGrid = function (index) {
        console.log('this.reportesModel.categoriasData');
        console.log(this.reportesModel);
        for (let i = 0; i < app.reportesModel.categoriasData.length; i++) {
            if (app.reportesModel.categoriasData[i]['idTiposTareas'] === index) {
                return app.reportesModel.categoriasData[i]['nombreTipoTarea'];
            }
        }
    }

    this.$scope.obtenerEstadosTareas = function (valorEstado) {
        if (valorEstado === 'CRE') {
            return 'Creada';
        }
        if (valorEstado === 'ENV') {
            return 'Enviada';
        }
        if (valorEstado === 'CLF') {
            return 'Calificada';
        }
    }

    /************************************* CREAR REPORTE **************************************** */
    this.crearReporte = function () {
        let loading_screen = pleaseWait({
            backgroundColor: '#666666',
            loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
        });
        this.gridOptionsCategorias['gridApi'].selection.getSelectedRows();
        this.gridOptionsGrupos['gridApi'].selection.getSelectedRows();
        this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows();
        this.gridOptionsTareas['gridApi'].selection.getSelectedRows();

        console.log('gridCategorias', this.gridOptionsCategorias['gridApi'].selection.getSelectedRows());
        console.log('this.gridOptionsGrupos', this.gridOptionsGrupos['gridApi'].selection.getSelectedRows());
        console.log('this.gridOptionsUsuarios', this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows());
        console.log('this.gridOptionsTareas', this.gridOptionsTareas['gridApi'].selection.getSelectedRows());

        let idTareasArrayObj = [];
        for (let i = 0; i < this.gridOptionsTareas['gridApi'].selection.getSelectedRows().length; i++) {
            let idTareaObj = {};
            idTareaObj['idTarea'] = this.gridOptionsTareas['gridApi'].selection.getSelectedRows()[i].idTarea;
            idTareasArrayObj.push(idTareaObj);
        }


        let reporteVO = {
            'usuarios': this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows(),
            'grupos': this.gridOptionsGrupos['gridApi'].selection.getSelectedRows(),
            'categorias': this.gridOptionsCategorias['gridApi'].selection.getSelectedRows(),
            'tareas': idTareasArrayObj,
            'estado': this.estadoTarea
        }

        this.$http.post('http://localhost:8080/sistEval/ws/crearReporte/', reporteVO).then((data) => {
            loading_screen.finish();
            console.log('Reporte');
            console.log(data);
            this.gridOptionsReporte.data = data.data;
            document.getElementById('gridReportes').focus();
            console.log('API reportes');
            console.log(this.gridOptionsReporte.gridApi);
            this.showGridReportes = true;
            if (this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows().length === 1 && data.data.length > 0) {
                this.showPromedio = true;
                this.promedio = data.data[0].tareasEntity.promedio;
            } else {
                this.showPromedio = false;
            }
        }, () => {
            toastr.error('Error al crear reporte');
        });
    }

    this.limpiarFiltros = function () {
        this.estadoTarea = '';
        this.gridOptionsCategorias['gridApi'].selection.clearSelectedRows();
        this.gridOptionsGrupos['gridApi'].selection.clearSelectedRows();
        this.gridOptionsUsuarios['gridApi'].selection.clearSelectedRows();
        this.gridOptionsTareas['gridApi'].selection.clearSelectedRows();
    }
}


reportesController.$inject = ['$scope', '$http', '$state', 'reportesModel', '$sessionStorage'];

module.exports = reportesController; 