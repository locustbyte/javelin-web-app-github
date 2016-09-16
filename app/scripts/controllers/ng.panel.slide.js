(function() {
    'use strict';
    angular
      .module('app')
      .controller('PanelSlideCtrl', PanelSlideCtrl);

      PanelSlideCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function PanelSlideCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        $scope.demo1 = false; // This will be binded using the ps-open attribute
        $scope.demo2 = false; // This will be binded using the ps-open attribute
        $scope.demo3 = false; // This will be binded using the ps-open attribute

        $scope.toggleDemo1 = function(){
            $scope.demo1 = !$scope.demo1
        }
        $scope.toggleDemo2 = function(){
            $scope.demo2 = !$scope.demo2
        }
        $scope.toggleDemo3 = function(){
            $scope.demo3 = !$scope.demo3
        }
        //console.log($scope.isOpen);

        angular.element(document).ready(function () {
            
          //alert(vm.isOpen)

        })
        
      }
      
})();
