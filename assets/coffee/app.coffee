App = angular.module 'App', ['ui.select', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']

App.config ($interpolateProvider)->
  $interpolateProvider.startSymbol('{$')
  $interpolateProvider.endSymbol('$}')

App.config (uiSelectConfig)->
  uiSelectConfig.theme = 'bootstrap'

App.directive 'uiCollapseInput', ()->
  restrict: 'E'
  replace: on
  scope:
    ngModel: "=ngModel"
  controller: ($scope, $element)->
    $scope.expand = ()->
      $scope.opened = !$scope.opened
      $scope.ngModel = null
  link: (scope, element, attrs)->
  templateUrl: 'tpl/ui-collapse-input.html'
