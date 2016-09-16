(function() {
    'use strict';
    angular
      .module('app')
      .controller('XeditableCtrl', XeditableCtrl );
      
      XeditableCtrl.$inject = ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes'];

      function XeditableCtrl($scope, $filter, $http, editableOptions, editableThemes){

        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';
        editableThemes.bs3.inputClass = 'form-control-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        angular.element(document).ready(function () {
            
          $('#myTab li a, #myTabPills li a').click(function (e) {
            e.preventDefault()
          })

        })

         $scope.mytime = new Date();

          $scope.hstep = 1;
          $scope.mstep = 15;

          $scope.options = {
            hstep: [1, 2, 3, 4, 5, 6, 7],
            mstep: [1, 5, 10, 15, 25, 30]
          };

          $scope.ismeridian = true;
          $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
          };

          $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
          };

          $scope.changed = function () {
            //console.log('Time changed to: ' + $scope.mytime);
          };

          $scope.clear = function() {
            $scope.mytime = null;
          };

        var vm = $scope;

        vm.html5 = {
          email: 'email@example.com',
          tel: '123-45-67',
          number: 29,
          range: 10,
          url: 'http://example.com',
          search: 'blabla',
          color: '#6a4415',
          date: null,
          time: '12:30',
          datetime: null,
          month: null,
          week: null
        };

        vm.user = {
        	name: 'awesome',
        	desc: 'Awesome user \ndescription!',
          status: 2,
          agenda: 1,
          remember: false
        }; 

        vm.statuses = [
          {value: 1, text: 'status1'},
          {value: 2, text: 'status2'},
          {value: 3, text: 'status3'}
        ];

        vm.agenda = [
          {value: 1, text: 'male'},
          {value: 2, text: 'female'}
        ];

        vm.showStatus = showStatus;
        vm.showStatus = showStatus;
        vm.checkName = checkName;
        vm.saveUser = saveUser;
        // remove user
        vm.removeUser = removeUser;
        // add user
        vm.addUser = addUser;
        vm.showGroup = showGroup;

        // editable table
        vm.users = [
          {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
          {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
          {id: 3, name: 'awesome user3', status: 2, group: null}
        ];

        // editable table shift component
        vm.shiftDetail = [
          {id: 1, name: 'Persona', status: 2, group: 4, groupName: '324.71'},
          {id: 2, name: 'Change rate', status: undefined, group: 3, groupName: '324.71'},
          {id: 3, name: 'Pay rate', status: 2, group: null, groupName: '324.71'}
        ];

        vm.groups = [];
        vm.loadGroups = loadGroups;
        vm.showAgenda = showAgenda;

        function showStatus() {
          var selected = $filter('filter')(vm.statuses, {value: vm.user.status});
          return (vm.user.status && selected.length) ? selected[0].text : 'Not set';
        };

        function showAgenda() {
          var selected = $filter('filter')(vm.agenda, {value: vm.user.agenda});
          return (vm.user.agenda && selected.length) ? selected[0].text : 'Not set';
        };

        function loadGroups() {
          return vm.groups.length ? null : $http.get('api/groups').success(function(data) {
            vm.groups = data;
          });
        };

        function showGroup(user) {
          if(user.group && vm.groups.length) {
            var selected = $filter('filter')(vm.groups, {id: user.group});
            return selected.length ? selected[0].text : 'Not set';
          } else {
            return user.groupName || 'Not set';
          }
        };

        function showStatus(user) {
          var selected = [];
          if(user && user.status) {
            selected = $filter('filter')(vm.statuses, {value: user.status});
          }
          return selected.length ? selected[0].text : 'Not set';
        }; 

        function checkName(data, id) {
          // if (id === 2 && data !== 'awesome') {
          //   return "Username 2 should be `awesome`";
          // }
        };

        function saveUser(data, id) {
          //vm.user not updated yet
          angular.extend(data, {id: id});
          // return $http.post('api/saveUser', data);
        };

        function removeUser(index) {
          vm.users.splice(index, 1);
        };

        function addUser() {
          vm.inserted = {
            id: vm.users.length+1,
            name: '',
            status: null,
            group: null 
          };
          vm.users.push(vm.inserted);
        };

      }
})();
