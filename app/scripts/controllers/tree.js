(function() {
    'use strict';
    angular
        .module('app')
        .controller('TreeCtrl', TreeCtrl);

    TreeCtrl.$inject = ['$scope', '$timeout'];

    function TreeCtrl($scope, $timeout) {
        var tree, treedata_avm, treedata_geography, vm = $scope;

        treedata_avm = [{
   "label": "Locations",
   "children": [
      {
         "label": "Dublin-001",
         "children": [
            {
               "label": "Location",
               "children": [
          {
            "label": "Location Details",
            "children": [
              {
                "label": "Map",
              }
                      
                   ]
          },{
            "label": "Employee Details",
            "children": [
              {
                "label": "Barred Employees",
              },
              {
                "label": "Personal Protective Equiptment",
              },
              {
                "label": "Modes of Transport",
              }
                      
                   ]
          },{
            "label": "Contact Details",
            "children": [
              {
                "label": "ssss Details",
              }
                      
                   ]
          }
                  
               ]
            },
            {
               "label": "Posts",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            },
            {
               "label": "Work Patterns",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            }
         ]
      },{
         "label": "Dublin-002",
         "children": [
            {
               "label": "Location",
               "children": [
          {
            "label": "Location Details",
            "children": [
              {
                "label": "Barred Employees",
              }
                      
                   ]
          },{
            "label": "Employee Details",
            "children": [
              {
                "label": "Barred Employees",
              },
              {
                "label": "Personal Protective Equiptment",
              },
              {
                "label": "Modes of Transport",
              }
                      
                   ]
          },{
            "label": "Contact Details",
            "children": [
              {
                "label": "ssss Details",
              }
                      
                   ]
          }
                  
               ]
            },
            {
               "label": "Posts",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            },
            {
               "label": "Work Patterns",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            }
         ]
      },{
         "label": "Dublin-003",
         "children": [
            {
               "label": "Location",
               "children": [
          {
            "label": "Location Details",
            "children": [
              {
                "label": "Barred Employees",
              }
                      
                   ]
          },{
            "label": "Employee Details",
            "children": [
              {
                "label": "Barred Employees",
              },
              {
                "label": "Personal Protective Equiptment",
              },
              {
                "label": "Modes of Transport",
              }
                      
                   ]
          },{
            "label": "Contact Details",
            "children": [
              {
                "label": "ssss Details",
              }
                      
                   ]
          }
                  
               ]
            },
            {
               "label": "Posts",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            },
            {
               "label": "Work Patterns",
               "children": [
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA",
                  "TBA"
               ]
            }
         ]
      }
   ]
}];



        treedata_geography = [{
            label: 'North America',
            children: [{
                label: 'Canada',
                children: ['Toronto', 'Vancouver']
            }, {
                label: 'USA',
                children: ['New York', 'Los Angeles']
            }, {
                label: 'Mexico',
                children: ['Mexico City', 'Guadalajara']
            }]
        }, {
            label: 'South America',
            children: [{
                label: 'Venezuela',
                children: ['Caracas', 'Maracaibo']
            }, {
                label: 'Brazil',
                children: ['Sao Paulo', 'Rio de Janeiro']
            }, {
                label: 'Argentina',
                children: ['Buenos Aires', 'Cordoba']
            }]
        }];

        vm.my_data = treedata_avm;
        vm.try_changing_the_tree_data = try_changing_the_tree_data;

        vm.my_tree_handler = my_tree_handler;
        vm.my_tree = tree = {};
        vm.try_async_load = try_async_load;
        vm.try_adding_a_branch = try_adding_a_branch;

        function try_changing_the_tree_data() {
            if (vm.my_data === treedata_avm) {
                return vm.my_data = treedata_geography;
            } else {
                return vm.my_data = treedata_avm;
            }
        };

        function try_async_load() {
            vm.my_data = [];
            vm.doing_async = true;
            return $timeout(function() {
                if (Math.random() < 0.5) {
                    vm.my_data = treedata_avm;
                } else {
                    vm.my_data = treedata_geography;
                }
                vm.doing_async = false;
                return tree.expand_all();
            }, 1000);
        };

        function my_tree_handler(branch) {
            var _ref;
            vm.output = "You selected: " + branch.label;
            if ((_ref = branch.data) != null ? _ref.description : void 0) {
                return vm.output += '(' + branch.data.description + ')';
            }
        };

        function apple_selected(branch) {
            return vm.output = "APPLE! : " + branch.label;
        };

        function try_adding_a_branch() {
            var b;
            b = tree.get_selected_branch();
            return tree.add_branch(b, {
                label: 'New Branch',
                data: {
                    something: 42,
                    "else": 43
                }
            });
        };
    }
})();