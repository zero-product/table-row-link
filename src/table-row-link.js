/** ***************************************************************************
 * テーブル行をリンクにする
 * @param {Object|String} tableElement - テーブル要素 or テーブル要素のセレクタ
 *************************************************************************** */
const TableRowLink = class {
  target = ''

  constructor(tableElement) {
    // テーブル要素を格納
    this.target = typeof tableElement == 'string' ? document.querySelector(tableElement) : tableElement
  }

  /** ***************************************************************************
   * 実行
   * @param {Number} targetLinkNum  - n個目のリンク
   * @param {Boolean} blank         - 別タブで開く
   *************************************************************************** */
  run (targetLinkNum = 0, blank = false) {
    if (!this.target) return

    // テーブルボディ取得
    const tbody = this.target.querySelector('tbody')
    if (!tbody) return

    // tr(行)タグ
    const rows = tbody.querySelectorAll('tr')

    // 行ループ
    for (const row of rows) {
      const linkEl = row.querySelectorAll('a')[targetLinkNum]
      const url = linkEl.href // URLを取得

      // tr,td(列)タグ
      const cols = [...row.querySelectorAll('th'), ...row.querySelectorAll('td')]

      // 列ループ
      for (const col of cols) {
        // input, button, aタグが存在する場合はスキップ
        if (col.querySelector('input') || col.querySelector('button') || col.querySelector('a')) continue

        // セル内テキスト
        const text = col.innerText

        // 新しい<a>要素を作成
        const _link = document.createElement('a');
        _link.href = url;
        _link.textContent = text;

        if (blank) {
          _link.target = '_blank';            // 新しいタブでリンクを開くように設定
          _link.rel = 'noopener noreferrer';  // セキュリティ上の理由でrel属性を設定
        }

        col.innerHTML = '';     // 既存のコンテンツをクリア
        col.appendChild(_link); // 新しいaタグを追加
      }
    }
  }
}

export default TableRowLink