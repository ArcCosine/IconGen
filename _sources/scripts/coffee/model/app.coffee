class PIG.Model.App extends Backbone.Model
  defaults: {
    ready          : false
    main           : 'flame'
    sub            : 'double'
    type           : 'image/png'
    scale          : 1
    selected       : false
    iconSrc        : 'images/tirol.jpg'
    arousalSrc     : 'images/arousal.png'
    iconBaseWidth  : null
    iconBaseHeight : null
    iconBaseImage  : null
    iconPos        : {
      x: 0
      y: 0
    }
    frameSrc       : null
    iconFrameImage : null
    noFrame        : false
    animation      : false
  }

  initialize: ->
    @eventify()
    @_setFramePath({ silent: true })

  eventify: ->

    @on 'change:main', =>
      @_setFramePath()

    @on 'change:sub', =>
      @_setFramePath()

    @on 'change:noFrame', =>
      @_setFramePath()

    @on 'change:file', =>
      @set('type', @get('file').type)

    @on 'change:lv', =>
      value = @get('lv')
      if ( not value )
        @set('lv', null)

    @on 'change:plus', =>
      value = @get('plus')
      if ( not value )
        @set('plus', null)

    @on 'change:arousal', =>
      value = @get('arousal')
      if ( not value )
        @set('arousal', null)


  _setFramePath: (options) ->
    if ( @get('noFrame') )
      path = 'images/noframe.png'
      @set('path', path, options)
      return

    main = @get('main')
    sub = @get('sub')

    if ( main is sub )
      sub = ''
    else if ( sub is 'double' )
      sub = "_#{main}"
    else
      sub = "_#{sub}"

    path = "images/pazu_frame_#{main}#{sub}.png"
    @set('path', path, options)
