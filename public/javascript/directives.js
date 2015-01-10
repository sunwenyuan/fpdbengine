"use strict";
var directives = angular.module('app-directives', []);

directives.directive('tabControl', [function(){
	return {
		link: function(scope, element, attrs){
			element.click(function(e){
				e.preventDefault();
				$(element).tab('show');
			});
		},
		restrict: 'A'
	};
}]);