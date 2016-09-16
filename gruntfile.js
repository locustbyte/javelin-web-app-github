module.exports = function(grunt) {
    grunt.initConfig({
        git_changelog: {
            extended: {
                options: {
                  app_name : 'Javelin',
                  intro : 'Javelin Changelog',
                  tag: false,
                  debug: false,
                  file : 'change-logs/jwa-changelog.md',
                  grep_commits: '^fix|^feat|^docs|^refactor|^chore|^test|^release|BREAKING'
                }
            },
            tag1: {
                options: {
                    app_name : 'Since v4.0.0 changelog',
                    file: 'change-logs/tags/v4.0.0.md',
                    version : 'Soft name like Squeezy Potatoe',
                    tag: 'v3.0.0',
                    debug: false
                }
            }
        },
        clean: {
            dist:   ['developer-distribution/*','static/css/*'],
            html:   ['html/*.html'],
            tmp :   ['.tmp'],
            fonts:  ['developer-distribution/assets/fonts'],
            distassets: ['developer-distribution/assets'],
            changelog: ['change-logs/*'], 
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'app/', src: '**', dest: 'developer-distribution/app/'},
                    {expand: true, cwd: 'assets/', src: ['**', '!**/scss/**'], dest: 'developer-distribution/assets/'},
                    {expand: true, cwd: 'assets/fonts/', src: '**', dest: 'developer-distribution/static/fonts'},
                    {expand: true, cwd: 'jlsapp-modules/', src: '**', dest: 'developer-distribution/jlsapp-modules/'},
                    {expand: true, cwd: 'libs/', src: '**', dest: 'developer-distribution/libs/'},
                    {expand: true, cwd: 'static/', src: '**', dest: 'developer-distribution/static/'},
                    {expand: true, cwd: 'assets/fonts/', src: '**', dest: 'static/fonts'},
                    {expand: true, cwd: 'assets/images/', src: '**', dest: 'static/img'},
                    {expand: true, cwd: 'views/', src: '**', dest: 'developer-distribution/views/'},
                    {src: 'index.html', dest: 'developer-distribution/index.html'}
                ]
            }
        },
        htmlmin: {
            dist: {
                options: { removeComments: true, collapseWhitespace: true },
                files: [
                    { expand: true, cwd: 'views/', src: ['*.html', '**/*.html'], dest: 'developer-distribution/views/' }
                ]
            }
        },
        browserSync: {
            default_options: {
              bsFiles: {
                src: [
                  "static/css/*.css",
                  "assets/scss/*.scss",
                  "styles/**/*.scss",
                  "static/css/jlswebapp.min.css",
                  "*.html",
                  "jlsapp-modules/*/*.html",
                  "views/*/*.html"
                ]
              },
              options: {
                watchTask: true,
                startPath: "app/",
                server: {
                  baseDir: "./"
                }
              }
            }
        },
        watch: {
            sass: {
              files: ['assets/**/*.scss','assets/scss/*.scss','styles/*.scss','styles/**/*.scss','views/*/*.html'],
              tasks: ['sass','concat']
            }
        },
        sass: {
            dist: {
                files: [
                    {'static/css/support-css-only-dont-include.css': ['assets/scss/app.scss']}
                ]
            }
        },
        useminPrepare: {
            html: ['app/index.html','html/*.html']
        },
        usemin: {
            html: ['developer-distribution/app/index.html','developer-distribution/app/index.rtl.html','developer-distribution/html/*.html']
        },
        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },
        concat: {
          css: {
            options: {},
            files: {
              'static/css/app.min.css': ['assets/animate.css/animate.min.css','libs/**/*.css','static/css/support-css-only-dont-include.css','assets/angular-motion/dist/angular-motion.min.css','assets/bootstrap-additions/dist/bootstrap-additions.min.css'],
            },
          }
        }
    });

    // Load the git-changelog plugin's task(s).
    grunt.loadTasks('libs/git-changelog/tasks');

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('build', [
        'clean:dist',
        'clean:changelog',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'usemin',
        'sass',
        'concat',
        'copy',
        'clean:tmp',
        'clean:fonts',
        'clean:distassets'
        
    ]);

    grunt.registerTask('default', ['gojavelin']);

    grunt.registerTask('ch', [ 'git_changelog']);

    grunt.registerTask('gojavelin', ['build','ch','concat','browserSync','watch']);

    grunt.registerTask('release', [
        'bump'
    ]);

    grunt.registerTask('html', [
        'clean:html',
        'assemble'
    ]);
};
