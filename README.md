# spa
Next.jsで構築したWebサーバーモジュール。

- HTMLレンダリング：CSR方式
- Storybook/Chromatic/Jest/ESLint/Sass/VSCode/Redux

HTMLのレンダリングにSSRを採用しないのにNext.jsの利用を決めた理由としては下記があげられる。

- SSRではスクリプトがサーバーとブラウザの両方で実行されるため処理フローがかなり複雑であると感じた
- awsインスタンス上でレンダリング方式ごと（SSR/SSG/CSR）にCore Web Vitalsの測定を行った結果、ブラウザでレンダリングを行うCSRでも十分に高速にレンダリング可能であると判断したから
- プライベートインスタンス上のAPIサーバーと唯一つながるWEBサーバーを導入したかったから
- 勉強のため

## How to use
まず最初に下記のコマンドを実行しspaレポジトリをクローンします。  
```
git clone https://github.com/altair-development/spa.git
```
次にspaフォルダに移動します。
```
cd spa
```
モジュールの実行に必要なnpmライブラリをインストールします。
```
npm ci
```
`.env.local`ファイルを追加し、各種環境変数の値を設定します。

下記コマンドを実行しNext.jsサーバーを開発モードで起動します。
```
npm run dev
```
正常に起動すると下記のようなメッセージがコマンドに出力されます。
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
ブラウザから`http://localhost:3000`にアクセスして画面が表示されれば起動成功です。

または下記コマンドを実行しstorybookサーバーを起動します。
```
npm run storybook
```
正常に起動すると下記のようなメッセージがコマンドに出力されます。
```
Storybook 6.5.16 for React started
16 s for manager and 26 s for preview
 Local:            http://localhost:6006/
 On your network:  http://172.24.80.1:6006/
A new version (7.1.1) is available!
Upgrade now: npx storybook@latest upgrade
Read full changelog: https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md
```
ブラウザから`http://localhost:6006`にアクセスして画面が表示されれば起動成功です。
