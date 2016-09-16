(function() {
    'use strict';
    angular
      .module('app', ['ngAnimate'])
      .controller('NotificationCtrl', NotificationCtrl);

      NotificationCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];
      function NotificationCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $sce){

        var vm = $scope;
        vm.query = '';

        $scope.demo3 = false; // This will be binded using the ps-open attribute

        $scope.toggleDemo3 = function(){
            $scope.demo3 = !$scope.demo3
        }
        
        vm.doFilter = function(e){
          $('table').trigger('footable_clear_filter');
          vm.query = e;
          $('table').trigger('footable_filter',{filter: vm.query});
        }


        angular.element(document).ready(function () {
          $('.row-accordion').hide();  
          $('.info--click').on('click', function(event) {
              event.preventDefault();
              $(this).parent().parent().next('.row-accordion').slideToggle();
          });
        });

      }
      
})();
