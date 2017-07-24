var myApp = angular.module('myApp', []);

myApp
.directive('app', function() {
	return {
		scope: {},
		restrict: 'E',
		controller: 'appCtrl',
		controllerAs: 'app',
		bindToController: true,
		templateUrl: '../templates/app.html'
	}
})
.controller('appCtrl', function() {
	
})