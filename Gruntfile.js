module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            options: {},
            build: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'node_modules/font-awesome/fonts/*',
                dest: 'subdomains/mozaic/glynn-admin/fonts'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                esversion: 6
            },
            all: [
                'Gruntfile.js',
                'subdomains/mozaic/glynn-admin/assets/**/*.js'
            ]
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        [
                            'babelify',
                            {
                                presets: ['es2015']
                            }
                        ],
                        'vueify',
                        'aliasify'
                    ],
                    browserifyOptions: {
                        debug: true
                    },
                    exclude: '',
                    watch: true
                },
                files: {
                    'subdomains/mozaic/glynn-admin/js/glynn-admin.js': ['subdomains/mozaic/glynn-admin/assets/glynn-admin.js']
                }
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'subdomains/mozaic/glynn-admin/js/glynn-admin.min.js': ['subdomains/mozaic/glynn-admin/js/glynn-admin.js']
                }
            }
        },
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: [
                'subdomains/mozaic/glynn-admin/sass/app.scss',
                'subdomains/mozaic/glynn-admin/sass/**/*.scss'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules'
                },
                files: {
                    'subdomains/mozaic/glynn-admin/css/glynn-admin.css': 'subdomains/mozaic/glynn-admin/scss/glynn-admin.scss'
                }
            }
        },

        cssmin: {
            options: {
                report: 'min',
                root: 'web',
                target: 'web',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'subdomains/mozaic/glynn-admin/css/glynn-admin.min.css': 'subdomains/mozaic/glynn-admin/css/glynn-admin.css'
                }
            }
        },

        clean: [
            'subdomains/mozaic/glynn-admin/css/*',
            'subdomains/mozaic/glynn-admin/fonts/*',
            'subdomains/mozaic/glynn-admin/js/*'
        ],

        watch: {
            sass: {
                files: 'subdomains/mozaic/glynn-admin/**/*.scss',
                tasks: ['sasslint', 'sass'],
                options: {
                    debounceDelay: 250
                }
            },
            assets: {
                files: 'subdomains/mozaic/glynn-admin/assets/**/*.js',
                tasks: ['jshint', 'browserify'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass-lint');

    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'browserify', 'sasslint', 'sass']);
    grunt.registerTask('watcher', ['default', 'watch']);
    grunt.registerTask('prod', ['clean', 'copy', 'jshint', 'browserify', 'uglify', 'sasslint', 'sass', 'cssmin']);
};