(function() {
    'use strict';
    angular
        .module('app')
        .controller('UiGridCtrl', UiGridCtrl);
        UiGridCtrl.$inject = ['$scope', 'uiGridConstants'];
        function UiGridCtrl($scope, uiGridConstants) {
          var vm = $scope;
          vm.gridOptionsSimple = {
            rowHeight: 36,
            data: [
              {
                  "name": "Ethel Price",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Claudine Neal",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Beryl Rice",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Wilder Gonzales",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Georgina Schultz",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Carroll Buchanan",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Valarie Atkinson",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Schroeder Mathews",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Lynda Mendoza",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Sarah Massey",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Robles Boyle",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Evans Hickman",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Dawson Barber",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Bruce Strong",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Nellie Whitfield",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Jackson Macias",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Pena Pena",
                  "gender": "male",
                  "company": "Dell"
              },
              {
                  "name": "Lelia Gates",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Letitia Vasquez",
                  "gender": "female",
                  "company": "Dell"
              },
              {
                  "name": "Trevino Moreno",
                  "gender": "male",
                  "company": "Dell"
              }
            ]
          };
          
          vm.gridOptionsComplex = {
            enableFiltering: true,
            showFooter: true,
            rowHeight: 36,
            columnDefs: [
              { name: 'name', aggregationType: uiGridConstants.aggregationTypes.count, width: 150 },
              { name: 'gender', filter: { term: 'male' }, width: 150, enableCellEdit: false, 
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                  if (grid.getCellValue(row,col) === 'male') {
                    return 'blue';
                  } else if (grid.getCellValue(row,col) === 'female') {
                    return 'pink';
                  }
                } 
              },
              { name: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, width: 100 },
              { name: 'company', enableFiltering: false, width: 200 }
            ],
            data: [
              {
                  "name": "Ethel Price",
                  "gender": "female",
                  "company": "Enersol",
                  "age": 25
              },
              {
                  "name": "Claudine Neal",
                  "gender": "female",
                  "company": "Sealoud",
                  "age": 19
              },
              {
                  "name": "Beryl Rice",
                  "gender": "female",
                  "company": "Velity",
                  "age": 44
              },
              {
                  "name": "Wilder Gonzales",
                  "gender": "male",
                  "company": "Geekko",
                  "age": 26
              },
              {
                  "name": "Georgina Schultz",
                  "gender": "female",
                  "company": "Suretech",
                  "age": 53
              },
              {
                  "name": "Carroll Buchanan",
                  "gender": "male",
                  "company": "Ecosys",
                  "age": 64
              },
              {
                  "name": "Valarie Atkinson",
                  "gender": "female",
                  "company": "Hopeli",
                  "age": 35
              },
              {
                  "name": "Schroeder Mathews",
                  "gender": "male",
                  "company": "Polarium",
                  "age": 29
              },
              {
                  "name": "Lynda Mendoza",
                  "gender": "female",
                  "company": "Dogspa",
                  "age": 49
              },
              {
                  "name": "Sarah Massey",
                  "gender": "female",
                  "company": "Bisba",
                  "age": 40
              },
              {
                  "name": "Robles Boyle",
                  "gender": "male",
                  "company": "Comtract",
                  "age": 32
              },
              {
                  "name": "Evans Hickman",
                  "gender": "male",
                  "company": "Parleynet",
                  "age": 38
              },
              {
                  "name": "Dawson Barber",
                  "gender": "male",
                  "company": "Dymi",
                  "age": 21
              },
              {
                  "name": "Bruce Strong",
                  "gender": "male",
                  "company": "Xyqag",
                  "age": 61
              },
              {
                  "name": "Nellie Whitfield",
                  "gender": "female",
                  "company": "Exospace",
                  "age": 54
              },
              {
                  "name": "Jackson Macias",
                  "gender": "male",
                  "company": "Aquamate",
                  "age": 49
              },
              {
                  "name": "Pena Pena",
                  "gender": "male",
                  "company": "Quarx",
                  "age": 25
              },
              {
                  "name": "Lelia Gates",
                  "gender": "female",
                  "company": "Proxsoft",
                  "age": 54
              },
              {
                  "name": "Alfred Oscar",
                  "gender": "male",
                  "company": "Transprop",
                  "age": 34
              },
              {
                  "name": "John Alfred",
                  "gender": "male",
                  "company": "Haymans",
                  "age": 70
              },
              {
                  "name": "Leonie Warren",
                  "gender": "female",
                  "company": "Hilltop",
                  "age": 25
              },
              {
                  "name": "Belinda Gosford",
                  "gender": "female",
                  "company": "Archison",
                  "age": 42
              },
              {
                  "name": "Tracey Misoni",
                  "gender": "female",
                  "company": "Verizona",
                  "age": 34
              },
              {
                  "name": "Trevino Moreno",
                  "gender": "male",
                  "company": "Conjurica",
                  "age": 31
              }
            ]
          };
        }
})();
