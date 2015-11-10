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

    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
            expand: true,
        },
        target: {
            files: {
                'MafTable/css/styles.css':['css/**.css']
            }
        }
    },

    imagemin: {
        files: [{
            expand: true,
            cwd: 'img/grey/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'MafTable/img/'
        }]
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
                name : 'localApp',
                baseUrl: "js/",
                mainConfigFile: "js/requirejsConfig.js",
                out: "MafTable/js/main.js",
                include: "lib/requirejs/require"
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['requirejs:compile', 'cssmin']);

};