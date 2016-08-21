let app;
angular.module('myApp.home', [])
.controller('homeCtrl',['$http','$scope','$state','usuarioModel',function($http, $scope,$state,usuarioModel){
	this.welcomeText = 'Welcome to myApp Home!';
	this.test = "asdf";
	app = this;
	this.$http = $http;
	this.$scope = $scope;
	this.$state = $state;
	this.usuario = "";
	this.passwd = "";
	this.usuarioModel= usuarioModel;
	console.log(this.usuarioModel.test);

	this.login = function(){
		this.usuario = this.$scope.usuario ;
	this.passwd = this.$scope.passwd;
		var user = this.usuario + "," + this.passwd;

		var data = {"nombreUsuario":this.usuario, 
					"password":this.passwd};

		console.log(user);
    var headers = {headers: {
                'Content-Type': 'application/json'}};
    var configs = {
            headers: {
                'Content-Type': 'application/json'
            }};
            
    this.$http.post('http://localhost:8080/sistEval/ws/login/',data).then(function (data){
        console.log("usuario");
        console.log(data);
        app.usuarioModel.datosUsuario = data.data;
        app.$state.go('principal');
    }, function(data){
    	console.log("ERROR");
    	alert("Usuario o contraseña incorrectos");
    });  
	}
}]);