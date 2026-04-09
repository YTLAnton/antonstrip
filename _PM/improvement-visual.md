# antonstrip 視覺改進計畫

**版本**: v1.1 ｜ **日期**: 2026-04-09 ｜ **參考來源**: 貴州全家行程頁面

---

## 架構限制（開發前必讀）

- 單一 `.html` 檔案，禁止引入外部 JS/CSS（字型例外，見功能 9）
- 圖片建議放在同 repo 的 `assets/` 資料夾，以相對路徑引用（`imageUrl: assets/img.jpg`）
- 維持 mobile-first 深色主題
- MD 解析核心為 `parseKeyValues()`，讀取 `key: value` 行格式

---

## 一、建議實作功能

---

### 功能 1 ｜ 景點圖片卡

**是什麼**
在活動卡片內嵌入圖片，底部有漸層遮罩疊加景點名稱。支援兩種尺寸：標準（175px）與小型（130px）。

**為什麼適合**
目前純文字為主，視覺識別性弱。圖片卡是所有改進中視覺衝擊最大的單一功能，讓使用者快速滑動時即可辨認景點。

**實作方式**
1. `parseKeyValues()` 本身無需修改（已支援任意 `key: value`）
2. 在卡片渲染函式中偵測 `act.imageUrl`，若存在則在卡片頂端插入：
   ```html
   <div class="si-wrap">
     <img src="{imageUrl}" alt="{name}" loading="lazy">
     <div class="si-label">{name}</div>
   </div>
   ```
3. CSS：
   ```css
   .si-wrap { position: relative; overflow: hidden; height: 175px; border-radius: 8px; margin-bottom: 10px; }
   .si-wrap img { width: 100%; height: 100%; object-fit: cover; }
   .si-label { position: absolute; bottom: 0; left: 0; right: 0;
     background: linear-gradient(transparent, rgba(0,0,0,0.7));
     color: #fff; padding: 8px 10px; font-size: 0.85rem; font-weight: bold; }
   .si-wrap.si-sm { height: 130px; }
   ```

**新增 MD 欄位**
```
imageUrl: https://i.imgur.com/abc.jpg
imageSize: small   # 可選，預設 regular
```

| 難度 | 影響 |
|------|------|
| 低   | 高   |

---

### 功能 2 ｜ Lightbox 全螢幕圖片檢視

**是什麼**
點擊圖片後以全螢幕遮罩顯示放大圖片，點擊遮罩或按 ✕ 關閉。純 CSS + JS，無外部依賴。

**為什麼適合**
讓使用者在需要時看清地圖截圖、門票 QR code 等細節。與功能 1 天然配套，一起實作成本接近零。

**實作方式**
1. 在 `<body>` 末尾加入 Lightbox 容器：
   ```html
   <div id="lightbox" style="display:none">
     <img id="lightbox-img">
     <button id="lightbox-close">✕</button>
   </div>
   ```
2. CSS：
   ```css
   #lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92);
     display: flex; align-items: center; justify-content: center; padding: 48px 16px; }
   #lightbox-img { max-width: 100%; max-height: 90vh; object-fit: contain; border-radius: 4px; }
   #lightbox-close { position: fixed; top: 12px; right: 12px; width: 40px; height: 40px;
     border-radius: 50%; border: none; background: rgba(255,255,255,0.9);
     font-size: 1.2rem; cursor: pointer; }
   ```
3. JS：對所有 `.si-wrap img` 加 click 事件，將 `src` 傳入 `#lightbox-img` 並顯示；點擊關閉按鈕或遮罩時隱藏

**新增 MD 欄位**：無，與功能 1 的 `imageUrl` 共用

| 難度 | 影響 |
|------|------|
| 低   | 中   |

---

### 功能 3 ｜ 捲動淡入動畫

**是什麼**
使用 `IntersectionObserver`，卡片進入視窗時從 `opacity: 0; translateY(30px)` 漸變為完全顯示，動畫時長 0.6s。

**為什麼適合**
行程頁面以長列表為主，淡入動畫讓逐步閱讀體驗更精緻，純 CSS + Web API 實作，無任何依賴。

**實作方式**
1. CSS：
   ```css
   .fade-in-up { opacity: 0; transform: translateY(28px);
     transition: opacity 0.6s ease, transform 0.6s ease; }
   .fade-in-up.visible { opacity: 1; transform: translateY(0); }
   @media (prefers-reduced-motion: reduce) {
     .fade-in-up { opacity: 1; transform: none; transition: none; } }
   ```
