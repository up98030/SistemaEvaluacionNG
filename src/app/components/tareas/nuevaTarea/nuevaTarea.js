let app;
/*angular.module('myApp.nuevaTarea', [])
.controller('nuevaTareaCtrl',['$scope','$http','tareasModel',function($scope,$http,tareasModel){*/
function nuevaTareaController ($scope,$http,tareasModel,usuarioModel){
	this.welcomeText = 'Welcome to myApp Home!';
    this.tareasModel = tareasModel;
    console.log("$$$$$$$$$$ MODELO");
    console.log(tareasModel.test);
    app = this;
    this.titulo = 'Nueva Tarea';
    this.inputTitulo = " ";
    this.$http = $http;
    this.$scope = $scope;

    this.$scope.nombreGuardar = "Guardar";
    this.nombreTarea = "";
    this.descripcionTarea = "";
    this.fechaFin = new Date();

    this.$scope.numeros = [11,22,33,446,55,6];
    this.$scope.usuariosModulo = [];
    this.$scope.criteriosEvaluacion = [];
    this.$scope.tiposTareas = [];
    this.$scope.usuariosSelected = [];
    this.$scope.criteriosSelected = [];
    this.usuariosSeleccionados = [];
    this.criteriosSeleccionados = [];

    this.archivoAdjunto = null;

    /*********************** SUBIR ARCHIVOS **********************/
   /////obtiene el valor del input file y transforma a base 64
    this.$scope.subirArchivo = function(){

        console.log("ARCHIVO:....");
        var uploaded = document.getElementById("file-input");
        var reader = new FileReader();

        reader.onload = function (){
            var arrayBuffer = this.result,
            array = new Uint8Array(arrayBuffer),
            binaryString = String.fromCharCode.apply(null, array);
            this.archivoAdjunto = binaryString;
            this.guardarTarea();
            console.log(binaryString);
          }
        reader.readAsArrayBuffer(uploaded.files[0]);
    }


    this.$scope.filesChanged = function(files) {
   console.log(files);
/*
    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( ...all right!... ).error( ..damn!... );
*/
};


    /******************** CHECKBOX USUARIOS *******************************/
    this.$scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
        this.usuariosSeleccionados = list;
        tareasModel.usuariosSeleccionados = list;

console.log("########## USUARIOS SELECCIONADOS1 ##########");
            console.log(this.usuariosSeleccionados);
    };
    this.$scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
    };
         
      /******************** CHECKBOX CRITERIOS *******************************/
    this.$scope.toggleCriterios = function (criterio, listCriterio) {
            var idxCriterios = listCriterio.indexOf(criterio);
        if (idxCriterios > -1) {
          listCriterio.splice(idxCriterios, 1);
        }
        else {
          listCriterio.push(criterio);
        }
        this.criteriosSeleccionados = listCriterio;
        tareasModel.criteriosSeleccionados = listCriterio;
         console.log("########## CRITERIOS SELECCIONADOS1 ##########");
            console.log(this.criteriosSeleccionados);
    };
    this.$scope.existsCriterios = function (criterio, listCriterio) {
    return listCriterio.indexOf(criterio) > -1;
    };

   /*********************** CHECKBOX TIPO TAREA  ***************************/
   this.$scope.seleccionarTipoTarea = function(nombreTipoTarea){
        this.tipoTarea = nombreTipoTarea;
   }

    /*********************** CONSULTA USUARIOS MODULO  ***************************/
        this.datosModulo = {'idModulo': 1};
        this.$http.post('http://localhost:8080/sistEval/ws/buscarUsuariosModulo/', this.datosModulo).then(function (data){
            console.log("########### USUARIOS DE MODULO ##############");
            console.log(data.data);

            app.$scope.usuariosModulo = data.data;           
        });

         /*********************** CONSULTA TIPOS TAREAS  ***************************/        
        this.$http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then(function (data){
            app.$scope.tiposTareas = data.data;
            console.log("TIPOSTAREAS");
            console.log(data.data);
        });

        /*********************** CONSULTA CRITERIOS  ***************************/        
        this.$http.get('http://localhost:8080/sistEval/ws/getCriterios/').then(function (data){
            app.$scope.criteriosEvaluacion = data.data;
            console.log("CRITERIOS");
            console.log(data.data);
        });
    

        /************************************ GUARDAR TAREA **********************************/
    this.guardarTarea = function(){
            if(tareasModel.usuariosSeleccionados != undefined){
                var usuariosSeleccionados = tareasModel.usuariosSeleccionados.slice(0);            
                usuariosSeleccionados.forEach(function(e){
                    delete e.$$hashKey;
                    delete e.correoUsuario;
                    delete e.idModulo;
                    delete e.idPerfil;
                    delete e.nombreCompleto;
                    delete e.nombreUsuario;
                    delete e.password;
                    delete e.idCriterio;
                    delete e.nombreCriterio;
                    delete e.valorCriterio;
                    delete e.descripcionCriterio;
                });
            }
            console.log("########## USUARIOS SELECCIONADOS ##########");
            console.log(usuariosSeleccionados);

            let criteriosSeleccionados = "";
            tareasModel.criteriosSeleccionados.forEach(function(e){
                delete e.$$hashKey;
                criteriosSeleccionados = criteriosSeleccionados + e.idCriterio + ","; 

            });

            console.log("########## CRITERIOS SELECCIONADOS ##########");
            criteriosSeleccionados = criteriosSeleccionados.slice(0,-1);
            console.log(criteriosSeleccionados);
        //debugger;
        this.nombreTarea = this.$scope.nombreTarea;
        this.descripcionTarea = this.$scope.descripcionTarea;
        this.fechaFin = this.$scope.fechaFin;
        this.tareaData = {
            'nombreTarea': this.nombreTarea,
            'descripcionTarea': this.descripcionTarea,
            'idModulo' : usuarioModel.datosUsuario.idModulo,
            'tipoTarea': this.$scope.tipoTarea,
            'idCreadorTarea': usuarioModel.datosUsuario.idUsuario,
            'estado':'ACT',
            'criterios':criteriosSeleccionados,
            'fechaInicio': new Date(),
            'fechaFin': new Date(),
            'archivoAdjunto': this.archivoAdjunto, 
            'tareasUsuarios': tareasModel.usuariosSeleccionados
            };
            console.log("OBJETO TAREA #$$#$#$#$#$#$#$$#$#");
            console.log(this.tareaData);

            console.log("ARCHIVO:....");
        var uploaded = document.getElementById("file-input");
        var reader = new FileReader();

        reader.onload = function (){
            var arrayBuffer = this.result,
            array = new Uint8Array(arrayBuffer),
            binaryString = btoa(String.fromCharCode.apply(null, array));
            this.archivoAdjunto = binaryString;

            this.tareaData = {
            'nombreTarea': this.nombreTarea,
            'descripcionTarea': this.descripcionTarea,
            'idModulo' : usuarioModel.datosUsuario.idModulo,
            'tipoTarea': app.$scope.tipoTarea,
            'idCreadorTarea': usuarioModel.datosUsuario.idUsuario,
            'estado':'ACT',
            'criterios':criteriosSeleccionados,
            'fechaInicio': new Date(),
            'fechaFin': new Date(),
            'archivoAdjunto': this.archivoAdjunto, 
            'tareasUsuarios': tareasModel.usuariosSeleccionados
            };
debugger;
                 app.$http.post('http://localhost:8080/sistEval/ws/crearTarea/',this.tareaData).then(function (data){
        console.log("tarea");
        console.log(data);
        alert("Tarea creada correctamente");
    }, function(data){
        console.log("ERROR");
        alert("Error insertando tarea");
    });  
            console.log(binaryString);
          }
        reader.readAsArrayBuffer(uploaded.files[0]);

    };

	this.Mydata = [{name: "ntarea", age: 50},
                     {name: "ntarea", age: 43},
                     {name: "ntarea", age: 27},
                     {name: "ntarea", age: 29},
                     {name: "ntarea", age: 34}];
        this.gridOptions = { 
            data : this.Mydata,
            enableRowSelection : true
        };

        function cambioTitulo(){
           this.titulo = this.inputTitulo;
         alert("asdf");
        }

}/*]


);*/

nuevaTareaController.$inject = ['$scope','$http','tareasModel','usuarioModel'];

module.exports = nuevaTareaController; 