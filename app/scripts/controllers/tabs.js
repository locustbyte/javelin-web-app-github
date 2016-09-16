(function() {
    'use strict';
    angular
      .module('app')
      .controller('TabsCtrl', TabsCtrl );
      
      TabsCtrl.$inject = ['$scope', '$window'];

      function TabsCtrl($scope, $window){

        angular.element(document).ready(function () {
            
          $('#myTab li a, #myTabPills li a').click(function (e) {
            e.preventDefault()
          })

        });

      }
})();
