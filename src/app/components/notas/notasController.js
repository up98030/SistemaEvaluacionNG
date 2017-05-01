let app;
function notasController ($scope,$http,$state,tareasModel,usuarioModel){
	app = this;
    this.test = "TESTSS";
	this.$scope = $scope;
	this.$http = $http;
	this.$state = $state;
	this.tareasModel = tareasModel;
    this.observacionesDocente;
    this.usuarioModel = usuarioModel;
	console.log("DATOS USUARIO notas CTRL");
	console.log(this.usuarioModel.datosUsuario);
    this.selectedIndex = 0;
    this.reporteSeleccionado = 'ENV';
    /******** LAS CAJAS PRINCIPALES DE RESUMEN *****/
    this.resumenEntregadas = 0;
    this.resumenCalificadas = 0;
    this.resumenNoEntregadas = 0;
    this.resumenPromedio = 0;

    this.tieneNotas = true;

    this.gridOptions = { 
    rowHeader: false,
    enableFiltering:true,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'tareasEntity.nombreTarea', width:250, displayName:'Tarea' },
        { name: 'calificacion', visible: true },
        { name: 'FechaEnvio', visible: true },
    ],
    data : null,    
    };

    this.cargarReportes = function(){
        var estado = null;
        var idUsuario = null;
        var idModulo = null;            

        var criterios = {
                            "estado": estado,
                            "idUsuario": app.usuarioModel.datosUsuario.idUsuario,
                            "idModulo": app.usuarioModel.datosUsuario.idModulo
                        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data){
            console.log("########### REPORTE NOTAS ##############");
            console.log(data.data);
            for(var i=0; i<data.data.length;i++){
                if(data.data[i].estado.localeCompare("CLF") == 0){
                   app.resumenCalificadas ++; 
                   app.resumenEntregadas ++;
                   app.resumenPromedio += data.data[i].calificacion;
                }
                if(data.data[i].estado.localeCompare("ENV") == 0){
                   app.resumenEntregadas ++; 
                }
                if(data.data[i].estado.localeCompare("CRE") == 0){
                   app.resumenNoEntregadas ++; 
                }
                
            }
            if(app.resumenCalificadas > 0){
                app.resumenPromedio = app.resumenPromedio/app.resumenCalificadas;                
            }
            //app.gridOptions.data = data.data;
        });                    
    }

    this.cargarNotas = function(){
        var criterios = {
                            "estado": "CLF",
                            "idUsuario": app.usuarioModel.datosUsuario.idUsuario,
                            "idModulo": null
                        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data){
            console.log("Datos grid notas");
            console.log(data.data);
            app.gridOptions.data = data.data;
            if(data.data.length == 0){
                app.tieneNotas = false;
            }

            });
               
    }

    this.cargarNotasDocentes = function(){
        app.gridOptionsDocentes = { 
            rowHeader: false,
            enableFiltering:true,
            enableSelectAll: false,
            rowHeight: 35,
            multiSelect:false,
            columnDefs: [ 
            { name: 'usuariosEntity.nombreCompleto', width:250, displayName:'Docente' },
            { name: 'tareasEntity.nombreTarea', width:250, displayName:'Tarea' },
            { name: 'calificacion', visible: true },
            { name: 'FechaEnvio', visible: true },
            ],
            data : null,    
        }; 
         var criterios = {
                            "estado": "CLF",
                            "idUsuario": null,
                            "idModulo": app.usuarioModel.datosUsuario.idModulo
                        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data){
            console.log("Datos grid notas docentes");
            console.log(data.data);
            app.gridOptionsDocentes.data = data.data; 
            });
    }

    if($state.current.name.localeCompare("notasDocentes") == 0){
        this.cargarNotasDocentes();   
    }else{
      this.cargarReportes();
        this.cargarNotas();  
    }    

}

notasController.$inject = ['$scope','$http','$state','tareasModel','usuarioModel'];

module.exports = notasController; 