(function() {
    'use strict';
    angular
      .module('app')
      .controller('RulesCtrl', RulesCtrl);

      RulesCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function RulesCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        vm.query = '';
        $scope.master = false;
        vm.doFilter = function(e){
          $('table').trigger('footable_clear_filter');
          vm.query = e;
          $('table').trigger('footable_filter',{filter: vm.query});
        }

        $scope.defaultValues = {
          "rulename":"European working directive",
          "weighting":1,
          "params":8
        }
        
        $scope.checkAll = function() {
          $scope.master = ! $scope.master;
          console.log($scope.master)
        };

        angular.element(document).ready(function () {
            
         
          $('.info--click').on('click', function(event) {
              event.preventDefault();
              $(this).parent().parent().next('.accordion-row').slideToggle();
          });
           $('.accordion-row ').slideUp();

        })

      }
      
})();
