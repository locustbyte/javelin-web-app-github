(function() {
    'use strict';
    angular
      .module('app')
      .controller('AppCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$localStorage', '$sessionStorage' ,'$state','$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$sce'];

      function AppCtrl($scope, $localStorage, $sessionStorage, $state, $location, $rootScope, $anchorScroll, $timeout, $window, $sce) {

        $scope.aside = {title: 'Notifications', content: 'Hello Aside<br />This is a multiline message!'};
        

        $scope.collapseMenu = function(){
          if ( vm.app.setting.folded == false ) {
            vm.app.setting.folded = true;
            $(".navbar-toggler i").html("&#xe5c8;")
          } else {
            vm.app.setting.folded = false;
            $(".navbar-toggler i").html("&#xe3c7;")
          }
          
        }

        var vm = $scope;
        vm.isIE = isIE();
        vm.isSmart = isSmart();
        // config
        vm.app = {
          name: 'JLS - Javelin Living Styleguide',
          version: '3.0.0',
          // for chart colors
          color: {
            'primary':      '#0cc2aa',
            'accent':       '#a88add',
            'warn':         '#fcc100',
            'info':         '#6887ff',
            'success':      '#6cc788',
            'warning':      '#f77a99',
            'danger':       '#f44455',
            'white':        '#ffffff',
            'light':        '#f1f2f3',
            'dark':         '#2e3e4e',
            'black':        '#2a2b3c'
          },
          setting: {
            theme: {
              primary: 'primary',
              accent: 'accent',
              warn: 'warn'
            },
            folded: false,
            boxed: false,
            container: false,
            themeID: 1,
            bg: '',
            uiEnabled: false
          }


        };



        

        var setting = vm.app.name+'-Setting';
        // save settings to local storage
        if ( angular.isDefined($localStorage[setting]) ) {
          vm.app.setting = $localStorage[setting];
        } else {
          $localStorage[setting] = vm.app.setting;
        }
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
        // watch changes
        $scope.$watch('app.setting', function(){
          $localStorage[setting] = vm.app.setting;

          //This hooks up the code clipboard stuff whenever the page loads
          $scope.$on('$viewContentLoaded', function(){



            $('.makecodengview').each(function(i, obj) {
                $(this).next().text( $(this).html() )
            });
            $('.makecodeview').each(function(i, obj) {
                $(this).next().text( $(this).html() )
            });
            fixPreCodeBlocks();

            $scope.revealCode = function(event){
              console.log($(event))
            }
          });
        }, true);

        getParams('bg') && (vm.app.setting.bg = getParams('bg'));

        vm.setTheme = setTheme;
        setColor();

        function setTheme(theme){
          vm.app.setting.theme = theme.theme;
          setColor();
          if(theme.url){
            $timeout(function() {
              $window.location.href = theme.url;
            }, 100, false);
          }
        };

        function setColor(){
          vm.app.setting.color = {
            primary: getColor(vm.app.setting.theme.primary),
            accent: getColor(vm.app.setting.theme.accent),
            warn: getColor(vm.app.setting.theme.warn)
          };
        };

        function getColor(name){
          return vm.app.color[ name ] ? vm.app.color[ name ] : palette.find(name);
        };

        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
          // goto top
          $location.hash('content');
          $anchorScroll();
          $location.hash('');
          // hide open menu

          //Was causing error TODO
          //$('#aside').modal('hide');
          // $('body').removeClass('modal-open').find('.modal-backdrop').remove();
          // $('.navbar-toggleable-sm').collapse('hide');
        };
        //$sessionStorage.uiEnabled = false
        
        $scope.stopPulse = function(){
          $('.the-pulse').removeClass('animated pulse slowitdownPulse infinite')
        }
        console.log($sessionStorage.uiEnabled)
        $timeout(function () { 
          
          angular.element(document).ready(function () {
          
          if ($state.current.name == 'app.secret' && $sessionStorage.uiEnabled != "seen" ){
            isUIEnabled();
          } 

        })

            
        },1000);
        function isUIEnabled(){
          

                         
          //$scope.isOpen = true;
          $sessionStorage.uiEnabled = 'seen';
          //vm.app.setting.uiEnabled = true;
          $scope.uiEnabledCheck = $sessionStorage.uiEnabled;
          
          setTimeout(function(){
            $scope.uiEnabledCheck = true;
            console.log($scope.uiEnabledCheck)
            
            setTimeout(function(){
              $('.the-pulse').addClass('animated pulse slowitdownPulse infinite')
            },5000);

            
            $('.popover').addClass('animated tada slowitdown').fadeIn('slow');
          },2000);
          
          setTimeout(function(){
            $sessionStorage.uiEnabledCheck = false;
            //$('.nav.uiii-nav').fadeOut('slow',function(){ $(this).removeClass('animated tada slowitdown accent').show();});
            $('.popover').remove()
            //$('.popover').fadeOut('slow',function(){ $(this).addClass('hide').hide();});
            $scope.uiEnabledCheck = $sessionStorage.uiEnabled;
            console.log($sessionStorage.uiEnabled)
          },7000);
            
        }

        vm.goBack = function () {
          $window.history.back();
        };

        function isIE() {
          return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getParams(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        angular.element(document).ready(function () {
            
            vm.app.setting.folded = false;

        })

      }
})();
