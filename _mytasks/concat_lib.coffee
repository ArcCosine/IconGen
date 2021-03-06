module.exports = (grunt) ->

  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.config.set('dirs', {
    libSrc: '_sources/scripts/lib/'
    appSrc: '_sources/scripts/tmp/'
  })

  grunt.config.set('concat', {
    options: {
      seperator: ';'
    }
    lib: {
      src: [
        '<%= dirs.libSrc %>jquery-2.0.3.min.js'
        '<%= dirs.libSrc %>underscore-min.js'
        '<%= dirs.libSrc %>backbone-min.js'
        '<%= dirs.libSrc %>binaryajax.js'
        '<%= dirs.libSrc %>exif.js'
        '<%= dirs.libSrc %>megapix-image.js'
        '<%= dirs.libSrc %>b64.js'
        '<%= dirs.libSrc %>LZWEncoder.js'
        '<%= dirs.libSrc %>NeuQuant.js'
        '<%= dirs.libSrc %>GIFEncoder.js'
      ]
      dest: 'scripts/lib.js'
    }
    app: {
      options:
        banner: '<%= banner %>'
      src: [
        'scripts/tmp/app/*.js'
        'scripts/tmp/controller/base.js'
        'scripts/tmp/controller/initializer.js'
        'scripts/tmp/model/*.js'
        'scripts/tmp/collection/*.js'
        'scripts/tmp/view/app.js'
        'scripts/tmp/view/preview.js'
      ]
      dest: 'scripts/app.js'
    }
  })