function reportesController($scope, $http, $state, reportesModel, $sessionStorage) {
    this.$scope = $scope;
    this.reportesModel = reportesModel;
    this.$http = $http;
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
    this.gridOptionsUsuarios.onRegisterApi =  (gridApi) => {
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
            this.gridOptionsCategorias.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener categorias');
        });
    }
    this.cargarCategorias();

    /************************************* CREAR REPORTE **************************************** */
    this.crearReporte = function(){
        this.gridOptionsCategorias['gridApi'].selection.getSelectedRows();
        this.gridOptionsGrupos['gridApi'].selection.getSelectedRows();
        this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows();
        
        console.log('gridCategorias',this.gridOptionsCategorias['gridApi'].selection.getSelectedRows());
        console.log('this.gridOptionsGrupos',this.gridOptionsGrupos['gridApi'].selection.getSelectedRows());
        console.log('this.gridOptionsUsuarios',this.gridOptionsUsuarios['gridApi'].selection.getSelectedRows());

    }
}


reportesController.$inject = ['$scope', '$http', '$state', 'reportesModel', '$sessionStorage'];

module.exports = reportesController; 