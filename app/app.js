var App;

App = angular.module('App', ['ui.select', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']);

App.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{$');
  return $interpolateProvider.endSymbol('$}');
});

App.config(function(uiSelectConfig) {
  return uiSelectConfig.theme = 'bootstrap';
});

App.directive('uiCollapseInput', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: "=ngModel"
    },
    controller: function($scope, $element) {
      return $scope.expand = function() {
        $scope.opened = !$scope.opened;
        return $scope.ngModel = null;
      };
    },
    link: function(scope, element, attrs) {},
    templateUrl: 'tpl/ui-collapse-input.html'
  };
});
