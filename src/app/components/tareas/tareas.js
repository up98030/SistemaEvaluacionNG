let app;
angular.module('myApp.tareas', [])
.controller('tareasCtrl',['$http','$scope','$state','tareasModel',function($http,$scope,$state,tareasModel){

    this.tareasModel = tareasModel;
	this.welcomeText = 'Welcome to myApp Home!';
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
    $scope.test = null;
    this.nombreTarea = tareasModel.tarea.nombreTarea;
    this.descripcionTarea = tareasModel.tarea.descripcionTarea;
    /****** Detalle Tarea *******/
 /*   this.descripcionTarea = "";
    this.nombreTarea = "s";
    this.fechaFin = "";
    this.fechaInicio = "";
    this.archivoAdjunto = "";
*/
    //this.tareasModel = tareasModel;
    app = this;
    var tareasData = [];
    var completo = false;
    console.log("en tareas.js");
    //console.log(this.tareasModel.test);
    this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: true,
    enableFiltering: true,
    rowHeader: false,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'nombreTarea',width:250,cellFilter: 'nombreTarea:row.entity'},
        { name: 'archivo', visible: false },
        { name: 'archivoAdjunto', visible: false },
        { name: 'calificacion', visible: false },
        { name: 'descripcionTarea',width:300 },
        { name: 'estado', visible: false },
        { name: 'fechaFin',width:200 },
        { name: 'fechaInicio',width:200 },
        { name: 'idModulo', visible: false },
        { name: 'idProfesor', visible: false },
        { name: 'idProfesorCreador', visible: false },
        { name: 'idTarea', visible: false },
        { name: 'observaciones',width:300 }
    ],
    data : tareasData,
    
    };

    this.gridOptions.onRegisterApi = function( gridApi ) {
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){
            console.log(row.entity);
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
    
    this.$http.get('http://localhost:8080/sistEval/ws/tareas/').
        success(function(data) {
            tareasData = data;
            completo = true;
            app.gridOptions.data = data;
            console.log(app.gridOptions.data);
        });
/*
    var user = 'pguerra,password01';
    var passwd = 'password201'
    var data = user;
    var headers = {headers: {
                'Content-Type': 'application/json'}};
    var configs = {
            headers: {
                'Content-Type': 'application/json'
            }};

    this.$http.post('http://localhost:8080/sistEval/ws/login/',user).then(function (data){
        console.log(data);
    });  
*/

	this.Mydata = [{name: "tarea", age: 50},
                     {name: "tarea", age: 43},
                     {name: "tarea", age: 27},
                     {name: "tarea", age: 29},
                     {name: "tarea", age: 34}];
                     
    this.descargarArchivoTarea = function(){
        alert('asdf');
    }
   
    console.log(tareasData);

    console.log(this.gridOptions);


    
      
}]);