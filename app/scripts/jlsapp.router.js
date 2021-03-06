(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];
      function config( $stateProvider,   $urlRouterProvider,   MODULE_CONFIG ) {


        $urlRouterProvider.otherwise('/app/dashboard');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: '../views/layout/layout.html',
                controller: "AppCtrl",
                resolve: load(['mgcrea.ngStrap','scripts/jlsapp.ctrl.js'])
              }
            }
          })

          // Dashboard - Default view - Should update
          .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: '../views/dashboard/dashboard.html',
            data : { title: 'Dashboard' },
            controller: "ChartCtrl",
            resolve: load(['scripts/controllers/chart.js'])
          })

          /*
          ////////// SECRET JLS ROUTES //////////
          */
          .state('app.secret', {
            url: '/secret',
            templateUrl: '../views/page/developer-docs.html',
            controller: "SecretUICtrl",
            resolve: load(['scripts/controllers/secret-design.js'])
          })

              // UI Elements Router
              .state('app.ui', {
                url: '/ui',
                template: '<div ui-view></div>'
              })
                  .state('app.ui.search-catalogue', {
                    url: '/search-catalogue',
                    templateUrl: '../views/util/search-catalogue.html',
                    data : { title: 'AngularStrap' },
                    controller: "uiCatalogueCtrl",
                    resolve: load(['mgcrea.ngStrap','ui.select','scripts/controllers/uiCatalogue.js'])
                  })
                  .state('app.ui.box', {
                    url: '/box',
                    templateUrl: '../views/ui/box.html',
                    data : { title: 'Box' }
                  })
                  .state('app.ui.cards', {
                    url: '/cards',
                    templateUrl: '../views/ui/cards.html',
                    data : { title: 'Cards (Panels)' }
                  })
                  .state('app.ui.angularstrap', {
                    url: '/angularstrap',
                    templateUrl: '../views/ui/ng.angularstrap.html',
                    data : { title: 'AngularStrap' },
                    resolve: load(['mgcrea.ngStrap','scripts/controllers/angularstrap.js'])
                  })
                  .state('app.ui.ng-bootstrap', {
                    url: '/ng-bootstrap',
                    templateUrl: '../views/ui/ng.bootstrap.html',
                    data : { title: 'Angular BootStrap UI' },
                    resolve: load('scripts/controllers/ng-bootstrap.js')
                  })
                  .state('app.ui.button', {
                    url: '/button',
                    templateUrl: '../views/ui/button.html',
                    data : { title: 'Buttons' }
                  })
                  .state('app.ui.ngdropdowns', {
                    url: '/ngdropdowns',
                    templateUrl: '../views/ui/ng.dropdown.html',
                    data : { title: 'Dropdown' }
                  })
                  .state('app.ui.ngalerts', {
                    url: '/ngalerts',
                    templateUrl: '../views/ui/ng.alert.html',
                    data : { title: 'Alert' }
                  })
                  .state('app.ui.typography', {
                    url: '/typography',
                    templateUrl: '../views/ui/typography.html',
                    data : { title: 'Typography' }
                  })
                  .state('app.ui.breadcrumbs', {
                    url: '/breadcrumbs',
                    templateUrl: '../views/ui/breadcrumbs.html',
                    data : { title: 'Breadcrumbs' }
                  })
                  .state('app.ui.loader', {
                    url: '/loader',
                    templateUrl: '../views/ui/loader.html',
                    data : { title: 'Loader' }
                  })
                  .state('app.ui.modals', {
                    url: '/modals',
                    templateUrl: '../views/ui/modals.html',
                    data : { title: 'Modals' },
                    controller: 'ModalCtrl',
                    resolve: load('scripts/controllers/modal.js')
                  })
                  .state('app.ui.color', {
                    url: '/color',
                    templateUrl: '../views/ui/color.html',
                    data : { title: 'Colors' }
                  })
                  .state('app.ui.grid', {
                    url: '/grid',
                    templateUrl: '../views/ui/grid.html',
                    data : { title: 'Grids' }
                  })
                  .state('app.ui.icon', {
                    url: '/icons',
                    templateUrl: '../views/ui/icon.html',
                    data : { title: 'Icons' }
                  })
                  .state('app.ui.accordion', {
                    url: '/accordion',
                    templateUrl: '../views/ui/accordion.html',
                    data : { title: 'Accordions' }
                  })
                  .state('app.ui.tabs', {
                    url: '/tabs',
                    templateUrl: '../views/ui/tabs.html',
                    data : { title: 'Tabs' },
                    controller: 'TabsCtrl',
                    resolve: load(['xeditable','scripts/controllers/tabs.js'])
                  })
                  .state('app.ui.toggle-switches', {
                    url: '/toggle-switches',
                    templateUrl: '../views/ui/toggle-switches.html',
                    data : { title: 'Toggle Switches' },
                    controller: 'ToggleSwitchCtrl',
                    resolve: load(['xeditable','scripts/controllers/bootstrap-toggle-switch.js'])
                  })
                  .state('app.ui.navigation', {
                    url: '/navigation',
                    templateUrl: '../views/ui/navigation.html',
                    data : { title: 'Navigation' }
                  })
                  .state('app.ui.ng-panel-slide', {
                    url: '/ng-panel-slide',
                    templateUrl: '../views/ui/ng.panel.slide.html',
                    data : { title: 'Navigation' },
                    controller: 'PanelSlideCtrl',
                    resolve: load('scripts/controllers/ng.panel.slide.js')
                  })


              // form routers
              .state('app.form', {
                url: '/form',
                template: '<div ui-view></div>'
              })
                  .state('app.form.layout', {
                    url: '/layout',
                    templateUrl: '../views/form/form.layout.html',
                    data : { title: 'Layouts' }
                  })
                  .state('app.form.validation', {
                    url: '/validation',
                    templateUrl: '../views/form/form.validation.html',
                    data : { title: 'Validations' }
                  })
                  .state('app.form.element', {
                    url: '/element',
                    templateUrl: '../views/form/form.element.html',
                    data : { title: 'Elements' }
                  })
                  .state('app.form.search', {
                    url: '/search',
                    templateUrl: '../views/form/form.search.html',
                    data : { title: 'Search' },
                    controller: "UiGridCtrl",
                    resolve: load(['ui.grid', 'scripts/controllers/uigrid.js'])
                  })
                  .state('app.form.select', {
                    url: '/select',
                    templateUrl: '../views/form/ng.select.html',
                    data : { title: 'Selects' },
                    controller: 'SelectCtrl',
                    resolve: load(['ui.select','scripts/controllers/select.js'])
                  })
                  .state('app.form.editable', {
                    url: '/editable',
                    templateUrl: '../views/form/form.editable.html',
                    data : { title: 'Editable' },
                    controller: 'XeditableCtrl',
                    resolve: load(['xeditable','scripts/controllers/xeditable.js'])
                  })

            // Tables Routes
            .state('app.table', {
              url: '/table',
              template: '<div ui-view></div>'
            })
                .state('app.table.static', {
                  url: '/static',
                  templateUrl: '../views/table/static.html',
                  data : { title: 'Static' }
                })
                .state('app.table.footable', {
                  url: '/footable',
                  data : { title: 'Footable' },
                  templateUrl: '../views/table/footable.html'
                })
                .state('app.table.footable-accordion', {
                  url: '/footable-accordion',
                  data : { title: 'Footable Accordion' },
                  templateUrl: '../views/table/footable-accordion.html'
                })
                .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: '../views/table/datatable.html',
                  data : { title: 'Data Table' }
                })
                .state('app.table.datatable-accordion', {
                  url: '/datatable-accordion',
                  templateUrl: '../views/table/datatable-accordion.html',
                  data : { title: 'Data Table' },
                  controller: 'datatableCtrl',
                  resolve: load('scripts/controllers/datatable-accordion.js')
                })
                .state('app.table.editable', {
                  url: '/editable',
                  templateUrl: '../views/table/ng.editable.html',
                  data : { title: 'Editable' },
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','scripts/controllers/xeditable.js'])
                })

            // widget router
            .state('app.widget', {
              url: '/widget',
              templateUrl: '../views/widgets/widget.html',
              data : { title: 'Widgets' },
              controller: 'XeditableCtrl',
              resolve: load(['xeditable','scripts/controllers/xeditable.js'])
            })

            // Help Pages Routes
            .state('app.page', {
              url: '/page',
              template: '<div ui-view></div>'
            })

            .state('app.docs', {
              url: '/docs',
              template: '<div ui-view></div>'
            })

                .state('app.docs.developer', {
                  url: '/docs-developer',
                  templateUrl: '../views/page/docs.html',
                  data : { title: 'Documentation' }
                })

                .state('app.docs.designer', {
                  url: '/docs-designer',
                  templateUrl: '../views/page/developer-docs.html',
                  data : { title: 'Developer Documentation' },
                  controller: 'HelpCtrl',
                  resolve: load(['mgcrea.ngStrap','ui.select','scripts/controllers/helpCtrl.js'])
                })





          /*
          ////////// JWA ROUTES //////////
          */
          .state('app.ess', {
            url: '/ess',
            template: '<div ui-view></div>'
          })
              .state('app.ess.view-incidents', {
                url: '/view-incidents',
                templateUrl: '../jlsapp-modules/ess/view-incidents.html',
                data : { title: 'View Incidents' },
                controller: 'EssSchedulingCtrl',
                resolve: load(['ui.map','xeditable','ui.select','smart-table','scripts/controllers/load-google-maps.js','../jlsapp-modules/ess/essCtrl.js'], function(){ return loadGoogleMaps(); })
              })
              .state('app.ess.googlemap', {
                url: '/ess-googlemap',
                templateUrl: '../jlsapp-modules/ess/map.google.html',
                data : { title: 'Gmap', hideFooter: true },
                controller: 'EssSchedulingCtrl',
                //resolve: load(['ui.map', 'scripts/controllers/googlemap.js'], function(){ })
                resolve: load(['ui.map', 'scripts/controllers/load-google-maps.js', '../jlsapp-modules/ess/essCtrl.js'], function(){ return loadGoogleMaps(); })
              })
              // .state('app.ess.task-scheduler', {
              //   url: '/task-scheduler',
              //   templateUrl: '../jlsapp-modules/ess/view-task-scheduler.html',
              //   data : { title: 'Task Scheduler' },
              //   controller: 'EssSchedulingCtrl',
              //   resolve: load(['xeditable','ui.select','smart-table','../jlsapp-modules/ess/essCtrl.js'])
              // })
              .state('app.ess.task-info', {
                url: '/task-info',
                templateUrl: '../jlsapp-modules/ess/task-info.html',
                data : { title: 'Task Info' },
                controller: 'EssSchedulingCtrl',
                resolve: load(['ui.map','xeditable','ui.select','smart-table','scripts/controllers/load-google-maps.js','../jlsapp-modules/ess/essCtrl.js'], function(){ return loadGoogleMaps(); })
              })

          .state('app.jlsapp', {
            url: '/jlsapp',
            template: '<div ui-view></div>'
          })
              .state('app.jlsapp.payroll', {
                url: '/payroll-admin',
                templateUrl: '../jlsapp-modules/payroll/payroll.html',
                data : { title: 'Payroll' },
                controller: 'PayrollCtrl',
                resolve: load(['xeditable','ui.select','../jlsapp-modules/payroll/controller.js'])
              })
              .state('app.jlsapp.createrule', {
                url: '/createrule',
                templateUrl: '../jlsapp-modules/payroll/create-rule.html',
                data : { title: 'Payroll' },
                controller: 'PayrollCtrl',
                resolve: load(['xeditable','ui.select','../jlsapp-modules/payroll/controller.js'])
              })
              .state('app.jlsapp.payprofiles', {
                url: '/payroll-profiles',
                templateUrl: '../jlsapp-modules/payroll/profiles.html',
                data : { title: 'Payroll' },
                controller: 'PayrollCtrl',
                resolve: load(['xeditable','ui.select','../jlsapp-modules/payroll/controller.js',])
              })
              .state('app.jlsapp.payprofiledetail', {
                url: '/payroll-profile-detail',
                templateUrl: '../jlsapp-modules/payroll/profile-detail.html',
                data : { title: 'Payroll' },
                controller: 'PayrollCtrl',
                resolve: load(['xeditable','ui.select','../jlsapp-modules/payroll/controller.js',])
              })
              .state('app.jlsapp.payrules', {
                url: '/payroll-rules',
                templateUrl: '../jlsapp-modules/payroll/rules.html',
                data : { title: 'Payroll' },
                controller: 'PayrollCtrl',
                resolve: load(['xeditable','ui.select','../jlsapp-modules/payroll/controller.js'])
              })


              .state('app.jlsapp.search-results', {
                url: '/search-results',
                templateUrl: '../jlsapp-modules/search-results/search-results.html',
                data : { title: 'Search Results' }
              })
              .state('app.jlsapp.signin', {
                url: '/signin',
                templateUrl: '../jlsapp-modules/auth/login.html'
              })
              .state('app.jlsapp.authfail', {
                url: '/authfail',
                templateUrl: '../jlsapp-modules/auth/login-fail.html'
              })
              .state('app.jlsapp.profile', {
                url: '/profile',
                templateUrl: '../jlsapp-modules/profile/profile.html',
                data : { title: 'Profile' }
              })

              // Contracts
              .state('app.jlsapp.contracts-dashboard', {
                url: '/contracts-dashboard',
                templateUrl: '../jlsapp-modules/contracts/dashboard.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load('../jlsapp-modules/contracts/contracts.js')
              })
              .state('app.jlsapp.admin-contracts-address-create', {
                url: '/admin-contracts-address-create',
                templateUrl: '../jlsapp-modules/contracts/admin-contracts-address-create.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load('../jlsapp-modules/contracts/contracts.js')
              })
              .state('app.jlsapp.contracts', {
                url: '/contracts',
                templateUrl: '../jlsapp-modules/contracts/main.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-editpost', {
                url: '/contracts-editpost',
                templateUrl: '../jlsapp-modules/contracts/editposts.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-create-shiftpattern', {
                url: '/contracts-create-shiftpattern',
                templateUrl: '../jlsapp-modules/contracts/create-shiftpattern.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-workorder-location-post', {
                url: '/contracts-workorder-location-post',
                templateUrl: '../jlsapp-modules/contracts/contracts-workorder-location-post.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-billingplan-new', {
                url: '/contracts-billingplan-new',
                templateUrl: '../jlsapp-modules/contracts/contracts-billingplan-new.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-billingplan-selected', {
                url: '/contracts-billingplan-selected',
                templateUrl: '../jlsapp-modules/contracts/contracts-billingplan-selected.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-revenueplan-new', {
                url: '/contracts-revenueplan-new',
                templateUrl: '../jlsapp-modules/contracts/contracts-revenueplan-new.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-revenueplan-selected', {
                url: '/contracts-revenueplan-selected',
                templateUrl: '../jlsapp-modules/contracts/contracts-revenueplan-selected.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-workorders', {
                url: '/contracts-workorders',
                templateUrl: '../jlsapp-modules/contracts/contracts-workorders.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-workorder', {
                url: '/contracts-workorder',
                templateUrl: '../jlsapp-modules/contracts/contracts-workorder.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-contract', {
                url: '/contracts-contract',
                templateUrl: '../jlsapp-modules/contracts/contracts-contract.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-customers', {
                url: '/contracts-customers',
                templateUrl: '../jlsapp-modules/contracts/contracts-customers.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })
              .state('app.jlsapp.contracts-customers-new', {
                url: '/contracts-customers-new',
                templateUrl: '../jlsapp-modules/contracts/contracts-customers-new.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })
              .state('app.jlsapp.contracts-contract-selected', {
                url: '/contracts-contract-selected',
                templateUrl: '../jlsapp-modules/contracts/contracts-contract-selected.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })
              .state('app.jlsapp.contracts-sites-new', {
                url: '/contracts-sites-new',
                templateUrl: '../jlsapp-modules/contracts/contracts-sites-new.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })

              .state('app.jlsapp.contracts-sites-selected', {
                url: '/contracts-sites-selected',
                templateUrl: '../jlsapp-modules/contracts/contracts-sites-selected.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })
              .state('app.jlsapp.contracts-contract-new', {
                url: '/contracts-contract-new',
                templateUrl: '../jlsapp-modules/contracts/contracts-contract-new.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })
              .state('app.jlsapp.contracts-contract-edit', {
                url: '/contracts-contract-edit',
                templateUrl: '../jlsapp-modules/contracts/contracts-contract-edit.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })

              .state('app.jlsapp.contracts-contract-customer-selected', {
          		  url: '/contract-customer-selected',
          		  templateUrl: '../jlsapp-modules/contracts/contracts-customer-selected.html',
          		  data : { title: 'Contracts', hideFooter: true },
          		  controller: 'ContractsCtrl',
          		  resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
          			'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
          		})
          		.state('app.jlsapp.contracts-contract-customers-person-new', {
          		  url: '/contract-customer-selected-person-new',
          		  templateUrl: '../jlsapp-modules/contracts/contracts-customers-person-new.html',
          		  data : { title: 'Contracts', hideFooter: true },
          		  controller: 'ContractsCtrl',
          		  resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
          			'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
          		})
              .state('app.jlsapp.contracts-addskill', {
                url: '/contracts-addskill',
                templateUrl: '../jlsapp-modules/contracts/contracts-addskill.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js'])
              })

              .state('app.jlsapp.customers-contact-new', {
                url: '/customers-contact-new',
                templateUrl: '../jlsapp-modules/contracts/customers-contact-new.html',
                data : { title: 'Create Contact', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })

              .state('app.jlsapp.contracts-addproduct', {
                url: '/contracts-addproduct',
                templateUrl: '../jlsapp-modules/contracts/contracts-addproduct.html',
                data : { title: 'Contracts', hideFooter: true },
                controller: 'ContractsCtrl',
                resolve: load(['xeditable','../jlsapp-modules/contracts/contracts.js','mgcrea.ngStrap','moment','fullcalendar',
                  'ui.calendar','../jlsapp-modules/calendar/calendar.js', 'ui.select','scripts/controllers/select.js'])
              })


              // Roles & Permissions
              .state('app.jlsapp.roles', {
                url: '/roles',
                templateUrl: '../jlsapp-modules/roles-permissions/rp_main.html',
                data : { title: 'Roles Admin', hideFooter: true },
                controller: 'RolesCtrl',
                resolve: load('../jlsapp-modules/roles-permissions/controller.js')
              })
              .state('app.jlsapp.data-access', {
                url: '/data-access',
                templateUrl: '../jlsapp-modules/roles-permissions/data-access.html',
                data : { title: 'Data Access', hideFooter: true },
                controller: 'RolesCtrl',
                resolve: load(['ui.select','scripts/controllers/select.js','../jlsapp-modules/roles-permissions/controller.js'])
              })
              .state('app.jlsapp.data-tag-admin', {
                url: '/data-tag-admin',
                templateUrl: '../jlsapp-modules/roles-permissions/data-tag-admin.html',
                data : { title: 'Roles & Permissions', hideFooter: true },
                controller: 'RolesCtrl',
                resolve: load(['ui.select','scripts/controllers/select.js','../jlsapp-modules/roles-permissions/controller.js'])
              })


              // Multi-purpose Calendar
              .state('app.calendar', {
                url: '/calendar',
                template: '<div ui-view></div>'
              })
                .state('app.jlsapp.calendar', {
                  url: '/calendar',
                  templateUrl: '../jlsapp-modules/calendar/main.html',
                  data : { title: 'Calendar', hideFooter: true },
                  controller: 'FullcalendarCtrl',
                  resolve: load(['mgcrea.ngStrap','moment','fullcalendar','ui.calendar','../jlsapp-modules/calendar/calendar.js'])
                })

                .state('app.employee-preferences', {
                  url: '/employee-preferences',
                  template: '<div ui-view></div>'
                })
                  .state('app.jlsapp.employee-preferences', {
                    url: '/employee-preferences',
                    templateUrl: '../jlsapp-modules/employee-preferences/main.html',
                    data : { title: 'Employee Preferences', hideFooter: true },
                    controller: 'EmployeePreferencesCtrl',
                    resolve: load(['mgcrea.ngStrap','moment','../jlsapp-modules/employee-preferences/employee-preferences.js'])
                  })


               // Multi-Purpose Approval
              .state('app.jlsapp.approvals', {
                url: '/approvals',
                templateUrl: '../jlsapp-modules/approvals/approvals-approver.html',
                data : { title: 'Approvals', hideFooter: true },
                controller: 'ApprovalCtrl',
                resolve: load('../jlsapp-modules/approvals/controller.js')
              })
              .state('app.jlsapp.approvals-requester', {
                url: '/approvals/approver-requester',
                templateUrl: '../jlsapp-modules/approvals/approvals-requester.html',
                data : { title: 'Approvals', hideFooter: true },
                controller: 'ApprovalCtrl',
                resolve: load('../jlsapp-modules/approvals/controller.js')
              })


               // Notifications
              .state('app.jlsapp.notifications', {
                url: '/notifications',
                templateUrl: '../jlsapp-modules/notifications/notifications-ops-dashboard.html',
                data : { title: 'Notifications', hideFooter: true },
                controller: 'NotificationCtrl',
                resolve: load('../jlsapp-modules/notifications/controller.js')
              })

              // Listing
              .state('app.jlsapp.listings', {
                url: '/listings',
                templateUrl: '../jlsapp-modules/listings/listings.html',
                data : { title: 'Listings', hideFooter: true },
                controller: 'ListingsCtrl',
                resolve: load('../jlsapp-modules/listings/controller.js')

              })

              // Rules Administration
              .state('app.jlsapp.rules', {
                url: '/rules',
                templateUrl: '../jlsapp-modules/rules/rules-admin.html',
                data : { title: 'Rules', hideFooter: true },
                controller: 'RulesCtrl',
                resolve: load('../jlsapp-modules/rules/controller.js')
              })





          ;

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          src = module.module ? module.name : module.files;
                        }
                      });
                      return $ocLazyLoad.load(src);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      }
})();
