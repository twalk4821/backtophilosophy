var safe = angular.module('saferize', []);


safe
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
.controller('appCtrl', function(wiki, $http) {
	this.path = [];
	this.found = false;
	this.title = "Dinosaur";

	this.getPage = function() {
		wiki.getPage(this.title, function (err, data) {
			if (err) {
				this.displayErrorMessage("invalid")
			} else {
				this.getPathForPage()
			}
		}.bind(this))
	}.bind(this)

	this.getPathForPage = function() {
			wiki.getPathForPage(this.title, function(err, data) {
			if (data) {
				this.path = data.path;
				this.found = true;
			} else {
				this.displayErrorMessage("invalid")

			}
		}.bind(this), this.path);
	}.bind(this)

	this.handleSubmit = function() {
		this.path = [];
		this.found = false;
		this.error = false;
		this.getPage()
	}.bind(this);

	this.error = false;
	this.errorMessage = ""
	this.errorMessages = {
		invalid: "The page title you entered did not come back with a valid page. Either you mispelled something, or Wikipedia hasn't added that entry yet!",
		deadend: "We hit a dead end! No more links could be found on the page."
	}
	this.displayErrorMessage = function(type) {
		this.error = true;
		this.errorMessage = this.errorMessages[type];
	}.bind(this)

})