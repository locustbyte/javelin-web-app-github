(function() {
    'use strict';
    angular
      .module('app')
      .controller('ModalCtrl', ModalCtrl)
      .controller('ModalInstanceCtrl', ModalInstanceCtrl)

      ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];

   
      function ModalInstanceCtrl($scope, $uibModalInstance, items) {

          var vm = $scope;


          // console.log(ModalInstanceCtrl.type);
          // console.log($uibModalInstance);


            // if($scope.selected == 'newLocation'){
            //   vm.theHeaderPath = "../jlsapp-modules/contracts/template-edit-location-header.html"; 
            //   vm.theContentPath = "../jlsapp-modules/contracts/template-edit-location-content.html"; 
            //   vm.theFooterPath = "../jlsapp-modules/contracts/template-edit-location-footer.html"; 
            // }else if($scope.selected == 'addNewLocation'){
            //   console.log("new loaded")
            //   vm.theHeaderPath = "../jlsapp-modules/contracts/template-add-new-location-header.html"; 
            //   vm.theContentPath = "../jlsapp-modules/contracts/template-add-new-location-content.html"; 
            //   vm.theFooterPath = "../jlsapp-modules/contracts/template-add-new-location-footer.html"; 
            // }
            // console.log("Selected == "+$scope.selected)

          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

        }
        ModalInstanceCtrl.$inject = ['$scope', '$uibModal', '$log'];
      function ModalCtrl($scope, $uibModal, $log){
        $scope.items = ['item1', 'item2', 'item3'];
        var vm = $scope;
        vm.secretEnabled = true;

        $scope.open = function (size) {
        console.log("OPEN WINDOW")
        // console.log(type)

        // $scope.selected = type;
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          // scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          // $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
      }
      
})();




