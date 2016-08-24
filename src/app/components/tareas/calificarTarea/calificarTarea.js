let app;
function calificarTareaController ($scope,$http,$state,tareasModel,usuarioModel){
	app = this;	
	this.tareasModel = tareasModel;

	this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: true,
    rowHeader: false,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'usuariosEntity.nombreCompleto', width:250, displayName:'Nombre Docente' },
        { name: 'tareasEntity.nombreTarea', width:250, displayName:'Nombre' },
        { name: 'archivo', visible: false },
        { name: 'archivoAdjunto', visible: false },
        { name: 'calificacion', visible: false },
        { name: 'tareasEntity.descripcionTarea',width:300,displayName:'Descripcion Tarea'},
        { name: 'estado', visible: false },
        { name: 'observacionesDocente', visible: false },
        { name: 'fechaEnvio', visible: false },
        { name: 'tareasEntity.fechaFin',width:200, displayName:'Fecha Fin'},
        { name: 'tareasEntity.fechaInicio',width:200, displayName:'Fecha Inicio' },
        { name: 'tareasEntity.idModulo', visible: false },
        { name: 'tareasEntity.idCreadorTarea', visible: false },
        { name: 'idTarea', visible: false },
        { name: 'observaciones',width:300 }
    ],
    data : tareasData,    
    };

    /************************** Cuando selecciona una tarea **************************/
        this.gridOptions.onRegisterApi = function( gridApi ) {
       /*console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){
        		console.log(row.entity);
        		console.log("####### ROW CALIFICAR #######");
        	}));*/
        	console.log(gridApi.selection.on.rowSelectionChanged($scope,function(row){
        	 	console.log("CALIFICAR TAREA ########");
        	 	tareasModel.tarea = row.entity;
        		console.log(tareasModel.tarea);
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



      this.tareasUsuariosVO = {
            //"idUsuario": usuarioModel.datosUsuario.idUsuario,
            "estado":'ENV',
            tareasEntity:{
            	"idCreadorTarea":2
            }
         }
        $http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data){
            console.log("########### TAREAS USUARIO ##############");
            console.log(data.data);
            app.gridOptions.data = data.data;
        });

}


calificarTareaController.$inject = ['$scope','$http','$state','tareasModel','usuarioModel'];

module.exports = calificarTareaController; 