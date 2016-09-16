(function() {
    'use strict';
    angular
      .module('app')
      .controller('ListingsCtrl', ListingsCtrl);

      ListingsCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function ListingsCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        vm.query = '';
        
        vm.doFilter = function(e){
          $('table').trigger('footable_clear_filter');
          vm.query = e;
          $('table').trigger('footable_filter',{filter: vm.query});
        }

        angular.element(document).ready(function () {
          $('.table-accordion__row').slideUp();  
          $('.info--click').on('click', function(event) {
              event.preventDefault();
              $(this).parent().parent().next('.accordion-row').slideToggle();
          });
           

        })

      }
      
})();
