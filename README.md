# wct2017

A WordPress theme for WordCamp 2017

## デザインと入稿要素

このテーマでは、ウィジェットやメニューにこういう指定をするとこうなるという変な仕組みがあります。

- メニュー名を `circle-menu` にして、アフターヘッダーウィジェットに挿入すると、丸いなんかあれなやつになります。
  - さらにそれぞれのメニューにカスタムクラスをつけると、なんかいい感じになります。
  - ticket チケットのアイコン
  - ticket-no カミングスーンのチケット
  - thumb 親指立ててるやつ
  - access マップアイコン
- メニュー名を `line-menu` にしてアフターヘッダーウィジェットに入れると、サブメニューになります。


## 前提知識

このテーマは[WordCamp Tokyo 2017](https://2017.tokyo.wordcamp.org)のテーマです。

WordCampサイトには以下の制約があります。

- マルチサイトである
- 新たにテーマをインストールすることはできず、既存テーマから選択するだけ
- PHPやJavascriptを追加することは一切できない
- 可能なのはカスタムCSSを読み込むことだけ。このカスタムCSSは外部URLを設定できるので、このGithubリポジトリから読み込むことができます。

詳細については2015, 2016のWeb制作を担当した羽野さんのブログ記事「[WordCamp Tokyo 2015のサイトデザインについてのおはなし ](https://www.asknode.net/wordcamp-tokyo-2015-theme-design/)」を読んでください。フォーク済みのリポジトリは[こちら](https://github.com/wctokyo2017/wct2016)です。

## セットアップ方法

### WordPressサイトの設定

VCCWをクローンしているので、それをダウンロードしてください。

[wct2017/vccw](https://github.com/wctokyo2017/vccw)

```
git clone git@github.com:wctokyo2017/vccw.git ./wct2017-vccw
```

これで、以下の設定が行われます。

- WordPressマルチサイトのインストール
- 必要なプラグインを諸々インストール
- 必要な親テーマをインストール
- このテーマリポジトリをインストールし、有効化

成功すれば、 `https://wctokyo2017.dev` でアクセスします。証明書のエラーは無視してください。

もし失敗した場合は、このリポジトリ[wct2017/vccw](https://github.com/wctokyo2017/wct2017/issues) にイシューとして登録してください。

### テーマのビルド

このテーマを初期化するにはnpmが必要です。

```
npm install
```

### ファイルのビルドと監視

```
npm start
```

上記のコマンドを入力すると、各種ファイルが書き出され、監視が始まります。

### 静的HTMLによる確認

`src/pug`ディレクトリにあるファイルは `dist`フォルダにHTMLとしてコンパイルされ、BrowserSyncで監視することができます。

```
npm run server
```

### 本番環境へのデプロイ

デプロイメントといっても、CSSが変わるだけです。リリースはmasterブランチの `docs` フォルダにて行います。

コンテンツ（サイドバー、メニュー、ウィジェットなど）の適用とCSSの適用を両方行って初めてコンテンツ公開となるので、できる限りCSSを冗長化させてください。要するに、CSSとコンテンツを同時に更新しないと適用されないのは好ましくないということです。

次のコマンドで、デプロイ用のファイルが書き出されます。

```
npm run production
```

本番用のリソースは静的なHTMLとして Github Pages にデプロイされます。

[wctokyo2017.github.io/wct2017/](https://wctokyo2017.github.io/wct2017/)

WordCamp用サイトは以下のCSSを参照することで、デザインが適用されます。

https://wctokyo2017.github.io/wct2017/assets/css/style.css

## 依存技術

- [Boubon](http://bourbon.io) & [Neat](http://neat.bourbon.io)
- [FontAwesome](http://fontawesome.io)

## 貢献するには

[issues](https://github.com/wctokyo2017/wct2017/issues)から問題点を報告してください。
もしくは、プルリクエストを送ってください。

## ライセンス

GPL 3.0またはそれ以降です。
