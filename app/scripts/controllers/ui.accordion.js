(function() {
    'use strict';
    angular
      .module('app')
      .controller('AccordionCtrl', AccordionCtrl);

      AccordionCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function AccordionCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        vm.isopen = false;
        

        vm.$watch('is-open', function (newvalue, oldvalue, scope) {
            vm.$parent.isopen = newvalue;
            alert(newvalue)
        });
        // angular.element(document).ready(function () {
            
        //   alert(vm.secretEnabled)

        // })

      }
      
})();
