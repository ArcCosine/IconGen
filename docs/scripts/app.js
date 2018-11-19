/*! IconGen for Puzzle & Dragons - v2.2.0 - 2014-02-26 16:29:36
http://5509.github.io/IconGen * Copyright (c) 2014 Kazunori Tokuda;
Licensed under the MIT http://5509.mit-license.org */
(function() {
  window.PIG = {};

  PIG.Controller = {};

  PIG.Model = {};

  PIG.Collection = {};

  PIG.View = {};

  PIG.events = {};

  _.extend(PIG.events, Backbone.Events);

  PIG.isMobile = function() {
    var ua;
    ua = navigator.userAgent;
    if (/iPhone|iPad|Android/.test(ua)) {
      return true;
    }
    return false;
  };

  PIG.isAndroid = function() {
    var ua;
    ua = navigator.userAgent;
    if (/Android/.test(ua)) {
      return true;
    }
  };

}).call(this);

(function() {
  var __slice = [].slice;

  PIG.Controller.Base = (function() {
    function Base() {
      var attr;
      attr = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.initialize.apply(this, attr);
    }

    Base.prototype.initialize = function() {};

    return Base;

  })();

  _.extend(PIG.Controller.Base.prototype, Backbone.Events);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PIG.Controller.Initializer = (function(_super) {
    __extends(Initializer, _super);

    function Initializer() {
      _ref = Initializer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Initializer.prototype.initialize = function() {
      var webfontText,
        _this = this;
      if (typeof window.FileReader === 'undefined') {
        return $('body').html(this.notSupported);
      }
      if (PIG.isMobile()) {
        $('html').addClass('sp');
      }
      if (PIG.isAndroid() && !window.localStorage.getItem('forAndroidClose')) {
        $('.forAndroid').show();
        $('.close').click(function(ev) {
          ev.preventDefault();
          $('.forAndroid').hide();
          return window.localStorage.setItem('forAndroidClose', true);
        });
      }
      webfontText = 'Lv.0123456789最大+と覚醒交互に（Tt設定不可★ダウンロードお@shimaelrw写真をえらぶ拡待ちくださいアイコンの大きフレーム外す注意）両方部分が切り替わるなま、はでせん。チェック状態位置調整た端末よてオ著し動作遅ったしこもか諦め…';
      return new PIG.View.App();
    };

    Initializer.prototype.notSupported = '<div class="not-supported">\n  <p>パズドラ風アイコンジェネレーターは<br>\n  お使いの端末には対応していません。<br>\n  対応端末は以下の通りです。</p>\n  <h3>PC/Mac</h3>\n  <ul>\n    <li>Google Chromeの最新版</li>\n    <li>Safariの最新版</li>\n    <li>Firefoxの最新版</li>\n  </ul>\n  <h3>モバイル端末</h3>\n  <ul>\n    <li>iOS6以上のSafari</li>\n    <li>Android4.x以上の標準ブラウザ</li>\n  </ul>\n  <p>お手数ですが、対応端末でご利用ください。</p>\n</div>';

    return Initializer;

  })(PIG.Controller.Base);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PIG.Model.App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype.defaults = {
      ready: false,
      main: 'flame',
      sub: 'double',
      type: 'image/png',
      scale: 1,
      selected: false,
      iconSrc: 'images/tirol.jpg',
      arousalSrc: 'images/arousal.png',
      iconBaseWidth: null,
      iconBaseHeight: null,
      iconBaseImage: null,
      iconPos: {
        x: 0,
        y: 0
      },
      frameSrc: null,
      iconFrameImage: null,
      noFrame: false,
      animation: false
    };

    App.prototype.initialize = function() {
      this.eventify();
      return this._setFramePath({
        silent: true
      });
    };

    App.prototype.eventify = function() {
      var _this = this;
      this.on('change:main', function() {
        return _this._setFramePath();
      });
      this.on('change:sub', function() {
        return _this._setFramePath();
      });
      this.on('change:noFrame', function() {
        return _this._setFramePath();
      });
      this.on('change:file', function() {
        return _this.set('type', _this.get('file').type);
      });
      this.on('change:lv', function() {
        var value;
        value = _this.get('lv');
        if (!value) {
          return _this.set('lv', null);
        }
      });
      this.on('change:plus', function() {
        var value;
        value = _this.get('plus');
        if (!value) {
          return _this.set('plus', null);
        }
      });
      return this.on('change:arousal', function() {
        var value;
        value = _this.get('arousal');
        if (!value) {
          return _this.set('arousal', null);
        }
      });
    };

    App.prototype._setFramePath = function(options) {
      var main, path, sub;
      if (this.get('noFrame')) {
        path = 'images/noframe.png';
        this.set('path', path, options);
        return;
      }
      main = this.get('main');
      sub = this.get('sub');
      if (main === sub) {
        sub = '';
      } else if (sub === 'double') {
        sub = "_" + main;
      } else {
        sub = "_" + sub;
      }
      path = "images/pazu_frame_" + main + sub + ".png";
      return this.set('path', path, options);
    };

    return App;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PIG.View.App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype.events = {
      'click a[data-pig-frame]': '_onClickMainAttr',
      'click a[data-pig-sub-frame]': '_onClickFrame',
      'change input[type="file"]': '_onChangeFile',
      'change input[type="range"]': '_onChangeScale',
      'keyup input[type="number"]': '_onChangeText',
      'change input[type="number"]': '_onChangeText',
      'change select[name="size"]': '_onChangeSize',
      'change input.no_frame': '_onClickNoFrame',
      'change input.animation': '_onClickAnimation'
    };

    App.prototype.initialize = function() {
      this.model = new PIG.Model.App();
      this.$el = $('.app');
      this.el = this.$el.get(0);
      this.preview = new PIG.View.Preview({
        model: this.model
      });
      this.$frameArea = this.$el.find('.frame_area');
      this.$textLv = this.$el.find('[data-pig-target="lv"]');
      this.$textPlus = this.$el.find('[data-pig-target="plus"]');
      this.$textArousal = this.$el.find('[data-pig-target="arousal"]');
      this._initReader();
      return this._eventify();
    };

    App.prototype._eventify = function() {
      var _this = this;
      return this.listenTo(this.preview, 'create:file', function(obj) {
        if (!_this.model.get('selected')) {
          return;
        }
        return _this.$el.find('a.download').attr({
          href: obj.href,
          download: obj.fileName,
          target: '_blank'
        }).parent().removeClass('disabled');
      });
    };

    App.prototype._initReader = function() {
      var _this = this;
      this.reader = new FileReader();
      return this.reader.onload = function() {
        return _this._onLoadReader();
      };
    };

    App.prototype._onLoadReader = function() {
      return this.model.set('iconSrc', this.reader.result);
    };

    App.prototype._onClickMainAttr = function(ev) {
      var $attr, attr;
      ev.preventDefault();
      $attr = $(ev.target).closest('a');
      attr = $attr.data('pig-frame');
      this._changeFrameSet(attr);
      return this.model.set('main', attr);
    };

    App.prototype._changeFrameSet = function(frame) {
      var prevMainAttr;
      prevMainAttr = this.model.get('main');
      return this.$frameArea.removeClass(prevMainAttr).addClass(frame);
    };

    App.prototype._onClickFrame = function(ev) {
      var $frame, prevSub, sub;
      ev.preventDefault();
      $frame = $(ev.target).closest('a');
      sub = $frame.data('pig-sub-frame');
      prevSub = this.model.get('sub');
      $('a[data-pig-sub-frame="' + prevSub + '"]').removeClass('active');
      $frame.addClass('active');
      return this.model.set('sub', sub);
    };

    App.prototype._onChangeFile = function(ev) {
      var $file, file,
        _this = this;
      $file = $(ev.target).closest('input');
      file = $file.get(0).files[0];
      EXIF.getData(file, function() {
        return _this.model.set('orientation', EXIF.getTag(file, 'Orientation'));
      });
      this.model.set('selected', true);
      this.model.set('file', file);
      return this.reader.readAsDataURL(file);
    };

    App.prototype._onChangeScale = function(ev) {
      var $range, scale;
      $range = $(ev.target).closest('input');
      scale = parseFloat($range.val());
      return this.model.set('scale', scale);
    };

    App.prototype._onChangeSize = function(ev) {
      var $size, size;
      $size = $(ev.target).closest('select');
      size = parseInt($size.val());
      return this.model.set('size', size);
    };

    App.prototype._onChangeText = function(ev) {
      var $input, target, value;
      $input = $(ev.target).closest('input');
      target = $input.data('pig-target');
      value = parseInt($input.val());
      value = _.isNumber(value) ? value : 1;
      if (target === 'lv') {
        if (value < 1) {
          value = 1;
        } else if (99 < value) {
          value = 99;
          $input.val(value);
        }
      } else if (target === 'plus') {
        if (!this.model.get('animation')) {
          this.$textArousal.val('');
          this.model.set('arousal', null);
        }
        if (value < 1) {
          value = 1;
        } else if (297 < value) {
          value = 297;
          $input.val(value);
        }
      } else {
        if (!this.model.get('animation')) {
          this.$textPlus.val('');
          this.model.set('plus', null);
        }
        if (value < 1) {
          value = 1;
        } else if (9 < value) {
          value = 10;
          $input.val(value);
        }
      }
      if (value) {
        return this.model.set(target, value);
      } else {
        return this.model.set(target, null);
      }
    };

    App.prototype._onClickNoFrame = function(ev) {
      var $input, checked;
      $input = $(ev.target).closest('input');
      checked = $input.prop('checked');
      return this.model.set('noFrame', checked);
    };

    App.prototype._onClickAnimation = function(ev) {
      var $input, checked;
      $input = $(ev.target).closest('input');
      checked = $input.prop('checked');
      return this.model.set('animation', checked);
    };

    return App;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PIG.View.Preview = (function(_super) {
    __extends(Preview, _super);

    function Preview() {
      _ref = Preview.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Preview.prototype.tagName = 'div';

    Preview.prototype.className = 'mod-preview';

    Preview.prototype.CANVAS_SIZE = 98;

    Preview.prototype.icon_size = 180;

    Preview.prototype.initialize = function(attr) {
      this.dragStart = false;
      this.model = attr.model;
      this.$el = $('.frame_area');
      this.el = this.$el.get(0);
      this.encoder = new GIFEncoder();
      this.encoder.setRepeat(0);
      this.encoder.setDelay(2000);
      this._initCanvas();
      this._eventify();
      this._loadImage(this.model.get('iconSrc'), 'icon');
      this._loadImage(this.model.get('path'), 'frame');
      return this._loadImage(this.model.get('arousalSrc'), 'arousal');
    };

    Preview.prototype._eventify = function() {
      var _this = this;
      if (PIG.isMobile()) {
        this.$el.on('touchstart', 'canvas', function(ev) {
          return _this._onDragStart(ev);
        }).on('touchmove', 'canvas', function(ev) {
          return _this._onDragMove(ev);
        }).on('touchend', 'canvas', function(ev) {
          return _this._onDragEnd(ev);
        });
      } else {
        this.$el.on('mousedown', 'canvas', function(ev) {
          return _this._onDragStart(ev);
        }).on('mousemove', 'canvas', function(ev) {
          return _this._onDragMove(ev);
        }).on('mouseup', 'canvas', function(ev) {
          return _this._onDragEnd(ev);
        });
      }
      this.listenTo(this.model, 'change:main', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:sub', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:iconSrc', function() {
        return _this._prepareIcon();
      });
      this.listenTo(this.model, 'ready', function() {
        return _this._loadImage(_this.model.get('path'), 'frame');
      });
      this.listenTo(this.model, 'change:path', function() {
        return _this._loadImage(_this.model.get('path'), 'frame');
      });
      this.listenTo(this.model, 'change:iconPos', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'set:image', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:scale', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:lv', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:plus', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:arousal', function() {
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:mode', function() {
        if (_this.model.get('mode')) {
          return;
        }
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:ready', function() {
        return $('.loading').fadeOut(500);
      });
      this.listenTo(this.model, 'change:size', function() {
        _this.icon_size = _this.model.get('size');
        return _this._drawIcon();
      });
      this.listenTo(this.model, 'change:noFrame', function() {
        return _this._drawIcon();
      });
      return this.listenTo(this.model, 'change:animation', function() {
        return _this._drawIcon();
      });
    };

    Preview.prototype._getCanvasAdjust = function() {
      if (this.icon_size === 180) {
        return 11;
      } else {
        return 6;
      }
    };

    Preview.prototype._isLarge = function() {
      return this.icon_size === 180;
    };

    Preview.prototype._getClientPos = function(ev) {
      var touches;
      ev = ev.originalEvent;
      touches = ev.touches;
      if (touches) {
        return {
          x: touches[0].clientX,
          y: touches[0].clientY
        };
      } else {
        return {
          x: ev.clientX,
          y: ev.clientY
        };
      }
    };

    Preview.prototype._onDragStart = function(ev) {
      if (this.model.get('scale') === 1) {
        return;
      }
      ev.preventDefault();
      this.dragStart = true;
      this.dragStartPos = {
        x: 0,
        y: 0
      };
      return this.dragStartEv = this._getClientPos(ev);
    };

    Preview.prototype._onDragMove = function(ev) {
      var dragDiff, dragEndPos, iconPos, pos;
      ev.preventDefault();
      if (!this.dragStart) {
        return;
      }
      dragEndPos = this._getClientPos(ev);
      dragDiff = {
        x: dragEndPos.x - this.dragStartEv.x,
        y: dragEndPos.y - this.dragStartEv.y
      };
      iconPos = this.model.get('iconPos');
      pos = {
        x: iconPos.x + (this._isLarge() ? dragDiff.x * 2 : dragDiff.x),
        y: iconPos.y + (this._isLarge() ? dragDiff.y * 2 : dragDiff.y)
      };
      this.model.set('iconPos', pos);
      return this.dragStartEv = dragEndPos;
    };

    Preview.prototype._onDragEnd = function(ev) {
      ev.preventDefault();
      if (!this.dragStart) {
        return;
      }
      return this.dragStart = false;
    };

    Preview.prototype._onChangeRange = function(ev) {
      var $range, scale;
      $range = $(ev.target).closest('input');
      scale = parseInt($range.val(), 10);
      return PIG.events.trigger('set:scale', scale);
    };

    Preview.prototype._prepareIcon = function() {
      var chk, file, img,
        _this = this;
      img = new Image();
      file = this.model.get('file');
      if (500000 < parseInt(file != null ? file.size : void 0, 10)) {
        new MegaPixImage(file).render(img, {
          maxWidth: 1280,
          orientation: this.model.get('orientation')
        });
        return (chk = function() {
          if (img.src) {
            return _this._loadImage(img.src, 'icon');
          }
          return setTimeout(chk, 100);
        })();
      } else {
        return this._loadImage(this.model.get('iconSrc'), 'icon');
      }
    };

    Preview.prototype._drawIcon = function(skipRenderPlus) {
      var adjust, base, canvas, canvas_size, ctx, fitHeight, fitPosLeft, fitPosTop, fitWidth, frame, getFitProp, height, icon, iconPos, movedX, movedY, pos, scale, space, width,
        _this = this;
      ctx = this.ctx;
      canvas = this.canvas;
      iconPos = this.model.get('iconPos');
      scale = this.model.get('scale') || 1;
      icon = this.model.get('iconBaseImage');
      width = this.model.get('iconBaseWidth');
      height = this.model.get('iconBaseHeight');
      frame = this.model.get('iconFrameImage');
      fitWidth = void 0;
      fitHeight = void 0;
      fitPosTop = void 0;
      fitPosLeft = void 0;
      canvas_size = void 0;
      adjust = void 0;
      space = void 0;
      pos = void 0;
      base = void 0;
      getFitProp = function() {
        if (_this.model.get('lv') || _this.model.get('plus') || _this.model.get('arousal')) {
          canvas_size = _this.icon_size + _this._getCanvasAdjust();
        } else {
          canvas_size = _this.icon_size;
        }
        ctx.clearRect(0, 0, canvas_size, canvas_size);
        adjust = 98 < canvas_size ? (canvas_size - _this.icon_size) / 2 : 0;
        base = width < height;
        if (base) {
          fitWidth = width * _this.icon_size / height * scale;
          fitHeight = _this.icon_size * scale;
          fitPosTop = 0;
          fitPosLeft = _this.icon_size / 2 - fitWidth / 2 + adjust;
          space = (_this.icon_size - fitWidth) / 2;
          return pos = space + fitWidth;
        } else {
          fitWidth = _this.icon_size * scale;
          fitHeight = height * _this.icon_size / width * scale;
          fitPosTop = _this.icon_size / 2 - fitHeight / 2;
          fitPosLeft = adjust;
          space = (_this.icon_size - fitHeight) / 2;
          return pos = space + fitHeight;
        }
      };
      if (!icon || !frame) {
        return;
      }
      if (this.model.get('scale') === 1) {
        this.model.set('iconPos', {
          x: 0,
          y: 0
        }, {
          silent: true
        });
        getFitProp();
        canvas.setAttribute('width', canvas_size);
        canvas.setAttribute('height', canvas_size);
        ctx.drawImage(icon, movedX, movedY, fitWidth, fitHeight);
        ctx.drawImage(icon, fitPosLeft, fitPosTop, fitWidth, fitHeight);
        ctx.fillStyle = '#ffffff';
        if (base) {
          ctx.fillRect(0, 0, space, this.icon_size);
          ctx.fillRect(pos, 0, space, this.icon_size);
        } else {
          ctx.fillRect(0, 0, this.icon_size, space);
          ctx.fillRect(0, pos, this.icon_size, space);
        }
      } else {
        getFitProp();
        movedX = iconPos.x;
        movedY = iconPos.y;
        canvas.setAttribute('width', canvas_size);
        canvas.setAttribute('height', canvas_size);
        ctx.drawImage(icon, movedX, movedY, fitWidth, fitHeight);
      }
      if (adjust !== 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, (canvas_size - this.icon_size) / 2, this.icon_size);
        ctx.fillRect(canvas_size - (canvas_size - this.icon_size) / 2, 0, (canvas_size - this.icon_size) / 2, this.icon_size);
        ctx.fillRect(0, this.icon_size, canvas_size, canvas_size - this.icon_size);
      }
      ctx.drawImage(frame, adjust, 0, this.icon_size, this.icon_size);
      if (!this._renderOption(skipRenderPlus)) {
        return;
      }
      if (!this._hasTarget()) {
        this.canvas.setAttribute('class', 'default');
      }
      return this._createFile(skipRenderPlus);
    };

    Preview.prototype._renderOption = function(skipRenderPlus) {
      this._onRenderLv();
      if (this.model.get('animation') && this._plusAndArousalState() === 'both') {
        if (!skipRenderPlus) {
          this.encoder.setSize(191, 191);
          this.encoder.start();
          this._onRenderPlus();
          this.encoder.addFrame(this.ctx);
          this._drawIcon(true);
          return false;
        } else {
          this._onRenderArousal();
          this.encoder.addFrame(this.ctx);
          this.encoder.finish();
        }
      } else if (this._plusAndArousalState() === 'plus') {
        this._onRenderPlus();
      } else {
        this._onRenderArousal();
      }
      return true;
    };

    Preview.prototype._plusAndArousalState = function() {
      if (this.model.get('plus') && this.model.get('arousal')) {
        return 'both';
      } else if (this.model.get('plus') && !this.model.get('arousal')) {
        return 'plus';
      } else {
        return 'arousal';
      }
    };

    Preview.prototype._hasTarget = function() {
      return this.model.get('lv') || this.model.get('plus') || this.model.get('arousal');
    };

    Preview.prototype._loadImage = function(src, target) {
      var img, _onImgLoad,
        _this = this;
      img = new Image();
      _onImgLoad = function() {
        if (!_this.model.get('ready')) {
          _this.model.set('ready', true);
        }
        if (target === 'icon') {
          _this.model.set({
            iconBaseWidth: img.width,
            iconBaseHeight: img.height,
            iconBaseImage: img
          });
        } else if (target === 'frame') {
          _this.model.set({
            iconFrameImage: img
          });
        } else {
          _this.model.set({
            iconArousalImage: img,
            iconArousalImageWidth: img.width,
            iconArousalImageHeight: img.height
          });
        }
        _this.model.trigger('set:image');
        img.removeEventListener('load', _onImgLoad);
        return img = null;
      };
      img.src = src;
      return img.addEventListener('load', _onImgLoad, false);
    };

    Preview.prototype._initCanvas = function() {
      this.$canvas = $('canvas');
      this.canvas = this.$canvas.get(0);
      this.ctx = this.canvas.getContext('2d');
      return this.aniGifPreview = $('.ani_gif_preview');
    };

    Preview.prototype._createFile = function(aniGif) {
      var binary_gif, dataURL, fileType;
      if (!aniGif) {
        this.$canvas.show();
        this.aniGifPreview.hide();
        dataURL = this.canvas.toDataURL(this.model.get('type'));
        fileType = this.model.get('type').replace('image/', '') || 'png';
      } else {
        this.$canvas.hide();
        binary_gif = this.encoder.stream().getData();
        dataURL = "data:image/gif;base64, " + (encode64(binary_gif));
        this.aniGifPreview.show().attr({
          width: 104,
          height: 104,
          src: dataURL
        });
        fileType = 'gif';
      }
      return this.trigger('create:file', {
        href: dataURL,
        fileName: "puzzIconGen_" + (+(new Date)) + "_." + fileType
      });
    };

    Preview.prototype._onRenderLv = function() {
      var canvas_size, ctx, fontSize, frontFillStyle, value;
      value = this.model.get('lv');
      canvas_size = this.icon_size + this._getCanvasAdjust();
      fontSize = this.icon_size === 98 ? 22 : 40;
      ctx = this.ctx;
      ctx.font = "" + fontSize + "px kurokane";
      ctx.textAlign = 'center';
      frontFillStyle = '#f0ff00';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 0;
      if (!value) {
        return;
      }
      this.canvas.setAttribute('class', 'large');
      if (value === 99) {
        value = '最大';
      } else {
        frontFillStyle = '#ffffff';
      }
      value = 'Lv.' + value;
      ctx.fillStyle = '#000000';
      ctx.fillText(value, canvas_size / 2 - 2, canvas_size + 2 - 4, 120);
      ctx.fillText(value, canvas_size / 2 - 2, canvas_size - 2 - 4, 120);
      ctx.fillText(value, canvas_size / 2 + 2, canvas_size + 2 - 4, 120);
      ctx.fillText(value, canvas_size / 2 + 2, canvas_size - 2 - 4, 120);
      ctx.fillStyle = frontFillStyle;
      ctx.shadowBlur = 0;
      return ctx.fillText(value, canvas_size / 2, canvas_size - 4, 120);
    };

    Preview.prototype._onRenderPlus = function() {
      var canvas_size, ctx, fontSize, frontFillStyle, value;
      value = this.model.get('plus');
      canvas_size = this.icon_size + this._getCanvasAdjust();
      fontSize = this.icon_size === 98 ? 22 : 44;
      ctx = this.ctx;
      ctx.font = "" + fontSize + "px kurokane";
      ctx.textAlign = 'right';
      ctx.verticalAlign = 'top';
      frontFillStyle = '#f0ff00';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 0;
      if (!value) {
        return;
      }
      this.canvas.setAttribute('class', 'large');
      value = '+' + value;
      ctx.fillStyle = '#000000';
      ctx.fillText(value, canvas_size - 12 - 2, 52 + 2 - 4);
      ctx.fillText(value, canvas_size - 12 - 2, 52 - 2 - 4);
      ctx.fillText(value, canvas_size - 12 + 2, 52 + 2 - 4);
      ctx.fillText(value, canvas_size - 12 + 2, 52 - 2 - 4);
      ctx.fillStyle = frontFillStyle;
      ctx.shadowBlur = 0;
      return ctx.fillText(value, canvas_size - 12, 52 - 4);
    };

    Preview.prototype._onRenderArousal = function() {
      var adjustLeft, adjustTop, canvas_size, ctx, fontSize, frontFillStyle, value;
      value = this.model.get('arousal');
      canvas_size = this.icon_size + this._getCanvasAdjust();
      fontSize = this.icon_size === 98 ? 22 : 38;
      ctx = this.ctx;
      ctx.textAlign = 'right';
      ctx.verticalAlign = 'top';
      frontFillStyle = '#f0ff00';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 0;
      if (!value) {
        return;
      }
      this.canvas.setAttribute('class', 'large');
      adjustLeft = -22;
      adjustTop = 42;
      if (value === 10) {
        adjustLeft = -18;
        adjustTop = 40;
        fontSize = fontSize - 2;
        value = '★';
      }
      ctx.drawImage(this.model.get('iconArousalImage'), canvas_size - this.model.get('iconArousalImageWidth') + 5, 0, this.model.get('iconArousalImageWidth') - 10, this.model.get('iconArousalImageHeight') - 10);
      ctx.font = "" + (fontSize + 4) + "px kurokane";
      ctx.fillStyle = '#000000';
      ctx.fillText(value, canvas_size + adjustLeft - 2, adjustTop + 3, fontSize - 3);
      ctx.fillText(value, canvas_size + adjustLeft - 2, adjustTop - 0, fontSize - 3);
      ctx.fillText(value, canvas_size + adjustLeft - 0, adjustTop - 0, fontSize - 3);
      ctx.fillText(value, canvas_size + adjustLeft + 2, adjustTop + 3, fontSize - 3);
      ctx.fillText(value, canvas_size + adjustLeft + 2, adjustTop + 2, fontSize - 3);
      ctx.fillText(value, canvas_size + adjustLeft + 2, adjustTop - 0, fontSize - 3);
      ctx.font = "" + fontSize + "px kurokane";
      ctx.fillStyle = frontFillStyle;
      ctx.shadowBlur = 0;
      return ctx.fillText(value, canvas_size + adjustLeft - 1, adjustTop, fontSize - 3);
    };

    return Preview;

  })(Backbone.View);

}).call(this);
