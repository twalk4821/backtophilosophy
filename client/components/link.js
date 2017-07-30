angular.module('saferize')
.directive('linkItem', function() {
	return {
		scope: {
			link: '<'
		},
		restrict: 'E',
		controller: 'linkCtrl',
		controllerAs: 'link',
		bindToController: true,
		templateUrl: '../templates/link.html'
	}
})
.controller('linkCtrl', function() {
	this.formatLink = function(link) {
		let formattedLink = link.slice(6, link.length).split('_').map(function(word) {
			if (word[0] === '(') return "";
			else return word;
		}).join(" ")
		return formattedLink
	}
})