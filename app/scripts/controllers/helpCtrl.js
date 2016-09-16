(function() {
    'use strict';
    angular
      .module('app')
      .filter('propsFilter', propsFilter)
      .controller('HelpCtrl', HelpCtrl )

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
      
      HelpCtrl.$inject = ['$scope', '$window', '$http', '$timeout'];

      function HelpCtrl($scope, $window, $http, $timeout){

        var vm = $scope;
          vm.patternResult = true;
          
          
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
            }
          });
          

          angular.element(document).ready(function () {
             getPagedDataAsync();
          });

      }
})();
