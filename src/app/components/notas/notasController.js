let app;
function notasController($scope, $http, $state, tareasModel, usuarioModel, $sessionStorage) {
    app = this;
    this.test = "TESTSS";
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.$sessionStorage = $sessionStorage;
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
        enableFiltering: true,
        enableSelectAll: false,
        rowHeight: 35,
        multiSelect: false,
        columnDefs: [
            { name: 'tareasEntity.nombreTarea', width: 250, displayName: 'Tarea' },
            { name: 'calificacion', visible: true },
            { name: 'FechaEnvio', visible: true },
        ],
        data: null,
    };

    this.cargarReportes = function (loading_screen) {
        console.log('app.$sessionStorage >>>>> ', app.$sessionStorage);
        var estado = null;
        var idUsuario = null;
        var idModulo = null;

        var criterios = {
            "estado": estado,
            "idUsuario": app.usuarioModel.datosUsuario.idUsuario,
            "idModulo": app.usuarioModel.datosUsuario.idModulo
        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data) {
            console.log("########### REPORTE NOTAS ##############");
            console.log(data.data);
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].estado.localeCompare("CLF") == 0) {
                    app.resumenCalificadas++;
                    app.resumenEntregadas++;
                    app.resumenPromedio += data.data[i].calificacion;
                }
                if (data.data[i].estado.localeCompare("ENV") == 0) {
                    app.resumenEntregadas++;
                }
                if (data.data[i].estado.localeCompare("CRE") == 0) {
                    app.resumenNoEntregadas++;
                }

            }
            if (app.resumenCalificadas > 0) {
                app.resumenPromedio = app.resumenPromedio / app.resumenCalificadas;
            }
            loading_screen.finish();
            //app.gridOptions.data = data.data;
        });
    }

    this.cargarNotas = function () {
        var criterios = {
            "estado": "CLF",
            "idUsuario": app.$sessionStorage.userData.idUsuario,
            "idModulo": app.$sessionStorage.userData.idModulo
        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data) {
            console.log("Datos grid notas");
            console.log(data.data);
            app.gridOptions.data = data.data;
            if (data.data.length == 0) {
                app.tieneNotas = false;
            }

        });

    }

    let loading_screen = pleaseWait({
        backgroundColor: '#666666',
        loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
    });
    this.cargarNotasDocentes = function (loading_screen) {
        app.gridOptionsDocentes = {
            rowHeader: false,
            enableFiltering: true,
            enableSelectAll: false,
            rowHeight: 35,
            multiSelect: false,
            columnDefs: [
                { name: 'usuariosEntity.nombreCompleto', width: 250, displayName: 'Docente' },
                { name: 'tareasEntity.nombreTarea', width: 250, displayName: 'Tarea' },
                { name: 'calificacion', visible: true },
                { name: 'FechaEnvio', visible: true },
            ],
            data: null,
        };
        var criterios = {
            "estado": "CLF",
            "idUsuario": null,
            "idModulo": app.usuarioModel.datosUsuario.idModulo
        };

        this.$http.post('http://localhost:8080/sistEval/ws/notasAspiranteParametros/', criterios).then(function (data) {
            console.log("Datos grid notas docentes");
            console.log(data.data);
            app.gridOptionsDocentes.data = data.data;
            loading_screen.finish();
        });
    }

    if ($state.current.name.localeCompare("notasDocentes") == 0) {
        this.cargarNotasDocentes(loading_screen);
    } else {
        this.cargarReportes(loading_screen);
        this.cargarNotas();
    }

}

notasController.$inject = ['$scope', '$http', '$state', 'tareasModel', 'usuarioModel', '$sessionStorage'];

module.exports = notasController; 