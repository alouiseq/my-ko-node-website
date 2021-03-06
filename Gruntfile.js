'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // var reloadPort = 35729, files;
  var reloadPort = 1337, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js',
          'lib/todosMod/index.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js', 'lib/todosMod/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['public/css/*.css', 'lib/todosMod/public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['views/*.jade', 'lib/todosMod/views/*.jade'],
        options: {
          livereload: reloadPort
        }
      },
      sass: {
        files: './public/css/style.scss',
        tasks: 'sass:main' 
      }
    },
    sass: {
      main: {
        files: {
          'public/css/style.css' : 'public/css/style.scss'
        }
      }
    },
    jadeUsemin: {
      scripts: {
	options: {
	  tasks: {
	    js: ['concat', 'uglify'],
	    css: ['concat', 'cssmin']
	  }
	},
	files: [{
	  src: [
            './views/layout.jade', 
            './views/blog_layout.jade', 
            './views/pf_layout.jade', 
            './views/proj_layout.jade', 
            './views/contacts_layout.jade'
          ]
	}]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/img/',
          src: ['*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['develop', 'watch']);
  grunt.registerTask('build', ['jadeUsemin', 'newer:imagemin']);
};
