(function() {
    'use strict';
    angular
        .module('app')
        .filter('propsFilter', propsFilter)
        .directive('hymn', function() {
           return {
               restrict: 'E',
               link: function(scope, element, attrs) {
                   // some ode
               },
               templateUrl: function(elem,attrs) {
                   return attrs.templateUrl || 'some/path/default.html'
               }
           }
        })
        .controller('uiCatalogueCtrl', uiCatalogueCtrl)

        

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


        uiCatalogueCtrl.$inject = ['$scope', '$http', '$timeout'];
        //FullcalendarCtrl.$inject = ['$scope', '$modal'];
        function uiCatalogueCtrl($scope, $http, $timeout) {

          var vm = $scope;

          $scope.demo1 = false; // This will be binded using the ps-open attribute
          $scope.demo2 = false; // This will be binded using the ps-open attribute
          $scope.demo3 = false; // This will be binded using the ps-open attribute

          $scope.toggleDemo1 = function(){
              $scope.demo1 = !$scope.demo1
          }
          $scope.toggleDemo2 = function(){
              $scope.demo2 = !$scope.demo2
          }
          $scope.toggleDemo3 = function(){
              $scope.demo3 = !$scope.demo3
          }
          vm.patternResult = true;
          vm.resultsIn = false;
          
          
          vm.thePath = undefined;
          vm.fragment = undefined;

          vm.patterns = [];


          function getPagedDataAsync() {
              setTimeout(function () {
                  var data;
                      $http.get('scripts/controllers/patterns.json').success(function (largeLoad) {    
                          vm.patterns = largeLoad;
                          console.log(vm.patterns)
                      });            
                  
              }, 100);
          };


          vm.pattern = {};


          function fixPreCodeBlocks(){
            (function( $ ) {

                $.fn.prettyPre = function( method ) {

                    var defaults = {
                        ignoreExpression: /\s/ // what should be ignored?
                    };

                    var methods = {
                        init: function( options ) {
                            this.each( function() {
                                var context = $.extend( {}, defaults, options );
                                var $obj = $( this );
                                var usingInnerText = true;
                                var text = $obj.get( 0 ).innerText;

                                // some browsers support innerText...some don't...some ONLY work with innerText.
                                if ( typeof text == "undefined" ) {
                                    text = $obj.html();
                                    usingInnerText = false;
                                }

                                // use the first line as a baseline for how many unwanted leading whitespace characters are present
                                var superfluousSpaceCount = 0;
                                var pos = 0;
                                var currentChar = text.substring( 0, 1 );

                                while ( context.ignoreExpression.test( currentChar ) ) {
                                    if(currentChar !== "\n"){
                                        superfluousSpaceCount++;
                                    }else{
                                        superfluousSpaceCount = 0;
                                    }

                                    currentChar = text.substring( ++pos, pos + 1 );
                                }

                                // split
                                var parts = text.split( "\n" );
                                var reformattedText = "";

                                // reconstruct
                                var length = parts.length;
                                for ( var i = 0; i < length; i++ ) {

                                    // remove leading whitespace (represented by an empty string)
                                    if(i === 0 && parts[0]=== ""){
                                        continue;
                                    }

                                    reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
                                }

                                if ( usingInnerText ) {
                                    $obj.get( 0 ).innerText = reformattedText;
                                }
                                else {
                                    $obj.html( reformattedText );
                                }
                            } );
                        }
                    }

                    if ( methods[method] ) {
                        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
                    }
                    else if ( typeof method === "object" || !method ) {
                        return methods.init.apply( this, arguments );
                    }
                    else {
                        $.error( "Method " + method + " does not exist on jQuery.prettyPre." );
                    }
                }
            } )( jQuery );

            $("pre").prettyPre();
          }
          function loadInView(customer){
            vm.thePath = customer.url;
            vm.fragment = "#"+customer.div;
            console.log(vm.thePath)
            setTimeout(function(){ 
              $('.makecodeview').each(function(i, obj) {
                $(this).next().text( $(this).html() )
              });
              fixPreCodeBlocks();
              
            }, 500);
            
          }
          

          vm.$watch('pattern.selected', function (customer) {
            if ( customer != undefined  ) {
              loadInView(customer); 
              vm.resultsIn = true;
            }
          });
          

          angular.element(document).ready(function () {
             getPagedDataAsync();
          });

          

        }

})();
