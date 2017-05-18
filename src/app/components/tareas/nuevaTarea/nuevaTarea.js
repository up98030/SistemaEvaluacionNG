let app;
/*angular.module('myApp.nuevaTarea', [])
.controller('nuevaTareaCtrl',['$scope','$http','tareasModel',function($scope,$http,tareasModel){*/
function nuevaTareaController($scope, $http, tareasModel, usuarioModel, ngDialog, FileUploader, $sessionStorage) {
    this.welcomeText = 'Welcome to myApp Home!';
    console.log("$$$$$$$$$$ MODELO");
    console.log(tareasModel.test);
    app = this;
    this.tareasModel = tareasModel;
    this.usuarioModel = usuarioModel;
    this.ngDialog = ngDialog;
    this.titulo = 'Nueva Tarea';
    this.inputTitulo = " ";
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.nombreGuardar = "Guardar";
    this.nombreTarea = "";
    this.descripcionTarea = "";
    this.fechaFin = new Date();
    this.$sessionStorage = $sessionStorage;

    this.$scope.numeros = [11, 22, 33, 446, 55, 6];
    this.$scope.usuariosModulo = [];
    this.tareasModel.usuariosModulo = [];
    this.$scope.criteriosEvaluacion = [];
    this.$scope.tiposTareas = [];
    this.$scope.usuariosSelected = [];
    this.$scope.criteriosSelected = [];
    this.usuariosSeleccionados = [];
    this.criteriosSeleccionados = [];
    console.log("DATOS USUARIO nuevaTareaController");
    console.log(this.usuarioModel.datosUsuario);

    this.archivoAdjunto = null;

    this.$scope.uploader = new FileUploader({
        url: 'http://localhost:8080/sistEval/ws/uploadFile/'
    });

    this.$scope.uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
        console.info('UPLOADER>>>> --- onAfterAddingFile', app.$scope.uploader);
    };
    this.$scope.uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };

    this.uploadSingle = function () {
        this.$scope.uploader.uploadAll();
    }

    this.getBase64 = function (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    this.upload2 = function () {
        let formData = new FormData();
        let file = document.getElementById('fileTest');

        console.log('fileee>> ', file.files[0]);
        let filename = file.files[0].name;
        console.log('Extension ', filename.split('.').pop());

        this.getBase64(file.files[0]);
    }

    this.seleccionarUsuarios = function () {
        console.log(this.ngDialog);
        this.ngDialog.open({
            template: 'app/components/tareas/nuevaTarea/usuariosTareaModal.html',
            className: 'ngdialog-theme-default',
            showClose: false,
            controller: ['$scope', '$http', 'usuarioModel', 'tareasModel', function ($scope, $http, usuarioModel, tareasModel) {
                $scope.usuariosModulo = tareasModel.usuariosModulo;
                this.usuariosSelected = [];
                this.usuariosSeleccionados = [];
                this.test = function () {
                    console.log(usuarioModel);
                    console.log(tareasModel);
                }
                /******************** CHECKBOX USUARIOS *******************************/
                this.toggle = function (item) {
                    console.log("Tooogle>>>>");
                    console.log(item);
                    var idx = this.usuariosSeleccionados.indexOf(item);
                    if (idx > -1) {
                        this.usuariosSeleccionados.splice(idx, 1);
                    }
                    else {
                        this.usuariosSeleccionados.push(item);
                    }

                    console.log("########## USUARIOS SELECCIONADOS1 ##########");
                    console.log(this.usuariosSeleccionados);
                };
                this.exists = function (item) {
                    console.log(">¿<zzzzzzzzzzzzzzz Exists  ");
                    console.log(item);
                    return this.usuariosSeleccionados.indexOf(item) > -1;
                };

                this.acceptModal = function () {
                    tareasModel.usuariosSeleccionados = this.usuariosSeleccionados;
                    ngDialog.close();
                }

                this.cancelModal = function () {
                    this.usuariosSeleccionados = [];
                    ngDialog.close();
                }

            }],
            controllerAs: 'usrsModlCtrl'
        }
        );
    };

    /*********************** SUBIR ARCHIVOS **********************/
    /////obtiene el valor del input file y transforma a base 64
    this.$scope.subirArchivo = function () {

        console.log("ARCHIVO:....");
        var uploaded = document.getElementById("file-input");
        var reader = new FileReader();

        reader.onload = function () {
            var arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer),
                binaryString = String.fromCharCode.apply(null, array);
            this.archivoAdjunto = binaryString;
            this.guardarTarea();
            console.log(binaryString);
        }
        reader.readAsArrayBuffer(uploaded.files[0]);
    }


    this.$scope.filesChanged = function (files) {
        console.log(files);
        /*
            $http.post(uploadUrl, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success( ...all right!... ).error( ..damn!... );
        */
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
    this.$scope.seleccionarTipoTarea = function (nombreTipoTarea) {
        this.tipoTarea = nombreTipoTarea;
    }

    /*********************** CONSULTA USUARIOS MODULO  ***************************/
    this.datosModulo = { 'idModulo': this.$sessionStorage.userData.idModulo };
    this.$http.post('http://localhost:8080/sistEval/ws/buscarUsuariosModulo/', this.datosModulo).then(function (data) {
        console.log("########### USUARIOS DE MODULO ##############");
        console.log(data.data);
        app.tareasModel.usuariosModulo = data.data;
        app.$scope.usuariosModulo = data.data;
    });

    /*********************** CONSULTA TIPOS TAREAS  ***************************/
    this.$http.get('http://localhost:8080/sistEval/ws/getTiposTareas/').then(function (data) {
        app.$scope.tiposTareas = data.data;
        console.log("TIPOSTAREAS");
        console.log(data.data);
    });

    /*********************** CONSULTA CRITERIOS  ***************************/
    this.$http.get('http://localhost:8080/sistEval/ws/getCriterios/').then(function (data) {
        app.$scope.criteriosEvaluacion = data.data;
        console.log("CRITERIOS");
        console.log(data.data);
    });

    function resetFields() {
        app.$scope.nombreTarea = null;
        app.$scope.descripcionTarea = null;
        app.$scope.fechaFin = null;
        app.archivoAdjunto = null;
        app.tareasModel.usuariosSeleccionados = [];
        app.criteriosSeleccionados = [];
        usuariosSeleccionados = [];
        app.$scope.criteriosSelected = [];
    };



    /************************************ GUARDAR TAREA **********************************/
    this.guardarTarea = function (form) {
        if (form.$valid) {
            if (tareasModel.usuariosSeleccionados != undefined && tareasModel.usuariosSeleccionados.length > 0) {
                console.log(tareasModel.usuariosSeleccionados);
                //debugger;
                console.log(app.$scope.tipoTarea);
                if (tareasModel.usuariosSeleccionados != undefined) {
                    var usuariosSeleccionados = tareasModel.usuariosSeleccionados.slice(0);
                    usuariosSeleccionados.forEach(function (e) {
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
                /*  
                  if((app.$scope.tipoTarea.localeCompare("REUNION")) < 0){
                        let criteriosSeleccionados = "";*/
                let criteriosSeleccionados = "";
                if (tareasModel.criteriosSeleccionados === null || tareasModel.criteriosSeleccionados === undefined || tareasModel.criteriosSeleccionados.length < 1) {
                    toastr.error('Seleccione los criterios de evaluación');
                    return;
                }
                tareasModel.criteriosSeleccionados.forEach(function (e) {
                    delete e.$$hashKey;
                    criteriosSeleccionados = criteriosSeleccionados + e.idCriterio + ",";
                    criteriosSeleccionados = criteriosSeleccionados.slice(0, -1);
                });

                let formData = new FormData();
                let file = document.getElementById('fileTest');

                // formData.append('file', file.files[0]);
                console.log('fileee>> ', file.files[0]);
                // let filename = file.files[0].name;
                filename = file.files[0].name.split('.').pop();

                var reader = new FileReader();
                reader.readAsDataURL(file.files[0]);
                reader.onload = function () {
                    let archivoBase64 = reader.result;

                    this.nombreTarea = app.$scope.nombreTarea;
                    this.descripcionTarea = app.$scope.descripcionTarea;
                    this.fechaFin = app.$scope.fechaFin;
                    this.tareaData = {
                        'nombreTarea': this.nombreTarea,
                        'descripcionTarea': this.descripcionTarea,
                        'idModulo': app.$sessionStorage.userData.idModulo,
                        'tipoTarea': 'TAR',
                        'idCreadorTarea': app.$sessionStorage.userData.idUsuario,
                        'estado': 'ACT',
                        'criterios': criteriosSeleccionados,
                        'fechaInicio': new Date(),
                        'fechaFin': this.fechaFin,
                        'archivoAdjunto': archivoBase64,
                        'tareasUsuarios': tareasModel.usuariosSeleccionados,
                        'extensionArchivo':filename,
                        'idPeriodo': app.$sessionStorage.userData.idPeriodo
                    };
                    console.log("OBJETO TAREA #$$#$#$#$#$#$#$$#$#");
                    console.log(this.tareaData);

                    console.log("ARCHIVO:....");
                    let loading_screen = pleaseWait({
                        backgroundColor: '#666666',
                        loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
                    });
                    app.$http.post('http://localhost:8080/sistEval/ws/crearTarea/', this.tareaData).then(function (data) {
                        loading_screen.finish();
                        console.log("tarea");
                        console.log(data);
                        toastr.success('Tarea creada');
                        console.log('UsuariosModulo >>>>>>>', app.tareasModel.usuariosModulo);
                        resetFields();
                        console.log('UsuariosModulo >>>>>>>', app.tareasModel.usuariosModulo);
                    }, function (data) {
                        loading_screen.finish();
                        console.log("ERROR");
                        toastr.error('Error al crear tarea');
                    });

                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                toastr.warning('Seleccione los docentes de la tarea');
            }
        } else {
            toastr.warning('Complete todos los campos');
        }
    };

    this.getBase64 = function (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    this.upload2 = function () {
        this.getBase64(file.files[0]);
    }

    this.Mydata = [{ name: "ntarea", age: 50 },
    { name: "ntarea", age: 43 },
    { name: "ntarea", age: 27 },
    { name: "ntarea", age: 29 },
    { name: "ntarea", age: 34 }];
    this.gridOptions = {
        data: this.Mydata,
        enableRowSelection: true
    };

    function cambioTitulo() {
        this.titulo = this.inputTitulo;
        alert("asdf");
    }

}/*]


);*/

nuevaTareaController.$inject = ['$scope', '$http', 'tareasModel', 'usuarioModel', 'ngDialog', 'FileUploader', '$sessionStorage'];

module.exports = nuevaTareaController; 