class PIG.View.Preview extends Backbone.View

  tagName: 'div'
  className: 'mod-preview'

  CANVAS_SIZE: 98
  icon_size: 180

  initialize: (attr) ->

    @dragStart = false

    @model = attr.model
    @$el = $('.frame_area')
    @el = @$el.get(0)

    @_initCanvas()
    @_eventify()

    @_loadImage(@model.get('iconSrc'), 'icon')
    @_loadImage(@model.get('path'), 'frame')

  _eventify: ->

    if ( PIG.isMobile() )
      @$el
        .on('touchstart', 'canvas', (ev) =>
          @_onDragStart(ev)
        )
        .on('touchmove', 'canvas', (ev) =>
          @_onDragMove(ev)
        )
        .on('touchend', 'canvas', (ev) =>
          @_onDragEnd(ev)
        )
    else
      @$el
        .on('mousedown', 'canvas', (ev) =>
          @_onDragStart(ev)
        )
        .on('mousemove', 'canvas', (ev) =>
          @_onDragMove(ev)
        )
        .on('mouseup', 'canvas', (ev) =>
          @_onDragEnd(ev)
        )

    @listenTo(@model, 'change:main', =>
      @_drawIcon()
    )

    @listenTo(@model, 'change:sub', =>
      @_drawIcon()
    )

    @listenTo(@model, 'change:iconSrc', =>
      @_prepareIcon()
    )

    @listenTo(@model, 'ready', =>
      #@_loadImage(@model.get('iconSrc'), 'icon')
      @_loadImage(@model.get('path'), 'frame')
    )

    @listenTo(@model, 'change:path', =>
      @_loadImage(@model.get('path'), 'frame')
    )

    @listenTo(@model, 'change:iconPos', =>
      @_drawIcon()
    )

    @listenTo(@model, 'set:image', =>
      @_drawIcon()
    )

    @listenTo(@model, 'change:scale', =>
      @_drawIcon()
    )

    @listenTo(@model, 'change:value', =>
      @_drawIcon()
    )

    @listenTo(@model, 'change:mode', =>
      if ( @model.get('mode') )
        return
      @_drawIcon()
    )

    @listenTo(@model, 'change:ready', =>
      $('.loading').fadeOut(500)
    )

    @listenTo(@model, 'change:size', =>
      @icon_size = @model.get('size')
      @_drawIcon()
    )

    @listenTo(@model, 'change:noFrame', =>
      @_drawIcon()
    )

  _getCanvasAdjust: ->
    return if @icon_size is 180 then 11 else 6

  _isLarge: ->
    return @icon_size is 180

  _getClientPos: (ev) ->
    # originalEventに元のeventが入っている
    ev = ev.originalEvent
    touches = ev.touches
    # タッチイベントの場合
    if ( touches )
      return {
        x: touches[0].clientX
        y: touches[0].clientY
      }
    # 通常のイベントの場合
    else
      return {
        x: ev.clientX
        y: ev.clientY
      }

  _onDragStart: (ev) ->
    # スケールが1のときはドラッグできない
    if ( @model.get('scale') is 1 )
      return

    ev.preventDefault()

    @dragStart = true
    @dragStartPos = {
      x: 0
      y: 0
    }
    @dragStartEv = @_getClientPos(ev)

  _onDragMove: (ev) ->
    ev.preventDefault()

    if ( not @dragStart )
      return

    dragEndPos = @_getClientPos(ev)
    dragDiff = {
      x: dragEndPos.x - @dragStartEv.x
      y: dragEndPos.y - @dragStartEv.y
    }
    iconPos = @model.get('iconPos')

    pos = {
      x: iconPos.x + if @_isLarge() then dragDiff.x * 2 else dragDiff.x
      y: iconPos.y + if @_isLarge() then dragDiff.y * 2 else dragDiff.y
    }

    @model.set('iconPos', pos)

    @dragStartEv = dragEndPos

  _onDragEnd: (ev) ->
    ev.preventDefault()

    if ( not @dragStart )
      return

    @dragStart = false

  _onChangeRange: (ev) ->
    $range = $(ev.target).closest('input')
    scale = parseInt($range.val(), 10)
    PIG.events.trigger('set:scale', scale)

  _prepareIcon: ->
    img = new Image()
    file = @model.get('file')

    # iPhoneで撮影した画像で500KBを超えているもの
    # 別途処理する、ついでにOrientationも正しい値にしておく
    if ( 500000 < parseInt(file?.size, 10) )
      new MegaPixImage(file).render(img, { maxWidth: 1280, orientation: @model.get('orientation') });

      (chk = =>
        if ( img.src )
          return @_loadImage(img.src, 'icon')
        setTimeout(chk, 100)
      )()
    else
      @_loadImage(@model.get('iconSrc'), 'icon')

  _drawIcon: ->
    ctx = @ctx
    canvas = @canvas
    iconPos = @model.get('iconPos')
    scale = @model.get('scale') || 1
    icon = @model.get('iconBaseImage')
    width = @model.get('iconBaseWidth')
    height = @model.get('iconBaseHeight')
    frame = @model.get('iconFrameImage')
    fitWidth = undefined
    fitHeight = undefined
    fitPosTop = undefined
    fitPosLeft = undefined
    canvas_size = undefined
    adjust = undefined
    space = undefined
    pos = undefined
    base = undefined
    getFitProp = =>
      if ( @model.get('mode') )
        canvas_size = @icon_size + @_getCanvasAdjust()
      else
        canvas_size = @icon_size
      ctx.clearRect(0, 0, canvas_size, canvas_size)
      adjust = if 98 < canvas_size then (canvas_size - @icon_size) / 2 else 0
      base = width < height
      if ( base )
        fitWidth = width * @icon_size / height * scale
        fitHeight = @icon_size * scale
        fitPosTop = 0
        fitPosLeft = @icon_size / 2 - fitWidth / 2 + adjust

        space = (@icon_size - fitWidth) / 2
        pos = space + fitWidth
      else
        fitWidth = @icon_size * scale
        fitHeight = height * @icon_size / width * scale
        fitPosTop = @icon_size / 2 - fitHeight / 2
        fitPosLeft = adjust

        space = (@icon_size - fitHeight) / 2
        pos = space + fitHeight

    if ( not icon || not frame )
      return

    # アイコンのレンダリング
    if ( @model.get('scale') is 1 )
      # スケールが1になった場合は移動をリセット
      @model.set('iconPos', {
        x: 0,
        y: 0
      }, { silent: true })
      getFitProp()
      canvas.setAttribute('width', canvas_size)
      canvas.setAttribute('height', canvas_size)

      ctx.drawImage(icon, movedX, movedY, fitWidth, fitHeight)
      ctx.drawImage(icon, fitPosLeft, fitPosTop, fitWidth, fitHeight)
      ctx.fillStyle = '#ffffff'

      # 写真周りの白縁
      if ( base )
        ctx.fillRect(0, 0, space, @icon_size)
        ctx.fillRect(pos, 0, space, @icon_size)
      else
        ctx.fillRect(0, 0, @icon_size, space)
        ctx.fillRect(0, pos, @icon_size, space)
    else
      getFitProp()
      movedX = iconPos.x
      movedY = iconPos.y
      canvas.setAttribute('width', canvas_size)
      canvas.setAttribute('height', canvas_size)

      ctx.drawImage(icon, movedX, movedY, fitWidth, fitHeight)

    if ( adjust isnt 0 )
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, (canvas_size - @icon_size) / 2, @icon_size)
      ctx.fillRect(canvas_size - (canvas_size - @icon_size) / 2, 0, (canvas_size - @icon_size) / 2, @icon_size)
      ctx.fillRect(0, @icon_size, canvas_size, canvas_size - @icon_size)

    # フレームのレンダリング
    ctx.drawImage(frame, adjust, 0, @icon_size, @icon_size)

    @_onRenderText()
    @_createFile()

  _loadImage: (src, target) -> # target: icon or frame
    img = new Image()

    _onImgLoad = =>
      if ( not @model.get('ready') )
        @model.set('ready', true)
      # アイコンの場合
      if ( target is 'icon')
        @model.set({
          iconBaseWidth  : img.width
          iconBaseHeight : img.height
          iconBaseImage  : img
        })
      # フレームの場合
      else
        @model.set({
          iconFrameImage: img
        })

      @model.trigger('set:image')
      img.removeEventListener('load', _onImgLoad)
      img = null

    img.src = src
    img.addEventListener('load', _onImgLoad, false)

  _initCanvas: ->
    @canvas = $('canvas').get(0)
    @ctx = @canvas.getContext('2d')

  _createFile: ->
    dataURL = @canvas.toDataURL(@model.get('type'))
    fileType= @model.get('type').replace('image/', '') or 'png'

    @trigger('create:file', {
      href: dataURL
      fileName: "puzzIconGen_#{+(new Date)}_.#{fileType}"
    })

  _onRenderText: ->
    mode = @model.get('mode')
    value = @model.get("value")
    canvas_size = @icon_size + @_getCanvasAdjust()
    fontSize = if @icon_size is 98 then 22 else 40
    ctx = @ctx
    ctx.font = "#{fontSize}px kurokane"
    ctx.textAlign = 'center'
    frontFillStyle = '#f0ff00'
    ctx.shadowColor = '#000000'
    ctx.shadowBlur = 0

    if ( not mode )
      @canvas.setAttribute('class', 'default')
      return
    @canvas.setAttribute('class', 'large')

    if ( mode is 'lv' )
      if ( value is 99 )
        value = '最大'
      else
        frontFillStyle = '#ffffff'
      value = 'Lv.' + value
    else
      value = '+' + value

    ctx.fillStyle = '#000000'
    # 文字外枠
    ctx.fillText(value, canvas_size/2 - 2, canvas_size + 2 - 4)
    ctx.fillText(value, canvas_size/2 - 2, canvas_size - 2 - 4)
    ctx.fillText(value, canvas_size/2 + 2, canvas_size + 2 - 4)
    ctx.fillText(value, canvas_size/2 + 2, canvas_size - 2 - 4)

    ctx.fillStyle = frontFillStyle
    ctx.shadowBlur = 0
    ctx.fillText(value, canvas_size/2, canvas_size - 4)