function usuarioModel() {
	this.test = "TEST USUARIO MODEL";
  this.datosUsuario = {};
};

module.exports = function() {
	return new usuarioModel();
};