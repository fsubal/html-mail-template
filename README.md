### 必要なもの

- `yarn` https://yarnpkg.com/ja/docs/install#mac-stable
- `bundler` http://bundler.io/

### setup

- `yarn install`
- `bundle install`

### メールを書く

`./src` 以下に pug ファイルで書きます。

繰り返しのあるデータを書くために、`./src/model` 内に JSON5 をテンプレートと同じ名前で置いて下さい。

面倒なら以下のコマンドを叩いて下さい。いい感じにファイルが生成されます

```
yarn scaffold -- [name]
```

### メールをコンパイルする

```
yarn compile
```

HTMLメールは基本インラインスタイルで作る必要があります。

このリポジトリでは、 `premailer` を用いて、CSS ファイルをインラインスタイルに展開しています

https://github.com/premailer/premailer

### 表示確認

各種端末で崩れないかの確認は Litmus なり SendGrid の管理画面なりを使って下さい。

それ以外の、開発中にちょっと見たいというケースではブラウザで `./dist` 内のHTMLを表示して下さい。
