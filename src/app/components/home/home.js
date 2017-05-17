let app;
angular.module('myApp.home', [])
	.controller('homeCtrl', ['$http', '$scope', '$state', 'usuarioModel', '$localStorage', '$sessionStorage', function ($http, $scope, $state, usuarioModel, $localStorage, $sessionStorage) {
		this.welcomeText = 'Welcome to myApp Home!';
		this.test = "asdf";
		app = this;
		this.$http = $http;
		this.$scope = $scope;
		this.$state = $state;
		this.$localStorage = $localStorage;
		this.$sessionStorage = $sessionStorage;
		this.usuario = "";
		this.passwd = "";
		this.usuarioModel = usuarioModel;
		this.usuarioModel.datosUsuario = {};
		// this.usuarioModel.datosUsuario = this.$sessionStorage.userData;
		console.log('LocalStorage >> ', $localStorage);
		console.log('SessionStorage >> ', $sessionStorage);


		//  let  loading_screen = pleaseWait({
		//         // logo: "assets/images/pathgather.png",
		//         backgroundColor: '#666666',
		//         // loadingHtml: "<div class='sk-spinner sk-spinner-wave'><div class='sk-rect1'></div><div class='sk-rect2'></div><div class='sk-rect3'></div><div class='sk-rect4'></div><div class='sk-rect5'></div></div>"
		//         loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
		//         // loadingHtml: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'
		//     });

		this.login = function () {

			let loading_screen = pleaseWait({
				backgroundColor: '#666666',
				loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
			});
			console.log('Loading screen', loading_screen);

			this.usuario = this.$scope.usuario;
			this.passwd = this.$scope.passwd;
			var user = this.usuario + "," + this.passwd;

			var loginData = {
				"nombreUsuario": this.usuario,
				"password": this.passwd
			};

			console.log(user);
			var headers = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			var configs = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			this.$http.post('http://localhost:8080/sistEval/ws/login/', loginData).then(function (data) {
				console.log("usuario");
				var userData = {
					"idUsuario": data.idUsuario,
					"password": this.passwd
				};
				console.log(data);
				delete data.data['password'];
				app.$sessionStorage.userData = data.data;
				console.log(app.$sessionStorage);
				app.usuarioModel.datosUsuario = data.data;


				let periodoActivo = "";
				app.$http.get('http://localhost:8080/sistEval/ws/periodos/').
					success(function (data) {
						console.log("Periodos");
						console.log(data);
						data.filter(function (p) {
							console.log('PP>> ', p);
							if (p.estado === 'ACT') {
								periodoActivo = p;
							}
						});
						console.log('Periodo activo >> ', periodoActivo);
						app.$sessionStorage.userData.idPeriodo = periodoActivo['idPeriodo'];

						

				/******************** RESUMEN DE NOTAS ******************/
				app.$http.post('http://localhost:8080/sistEval/ws/summary/', angular.toJson(app.$sessionStorage.userData)).then(function (data) {
					app.$state.go('principal');
					loading_screen.finish();
					app.$localStorage.userSummary = data.data;
					console.log('RESUMEN>>>', data);
				}, function (error) {
					toastr.error("No se pudo obtener resumen de tareas y notas usuario");
					loading_screen.finish();
				});


					});
			}, function (data) {
				toastr.error("Usuario o contraseña incorrectos");
				loading_screen.finish();
				console.log("ERROR");
			});
		}
	}]);