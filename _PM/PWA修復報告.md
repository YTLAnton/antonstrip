# PWA 修復報告

**專案**：antonstrip 行程網頁  
**日期**：2026-04-30  
**涉及檔案**：`2026_04_HK`、`2026_04_MO`、`2026_05_Singapore`、`2026_07_AKAME` 的 `index.html`

---

## 一、底部黑色區塊（PWA 主畫面模式）

### 問題描述
將網頁以「加入主畫面」方式在 iOS 安裝為 PWA 後，底部出現一條黑色區塊遮擋畫面內容，無法完整利用螢幕空間。

### 原因分析
- `#app` 使用 `min-height: 100dvh`，代表「至少」viewport 高度，但不限制最大高度
- `html / body` 未設定 `overflow: hidden`
- 在 iOS PWA 全螢幕模式下，瀏覽器 layout engine 計算 viewport 時會有微小偏差，導致 `#app` 超出可視範圍，`body` 的黑色背景（`#121212`）從底部露出

### 修復方式

```css
/* 修改前 */
html, body {
  height: 100%;
}
#app {
  min-height: 100dvh;
  overflow-x: hidden;
}

/* 修改後 */
html, body {
  height: 100%;
  overflow: hidden;       /* 新增：防止 body 露出底色 */
}
#app {
  height: 100dvh;         /* 改為精確高度，不允許超出 */
  overflow: hidden;       /* 改為雙軸鎖定 */
}
```

---

## 二、捲動時上方區塊閃動（收起/展開）

### 問題描述
在手機版本 Day 2 往下滑時，上方的卡片區塊會無限次收起與展開、閃動。

### 原因分析
Header 有一個 scroll 監聽器，在 `scrollTop > 60` 時加入 `.compact` class，`scrollTop < 20` 時移除。`.compact` 會隱藏 subtitle、badges 等元素，使 `#header` 高度縮小，`#main`（`flex: 1`）高度隨之增加。在 iOS 的動量捲動（kinetic scroll）機制下，container 尺寸改變可能觸發非預期的 scroll event，造成 compact 狀態快速振盪，視覺上表現為卡片不斷收起展開。

### 修復方式
完整移除 Header compact 功能（JS 監聽器 + CSS 規則），Header 改為固定顯示。

**移除的 JS：**
```javascript
// 已移除
let _headerCompact = false;
document.getElementById('main').addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (!_headerCompact && this.scrollTop > 60) {
    _headerCompact = true;
    header.classList.add('compact');
  } else if (_headerCompact && this.scrollTop < 20) {
    _headerCompact = false;
    header.classList.remove('compact');
  }
});
```

**移除的 CSS：**
```css
/* 以下三段全部移除 */
#header.compact { padding-bottom: 8px; }
#header.compact #header-subtitle, #header.compact #header-badges { display: none; }
#header.compact #search-wrap { margin-top: 6px; }
```

---

## 三、分組行程空白欄位呈現黑色

### 問題描述
點擊「全部展開」後，分組行程（split-group）中內容較少的欄位，下方出現大片黑色空白。

### 原因分析
CSS Grid 預設 `align-self: stretch`，所有欄位高度對齊最高的那欄。內容少的欄位被撐高，空白部分透出 `#app` 背景色（近黑色），視覺上形成黑色空欄。

### 修復方式
為 `.split-col` 加上 `background: var(--surface)`（`#1e1e1e`，深灰），讓空白區域以灰色填滿而非透出黑色背景。（同時移除先前加的 `align-self: start`，改回 stretch 讓各欄等高，保持整齊。）

```css
/* 修改後 */
.split-col {
  border-right: 1px solid var(--border);
  min-width: 0;
  overflow: hidden;
  background: var(--surface);   /* 新增 */
}
```

---

## 四、其他 UI 改善（同步套用至全部行程）

| 項目 | 改動說明 |
|------|---------|
| 卡片箭頭（chevron） | 字體從 `0.8rem` 放大至 `1.65rem`；顏色從 `--text-3` 改為 `--text-2`；加上 `display: flex; align-items: center; line-height: 1` 修正垂直置中 |
| 給司機看彈窗 | 移除「確定」按鈕，保留右上角 ✕ 與點擊視窗外關閉 |

---

## 適用範圍

以上修改均已同步套用至全部四個行程頁面：

- `2026_04_HK/index.html`
- `2026_04_MO/index.html`
- `2026_05_Singapore/index.html`
- `2026_07_AKAME/index.html`
