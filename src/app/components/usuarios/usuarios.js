let app;
angular.module('myApp.usuarios', [])
    .controller('usuariosCtrl',['$http','$scope',function($http,$scope){
        app = this;
        this.$http = $http;
        this.$scope = $scope;
        this.gridOptions = { 
    enableRowSelection: true,
    enableFullRowSelection: true,
    rowHeader: false,
    enableSelectAll: false,
    rowHeight: 35,
    multiSelect:false,
    columnDefs: [ 
        { name: 'idUsuario', visible: true,width:100 },
        { name: 'usernom', visible: true, displayName: 'Nombre Usuario',width:200 },
        { name: 'userpwd', visible: false },
        { name: 'nombres',width:250 },
        { name: 'apellidos', visible: true,width:250 },
        { name: 'userrol',width:200, displayName: 'Rol' }        
    ]    
    }; 

    this.guardarUsuario = function(){
        this.userId = this.$scope.idUsuario;
        this.userNom = this.$scope.usernom;
        this.userPwd = this.$scope.userpwd;
        this.nombres = this.$scope.nombresUsuario;
        this.apellidos = this.$scope.apellidosUsuario;
        this.userRol = this.$scope.userrol;
        this.userData = this.userId + "," + this.userNom + "," + this.userPwd + "," + this.nombres + "," + this.apellidos + "," + this.userRol;
        
        this.$http.post('http://localhost:8080/sistEval/ws/crearUsuario/',this.userData).then(function (data){
        console.log("usuario");
        console.log(data);
    }, function(data){
        console.log("ERROR");
        alert("Error insertando usuario");
    });  

    }

    this.$http.get('http://localhost:8080/sistEval/ws/usuarios/').
        success(function(data) {
            tareasData = data;
            completo = true;
            app.gridOptions.data = data;
            console.log(app.gridOptions.data);
        });


    }]);