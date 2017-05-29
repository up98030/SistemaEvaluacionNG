let app;
function calificarTareaController($scope, $http, $state, tareasModel, usuarioModel) {
    app = this;
    this.tareasModel = tareasModel;
    this.usuarioModel = usuarioModel;
    this.criteriosTarea = [];
    this.tareaEntregada = false;
    this.valorTareaSlider = 0;
    this.totalCalificacionTarea = 0;
    this.observacionesCalificacion = "";
    this.calcularTotalCalificacion = function () {
        console.log(this.tareaEntregada);
        //this.calificacionEntregaTarea();
        this.totalCalificacionTarea = this.valorTareaSlider;
    };

    /********************* CALCULA EL TOTAL CON LA ENTREGA*************************/
    this.calificacionEntregaTarea = function () {
        let valorEntrega = 0;
        if (this.criteriosTarea.indexOf(2) >= 0) {
            valorEntrega = 40;
        }
        if (this.criteriosTarea.indexOf(3) >= 0) {
            valorEntrega = 40;
        }
        if ((this.criteriosTarea.indexOf(2) >= 0) && (this.criteriosTarea.indexOf(3) >= 0)) {
            valorEntrega = 20;
        }

        if (this.tareaEntregada) {
            this.totalCalificacionTarea += valorEntrega;
        } else {
            if (this.totalCalificacionTarea > 0) {
                this.totalCalificacionTarea -= valorEntrega;
            }
        }
    };
    /********************* CALCULA EL VALOR DE LA PONDERACION *************************/
    this.calificacionSliderTarea = function () {

    };

    /********************* CALCULA EL VALOR DE LA FECHA DE ENTREGA *************************/
    this.calificacionFechaTarea = function () {

    }

    this.gridOptions = {
        enableRowSelection: true,
        enableFullRowSelection: true,
        rowHeader: false,
        enableSelectAll: false,
        rowHeight: 35,
        multiSelect: false,
        columnDefs: [
            { name: 'usuariosEntity.nombreCompleto', width: 250, displayName: 'Nombre Docente' },
            { name: 'tareasEntity.nombreTarea', width: 250, displayName: 'Nombre' },
            { name: 'archivo', visible: false },
            { name: 'archivoAdjunto', visible: false },
            { name: 'calificacion', visible: false },
            { name: 'tareasEntity.descripcionTarea', width: 300, displayName: 'Descripcion Tarea' },
            { name: 'estado', visible: false },
            { name: 'observacionesDocente', visible: false },
            { name: 'fechaEnvio', visible: false },
            { name: 'tareasEntity.fechaFin', width: 200, displayName: 'Fecha Fin' },
            { name: 'tareasEntity.fechaInicio', width: 200, displayName: 'Fecha Inicio' },
            { name: 'tareasEntity.idModulo', visible: false },
            { name: 'tareasEntity.idCreadorTarea', visible: false },
            { name: 'idTarea', visible: false },
            { name: 'observaciones', width: 300 }
        ],
        data: tareasData,
    };

    /************************** Cuando selecciona una tarea **************************/
    this.gridOptions.onRegisterApi = function (gridApi) {
        /*console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){
                 console.log(row.entity);
                 console.log("####### ROW CALIFICAR #######");
             }));*/
        console.log(gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            console.log("CALIFICAR TAREA ########");
            tareasModel.tarea = row.entity;
            console.log(tareasModel.tarea);
            /**************** VARIABLES CRITERIOS ************/
            app.habilitarSwitchAsistencia = false;
            app.habilitarCalificacion = false;
            app.habilitarDescargarArchivoEnviado = false;
            /***********************************************/
            /***** SWITCH ENTREGADO ********/
            if (row.entity.tareasEntity.criterios.localeCompare("1") === 0 || row.entity.tareasEntity.criterios.localeCompare("3") === 0) {
                app.habilitarDescargarArchivoEnviado = true;
            }
            /***** CALIFICACION ********/
            if (row.entity.tareasEntity.criterios.localeCompare("3") === 0 || row.entity.tareasEntity.criterios.localeCompare("4") || row.entity.tareasEntity.criterios.localeCompare("6")) {
                app.habilitarCalificacion = true;
            }
            /***** SWITCH ASISTENCIA ********/
            if (row.entity.tareasEntity.criterios.localeCompare("5") === 0 || row.entity.tareasEntity.criterios.localeCompare("6")) {
                app.habilitarSwitchAsistencia = true;
            }
            $state.go('calificarTarea');
        }));

        /* console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){            
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
 
     console.log(gridApi.selection.getSelectedRows());*/
    };

    var tareasData = [];

    this.enviarCalificacion = function () {
        console.log(tareasModel.tarea);
        tareasModel.tarea.calificacion = this.totalCalificacionTarea;
        tareasModel.tarea.estado = 'CLF';
        tareasModel.tarea.FechaEnvio = '2016-01-01';
        tareasModel.tarea.tareasEntity.fechaFin = '2016-01-01';
        tareasModel.tarea.tareasEntity.fechaInicio = '2016-01-01';
        tareasModel.tarea.fechaEnvio = '2016-01-01';
        tareasModel.tarea.observacionCalificacion = this.observacionesCalificacion;
        delete tareasModel.tarea.FechaEnvio;
        delete tareasModel.tarea.ArchivoEnviado;
        tareasModel.tarea.observacionesDocente = tareasModel.tarea.ObservacionesDocente;
        delete tareasModel.tarea.ObservacionesDocente;
        console.log("################# ENVIAR CALIFICACION ##############");
        console.log(tareasModel.tarea);
        $http.post('http://localhost:8080/sistEval/ws/enviarTarea/', tareasModel.tarea).then(function (data) {
            toastr.success('Calificación enviada');
            console.log(data);
            $state.go('tareasEnviadas');

        });

    };

    this.formatDate = function () {
        let fecha = new Date();
        let year = fecha.get
    }

    this.tareasUsuariosVO = {
        //"idUsuario": usuarioModel.datosUsuario.idUsuario,
        "estado": 'ENV',
        tareasEntity: {
            "idCreadorTarea": usuarioModel.datosUsuario.idUsuario
        }
    }
    $http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data) {
        console.log("########### TAREAS USUARIO ##############");
        console.log(data.data);
        app.gridOptions.data = data.data;
        //app.criteriosTarea = data.data[0].tareasEntity.criterios;
        console.log("CRITERIOS");
        console.log(app.criteriosTarea);
        console.log(app.criteriosTarea.length);
    });

}


calificarTareaController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel'];

module.exports = calificarTareaController; 