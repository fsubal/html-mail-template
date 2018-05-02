### 必要なもの

- `yarn` https://yarnpkg.com/ja/docs/install#mac-stable
- `bundler` http://bundler.io/

### setup

- `bundle install`
- `yarn install`

### メールを書く

`./src` 以下に pug ファイルで書く。

繰り返しのあるデータを書きたい場合は、`./src/model` 内に JSON5 をテンプレートと同じ名前で置く。

### メールをコンパイルする

```
yarn compile
```

HTMLメールは基本インラインスタイルで作る必要がある。

このリポジトリでは、 `premailer` を用いて、CSS ファイルをインラインスタイルに展開する

### 表示確認

各種端末で崩れないかの確認はSendGridの管理画面がおすすめ。

それ以外の、開発中にちょっと見たいというケースでは `php -S localhost:8000` でも使用して下さい
