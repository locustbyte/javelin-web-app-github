(function() {
    'use strict';
    angular
        .module('app')
        .filter('propsFilter', propsFilter)
        .controller('EssSchedulingCtrl', EssSchedulingCtrl)
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)

        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];
        function ModalInstanceCtrl($scope, $uibModalInstance, items) {

          var vm = $scope;

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


        EssSchedulingCtrl.$inject = ['$scope', '$http', '$timeout', '$uibModal', '$log'];
        //FullcalendarCtrl.$inject = ['$scope', '$modal'];
        function EssSchedulingCtrl($scope, $http, $timeout, $uibModal, $log) {



          var vm = $scope;
          vm.gpsView = true;
          $timeout(function () {
              vm.gpsView = false;
          }, 500);
          $scope.checked = false; // This will be binded using the ps-open attribute

          $scope.toggle = function(){
              $scope.checked = !$scope.checked
          }
          $scope.toggle2 = function(){
              $scope.checked2 = !$scope.checked2
          }

          vm.creatingTask = false;
          vm.viewSched = false;
          vm.viewIncidentOverview = true;
          vm.disabled = undefined;
          vm.searchEnabled = undefined;
          vm.vtactiontitle = "Task Scheduler Overview"
          vm.viactiontitle = "Incident List Overview"

          vm.myMarkers = [];

          vm.mapOptions = {
            center: new google.maps.LatLng(51.362282, -0.188194),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.addMarker = addMarker;
          vm.setZoomMessage = setZoomMessage;
          vm.openMarkerInfo = openMarkerInfo;
          vm.setMarkerPosition = setMarkerPosition;

          function addMarker($event, $params) {
            vm.myMarkers.push(new google.maps.Marker({
              map: vm.myMap,
              position: $params[0].latLng
            }));
          };

          function setZoomMessage(zoom) {
            vm.zoomMessage = 'You just zoomed to ' + zoom + '!';
          };

          function openMarkerInfo(marker) {
            vm.currentMarker = marker;
            vm.currentMarkerLat = marker.getPosition().lat();
            vm.currentMarkerLng = marker.getPosition().lng();
            vm.myInfoWindow.open(vm.myMap, marker);
          };

          function setMarkerPosition(marker, lat, lng) {
            marker.setPosition(new google.maps.LatLng(lat, lng));
          };

          $scope.items = ['item1', 'item2', 'item3'];

          $scope.animationsEnabled = true;

          $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              size: size,
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

          $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
          };

          $scope.showGpsView = function(){
            $scope.gpsView = true;
          }

          $scope.hideGpsView = function(){
            $scope.gpsView = false;
          }

          // editable table
          vm.users = [
            {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
            {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
            {id: 3, name: 'awesome user3', status: 2, group: null}
          ];
          ////
          vm.rowCollectionBasic = [
              {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
              {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
              {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
          ];

          vm.removeRow = removeRow;

          vm.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
          vm.selectedPredicate = vm.predicates[0];

          var firstnames = ['TSK0123', 'TSK0467', 'TSK0967', 'TSK873'];
          var lastnames = ['Scheduling in progress', 'Task in progress', 'Enroute', 'Complete'];
          var engID = ['Engineer8823', 'Engineer3223', 'Engineer7453', 'Engineer9045'];
          var engName = ['Dave Fisk', 'Paul Hopps', 'Michael Timms', 'Colin Hambleton'];
          var id = 1;

          vm.rowCollection = [];

          for (id; id <= 5; id++) {
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
              var engineername = engName[Math.floor(Math.random() * 3)];
              var engineerid = engID[Math.floor(Math.random() * 3)];
              var balance = Math.floor(Math.random() * 2000);

              return {
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  engineerName: engineername,
                  engineerID: engineerid,
                  balance: balance
              }
          }
          ///

          vm.enable = function() {
              vm.disabled = false;
          };

          vm.disable = function() {
              vm.disabled = true;
          };

          vm.enableSearch = function() {
              vm.searchEnabled = true;
          }

          vm.disableSearch = function() {
              vm.searchEnabled = false;
          }

          vm.clear = function() {
              vm.person.selected = undefined;
              vm.address.selected = undefined;
              vm.country.selected = undefined;

              vm.systemFault.selected = undefined;
              vm.faultType.selected = undefined;
              vm.customer.selected = undefined;
              
          };

          vm.someGroupFn = function (item){
              if (item.name[0] >= 'A' && item.name[0] <= 'M')
                  return 'From A - M';

              if (item.name[0] >= 'N' && item.name[0] <= 'Z')
                  return 'From N - Z';
          };

          vm.personAsync = {selected : "wladimir@email.com"};
          vm.peopleAsync = [];

          

          vm.counter = 0;
          vm.someFunction = function (item, model){
              vm.counter++;
              vm.eventResult = {item: item, model: model};
          };

          vm.removed = function (item, model) {
              vm.lastRemoved = {
                  item: item,
                  model: model
              };
          };

          vm.person = {};
          vm.people = [
              { name: 'Call Point',      email: 'Lorem ipsum alarm',      age: 12, country: 'Alarm' },
              { name: 'Smoke Detector',    email: 'Lorem ipsum alarm',    age: 12, country: 'Alarm' },
              { name: 'Unspecified', email: 'Lorem ipsum fault', age: 21, country: 'Fault' },
              { name: 'Power Failure',    email: 'Lorem ipsum fault',    age: 21, country: 'Fault' },
              { name: 'Heat Detector',  email: 'Lorem ipsum alarm',  age: 30, country: 'Alarm' },
              { name: 'Beam Detector',  email: 'Lorem ipsum alarm',  age: 30, country: 'Alarm' },
              { name: 'Circuit Failure',    email: 'Lorem ipsum fault',    age: 43, country: 'Fault' },
              { name: 'Detector Failure',   email: 'Lorem ipsum fault',   age: 54, country: 'Fault' },
              { name: 'Control Panel Failure',   email: 'Lorem ipsum fault',   age: 15, country: 'Fault' }
          ];

          vm.customers = [
              { name: 'ABC Lighting', custid: '49875567' },
              { name: 'Heathrow Airport', custid: '27657564' },
              { name: 'Access Control Ltd', custid: '32243564' },
              { name: 'CCTV Ltd', custid: '9876544' },
              { name: 'Refridgeration Secure Ltd', custid: '122265' },
              { name: 'Securesafe Storage Ltd', custid: '0122870' }
          ];

          vm.systemFaults = [
              { name: 'Fire Systems', desc: 'Lorem ipsum Fire system description' },
              { name: 'Intruder Systems', desc: 'Lorem ipsum Intruder system description' },
              { name: 'Access Control Systems', desc: 'Access Control system description' },
              { name: 'CCTV Systems', desc: 'Fire CCTV description' },
              { name: 'Refridgeration Systems', desc: 'Refridgeration system description' }
          ];

           vm.siteLocation = [
              { name: 'KWS',      address: 'King william street ijgskj gskdjh ksjdh ksjdhksjdhksjdisugiu hsijhd ksjgdi usgdkjs dkugskjdgkjsdkjd' },
              { name: 'Sutton',      address: 'Sutton hill street' }
          ];

          vm.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

          vm.multipleDemo = {};
          vm.multipleDemo.colors = ['Blue','Red'];
          vm.multipleDemo.selectedPeople = [vm.people[5], vm.people[4]];
          vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[8], vm.people[6]];
          vm.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];


          vm.address = {};
          vm.refreshAddresses = function(address) {
              var params = {address: address, sensor: false};
              return $http.get(
                'http://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
              ).then(function(response) {
                vm.addresses = response.data.results;
              });
          };

          vm.country = {};
          vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
              {name: 'ABC Electronics', code: 'AF'},
              {name: 'Åland Islands', code: 'AX'},
              {name: 'Albania', code: 'AL'},
              {name: 'Algeria', code: 'DZ'},
              {name: 'American Samoa', code: 'AS'},
              {name: 'Andorra', code: 'AD'},
              {name: 'Angola', code: 'AO'},
              {name: 'Anguilla', code: 'AI'},
              {name: 'Antarctica', code: 'AQ'},
              {name: 'Antigua and Barbuda', code: 'AG'},
              {name: 'Argentina', code: 'AR'},
              {name: 'Armenia', code: 'AM'},
              {name: 'Aruba', code: 'AW'},
              {name: 'Australia', code: 'AU'},
              {name: 'Austria', code: 'AT'},
              {name: 'Azerbaijan', code: 'AZ'},
              {name: 'Bahamas', code: 'BS'},
              {name: 'Bahrain', code: 'BH'},
              {name: 'Bangladesh', code: 'BD'},
              {name: 'Barbados', code: 'BB'},
              {name: 'Belarus', code: 'BY'},
              {name: 'Belgium', code: 'BE'},
              {name: 'Belize', code: 'BZ'},
              {name: 'Benin', code: 'BJ'},
              {name: 'Bermuda', code: 'BM'},
              {name: 'Bhutan', code: 'BT'},
              {name: 'Bolivia', code: 'BO'},
              {name: 'Bosnia and Herzegovina', code: 'BA'},
              {name: 'Botswana', code: 'BW'},
              {name: 'Bouvet Island', code: 'BV'},
              {name: 'Brazil', code: 'BR'},
              {name: 'British Indian Ocean Territory', code: 'IO'},
              {name: 'Brunei Darussalam', code: 'BN'},
              {name: 'Bulgaria', code: 'BG'},
              {name: 'Burkina Faso', code: 'BF'},
              {name: 'Burundi', code: 'BI'},
              {name: 'Cambodia', code: 'KH'},
              {name: 'Cameroon', code: 'CM'},
              {name: 'Canada', code: 'CA'},
              {name: 'Cape Verde', code: 'CV'},
              {name: 'Cayman Islands', code: 'KY'},
              {name: 'Central African Republic', code: 'CF'},
              {name: 'Chad', code: 'TD'},
              {name: 'Chile', code: 'CL'},
              {name: 'China', code: 'CN'},
              {name: 'Christmas Island', code: 'CX'},
              {name: 'Cocos (Keeling) Islands', code: 'CC'},
              {name: 'Colombia', code: 'CO'},
              {name: 'Comoros', code: 'KM'},
              {name: 'Congo', code: 'CG'},
              {name: 'Congo, The Democratic Republic of the', code: 'CD'},
              {name: 'Cook Islands', code: 'CK'},
              {name: 'Costa Rica', code: 'CR'},
              {name: 'Cote D\'Ivoire', code: 'CI'},
              {name: 'Croatia', code: 'HR'},
              {name: 'Cuba', code: 'CU'},
              {name: 'Cyprus', code: 'CY'},
              {name: 'Czech Republic', code: 'CZ'},
              {name: 'Denmark', code: 'DK'},
              {name: 'Djibouti', code: 'DJ'},
              {name: 'Dominica', code: 'DM'},
              {name: 'Dominican Republic', code: 'DO'},
              {name: 'Ecuador', code: 'EC'},
              {name: 'Egypt', code: 'EG'},
              {name: 'El Salvador', code: 'SV'},
              {name: 'Equatorial Guinea', code: 'GQ'},
              {name: 'Eritrea', code: 'ER'},
              {name: 'Estonia', code: 'EE'},
              {name: 'Ethiopia', code: 'ET'},
              {name: 'Falkland Islands (Malvinas)', code: 'FK'},
              {name: 'Faroe Islands', code: 'FO'},
              {name: 'Fiji', code: 'FJ'},
              {name: 'Finland', code: 'FI'},
              {name: 'France', code: 'FR'},
              {name: 'French Guiana', code: 'GF'},
              {name: 'French Polynesia', code: 'PF'},
              {name: 'French Southern Territories', code: 'TF'},
              {name: 'Gabon', code: 'GA'},
              {name: 'Gambia', code: 'GM'},
              {name: 'Georgia', code: 'GE'},
              {name: 'Germany', code: 'DE'},
              {name: 'Ghana', code: 'GH'},
              {name: 'Gibraltar', code: 'GI'},
              {name: 'Greece', code: 'GR'},
              {name: 'Greenland', code: 'GL'},
              {name: 'Grenada', code: 'GD'},
              {name: 'Guadeloupe', code: 'GP'},
              {name: 'Guam', code: 'GU'},
              {name: 'Guatemala', code: 'GT'},
              {name: 'Guernsey', code: 'GG'},
              {name: 'Guinea', code: 'GN'},
              {name: 'Guinea-Bissau', code: 'GW'},
              {name: 'Guyana', code: 'GY'},
              {name: 'Haiti', code: 'HT'},
              {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
              {name: 'Holy See (Vatican City State)', code: 'VA'},
              {name: 'Honduras', code: 'HN'},
              {name: 'Hong Kong', code: 'HK'},
              {name: 'Hungary', code: 'HU'},
              {name: 'Iceland', code: 'IS'},
              {name: 'India', code: 'IN'},
              {name: 'Indonesia', code: 'ID'},
              {name: 'Iran, Islamic Republic Of', code: 'IR'},
              {name: 'Iraq', code: 'IQ'},
              {name: 'Ireland', code: 'IE'},
              {name: 'Isle of Man', code: 'IM'},
              {name: 'Israel', code: 'IL'},
              {name: 'Italy', code: 'IT'},
              {name: 'Jamaica', code: 'JM'},
              {name: 'Japan', code: 'JP'},
              {name: 'Jersey', code: 'JE'},
              {name: 'Jordan', code: 'JO'},
              {name: 'Kazakhstan', code: 'KZ'},
              {name: 'Kenya', code: 'KE'},
              {name: 'Kiribati', code: 'KI'},
              {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
              {name: 'Korea, Republic of', code: 'KR'},
              {name: 'Kuwait', code: 'KW'},
              {name: 'Kyrgyzstan', code: 'KG'},
              {name: 'Lao People\'s Democratic Republic', code: 'LA'},
              {name: 'Latvia', code: 'LV'},
              {name: 'Lebanon', code: 'LB'},
              {name: 'Lesotho', code: 'LS'},
              {name: 'Liberia', code: 'LR'},
              {name: 'Libyan Arab Jamahiriya', code: 'LY'},
              {name: 'Liechtenstein', code: 'LI'},
              {name: 'Lithuania', code: 'LT'},
              {name: 'Luxembourg', code: 'LU'},
              {name: 'Macao', code: 'MO'},
              {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
              {name: 'Madagascar', code: 'MG'},
              {name: 'Malawi', code: 'MW'},
              {name: 'Malaysia', code: 'MY'},
              {name: 'Maldives', code: 'MV'},
              {name: 'Mali', code: 'ML'},
              {name: 'Malta', code: 'MT'},
              {name: 'Marshall Islands', code: 'MH'},
              {name: 'Martinique', code: 'MQ'},
              {name: 'Mauritania', code: 'MR'},
              {name: 'Mauritius', code: 'MU'},
              {name: 'Mayotte', code: 'YT'},
              {name: 'Mexico', code: 'MX'},
              {name: 'Micronesia, Federated States of', code: 'FM'},
              {name: 'Moldova, Republic of', code: 'MD'},
              {name: 'Monaco', code: 'MC'},
              {name: 'Mongolia', code: 'MN'},
              {name: 'Montserrat', code: 'MS'},
              {name: 'Morocco', code: 'MA'},
              {name: 'Mozambique', code: 'MZ'},
              {name: 'Myanmar', code: 'MM'},
              {name: 'Namibia', code: 'NA'},
              {name: 'Nauru', code: 'NR'},
              {name: 'Nepal', code: 'NP'},
              {name: 'Netherlands', code: 'NL'},
              {name: 'Netherlands Antilles', code: 'AN'},
              {name: 'New Caledonia', code: 'NC'},
              {name: 'New Zealand', code: 'NZ'},
              {name: 'Nicaragua', code: 'NI'},
              {name: 'Niger', code: 'NE'},
              {name: 'Nigeria', code: 'NG'},
              {name: 'Niue', code: 'NU'},
              {name: 'Norfolk Island', code: 'NF'},
              {name: 'Northern Mariana Islands', code: 'MP'},
              {name: 'Norway', code: 'NO'},
              {name: 'Oman', code: 'OM'},
              {name: 'Pakistan', code: 'PK'},
              {name: 'Palau', code: 'PW'},
              {name: 'Palestinian Territory, Occupied', code: 'PS'},
              {name: 'Panama', code: 'PA'},
              {name: 'Papua New Guinea', code: 'PG'},
              {name: 'Paraguay', code: 'PY'},
              {name: 'Peru', code: 'PE'},
              {name: 'Philippines', code: 'PH'},
              {name: 'Pitcairn', code: 'PN'},
              {name: 'Poland', code: 'PL'},
              {name: 'Portugal', code: 'PT'},
              {name: 'Puerto Rico', code: 'PR'},
              {name: 'Qatar', code: 'QA'},
              {name: 'Reunion', code: 'RE'},
              {name: 'Romania', code: 'RO'},
              {name: 'Russian Federation', code: 'RU'},
              {name: 'Rwanda', code: 'RW'},
              {name: 'Saint Helena', code: 'SH'},
              {name: 'Saint Kitts and Nevis', code: 'KN'},
              {name: 'Saint Lucia', code: 'LC'},
              {name: 'Saint Pierre and Miquelon', code: 'PM'},
              {name: 'Saint Vincent and the Grenadines', code: 'VC'},
              {name: 'Samoa', code: 'WS'},
              {name: 'San Marino', code: 'SM'},
              {name: 'Sao Tome and Principe', code: 'ST'},
              {name: 'Saudi Arabia', code: 'SA'},
              {name: 'Senegal', code: 'SN'},
              {name: 'Serbia and Montenegro', code: 'CS'},
              {name: 'Seychelles', code: 'SC'},
              {name: 'Sierra Leone', code: 'SL'},
              {name: 'Singapore', code: 'SG'},
              {name: 'Slovakia', code: 'SK'},
              {name: 'Slovenia', code: 'SI'},
              {name: 'Solomon Islands', code: 'SB'},
              {name: 'Somalia', code: 'SO'},
              {name: 'South Africa', code: 'ZA'},
              {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
              {name: 'Spain', code: 'ES'},
              {name: 'Sri Lanka', code: 'LK'},
              {name: 'Sudan', code: 'SD'},
              {name: 'Suriname', code: 'SR'},
              {name: 'Svalbard and Jan Mayen', code: 'SJ'},
              {name: 'Swaziland', code: 'SZ'},
              {name: 'Sweden', code: 'SE'},
              {name: 'Switzerland', code: 'CH'},
              {name: 'Syrian Arab Republic', code: 'SY'},
              {name: 'Taiwan, Province of China', code: 'TW'},
              {name: 'Tajikistan', code: 'TJ'},
              {name: 'Tanzania, United Republic of', code: 'TZ'},
              {name: 'Thailand', code: 'TH'},
              {name: 'Timor-Leste', code: 'TL'},
              {name: 'Togo', code: 'TG'},
              {name: 'Tokelau', code: 'TK'},
              {name: 'Tonga', code: 'TO'},
              {name: 'Trinidad and Tobago', code: 'TT'},
              {name: 'Tunisia', code: 'TN'},
              {name: 'Turkey', code: 'TR'},
              {name: 'Turkmenistan', code: 'TM'},
              {name: 'Turks and Caicos Islands', code: 'TC'},
              {name: 'Tuvalu', code: 'TV'},
              {name: 'Uganda', code: 'UG'},
              {name: 'Ukraine', code: 'UA'},
              {name: 'United Arab Emirates', code: 'AE'},
              {name: 'United Kingdom', code: 'GB'},
              {name: 'United States', code: 'US'},
              {name: 'United States Minor Outlying Islands', code: 'UM'},
              {name: 'Uruguay', code: 'UY'},
              {name: 'Uzbekistan', code: 'UZ'},
              {name: 'Vanuatu', code: 'VU'},
              {name: 'Venezuela', code: 'VE'},
              {name: 'Vietnam', code: 'VN'},
              {name: 'Virgin Islands, British', code: 'VG'},
              {name: 'Virgin Islands, U.S.', code: 'VI'},
              {name: 'Wallis and Futuna', code: 'WF'},
              {name: 'Western Sahara', code: 'EH'},
              {name: 'Yemen', code: 'YE'},
              {name: 'Zambia', code: 'ZM'},
              {name: 'Zimbabwe', code: 'ZW'}
          ];

          vm.viewScheduler = function(){
            
            vm.viewSched = true;
            vm.viewIncidentOverview = false;
            vm.vtactiontitle = "Task Scheduler Overview"
            vm.viactiontitle = "Task Scheduler Overview"
            // $("#createIncident").fadeIn( "slow" );
          }

          vm.viewIncidents = function(){
            vm.viewSched = false;
            vm.viewIncidentOverview = true;
            vm.vtactiontitle = "Task Scheduler Overview"
            vm.viactiontitle = "Incidents List Overview"
            // $("#createIncident").fadeIn( "slow" );
          }

          $scope.openInPage = function(){
            vm.creatingTask = true;
            vm.viewSched = false;
            vm.viewIncidentOverview = false;
            vm.vtactiontitle = "Create Incident Report"
            vm.viactiontitle = "Create Incident Report"
            $("#createIncident").fadeIn( "slow" );
          }

          $scope.saveCreateIncident = function(){
            $timeout(function () {
                  vm.creatingTask = false;
                  vm.viewSched = false;
                  vm.viewIncidentOverview = true;
                  vm.vtactiontitle = "Task Scheduler Overview";

                  if ( vm.viewSched == true ) {
                    vm.viactiontitle = "Task Scheduler Overview";  
                  } else {
                    vm.viactiontitle = "Incidents List Overview";  
                  }
                  //vm.viactiontitle = "Incidents List Overview";
                  $scope.open('lg');
              }, 1000);
            
            $("#createIncident").fadeOut( "slow" );
            vm.alerts.push({msg: 'Successfully created report!'});
          }

          $scope.cancelCreateIncident = function(){
              $timeout(function () {
                  vm.creatingTask = false;
                  vm.viewSched = false;
                  vm.viewIncidentOverview = true;
                  vm.vtactiontitle = "Task Scheduler Overview";
                  vm.viactiontitle = "Incidents List Overview";
              }, 1000);
            $("#createIncident").fadeOut( "slow" );
          }

          vm.showIncDetail = function(){
            vm.viewSched = true;
            vm.viewIncidentOverview = false;
            if ( vm.viewSched == true ) {
              vm.viactiontitle = "Incident Reference INC0000412";  
            } else {
              vm.viactiontitle = "Incidents List Overview";  
            }
          }

          angular.element(document).ready(function () {
            
            // $('.openInPage').click(function (e) {
            //   $("#createIncident").fadeIn( "slow" )              
            // })


          });

          vm.alerts = [];

          $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Successfully created report!'});
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };

          

        }

})();
