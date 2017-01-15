let app;
function tareasController ($scope,$http,$state,tareasModel,usuarioModel){
	app = this;
    this.test = "TESTSS";
	this.$scope = $scope;
	this.$http = $http;
	this.$state = $state;
	this.tareasModel = tareasModel;
    this.observacionesDocente;
    this.usuarioModel = usuarioModel;
	console.log("DATOS USUARIO tareasCtrl");
	console.log(this.usuarioModel.datosUsuario);

	/************************** Grid de tareas **************************/
	this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: true,
    rowHeader: false,
    enableFiltering:true,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'usuariosEntity.nombreCompleto', width:250, displayName:'Nombre', enableFiltering: false, visible:false},
        { name: 'tareasEntity.nombreTarea', width:250, displayName:'Tarea' },
        { name: 'archivo', visible: false },
        { name: 'archivoAdjunto', visible: false },
        { name: 'calificacion', visible: false },
        { name: 'tareasEntity.descripcionTarea',width:300,displayName:'Descripcion Tarea', visible:false},
        { name: 'estado', visible: false },
        { name: 'observacionesDocente', visible: false },
        { name: 'fechaEnvio', visible: false },
        { name: 'tareasEntity.fechaFin',width:200, displayName:'Fecha Entrega'},
        { name: 'tareasEntity.fechaInicio',width:200, displayName:'Fecha Inicio', visible:false },
        { name: 'tareasEntity.idModulo', visible: false },
        { name: 'tareasEntity.idCreadorTarea', visible: false },
        { name: 'idTarea', visible: false },
        { name: 'observaciones',width:300 }
    ],
    data : tareasData,
    
    };
    var tareasData = [];
    var completo = false;

	/************************** Cuando selecciona una tarea **************************/
        this.gridOptions.onRegisterApi = function( gridApi ) {
            // gridApi.grid.modifyRows(app.gridOptions.data);
        //gridApi.selection.selectRow(app.gridOptions.data[0]);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){            
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
    this.cargarTareas = function(estadoTarea){
        this.tareasUsuariosVO = {
            "idUsuario": usuarioModel.datosUsuario.idUsuario,
            "estado":estadoTarea,
            "tareasEntity":{
                "tipoTarea":'TAREA'
            }
         }
        this.$http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data){
            console.log("########### TAREAS USUARIO ##############");
            console.log(data.data);
            app.gridOptions.data = data.data;
        });
    }
         
    this.cargarTareas('CRE');

    /************************** Envia Tarea **************************/
    this.enviarTarea = function(){
        tareasModel.tarea.estado = 'ENV';
        tareasModel.tarea.observacionesDocente = this.observacionesDocente;
        tareasModel.tarea.tareasEntity.fechaFin = new Date();
        tareasModel.tarea.tareasEntity.fechaInicio = new Date();
        delete tareasModel.tarea.ObservacionesDocente;
        console.log("########## TAREA A ENVIAR ##############================");
        console.log(tareasModel.tarea);

        var uploaded = document.getElementById("file-inputDetalle");
        var reader = new FileReader();

        reader.onload = function (){

            var arrayBuffer = this.result,
            array = new Uint8Array(arrayBuffer),
            binaryString = btoa(String.fromCharCode.apply(null, array));
            this.archivoAdjuntoDetalle = binaryString;
            tareasModel.tarea.archivoAdjunto = this.archivoAdjuntoDetalle;

            app.$http.post('http://localhost:8080/sistEval/ws/enviarTarea/', tareasModel.tarea).then(function (data){
            console.log("########### TAREAS USUARIO ENVIADA ##############");
            console.log(data.data);
            $state.go('tareas');
            });


        }

        reader.readAsArrayBuffer(uploaded.files[0]);
            

    }
    this.cambioTab = function(){
        alert("asdf");
    }

        this.selectedIndex = 0;

}

tareasController.$inject = ['$scope','$http','$state','tareasModel','usuarioModel'];

module.exports = tareasController; 