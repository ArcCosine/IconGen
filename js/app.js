/**
 * Application
 *
 * @author     Hiroshi Hoaki <rewish.org@gmail.com>
 * @copyright  (c) 2012 Rewish
 * @license    http://rewish.org/license/mit The MIT License
 * @link       http://rewish.github.com/IconGen/
 */
;(function() {
  if (!IconGen || !IconGen.isSupport) {
    return;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var main     = document.getElementById('ig-main'),
      drawArea   = document.getElementById('ig-drawArea'),
      drawSize   = document.getElementById('ig-drawSize'),
      result     = document.getElementById('ig-result'),
      realSize   = document.getElementById('ig-realSize'),
      upload     = document.getElementById('ig-upload'),
      fileField  = document.getElementById('ig-fileField'),
      frameList  = document.getElementsByName('frame'),
      controls   = document.getElementById('ig-controls'),
      download   = document.getElementById('ig-download'),
      exit       = document.getElementById('ig-exit'),
      iconGen    = new IconGen(result, {
        framePaths: frameList,
        onFileTypeError: function() {
          alert('画像にしなはれや！');
        },
        onRender: function() {
          drawArea.style.display = 'block';
          if (controls) {
            controls.style.display = 'block';
          }
          if (upload) {
            upload.style.display = 'none';
          }
        },
        onRendered: function(drawInfo) {
          realSize.innerHTML = drawInfo.width + 'x' + drawInfo.width;
          download.href = this.getFileURL();
          download.download = this.getFileName();
        },
        onExit: function() {
          drawArea.style.display = 'none';
          if (controls) {
            controls.style.display = 'none';
          }
          if (upload) {
            upload.style.display = 'block';
          }
        }
      });

    main.addEventListener('dragover', function(event) {
      event.preventDefault();
      event.stopPropagation();
    }, false);

    main.addEventListener('drop', function(event) {
      event.preventDefault();
      event.stopPropagation();
      iconGen.readFile(event.dataTransfer.files[0]);
    }, false);

    fileField.addEventListener('change', function() {
      iconGen.readFile(this.files[0]);
    }, false);

    for ( var i = 0, l = frameList.length; i < l; i++ ) {
      frameList[i].setAttribute('data-index', i);
      frameList[i].addEventListener('click', function() {
        iconGen.changeFrame(this.getAttribute('data-index'));
      }, false);
    }

    drawSize.addEventListener('change', function() {
      iconGen.setDrawSize(this.value);
      iconGen.render();
    }, false);

    // Initialize for Firefox
    drawSize.onchange && drawSize.onchange();

    exit.addEventListener('click', function() {
      iconGen.exit();
    }, false);
  }, false);
}());
