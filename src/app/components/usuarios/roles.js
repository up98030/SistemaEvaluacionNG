angular.module('myApp.roles', [])
    .controller('rolesCtrl',[function($scope){
    	this.$scope = $scope;
        this.aboutText = 'This is the roles component!';      
        this.tabs = [
          { title: 'Administrador', descripcion: "El rol de administrador puede realizar cambios en usuarios y tiene acceso total a la administración del portal", permisos: "lectura,escritura"},
          { title: 'Jefe de Area', descripcion: "El jefe de área puede crear y calificar tareas, además de poder asignar y delegar permisos a los asistentes", permisos: "lectura,escritura"},
          { title: 'Asistente', descripcion: "El asistente puede crear y calificar tareas", permisos: "lectura,escritura"},
          { title: 'Docente', descripcion: "El docente puede ver y enviar tareas", permisos: "lectura,escritura"},        
          { title: 'Añadir', descripcion: "If you set the", permisos: "lectura,escritura"},
          //{ title: 'Administrar', descripcion: "If you set the", permisos: "lectura,escritura"}

        ],
        this.selected = null,
        this.previous = null;
   // this.$scope.tabs = this.tabs;
    this.selectedIndex = 2;
   /* $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });*/  
    }]);