module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  grunt.initConfig({

    lint: {
      all: ['*.js', 'test/**/*.js']
    },

    jshint: {
      options: {
        curly: true,
        es5: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        laxcomma: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: false,
        multistr:true
      },
      globals: {
        module: true,
        require:true,
        exports:true,
        console:true,
        __dirname:true,
        process:true,
        setTimeout:true,
        clearTimeout:true
      }
    },

    watch: {
      def:{
        files: ['<config:lint.all>'],
        tasks: 'lint shell:nodeunit'
      }
    },

    shell: {
      nodeunit: {
        command: 'nodeunit test/*.js',
        stdout: true,
        stderr: true,
        failOnError:true,
        warnOnError: true
      }
    }
  });

  var growl = require('growl');
  ['warn', 'fatal'].forEach(function(level) {
    grunt.utils.hooker.hook(grunt.fail, level, function(opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });

  // Default task.
  grunt.registerTask('default', 'lint shell:nodeunit');
};
