(function() {
    'use strict';
    angular
      .module('app')

      .controller('datatableCtrl', datatableCtrl );
      
      datatableCtrl.$inject = ['$scope', '$window'];

      function datatableCtrl($scope, $window){

        var vm = $scope;

        angular.element(document).ready(function () {
            
          

        });

      }
})();
