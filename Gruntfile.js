module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            options: {},
            admin: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'node_modules/font-awesome/fonts/*',
                dest: 'subdomains/mozaic/glynn-admin/fonts'
            },
            site: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'node_modules/font-awesome/fonts/*',
                dest: 'subdomains/mozaic/site/fonts'
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                esversion: 6
            },
            admin: [
                'Gruntfile.js',
                'subdomains/mozaic/glynn-admin/assets/**/*.js'
            ],
            site: [
                'Gruntfile.js',
                'subdomains/mozaic/site/assets/**/*.js'
            ]
        },
        browserify: {
            admin: {
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
            },
            site: {
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
                    'subdomains/mozaic/site/js/site.js': ['subdomains/mozaic/site/assets/site.js']
                }
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            admin: {
                files: {
                    'subdomains/mozaic/glynn-admin/js/glynn-admin.min.js': ['subdomains/mozaic/glynn-admin/js/glynn-admin.js']
                }
            },
            site: {
                files: {
                    'subdomains/mozaic/site/js/site.min.js': ['subdomains/mozaic/site/js/site.js']
                }
            }
        },
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            admin: [
                'subdomains/mozaic/glynn-admin/sass/app.scss',
                'subdomains/mozaic/glynn-admin/sass/**/*.scss'
            ],
            site: [
                'subdomains/mozaic/site/sass/app.scss',
                'subdomains/mozaic/site/sass/**/*.scss'
            ]
        },
        sass: {
            admin: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules'
                },
                files: {
                    'subdomains/mozaic/glynn-admin/css/glynn-admin.css': 'subdomains/mozaic/glynn-admin/scss/glynn-admin.scss'
                }
            },
            site: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules'
                },
                files: {
                    'subdomains/mozaic/site/css/site.css': 'subdomains/mozaic/site/scss/site.scss'
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
            sassadmin: {
                files: 'subdomains/mozaic/glynn-admin/**/*.scss',
                tasks: ['sasslint:admin', 'sass:admin'],
                options: {
                    debounceDelay: 250
                }
            },
            sasssite: {
                files: 'subdomains/mozaic/site/**/*.scss',
                tasks: ['sasslint:site', 'sass:site'],
                options: {
                    debounceDelay: 250
                }
            },
            assetsadmin: {
                files: 'subdomains/mozaic/glynn-admin/assets/**/*.js',
                tasks: ['jshint:admin', 'browserify:admin'],
                options: {
                    debounceDelay: 250
                }
            },
            assetsite: {
                files: 'subdomains/mozaic/site/assets/**/*.js',
                tasks: ['jshint:site', 'browserify:site'],
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