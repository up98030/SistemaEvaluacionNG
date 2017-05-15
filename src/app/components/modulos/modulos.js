let app;
angular.module('myApp.modulos', [])
	.controller('modulosCtrl', ['$http','$scope', function ($http,$scope) {
		this.$http = $http;
		app = this;
		this.$scope = $scope;
		this.moduloObj = {
			'nombreModulo': "",
			'descripcionModulo': "",
			'estado': 'ACT'
		};
		this.$scope.eliminarModulo = function(entity){
			entity.estado = 'INA';
			console.log(entity);
			app.$http.post('http://localhost:8080/sistEval/ws/crearModulo/', entity).then(function(data){
				toastr.success('Módulo eliminado');
				app.obtenerModulos();
			},function(error){
				toastr.error('No se pudo eliminar módulo');
			})
		}
		this.gridOptions = {
			enableRowSelection: true,
			enableFullRowSelection: false,
			rowHeader: false,
			enableSelectAll: true,
			rowHeight: 30,
			multiSelect: false,
			columnDefs: [
				{ name: 'idModulo', visible: true, displayName: 'Id', width: 50, },
				{ name: 'nombreModulo', visible: true, displayName: 'Nombre', width: '*', minWidth: 200 },
				{ name: 'descripcionModulo', visible: true, displayName: 'Descripción', width: '*', minWidth: 200 },
				{ name: 'acciones', visible:true, displayName:'Acciones', width:100,
					cellTemplate:'<div class="ui-grid-cell-contents" style="text-align:center;" ng-click="grid.appScope.eliminarModulo(row.entity)"><i class="fa fa-trash" style="color:#cc3333;" aria-hidden="true"></i></div>'
				}
			],
			data: null
		};

		this.crearModulo = function () {
			console.log(this.moduloObj);
			this.$http.post('http://localhost:8080/sistEval/ws/crearModulo/', this.moduloObj).then(function (data) {
				toastr.success('Módulo creado');
				app.moduloObj = {
					'nombreModulo': "",
					'descripcionModulo': "",
					'estado': 'ACT'
				};
			}, function (error) {
				toastr.error('Error al crear módulo');
				app.moduloObj = {
					'nombreModulo': "",
					'descripcionModulo': "",
					'estado': 'ACT'
				};
			});
		}

		this.obtenerModulos = function () {
			console.log(this.moduloObj);
			this.$http.get('http://localhost:8080/sistEval/ws/modulos/').then(function (data) {
				console.log('MODULOS', data);
				app.gridOptions.data = data.data;
			}, function (error) {
				toastr.error('Error al obtener modulos');
			});
		}

		this.obtenerModulos();

	}]);