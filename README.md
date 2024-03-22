## テーブル行のテキストカラムをすべてリンクにするライブラリ

## 設定

### `new TableRowLink()` - コンストラクタ

初期設定

|#|型|デフォルト値|概要|
|-:|-|:-:|-|
|1|`Object`\|`String`|-|テーブル要素(HTMLElement or Selector)|


### `run()`

実行する関数

|#|型|デフォルト値|概要|
|-:|-|:-:|-|
|1|`Number`|`0`|行内のn - 1個目のリンク|
|2|`Boolean`|`false`|別タブで開く|


## 使用方法

予め`/dist/table-row-link.min.js`を読み込んでください。

### 読込み方法

* HTML  
  ```html
  <script src="path/to/dist/table-row-link.min.js"></script>
  ```
* ESM(module)  
  ```javascript
  import TableRowLink from 'path/to/src/table-row-link.min.js'
  ```


### サンプル

1. コンストラクタにHTMLElementを指定する場合  
    ```javascript
    // IDで要素を取得
    const tableElement = document.getElementById('table');
    // const tableElement = document.querySelector('#table'); // <- これでも可

    // クラスで要素を取得
    // const [tableElement] = document.getElementsByClassName('table');
    // const tableElement = document.querySelector('.table'); // <- これでも可

    // タグ名で取得
    // const [tableElement] = document.getElementsByTagName('table');
    // const tableElement = document.querySelector('table');  // <- これでも可

    const trl = new TableRowLink(tableElement)
    trl.run()
    ```
2. コンストラクタにセレクタを指定する場合  
    ```javascript
    // IDで要素を取得
    const trl = new TableRowLink('#table')

    // クラスで要素を取得
    // const trl = new TableRowLink('.table')

    trl.run()
    ```
3. 行内に複数のリンクが存在し、列の左から2個目に存在するリンクを行のリンクにする場合  
    ```javascript
    const trl = new TableRowLink('#table')

    // 0を1個目とし、2個目は1となる
    trl.run(1)
    ```
4. 別タブで開く  
    ```javascript
    const trl = new TableRowLink('#table')

    // 第2引数に`true`を指定
    trl.run(0, true)
    ```