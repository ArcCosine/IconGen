class PIG.Controller.Initializer extends PIG.Controller.Base

  initialize: ->

    if ( typeof window.FileReader is 'undefined' )
      return $('body').html(@notSupported)

    if ( PIG.isMobile() )
      $('html').addClass('sp')

    webfontText = 'Lv.0123456789最大+ダウンロードお@shimaelrw写真をえらぶ拡待ちくださいアイコンの大きフレーム外す'

    # KurokaneStd-EBサブセットの読み込み
    FONTPLUS.load([
      {
        fontname: 'KurokaneStd-EB'
        # font-family: kurokane で利用できる
        nickname: 'kurokane'
        # 'aAあ': http://pr.fontplus.jp/api/
        text: webfontText + 'aAあ'
      }
    ], =>
      view = new PIG.View.App()
    )

  notSupported: '''
  <div class="not-supported">
    <p>パズドラ風アイコンジェネレーターは<br>
    お使いの端末には対応していません。<br>
    対応端末は以下の通りです。</p>
    <h3>PC/Mac</h3>
    <ul>
      <li>Google Chromeの最新版</li>
      <li>Safariの最新版</li>
      <li>Firefoxの最新版</li>
    </ul>
    <h3>モバイル端末</h3>
    <ul>
      <li>iOS6以上のSafari</li>
      <li>Android4.x以上の標準ブラウザ</li>
    </ul>
    <p>お手数ですが、対応端末でご利用ください。</p>
  </div>
'''