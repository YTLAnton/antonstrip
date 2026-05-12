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

## 五、底部黑條再次出現（viewport-fit=cover 造成的根本問題）

### 問題描述
在先前修復（一）之後，底部黑條問題持續出現。無論如何調整 `body` 背景色或 `#tab-bar` 的 `padding-bottom`，黑條仍然存在。

### 根本原因分析

問題來自 `viewport-fit=cover` 這個設定：

- `viewport-fit=cover` 讓 App 的 viewport（畫面可用區域）延伸到 iOS 底部的 home indicator（小橫條）底下
- 因此需要用 `padding-bottom: env(safe-area-inset-bottom)` 手動在 `#tab-bar` 補出空間
- 但這塊補出的空間，若因任何瀏覽器 layout engine 的微小偏差、或 `overflow: hidden` 的裁切，導致 `body` 背景色從縫隙透出，就會出現黑條
- `body` 背景色（`#121212`）與 `#tab-bar` 背景色（`#1e1e1e`）有微小色差，使黑條在高解析螢幕上清晰可見

### 為什麼之前把 body 改成 `var(--surface)` 也沒用？
即使讓 `body` 背景色和 tab bar 相同，`viewport-fit=cover` 本身讓 viewport 延伸到 home indicator 底下這件事沒有改變，OS 不再負責那塊區域，App 自己管理，管理不完美就有黑條。

### 真正的修復方式

**移除 `viewport-fit=cover`**

```html
<!-- 修改前 -->
<meta name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

<!-- 修改後 -->
<meta name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 移除後的行為對照

| 項目 | 有 `viewport-fit=cover` | 移除後 |
|---|---|---|
| 頂部 status bar | App 延伸進去，需 `env(safe-area-inset-top)` | `black-translucent` 自動讓內容延伸，`env(safe-area-inset-top)` **依然有效** |
| 底部 home indicator | App 延伸進去，需手動補 padding → **黑條來源** | OS 自動處理，自動以 App 最底部顏色填滿 → **無黑條** |

### 重點說明

`env(safe-area-inset-top)`（用於 header 頂部 padding）在 **PWA standalone 模式 + `black-translucent`** 的組合下，**不需要 `viewport-fit=cover` 也能正常運作**。因為 `black-translucent` 本身就讓 PWA 的內容延伸到 status bar 底下，OS 會提供正確的 `safe-area-inset-top` 值給 CSS 使用。

這也是參考網站（Pikmin Bloom 飾品圖鑑）的做法：使用 `black-translucent`，但沒有 `viewport-fit=cover`，底部完全沒有黑條。

---

## 適用範圍

以上修改均已同步套用至全部四個行程頁面：

- `2026_04_HK/index.html`
- `2026_04_MO/index.html`
- `2026_05_Singapore/index.html`
- `2026_07_AKAME/index.html`
