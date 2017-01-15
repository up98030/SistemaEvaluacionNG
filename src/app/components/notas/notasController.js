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
	console.log("DATOS USUARIO tareasCtrl");
	console.log(this.usuarioModel.datosUsuario);
    this.selectedIndex = 0;
    this.reporteSeleccionado = 'ENV';

    this.selectReporte = function(tipoReporte){
        this.reporteSeleccionado = tipoReporte;
        console.log(this.reporteSeleccionado);
    }

}

notasController.$inject = ['$scope','$http','$state','tareasModel','usuarioModel'];

module.exports = notasController; 