(function() {
    'use strict';
    angular
        .module('app')
        .filter('propsFilter', propsFilter)
        .controller('PayrollCtrl', PayrollCtrl)

    function propsFilter() {
            return filter;
            function filter(items, props) {
                var out = [];

                if (angular.isArray(items)) {
                  items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                      var prop = keys[i];
                      var text = props[prop].toLowerCase();
                      if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                      }
                    }

                    if (itemMatches) {
                      out.push(item);
                    }
                  });
                } else {
                  // Let the output be the input untouched
                  out = items;
                }

                return out;
            };
        }

    PayrollCtrl.$inject = ['$scope', '$localStorage', '$filter', '$location', '$rootScope', '$anchorScroll', '$timeout', '$http', '$window', '$sce'];

    function PayrollCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $http, $window, $sce) {

        var vm = $scope;
        vm.createNewRule = false;
        vm.createNewProfile = false;
        vm.doShowPayroll = false;
        vm.first = false;
        vm.second = false;
        vm.one = false;

        vm.doOne = function(){
          vm.one = true;
        }

        vm.doCreateRule = function() {
            vm.createNewRule = true;
        }

        vm.doFirst = function(){
          vm.first = true;
        }

        vm.doSecond = function(){
          vm.second = true;
        }

        vm.doCreateProfile = function() {
            vm.doShowPayroll = true;
        }

        vm.doCreatePayroll = function(){
          vm.createNewPayroll = true; 
        }


        vm.statuses = [
          { value: '1' },
              { value: '2' },
              { value: '3' },
              { value: '4' },
              { value: '5' },
              { value: '6' },
              { value: '7' },
              { value: '8' },
              { value: '9' },
              { value: '10' },
              { value: '11' },
              { value: '12' },
              { value: '13' },
              { value: '14' },
              { value: '15' },
              { value: '16' },
              { value: '17' },
              { value: '18' },
              { value: '19' },
              { value: '20' },
              { value: '21' },
              { value: '22' },
              { value: '23' },
              { value: '24' },
              { value: '25' },
              { value: '26' },
              { value: '27' },
              { value: '28' },
              { value: '29' },
              { value: '30' },
              { value: '31' }
        ];

        vm.user = {
          name: 'awesome',
          desc: 'Awesome user \ndescription!',
          status: 2,
          agenda: 1,
          remember: false
        }; 

        vm.ppename = 'john'
        vm.ppeperiod = '1'
        vm.ppeoph = '4'
        vm.ppeop = '6'
        vm.ppebh = '8'
        vm.ppewd = '12'
        vm.ppepcode = 'profilecode'

        function showAgenda() {
          var selected = $filter('filter')(vm.agenda, {value: vm.user.agenda});
          return (vm.user.agenda && selected.length) ? selected[0].text : 'Not set';
        };

        vm.agenda = [
          {value: 1, text: 'Employee'},
          {value: 2, text: 'Site'},
          {value: 3, text: 'Higher'}
        ];

        vm.showAgenda = showAgenda;

        // $timeout(function() {

        // }, 1000);

        console.log(vm.createNewRule);

        angular.element(document).ready(function() {

            //alert(vm.isOpen)

        })

        vm.person = {};
          vm.people = [
              { value: '1' },
              { value: '2' },
              { value: '3' },
              { value: '4' },
              { value: '5' },
              { value: '6' },
              { value: '7' },
              { value: '8' },
              { value: '9' },
              { value: '10' },
              { value: '11' },
              { value: '12' },
              { value: '13' },
              { value: '14' },
              { value: '15' },
              { value: '16' },
              { value: '17' },
              { value: '18' },
              { value: '19' },
              { value: '20' },
              { value: '21' },
              { value: '22' },
              { value: '23' },
              { value: '24' },
              { value: '25' },
              { value: '26' },
              { value: '27' },
              { value: '28' },
              { value: '29' },
              { value: '30' },
              { value: '31' }
          ];



    }



})();