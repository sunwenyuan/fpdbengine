/**
 * Created by wenyuan on 2014/6/24.
 */
module.exports = function (grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-string-replace');

  var projectConfig = {
    applicationDir: 'public'
  };

  grunt.initConfig({
    project: projectConfig,

    watch: {
      less: {
        files: ['<%= project.applicationDir %>/stylesheets/*.less'],
        tasks: ['less:development']
      }
    },

    less: {
      development: {
        files: [
          {
            expand: true,
            cwd: '<%= project.applicationDir %>',
            src: ['stylesheets/app.less'],
            dest: '<%= project.applicationDir %>/stylesheets',
            ext: '.css'
          }
        ]
      }
    }
  });

  grunt.registerTask('dev', ['less:development', 'watch:less']);
};