2. 對每張活動卡片根元素加 `class="... fade-in-up"`
3. 在所有卡片渲染完畢後執行：
   ```javascript
   const obs = new IntersectionObserver(entries => {
     entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
   }, { threshold: 0.08 });
   document.querySelectorAll('.fade-in-up').forEach(el => obs.observe(el));
   ```

**新增 MD 欄位**：無，全局套用

| 難度 | 影響 |
|------|------|
| 低   | 中   |

---

### 功能 4 ｜ 重點文字標記效果

**是什麼**
兩種內聯文字強調樣式：螢光筆黃底（`==文字==`）和粉色底線（`~~文字~~`），在 `description` 欄位值中使用。

**為什麼適合**
行程說明中常需標示重要資訊（如「提前 30 分鐘到場」），目前只有粗體可用，視覺層次不足。

**實作方式**
1. CSS：
   ```css
   .hl-y { background: linear-gradient(transparent 55%, rgba(255,210,0,0.32) 55%); padding: 0 2px; }
   .hl-p { border-bottom: 2px solid rgba(255,110,140,0.75); padding-bottom: 1px; }
   ```
2. 在將 `description` 轉為 HTML 的步驟中加入正規表達式替換：
   ```javascript
   text = text.replace(/==(.+?)==/g, '<span class="hl-y">$1</span>');
   text = text.replace(/~~(.+?)~~/g, '<span class="hl-p">$1</span>');
   ```

**MD 使用範例**
```
description: 晚上有==免費光影秀==，~~入場需憑票~~
```

| 難度 | 影響 |
|------|------|
| 低   | 低   |

---

### 功能 5 ｜ 多圖片支援（最多 3 張）

**是什麼**
單一活動支援 1–3 張圖片，依數量自動切換排版：1 張全寬、2 張並排、3 張一大二小。

**為什麼適合**
餐廳、景點常需展示多角度（門口 + 菜色 + 內部），或地圖截圖配照片。

**實作方式**
1. 新增欄位 `imageUrl2`、`imageUrl3`，命名符合現有 `key: value` 格式
2. CSS grid 依圖片數量切換：
   ```css
   .si-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
   .si-grid-3 .si-main { height: 130px; }
   .si-grid-3 .si-sub { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
   .si-grid-3 .si-sub .si-wrap { height: 100px; }
   ```
3. 渲染函式依 `imageUrl2`、`imageUrl3` 是否存在動態選擇 grid 結構

**新增 MD 欄位**
```
imageUrl2: https://...
imageUrl3: https://...
```

| 難度 | 影響 |
|------|------|
| 中   | 中   |

---

### 功能 6 ｜ 格線背景

**是什麼**
在 `body` 背景疊加兩層 `linear-gradient` 畫出淡淡方格紙紋路，給頁面手帳質感。純 CSS，零成本。

**實作方式**
```css
body {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}
```
深色主題下調低透明度（0.03–0.05），讓格線若隱若現即可。

**新增 MD 欄位**：無

| 難度 | 影響 |
|------|------|
| 低   | 低   |

---

### 功能 7 ｜ 卡片 Hover 微抬效果

**是什麼**
滑鼠移入活動卡片時，卡片向上位移 2px 並加深陰影，模擬「被拿起」的觸感。手機無 hover，不影響主要使用場景，電腦版瀏覽體驗明顯提升。

**實作方式**
在現有 `.card` 或活動卡片 class 加入：
```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
```

**新增 MD 欄位**：無

| 難度 | 影響 |
|------|------|
| 低   | 低   |

---

### 功能 8 ｜ 時間波浪底線

**是什麼**
活動卡片上的時間數字（`08:00`）加上彩色波浪底線，視覺上比純粗體更有手寫感，且能與一般文字做出層次區分。

**實作方式**
在渲染時間的 HTML 元素加上 class，CSS 使用：
```css
.time-tag {
  text-decoration: underline wavy;
  text-decoration-color: var(--primary);   /* 沿用現有主色 */
  text-underline-offset: 3px;
  font-weight: bold;
}
```
也可依活動類型選用不同顏色（交通用藍、飲食用橘等）。

**新增 MD 欄位**：無

| 難度 | 影響 |
|------|------|
| 低   | 中   |

---

### 功能 9 ｜ 手寫字體（LXGW WenKai TC）

