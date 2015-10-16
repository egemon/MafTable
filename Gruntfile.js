module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
            src: [
                'js/libs/*.js', // Все JS в папке libs
                'js/global.js'  // Конкретный файл
            ],
            dest: 'js/build/production.js',
        }
    },
    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
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
    watch: {
        scripts: {
            files: ['js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false,
            },
        }
    },
    requirejs: {
        compile: {
            options: {
                baseUrl: "/",
                mainConfigFile: "js/requirejsConfig.js",
                // name: "path/to/almond", // assumes a production build using almond
                out: "production/main.js"
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');


  // Default task(s).
  grunt.registerTask('default', ['requirejs']);

};