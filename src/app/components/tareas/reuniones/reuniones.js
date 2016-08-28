let app;
function reunionesController ($scope,$http,$state,tareasModel,usuarioModel){
	this.Titulo = "Reuniones";
	this.$http = $http;
	app = this;
	 this.currentNavItem = 'page1';


	this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: true,
    rowHeader: false,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'usuariosEntity.nombreCompleto', visible:false, width:250, displayName:'Nombre' },
        { name: 'tareasEntity.nombreTarea', width:250, displayName:'Reunión' },
        { name: 'archivo', visible: false },
        { name: 'archivoAdjunto', visible: false },
        { name: 'calificacion', visible: false },
        { name: 'tareasEntity.descripcionTarea',width:300,displayName:'Asunto'},
        { name: 'estado', visible: false },
        { name: 'observacionesDocente', visible: false },
        { name: 'fechaEnvio', visible: false },
        { name: 'tareasEntity.fechaFin',width:200, displayName:'Fecha Fin', visible:false},
        { name: 'tareasEntity.fechaInicio',width:200, displayName:'Fecha' },
        { name: 'tareasEntity.idModulo', visible: false },
        { name: 'tareasEntity.idCreadorTarea', visible: false },
        { name: 'idTarea', visible: false },
        { name: 'observaciones',width:300,visible:false }
    ],
    data : tareasData,
    
    };
    var tareasData = [];

	  this.tareasUsuariosVO = {
            "idUsuario": usuarioModel.datosUsuario.idUsuario,
            "estado":'CRE',
            "tareasEntity":{
            	"tipoTarea":'REUNION'
            }
         }
        this.$http.post('http://localhost:8080/sistEval/ws/tareas/', this.tareasUsuariosVO).then(function (data){
            console.log("########### REUNIONES USUARIO ##############");
            console.log(data.data);
           app.gridOptions.data = data.data;
        });

}


reunionesController.$inject = ['$scope','$http','$state','tareasModel','usuarioModel'];

module.exports = reunionesController; 