**是什麼**
從 Google Fonts 載入「霞鶩文楷 TC」字體，賦予頁面手帳日記風格。這是參考頁面視覺個性最強烈的來源，主要用於標題（Day 1、行程名稱）。

**與架構的衝突與取捨**
- 需要從 Google Fonts 引入，是唯一需要外部載入的改動
- 字型屬於靜態資源，不影響 JS 邏輯與安全性
- 頁面在字型載入前會 fallback 到系統字型，功能完全正常
- 建議只在標題層級套用，內文保持系統字型以確保可讀性與速度

**實作方式**
在 `<head>` 加入：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap" rel="stylesheet">
```
CSS：
```css
h1, h2, .day-title {
  font-family: 'LXGW WenKai TC', var(--existing-font-stack);
}
```

**新增 MD 欄位**：無

| 難度 | 影響 |
|------|------|
| 低   | 高（整體氣質改變最大）|

---

### 功能 10 ｜ Keywords 標籤 Badges

**是什麼**
將 frontmatter 的 `keywords` 陣列渲染成膠囊形狀的 tag badges，顯示在頁面標題區域下方（如「自由行」「台鐵」「步行」）。參考頁面用於「小孩友善」「老人友善」等屬性標示。

**為什麼適合**
`keywords` 欄位目前已存在於所有行程的 frontmatter，但目前渲染方式待確認，若尚未以視覺化方式呈現，badge 樣式可立即提升標題區資訊密度。

**實作方式**
```css
.keyword-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.07);
  font-size: 0.75rem;
  color: var(--text-2);
  margin: 2px;
}
```
在 JS 渲染 header 時，遍歷 `trip.keywords` 陣列逐一產生 badge。

**新增 MD 欄位**：無（`keywords` 已存在）

| 難度 | 影響 |
|------|------|
| 低   | 中   |

---

### 功能 11 ｜ 電腦版寬螢幕 RWD 佈局

**是什麼**
電腦版（`≥ 768px`）改為真正的寬螢幕佈局，移除目前 430px 手機框限制，讓頁面填滿瀏覽器寬度。手機版行為完全不變。採用 RWD 雙欄設計：左側固定欄位顯示日期導覽與行程概覽，右側主區域顯示當日活動卡片。

**為什麼需要**
目前電腦版只是把手機版置中，螢幕左右有大量空白。寬螢幕佈局讓電腦版體驗從「湊合看」升級為「真正好用」，特別適合出發前在電腦上規劃行程時使用。

**佈局設計方案**

```
電腦版（≥ 768px）
┌─────────────────────────────────────────┐
│  Header（全寬）                          │
├──────────────┬──────────────────────────┤
│  左側欄      │  右側主區域               │
│  240px 固定  │  flex: 1                  │
│              │                           │
│  • Day 1     │  ### 景點 | 濱海灣花園    │
│  • Day 2     │  time: 15:00              │
│  • Day 3     │  ...                      │
│              │                           │
│  天氣資訊    │  ### 飲食 | 天天海南雞飯  │
│  行程概覽    │  ...                      │
└──────────────┴──────────────────────────┘

手機版（< 768px）：完全不變
```

**關鍵 CSS 結構**

```css
/* 手機：現有佈局不動 */
#app { width: 100%; }

/* 電腦版：解除寬度限制，改為雙欄 */
@media (min-width: 768px) {
  #app {
    max-width: 100%;          /* 移除 430px 限制 */
    display: grid;
    grid-template-rows: auto 1fr;
  }
  #header { grid-column: 1 / -1; }   /* header 跨全寬 */

  #main-layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 0;
    max-width: 1200px;        /* 超寬螢幕仍有上限 */
    margin: 0 auto;
    width: 100%;
  }

  #sidebar {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow-y: auto;
    border-right: 1px solid var(--border);
    padding: 16px 12px;
  }

  #content-area {
    padding: 20px 24px;
    overflow-y: auto;
  }
}
```

**JS 端調整重點**

1. 日期 tab 選單（`#day-selector`）在電腦版移入左側欄，手機版維持頂部橫向捲動
2. 左側欄額外顯示當日天氣、route、dayNote（手機版這些資訊在卡片內）
3. 切換 Day 時電腦版 scroll 右側內容區到頂，而非整頁 scroll
4. 若左側欄項目點擊後需要 highlight 選中狀態，與現有 tab active 邏輯共用同一個狀態變數

**Breakpoint 定義**

