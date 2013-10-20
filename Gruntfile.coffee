module.exports = (grunt) ->

  grunt.config.set('pkg', grunt.file.readJSON('package.json'))
  grunt.config.set('banner', """
/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %>
<%= pkg.url %> * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;
Licensed under the <%= pkg.license.type %> <%= pkg.license.url %> */

""")

  grunt.task.loadTasks('_mytasks')
  grunt.loadNpmTasks('grunt-contrib-watch')

  # watch
  grunt.config.set('watch', {
    sass: {
      files: ['_sources/styles/*.scss']
      tasks: ['sass']
    }
    coffee: {
      files: ['_sources/scripts/coffee/**']
      tasks: ['coffee','concat','clean']
    }
  })

  # default
  grunt.registerTask('default', [
    'sass'
    'coffee'
    'concat'
    'clean'
  ])