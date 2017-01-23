let app;
function usuariosController ($scope,$http,$state,tareasModel,usuarioModel){
        app = this;
        this.$http = $http;
        this.$scope = $scope;
        this.usuarioModel = usuarioModel;
        console.log("");
        this.$scope.titulo = "asdf";
        this.usuarioEliminar = {};

    this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: false,
    rowHeader: false,
    enableSelectAll: true,
    rowHeight: 30,
    multiSelect:false,
    columnDefs: [ 
        { name: 'idUsuario', visible: true, displayName:'Id',width:50 },
        { name: 'nombreCompleto', visible: true, displayName: 'Nombre Completo',width:200 },
        { name: 'nombreUsuario', visible: false },
        { name: 'correoUsuario',width:250 },
        { name: 'estado', visible: true,width:250 },
        { name: 'idPerfil',width:200, displayName: 'Perfil' },        
        { name: 'idModulo',width:200, displayName: 'Modulo' }        
    ],
    data:null
    }; 

    this.gridOptions.onRegisterApi = function( gridApi ) {
        console.log("Grid API");
        console.log(gridApi);
            // gridApi.grid.modifyRows(app.gridOptions.data);
        //gridApi.selection.selectRow(app.gridOptions.data[0]);
        console.log(gridApi.selection.on.rowSelectionChanged(app.$scope,function(row){        
        console.log(gridApi);    
        console.log("Grid API");
        console.log(row.entity);
        app.usuarioEliminar = row.entity;
        //console.log(app.$scope.gridApi.selection.getSelectedRows());
        //console.log(gridApi);   
            tareasModel.tarea = row.entity;
            //console.log("DATOS USUARIO");
            //console.log(tareasModel.tarea);
            var tarea = row.entity;          
            $scope.test = tarea.nombreTarea;            
           // console.log("NOMBRE USUARIO");
            //console.log(app.nombreTarea);    
            //app.$state.go('tarea');
            //app.$scope.$watch();
            
        }));

    console.log(gridApi.selection.getSelectedRows());
  };

  this.eliminarUsuario = function(){
   // var index = app.$scope.gridOptions.data.indexOf(app.usuarioEliminar);
    console.log(app.usuarioEliminar);
    delete app.usuarioEliminar.$$hashKey;

        this.$http.post('http://localhost:8080/sistEval/ws/crearUsuario/',this.usuarioEliminar).then(function (data){
        console.log("usuario");
        console.log(data);
        toastr.success('Usuario eliminado');
        //app.$scope.gridOptions.data.splice(index, 1);

    }, function(data){
        console.log("ERROR");
        toastr.error('Error eliminando usuario');
    }); 

  }


    this.guardarUsuario = function(){
        this.usuarioData = {
            'nombreUsuario' : this.$scope.nombreUsuario,
            'correoUsuario' : this.$scope.correoUsuario,
            'password' : this.$scope.password,
            'nombreCompleto' : this.$scope.nombresUsuario + " " + this.$scope.apellidosUsuario,
            'idPerfil' : this.$scope.perfilUsuario,
            'estado' : 'ACT',
            'idModulo' : this.$scope.moduloUsuario,
        };
     /*   this.userId = this.$scope.idUsuario;
        this.userNom = this.$scope.nombreUsuario;
        this.userPwd = this.$scope.userpwd;
        this.nombres = this.$scope.nombresUsuario;
        this.apellidos = this.$scope.apellidosUsuario;
        this.userRol = this.$scope.userrol;
        this.userData = this.userId + "," + this.userNom + "," + this.userPwd + "," + this.nombres + "," + this.apellidos + "," + this.userRol;*/
        if(!app.validarCampos()){
            return false;
        }
        this.$http.post('http://localhost:8080/sistEval/ws/crearUsuario/',this.usuarioData).then(function (data){
        console.log("usuario");
        console.log(data);
        toastr.success('Usuario creado');
        app.limpiarCampos();


    }, function(data){
        console.log("ERROR");
        toastr.error('Error insertando usuario');
    });  

    }

    this.validarCampos = function(){
        if(!this.$scope.nombreUsuario || !this.$scope.correoUsuario || !this.$scope.password || !this.$scope.nombresUsuario || !this.$scope.apellidosUsuario || !this.$scope.perfilUsuario || !this.$scope.moduloUsuario){
            toastr.error('Debe llenar todos los campos');    
            return false;
        }else{
            return true;
        }
    }

    this.limpiarCampos = function(){
        this.$scope.nombreUsuario = "";
        this.$scope.correoUsuario = "";
        this.$scope.password = "";
        this.$scope.nombresUsuario = "";
        this.$scope.apellidosUsuario = "";
        this.$scope.perfilUsuario = "";        
        this.$scope.moduloUsuario = "";
        this.$scope.$apply(); 
    }


    this.$http.get('http://localhost:8080/sistEval/ws/usuarios/').
        success(function(data) {
            tareasData = data;
            completo = true;
            app.gridOptions.data = data;
            console.log("grid data usuarios");
            console.log(app.gridOptions.data);
        });


    };


usuariosController.$inject = ['$scope','$http','tareasModel','usuarioModel','$mdDialog'];

module.exports = usuariosController; 