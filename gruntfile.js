module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['*.*'],
                tasks: [/*'concat', 'uglify'*/],
                options: {
                    spawn: false,
                },
            } 
        },
        concat: {
            /*dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }*/
        },
        uglify: {
           /* build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }*/
        },    
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build/'
                }]
            }
        },        
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/global.css': 'css/global.scss'
                }
            } 
        },          
        css: {
            files: ['css/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false,
            }
        },
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch'/*'concat', 'uglify'*/]);

};