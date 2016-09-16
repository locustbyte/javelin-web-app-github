(function() {
    'use strict';
    angular
        .module('app')
        .factory('contactStorage', ContactStorage)
        .factory('contactGroupStorage', ContactGroupStorage)
        .controller('ContractsCtrl', ContractsCtrl)
        .controller('WorkContractsCtrl', WorkContractsCtrl)
        .controller('TableCtrl', TableCtrl)
        .controller('XeditableCtrl', XeditableCtrl )
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)

        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];
        function ModalInstanceCtrl($scope, $uibModalInstance, items) {

          var vm = $scope;


          console.log(ModalInstanceCtrl.type);
          console.log($uibModalInstance);


            if($scope.selected == 'newLocation'){
              vm.theHeaderPath = "../jlsapp-modules/contracts/template-edit-location-header.html";
              vm.theContentPath = "../jlsapp-modules/contracts/template-edit-location-content.html";
              vm.theFooterPath = "../jlsapp-modules/contracts/template-edit-location-footer.html";
            }else if($scope.selected == 'addNewLocation'){
              console.log("new loaded")
              vm.theHeaderPath = "../jlsapp-modules/contracts/template-add-new-location-header.html";
              vm.theContentPath = "../jlsapp-modules/contracts/template-add-new-location-content.html";
              vm.theFooterPath = "../jlsapp-modules/contracts/template-add-new-location-footer.html";
            }
            console.log("Selected == "+$scope.selected)

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

        TableCtrl.$inject =  ['$scope', '$timeout'];

        ContactStorage.$inject = ['ngStore'];

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


        WorkContractsCtrl.$inject = ['$scope', '$timeout', '$uibModal', '$http', '$log'];
        function WorkContractsCtrl($scope, $timeout, $uibModal, $http){

           $scope.createNew = false;

          $scope.open = function (size, type) {
            console.log("OPEN WINDOW")

            $scope.selected = type;
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              size: size,
              scope: $scope,
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
          $scope.goState = function() {
            // instead of this
            //$state.go("/tab/newpost");
            alert("herer")

            // we should use this
            $state.go("/contracts-addskill");
          };

          angular.element(document).ready(function () {

            $('#myTab li a, #myTabPills li a').click(function (e) {
              e.preventDefault()
            })

            $timeout(function () {
                  $('.nav-tabs').addClass('tabsStyle')
            }, 1000);

            $('.goLocation').click(function (e) {
              $("#wo-start").addClass("hide")
              $("#wo-fourth").removeClass("hide")
            })

            $('.createNewLocation').click(function (e) {
              $('html, body').animate({
                  scrollTop: $("#addLocation").fadeIn( "slow" ).offset().top
              }, 1500);

            })

            $timeout(function () {
                  $(".mandatory-toggle").bootstrapSwitch();
            }, 1000);

          });
        }

        function TableCtrl($scope, $timeout) {
          var vm = $scope;

          vm.rowCollectionBasic = [
              {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
              {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
              {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
          ];

          vm.removeRow = removeRow;

          vm.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
          vm.selectedPredicate = vm.predicates[0];

          var firstnames = ['25402', '25034', '24098', '20098'];
          var lastnames = ['Bodyguard', 'Money Handler', 'Secure Truck Driver', 'Front Stage'];
          var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
          var balance = ['one','one','one','one']
          var id = 1;

          vm.rowCollection = [];



          for (id; id < 5; id++) {
              vm.rowCollection.push(generateRandomItem(id));
          }

          //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
          vm.displayedCollection = [].concat(vm.rowCollection);

          //add to the real data holder
          vm.addRandomItem = addRandomItem;

          //remove to the real data holder
          vm.removeItem = removeItem;

          //  pagination
          vm.itemsByPage=10;

          vm.rowCollectionPage = [];
          for (var j = 0; j < 200; j++) {
            vm.rowCollectionPage.push(generateRandomItem(j));
          }

          // pip
          var promise = null;
          vm.isLoading = false;
          vm.rowCollectionPip = [];
          vm.getPage = getPage;

          vm.callServer = callServer;

          vm.getPage();

          function getPage() {
            vm.rowCollectionPip=[];
            for (var j = 0; j < 20; j++) {
              vm.rowCollectionPip.push(generateRandomItem(j));
            }
          }

          function removeRow(row) {
              var index = vm.rowCollectionBasic.indexOf(row);
              if (index !== -1) {
                  vm.rowCollectionBasic.splice(index, 1);
              }
          };

          function removeItem(row) {
              var index = vm.rowCollection.indexOf(row);
              if (index !== -1) {
                  vm.rowCollection.splice(index, 1);
              }
          }

          function addRandomItem() {
              vm.rowCollection.push(generateRandomItem(id));
              id++;

          }

          function callServer(tableState) {
              //here you could create a query string from tableState
              //fake ajax call
              vm.isLoading = true;

              $timeout(function () {
                  vm.getPage();
                  vm.isLoading = false;
              }, 2000);
          }

          function generateRandomItem(id) {

              var firstname = firstnames[Math.floor(Math.random() * 3)];
              var lastname = lastnames[Math.floor(Math.random() * 3)];
              var birthdate = dates[Math.floor(Math.random() * 3)];
              var balance = Math.floor(Math.random() * 2000);
              var label;

              if (firstname == 25034){
                label = "ATTACHED"
              } else {
                label = "SELECT"
              }

              return {
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  birthDate: new Date(birthdate),
                  balance: balance,
                  label: label



              }
          }

        }
        function ContactStorage(ngStore) {
            return ngStore.model('concact');
        }

        ContactGroupStorage.$inject = ['ngStore'];
        function ContactGroupStorage(ngStore) {
            return ngStore.model('concact-group');
        }

        ContractsCtrl.$inject = ['$scope', '$http', '$filter', 'contactStorage', 'editableOptions', 'editableThemes'];
        function ContractsCtrl($scope, $http, $filter, contactStorage, editableOptions, editableThemes) {

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
          $scope.changeColor = function () {

          $('#headerID').css("background","green");
            console.log("I AM CALLED !!");
          };
          $scope.statusName = 'Draft';

          $scope.changeClass = function ($className, $classStatus, $statName) {
          //$('#headerID').addClass($className).removeClass('box-header');
          $scope.statusName = $statName;
          $('#headerID').css("background",$className);
          $('#code-status').addClass($classStatus).removeClass('grey');
          console.log("I AM CALLED !!" + $scope.statusName);
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

        vm.sites = [
          {siteId: '24002', siteName: 'Braidwood St, London, SE1 2AT, UK', siteBuilding: 'Braidwood Building', siteFloor: 'Braidwood Floor'},
          {siteId: '24004', siteName: 'Wood St, London, WE1 2AT, UK', siteBuilding: 'Wood Building', siteFloor: 'Wood Floor'},
          {siteId: '24005', siteName: 'Broadway St, London, SE1 5MT, UK', siteBuilding: 'Broadway Building', siteFloor: 'Broadway Floor'},
          {siteId: '24006', siteName: 'Frankwood St, London, SL5 2AT, UK', siteBuilding: 'Frankwood Building', siteFloor: 'Frankwood Floor'},
        ];

        vm.myStyle = {};


        vm.selected = { value: vm.sites[0] };

        vm.$watch('selected_site',function(newValue,oldValue){
          if (newValue && newValue!=oldValue){
           vm.siteType = vm.selected_site.siteName;
           console.log(vm.siteType)
          }
        })

        $scope.sortType     = 'siteId'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        $scope.removeItem = function () {
          console.log(vm.siteType)
          vm.sites.pop({
            siteId: '24008',
            siteName: 'DemoName, Location, Postcode',
            siteBuilding: 'Demo Building',
            siteFloor: 'Demo Floor'
          });
        };

        $scope.showstartCard = false;
        $scope.showsecondCard = true;

        $scope.showstartCard2 = false;
        $scope.showsecondCard2 = true;

        $scope.showfixedrateCard = false;
        $scope.showtrainingfocCard = false;
        $scope.showtrainingchgCard = false;
        $scope.showspecialCard = false;

        $scope.showfixedrateCard2 = true;
        $scope.showtrainingfocCard2 = true;
        $scope.showtrainingchgCard2 = true;
        $scope.showspecialCard2 = true;

        $scope.showfixedrateCard3 = function() {
          $scope.showfixedrateCard = true;
          $scope.showtrainingfocCard = false;
          $scope.showtrainingchgCard = false;
          $scope.showspecialCard = false;
          $scope.showstartCard = false;
        };

        $scope.showtrainingfocCard3 = function() {
          $scope.showtrainingfocCard = true;
          $scope.showfixedrateCard = false;
          $scope.showtrainingchgCard = false;
          $scope.showspecialCard = false;
          $scope.showstartCard = false;

        };
        $scope.showtrainingchgCard3 = function() {
          $scope.showtrainingchgCard = true;
          $scope.showtrainingfocCard = false;
          $scope.showfixedrateCard = false;
          $scope.showspecialCard = false;
          $scope.showstartCard = false;

        };
        $scope.showspecialCard3 = function() {
          $scope.showspecialCard = true;
          $scope.showtrainingchgCard = false;
          $scope.showtrainingfocCard = false;
          $scope.showfixedrateCard = false;
          $scope.showstartCard = false;

        };

        $scope.hidefixedrateCard3 = function() {
          $scope.showfixedrateCard = false;

        };

        $scope.hidetrainingfocCard3= function() {
          $scope.showtrainingfocCard = false;

        };
        $scope.hidetrainingchgCard3 = function() {
          $scope.showtrainingchgCard = false;

        };
        $scope.hidespecialCard3 = function() {
          $scope.showspecialCard = false;

        };

        $scope.hideCard = function() {
          $scope.showstartCard = false;
          $scope.showsecondCard = true;
        };

        $scope.hideCard2 = function() {
          $scope.showstartCard2 = false;
          $scope.showsecondCard2 = true;
        }
        $scope.showCard = function() {
          $scope.showstartCard = true;
          $scope.showtrainingfocCard = false;
          $scope.showfixedrateCard = false;
          $scope.showtrainingchgCard = false;
          $scope.showspecialCard = false;
        };

        $scope.showCard2 = function() {
          $scope.showstartCard2 = true;
        };

        $scope.addItem = function () {
          console.log(vm.siteType)
          vm.sites.push({
            siteId: '24008',
            siteName: 'DemoName, Location, Postcode',
            siteBuilding: 'Demo Building',
            siteFloor: 'Demo Floor'
          });
          // Clear input fields after push
          //$scope.selected_site = "";
          //$select.selected.siteName = "";
          console.log(vm.sites)
        };

        $scope.sortPType     = 'productId'; // set the default sort type
        $scope.sortPReverse  = false;  // set the default sort order
        $scope.searchProd   = '';     // set the default

        vm.products = [
          {productId: 'P-10101', productName: 'My Product name is 1', productType: 'I am a product 1', productQuantity: '1', productDetails: 'I am a product Detail 1'},
          {productId: 'P-10102', productName: 'My Product name is 2', productType: 'I am a product 2', productQuantity: '2', productDetails: 'I am a product Detail 2'},
          {productId: 'P-10103', productName: 'My Product name is 3', productType: 'I am a product 3', productQuantity: '3', productDetails: 'I am a product Detail 3'},
          {productId: 'P-10104', productName: 'My Product name is 4', productType: 'I am a product 4', productQuantity: '4', productDetails: 'I am a product Detail 4'},
          {productId: 'P-10105', productName: 'My Product name is 5', productType: 'I am a product 5', productQuantity: '5', productDetails: 'I am a product Detail 5'}
        ];


        $scope.removeProd = function () {
          vm.products.pop({
            productId: 'P-10105',
            productName: 'My Product name is 5',
            productType: 'I am a product 5',
            productQuantity: '5',
            productDetails: 'I am a product Detail 5'
          });
        };

        $scope.addItem = function () {
          console.log(vm.siteType)
          vm.products.push({
            productId: 'P-10106',
            productName: 'My Product name is 6',
            productType: 'I am a product 6',
            productQuantity: '6',
            productDetails: 'I am a product Detail 6'
          });
        };

        $scope.addPurpose = function (id) {


          if(vm.purpose.length < 5){
            vm.purpose.push({
              purpose: "Purpose"+id
            });
          }
          // Clear input fields after push
          //$scope.selected_site = "";
          //$select.selected.siteName = "";
          console.log(vm.purpose)
        };

        $scope.removePurpose = function () {

          vm.purpose.pop({
            purpose: 'PurposeX'
          });
          // Clear input fields after push
          //$scope.selected_site = "";
          //$scope.selected_site.siteName = "";
          console.log(vm.purpose)
        };

        vm.account = {
          name:  'Axure',
          accountNumber:  '123-244-5',
          legacyNo: '888765',
          contractName:  'Axure Guarding Contract 377543',
          manualContManager:  'Jason',
          contractManager:  'Freddy',
          contractType:  'Guarding',
          contractSubType: 'Patrol',
          billToSite: 'Remnarby Estate',
          startDate: '23/05/2014',
          endDate: '23/09/2014',
          reviewDate: '23/07/2014',
          signedDate: '20/04/2014',
          contractValue: 'Protection',
          currencyCode: 'GBP',
          standardPayTerms: '90 Days',
          buyOrSell: 'Buy',
          businessUnit: 'Patrol',
          legalEntity: 'Security',
          organisation: 'Arena Estate Group',
          relationship: 'Client',
          custSigningAuth: 'Star Labs',
          designationAuth: 'Star Labs',
          primaryContact: 'Nathan Mercury',
          wefDate: '23/02/2014',
          authority: 'Hubble CO',
          loiStartDate: '23/04/2014',
          loiEndDate: '23/09/2014',
          description: 'Guards to be posted around the perimeter at all times.'
        };

        vm.user = {
          name: 'awesome',
          desc: 'Awesome user \ndescription!',
          status: 2,
          agenda: 1,
          remember: false
        };

        vm.customer = {
          firstName:  'James',
          middleName:  'Rupert',
          lastName: 'Smith',
          title:  'Mr.',
          taxPayIdNo:  '1234123',
          customerType: 'Person',
          accountCreated: '04/05/2014',
          description: 'Guards to be posted around the perimeter at all times.',
          accountType: 'Internal',
          accountEstablished: '06/03/2014',
          profileClass: '123454321234',
          creditClassification: '12341234',
          creditLimit: '100000',
          accountTerminationDate: '09/04/2014',
          riskCode: 'Protection',
          creditRating: '9873459348',
          effectiveEndDate: '12/30/2030',
          effectiveStartDate: '06/20/2014'
        };

        vm.sitesInformation = {
          locationName: 'A Location Far Far Away',
          longitude: '120.9977',
          latitude: '14.0113',
          siteName: 'Cybergate Site',
          floor: '4th Floor',
          building: 'Cybergate Building',
          addressLine1: 'Bucal',
          addressLine2: 'Calamba, Laguna',
          addressLine3: 'Address Line 3',
          addressLine4: 'Address Line 4',
          city: 'Makati City',
          province: 'Mountain Privince',
          state: 'Mabato',
          postalCode: '2200',
          country: 'Philippines',
          countryCode: '63',
          postalCodeExtension:'00',
          addressEffectiveDate:'03/06/2014',
          addressExpirationDate:'07/12/2018',
          salesTaxGeocode:'0120',
          description:'Only site in the area',
          shortDescription:'Account Site',
          purpose:'To be the only site in the area'
        };



        vm.purposeOptions = [
          {id: '1', purpose: 'Purpose1'},
          {id: '2', purpose: 'Purpose2'},
          {id: '3', purpose: 'Purpose3'},
          {id: '4', purpose: 'Purpose4'}
        ];
        vm.purpose = [
        ];

        vm.statuses = [
          {value: 1, text: 'status1'},
          {value: 2, text: 'status2'},
          {value: 3, text: 'status3'}
        ];

        $scope.countries = [
            {name: 'England'},
            {name: 'Australia'}
          ];

          $scope.selectedCountry = $scope.countries[0];

          $scope.setCountry= function(country)
          {
            $scope.selectedCountry = country;
          }

          $scope.currentYesNo = true;

          $scope.FlipYesNo = function()
          {
            $scope.currentYesNo = !$scope.currentYesNo;

          }

          $scope.currentYesNo1 = true;

          $scope.FlipYesNo1 = function()
          {
            $scope.currentYesNo1 = !$scope.currentYesNo1;

          }

          $scope.id = 1;

          vm.customerPurpose = [
            {id:$scope.id, Primary: "", From: "", To: "", Purpose:""},

          ];

          $scope.addCustomerPurpose = function()
          {
            $scope.id = $scope.id+1;

            vm.customerPurpose.push({
              id:$scope.id,
              Primary: "",
              From: "",
              To: "",
              Purpose: ""
            });

            console.log($scope.id);
          }

          $scope.removeCustomerPurpose = function(removeId)
          {
            console.log(removeId);
            vm.customerPurpose.pop({
              id: removeId
            });
          }

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

          var vm = $scope;
          vm.items = contactStorage.findAll();

          if(vm.items.length == 0){
            populateData();
          }
          selectOne();

          function populateData(){
            $http.get('apps/contact/contacts.json').then(function (resp) {
              vm.items = resp.data.items;
              vm.items.forEach(function (item) {
                  contactStorage.create(item);
              });
              selectOne();
            });
          }

          vm.filter = '';
          vm.groups = [
            {name: 'Coworkers'},
            {name: 'Family'},
            {name: 'Friends'},
            {name: 'Partners'},
            {name: 'Group'}
          ];

          vm.createGroup = createGroup;
          vm.checkItem = checkItem;
          vm.deleteGroup = deleteGroup;
          vm.selectGroup = selectGroup;
          vm.selectItem = selectItem;
          vm.deleteItem = deleteItem;
          vm.createItem = createItem;
          vm.editItem = editItem;
          vm.doneEditing = doneEditing;

          function createGroup(){
            var group = {name: 'New Group'};
            group.name = vm.checkItem(group, vm.groups, 'name');
            vm.groups.push(group);
          };

          function checkItem(obj, arr, key){
            var i=0;
            angular.forEach(arr, function(item) {
              if(item[key].indexOf( obj[key] ) == 0){
                var j = item[key].replace(obj[key], '').trim();
                if(j){
                  i = Math.max(i, parseInt(j)+1);
                }else{
                  i = 1;
                }
              }
            });
            return obj[key] + (i ? ' '+i : '');
          };

          function deleteGroup(item){
            vm.groups.splice(vm.groups.indexOf(item), 1);
          };

          function selectGroup(item){
            angular.forEach(vm.groups, function(item) {
              item.selected = false;
            });
            vm.group = item;
            vm.group.selected = true;
            vm.filter = item.name;
          };

          function selectItem(item){
            angular.forEach(vm.items, function(item) {
              item.selected = false;
              item.editing = false;
            });
            vm.item = item;
            vm.item.selected = true;
          };

          function deleteItem(item){
            vm.items.splice(vm.items.indexOf(item), 1);
            contactStorage.destroy(item);
            selectOne();
          };

          function createItem(){
            var item = {
              id: contactStorage.nextId(),
              group: 'Friends',
              avatar:'../static/img/a0.jpg'
            };
            vm.items.push(item);
            vm.selectItem(item);
            vm.item.editing = true;
            contactStorage.create(item);
          };

          function editItem(item){
            if(item && item.selected){
              item.editing = true;
            }
          };

          function doneEditing(item){
            item.editing = false;
            contactStorage.update(item);
          };

          function selectOne(){
            vm.items.length && selectItem($filter('orderBy')(vm.items, 'first')[0]);
          }

        }
})();