| 裝置 | 寬度 | 佈局 |
|------|------|------|
| 手機 | < 768px | 單欄，430px 限制保留（或移除，視設計決定）|
| 平板 | 768px – 1023px | 雙欄，左欄 200px |
| 桌機 | ≥ 1024px | 雙欄，左欄 240px，內容區 max-width 1200px |

**注意事項**
- `#driver-sheet`（給司機看彈窗）的 `max-width` 需跟著解除，改為 `max-width: 500px`
- Sticky 左側欄需確認 `z-index` 不與 Lightbox（9999）衝突
- 目前 `.card` 的寬度是依賴父元素 100% 推導，電腦版內容區加上 `max-width` 後卡片自然縮小，應無需額外調整

**新增 MD 欄位**：無

| 難度 | 影響 |
|------|------|
| 高   | 高   |

---

## 二、優先實作順序

| 優先級 | 功能 | 難度 | 影響 | 建議時機 |
|--------|------|------|------|----------|
| 1 | 景點圖片卡 | 低 | 高 | 第一批 |
| 2 | Lightbox | 低 | 中 | 第一批（配套功能 1）|
| 3 | 手寫字體 | 低 | 高 | 第一批（獨立改動）|
| 4 | 時間波浪底線 | 低 | 中 | 第二批 |
| 5 | 捲動淡入動畫 | 低 | 中 | 第二批 |
| 6 | Keywords Badges | 低 | 中 | 第二批 |
| 7 | 重點文字標記 | 低 | 低 | 隨時可加 |
| 8 | 卡片 Hover 微抬 | 低 | 低 | 隨時可加 |
| 9 | 格線背景 | 低 | 低 | 隨時可加 |
| 10 | 多圖片支援 | 中 | 中 | 功能 1 穩定後 |
| 11 | 電腦版寬螢幕 RWD | 高 | 高 | 最後（架構改動最大）|

---

## 三、建議跳過的功能

### Phosphor Icons 替換 Emoji

**跳過原因**：
- 正式使用需 CDN，違反無外部依賴原則
- 手動內嵌全套 SVG 維護成本高
- Emoji 在所有平台原生渲染，深色背景辨識度良好
- 投資報酬率低，對功能性零影響

### Wikipedia 自動圖片載入

**跳過原因**：
- Wikipedia API 在部分地區可能被封鎖，影響離線使用
- 圖片品質、構圖、授權狀態不可控
- 與「所見即所得純文字編輯」哲學衝突
- `picsum.photos` 隨機圖比不顯示圖更容易造成混淆
- 多個並發 API 請求影響低端裝置載入速度

**替代建議**：在教學文件中列出推薦圖床（imgur、GitHub raw、Cloudinary），由使用者手動填入 `imageUrl`。

---

## 四、新增 MD 欄位彙總

| 欄位 | 功能 | 範例 | 必填 |
|------|------|------|------|
| `imageUrl` | 主圖 | `imageUrl: https://i.imgur.com/abc.jpg` | 否 |
| `imageSize` | 圖片高度 | `imageSize: small` | 否，預設 regular |
| `imageUrl2` | 第二張圖 | `imageUrl2: https://...` | 否 |
| `imageUrl3` | 第三張圖 | `imageUrl3: https://...` | 否 |

`description` 欄位新增語法：`==黃底==`、`~~粉線~~`（無需新欄位）

---

## 五、完整範例（改版後）

```markdown
### 景點 | 濱海灣花園
time: 15:00
endTime: 18:30
description: ==超級樹林==光影秀，晚上 7:45 場次免費，~~建議提前 30 分鐘入場~~
cost: SGD 14 / 人
address: 18 Marina Gardens Dr
mapLink: https://maps.app.goo.gl/...
notes: 提前網路訂票
copyable: 訂票代碼 ABC
imageUrl: https://i.imgur.com/gardens-main.jpg
imageUrl2: https://i.imgur.com/gardens-night.jpg
```

---

## 六、實作注意事項

- 所有新欄位為**選填**，缺失時不渲染對應 HTML，不留空白佔位
- `<img>` 一律加 `loading="lazy"` 避免長行程首屏同時請求所有圖片
- Lightbox `z-index` 設為 `9999`，確保覆蓋 sticky 日期標題列
- `IntersectionObserver` 必須在所有卡片 DOM 插入後才執行 `observe()`
- 新增 CSS class 建議使用前綴：圖片 `si-*`、動畫 `anim-*`、文字標記 `hl-*`
