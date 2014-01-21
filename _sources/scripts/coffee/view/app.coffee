class PIG.View.App extends Backbone.View

  events: {
    'click a[data-pig-frame]'       : '_onClickMainAttr'
    'click a[data-pig-sub-frame]'   : '_onClickFrame'
    'change input[type="file"]'     : '_onChangeFile'
    'change input[type="range"]'    : '_onChangeScale'
    'keyup input[type="number"]'    : '_onChangeText'
    'change input[type="number"]'   : '_onChangeText'
    'change select[name="size"]'    : '_onChangeSize'
    'change input.no_frame'         : '_onClickNoFrame'
    'change input.animation'        : '_onClickAnimation'
  }

  initialize: ->
    @model = new PIG.Model.App()
    @$el = $('.app')
    @el = @$el.get(0)

    @preview = new PIG.View.Preview({
      model: @model
    })

    @$frameArea = @$el.find('.frame_area')
    @$textLv = @$el.find('[data-pig-target="lv"]')
    @$textPlus = @$el.find('[data-pig-target="plus"]')
    @$textArousal = @$el.find('[data-pig-target="arousal"]')

    @_initReader()
    @_eventify()

  _eventify: ->

    @listenTo(@preview, 'create:file', (obj) =>

      if ( not @model.get('selected') )
        return

      @$el.find('a.download').attr({
        href: obj.href
        download: obj.fileName
        target: '_blank'
      }).parent().removeClass('disabled')
    )

  _initReader: ->
    @reader = new FileReader()
    @reader.onload = =>
      @_onLoadReader()

  _onLoadReader: ->
    @model.set('iconSrc', @reader.result)

  _onClickMainAttr: (ev) ->
    ev.preventDefault()
    $attr = $(ev.target).closest('a')
    attr = $attr.data('pig-frame')
    @_changeFrameSet(attr)

    @model.set('main', attr)

  _changeFrameSet: (frame) ->
    prevMainAttr = @model.get('main')
    @$frameArea
      .removeClass(prevMainAttr)
      .addClass(frame)

  _onClickFrame: (ev) ->
    ev.preventDefault()
    $frame = $(ev.target).closest('a')
    sub = $frame.data('pig-sub-frame')
    prevSub = @model.get('sub')

    $('a[data-pig-sub-frame="' + prevSub + '"]').removeClass('active')
    $frame.addClass('active')

    @model.set('sub', sub)

  _onChangeFile: (ev) ->
    $file = $(ev.target).closest('input')
    file = $file.get(0).files[0]

    # EXIFから正しいOrientationを取得しておく
    EXIF.getData(file, =>
      @model.set('orientation', EXIF.getTag(file, 'Orientation'))
    )

    @model.set('selected', true)
    @model.set('file', file)
    @reader.readAsDataURL(file)

  _onChangeScale: (ev) ->
    $range = $(ev.target).closest('input')
    scale = parseFloat($range.val())

    @model.set('scale', scale)

  _onChangeSize: (ev) ->
    $size = $(ev.target).closest('select')
    size = parseInt($size.val())

    @model.set('size', size)

  _onChangeText: (ev) ->
    $input = $(ev.target).closest('input')
    target = $input.data('pig-target')
    value = parseInt($input.val())
    value = if _.isNumber(value) then value else 1

    if ( target is 'lv' )
      if ( value < 1 )
        value = 1
      else if ( 99 < value )
        value = 99
        $input.val(value)
    else if ( target is 'plus' )
      if ( not @model.get('animation') )
        # plusが設定された場合は覚醒を削除
        @$textArousal.val('')
        @model.set('arousal', null)
      if ( value < 1 )
        value = 1
      else if ( 297 < value )
        value = 297
        $input.val(value)
    else
      if ( not @model.get('animation') )
        # 覚醒が設定された場合はplusを削除
        @$textPlus.val('')
        @model.set('plus', null)
      if ( value < 1 )
        value = 1
      else if ( 9 < value )
        value = 10
        $input.val(value)

    if ( value )
      #@model.set('mode', mode)
      # target: plus, lv, arousal
      @model.set(target, value)
    else
      @model.set(target, null)

  _onClickNoFrame: (ev) ->
    $input = $(ev.target).closest('input')
    checked = $input.prop('checked')

    @model.set('noFrame', checked)

  _onClickAnimation: (ev) ->
    $input = $(ev.target).closest('input')
    checked = $input.prop('checked')

    @model.set('animation', checked)