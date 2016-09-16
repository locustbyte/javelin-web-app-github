(function() {
    'use strict';
    angular
      .module('app')
      .controller('SecretUICtrl', SecretUICtrl);

      SecretUICtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function SecretUICtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        vm.secretEnabled = true;

        $scope.isOpen = true;

        $timeout(function() {
            $scope.isOpen = true;
        }, 1000);
        
        //console.log($scope.isOpen);

        angular.element(document).ready(function () {
            
          //alert(vm.isOpen)

        })
        $scope.dynamicTooltip = 'Hello, World!';
        $scope.dynamicTooltipText = 'dynamic';
        $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
        $scope.placement = {
          options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
          ],
          selected: 'top'
        };

        // angular.element(document).ready(function () {
            
        //   alert(vm.secretEnabled)

        // })

      }
      
})();
