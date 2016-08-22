let app;
function calificarTareaController ($scope,$http,tareasModel,usuarioModel){
	app = this;	

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
    var tareasData = [];

      this.tareasUsuariosVO = {
            //"idUsuario": usuarioModel.datosUsuario.idUsuario,
            "estado":'ENV',
            tareasEntity:{
            	"idCreadorTarea":0
            }
         }
        $http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data){
            console.log("########### TAREAS USUARIO ##############");
            console.log(data.data);
            app.gridOptions.data = data.data;
        });

}


calificarTareaController.$inject = ['$scope','$http','tareasModel','usuarioModel'];

module.exports = calificarTareaController; 