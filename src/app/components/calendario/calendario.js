angular.module('myApp.calendario', [])
.controller('calendarioCtrl',['$scope',function($scope){
	this.welcomeText = 'CALENDARIO!';
	this.$scope = $scope;
	$scope.selectedDate = "2016-06-09T10:00:32.404Z";
}]);