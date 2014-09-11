module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          require: [
            'mongoose',
            function(){ expect  = require("chai").expect },
            function(){ factory = require("./utils/factories") },
            function(){ utils   = require('./utils') },
          ]
        },
        src: ['test/**/*.js']
      },
    },

    watch: {
      js: {
        files: [
          'lib/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['default']
      }
    }
  });

  grunt.registerTask('test', [
    'clear',
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'test',
    'watch'
  ]);

};
