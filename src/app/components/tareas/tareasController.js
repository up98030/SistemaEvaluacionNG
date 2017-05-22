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

    /****************  CARGAR CATEGORÍAS **************** */
    this.obtenerCategorias = function () {
        $http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then(function (data) {
            app.tareasModel.categoriasTareas = data.data;
            console.log('Categorias',app.tareasModel.categoriasTareas);
            // $scope.gridOptionsCriterios.data = data.data;
        }, function (error) {
            toastr.error('Error al obtener categorias');
        });
    }
    this.obtenerCategorias();

    /************************FIN CARGAR CATEGORÍAS********************** */

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
            { name: 'estado', visible: false },
            { name: 'observacionesDocente', visible: false },
            { name: 'fechaEnvio', visible: false },
            { name: 'tareasEntity.fechaFin', width: 200, displayName: 'Fecha Entrega' },
            { name: 'tareasEntity.fechaInicio', width: 200, displayName: 'Fecha Inicio', visible: false },
            { name: 'tareasEntity.idModulo', visible: false },
            { name: 'tareasEntity.idCreadorTarea', visible: false },
            { name: 'idTarea', visible: false },
            { name: 'observaciones', width: 300, visible: false },
            { name: 'observacionCalificacion', width: 300, displayName: 'Observación', visible: true }

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
        this.$http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data) {
            console.log("########### TAREAS USUARIO ##############");
            console.log(data.data);
            let tareasUsuario = data.data;
            for(let i=0;i<app.tareasModel.categoriasTareas.length;i++){
                app.tareasModel.categoriasTareas[i].numeroTareasUsuario = 0;
                for(let j=0;j<tareasUsuario.length;j++){
                    if(tareasUsuario[j].tareasEntity.idTipoTarea === app.tareasModel.categoriasTareas[i].idTiposTareas){
                        app.tareasModel.categoriasTareas[i].numeroTareasUsuario++;
                    }
                }
            }

            console.log('Categorias tareas  contadors',app.tareasModel.categoriasTareas);
            app.gridOptions.data = data.data;
        });
    }

    this.cargarTareas('CRE');

    this.descargarArchivoTarea = function () {
        let headers = {
            'Accept': 'application/octet-stream',
            'Content-Type': 'application/octet-stream',
        };
        this.$http.get('http://localhost:8080/sistEval/ws/tareas/' + tareasModel.tarea.idTarea + '/' + tareasModel.tarea.idUsuario, headers).then(function (data) {
            // app.$scope.tiposTareas = data.data;
            saveAs(data);
            console.log("TIPOSTAREAS");
            console.log(data);
        });
        console.log(tareasModel.tarea);
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

        // formData.append('file', file.files[0]);
        console.log('fileee>> ', file.files[0]);
        // let filename = file.files[0].name;
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
                $state.go('tareas');
            });

        }

    }
    this.cambioTab = function () {
        alert("asdf");
    }

    this.selectedIndex = 0;

}

tareasController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', '$localStorage', '$sessionStorage'];

module.exports = tareasController; 