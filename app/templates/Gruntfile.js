module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'extended'
        },
        files: {
          '<%= CommonDirName %>/css/app.css': '<%= CommonDirName %>/scss/app.scss',
          '<%= ProjectName %>_template/css/<%= ProjectName %>.css': '<%= ProjectName %>_template/scss/<%= ProjectName %>.scss'
        }        
      }
    },

    clean: {
      dist: {
        src: [ 'dist/*' ]
      },
    },

    copy: {
      dist: {
        files: [
          {expand: true, src: ['*.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['<%= CommonDirName %>/**', '!<%= CommonDirName %>/scss/**'], dest: 'dist/'},
          {expand: true, src: ['<%= ProjectName %>_template/**', '!<%= ProjectName %>_template/scss/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.js', 'bower_components/modernizr/modernizr.js'], dest: 'dist/shared/js/vendor/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/foundation/js/foundation.min.js'], dest: 'dist/shared/js/foundation/', filter: 'isFile'}
        ]
      },
    },

    useminPrepare: {
      html: '*.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: ['dist/*.html'],
      css: ['dist/<%= ProjectName %>_template/css/*.css', 'dist/<%= CommonDirName %>/css/*.css'],
      css: ['dist/<%= ProjectName %>_template/js/*.js', 'dist/<%= CommonDirName %>/js/*.js'],
      options: {
        dirs: ['dist']
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('publish', ['clean:dist', 'useminPrepare', 'copy:dist', 'usemin']);

}