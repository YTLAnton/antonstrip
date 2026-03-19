# 旅遊行程網站 開發 SPEC
## Trip Site — Single HTML File (MD-in-Script 架構)

**版本：** v2.3
**目標專案：** 新加坡 2026（可擴充至任何旅遊行程）
**產出日期：** 2026-03-19

### 版本異動紀錄
| 版本 | 異動說明 |
|------|---------|
| v1.0 | 初版（MD 獨立檔 + build.js）|
| v1.1 | 改為 Monorepo + GitHub Pages |
| v1.2 | 移除記帳功能 |
| v2.0 | 架構大改：改為單一 HTML 檔，MD 寫在 `<script>` 區塊內；新增台中行程借鑑功能 |
| v2.1 | 移除分享按鈕；移除 Google My Maps iframe；address 欄位改為直接點擊連到 Google Maps |
| v2.2 | 手機優先設計核心化；桌機也以手機比例顯示；加入完整 PWA 規格 |
| v2.3 | 移除 PWA（sw.js + manifest.json）；改為 Apple Web App meta 標籤方案，保持單一 HTML；圖示用 base64 inline |

---

## 1. 專案概述

### 1.1 目標
每個旅遊行程就是**一個獨立的 HTML 檔案**。行程資料以 Markdown 格式寫在 HTML 的 `<script>` 區塊內，前端 JS 解析後動態渲染畫面。使用者只需編輯 HTML 裡的 MD 文字區塊即可更新行程，無需任何 build 工具或 Node.js。

### 1.2 設計原則
- **單一檔案**：一個行程 = 一個 `.html` 檔，無外部依賴（CSS/JS 全部 inline）
- **MD 優先**：行程資料以 Markdown 格式集中在 HTML 頂部的 `<script>` 區塊，一眼就能找到
- **零建置**：不需要 Node.js、不需要 build 指令，直接在瀏覽器開啟即可運作
- **手機優先**：所有 UI 以手機操作為核心設計，桌機瀏覽器也維持手機比例，不做寬螢幕展開
- **可加入主畫面**：透過 Apple Web App meta 標籤，支援 iOS/Android 加入主畫面並全螢幕執行，無需外部檔案
- **Monorepo**：所有行程放同一個 GitHub Repo，各自一個 HTML 檔
- **GitHub Pages 部署**：push 後自動上線，無需第三方服務

### 1.3 參考來源
- **UI/UX 基準**：`https://nz-trip-2026-pearl.vercel.app/`（行程展示風格、活動卡片設計）
- **架構與功能借鑑**：台中慶生行程 HTML（MD-in-script 架構、自動定位、給司機看地址、費用顯示、可複製代號、address 點擊導航）

---

## 2. 技術架構

### 2.1 專案結構

```
antonstrip/                         ← GitHub Repo（github.com/YTLAnton/antonstrip）
├── singapore-2026/
│   └── index.html                  ← 新加坡行程，網址：/antonstrip/singapore-2026/
├── japan-2027/
│   └── index.html                  ← 未來行程，網址：/antonstrip/japan-2027/
├── index.html                      ← 行程列表首頁（選做），網址：/antonstrip/
└── .github/
    └── workflows/
        └── deploy.yml              ← GitHub Actions（直接部署，無 build）
```

> 每個行程是獨立資料夾內的 `index.html`，CSS、JS、行程資料、App 圖示（base64）全部 inline，零外部依賴。

> 每個 HTML 檔案完全獨立，CSS、JS、行程資料全部 inline，不依賴任何外部檔案。

### 2.2 技術棧
| 層面 | 技術 |
|------|------|
| 資料格式 | Markdown（YAML frontmatter + 自訂 section 語法）|
| 資料位置 | HTML 內的 `<script id="trip-data" type="text/plain">` 區塊 |
| 解析方式 | 前端 Vanilla JS，頁面載入時解析並渲染 |
| 前端框架 | 純 Vanilla JS（無框架）|
| 樣式 | 純 CSS（inline `<style>`，CSS Variables）|
| 資料持久化 | `localStorage`（備注、行李清單勾選）|
| 部署 | GitHub Pages（直接 serve HTML，無 build）|
| CI/CD | GitHub Actions（push → 自動部署）|

### 2.3 HTML 檔案內部結構

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <!-- meta、title -->
  <style>/* 全部 CSS inline */</style>
</head>
<body>

  <!-- ========================================
       行程資料區（使用者只需編輯這個區塊）
       ======================================== -->
  <script id="trip-data" type="text/plain">
---
title: "新加坡 2026"
emoji: "🇸🇬"
...
---

## Day 1 | 2026/05/01 (五) | 抵達新加坡
...
  </script>
  <!-- ========================================
       以上為資料區，以下為應用程式邏輯（勿修改）
       ======================================== -->

  <!-- UI 骨架 -->
  <div id="app">...</div>

  <script>
    // 解析 #trip-data → 渲染 UI
    const raw = document.getElementById('trip-data').textContent;
    // ... 解析邏輯 ...
  </script>

</body>
</html>
```

### 2.4 部署後網址格式
```
https://ytlanton.github.io/antonstrip/singapore-2026/
https://ytlanton.github.io/antonstrip/japan-2027/
```

---

## 3. MD 資料格式規範

### 3.1 完整範例

```markdown
---
title: "新加坡 2026"
emoji: "🇸🇬"
subtitle: "2026/05/01 - 05/03 (3天2夜)"
people: 4
tripType: "自由行"
transport: ["MRT", "Grab", "步行"]
map_id: "YOUR_GOOGLE_MY_MAPS_ID"
weather:
  新加坡:
    temp: "28-34°C"
    condition: "熱帶氣候，全年高溫潮濕"
    tips: "防曬、補水、隨身帶雨傘"
    url: "https://www.weather.gov.sg/"
---

## Day 1 | 2026/05/01 (五) | 抵達新加坡

route: 台北 → 新加坡
dayNote: 無需租車，全程搭乘 MRT / Grab

### 移動 | 搭機出發
time: 08:00
endTime: 13:30
description: CI751 TPE→SIN，飛行時間約 4.5 小時
notes: 提早 2 小時到桃園機場 T1
copyable: 訂票代號 CI751-20260501ABC

### 景點 | 濱海灣花園 Gardens by the Bay
time: 15:00
endTime: 18:30
nameEn: Gardens by the Bay
description: 超級樹林光影秀，推薦傍晚前往，18:45 和 20:45 各一場
hours: 05:00-02:00
cost: SGD 14/人（步道）
ticket: 超級樹林步道 SGD 14/人，室內花穹 SGD 28/人
address: 18 Marina Gardens Dr, Singapore 018953
mapLink: https://maps.google.com/?cid=xxx
notes: ⚠️ 提前網路訂票，現場常售罄
meta: 光影秀時間 18:45 / 20:45

### 吃喝 | 老巴剎 Lau Pa Sat
time: 19:00
nameEn: Lau Pa Sat Festival Market
description: 新加坡最著名的老牌美食中心，沙嗲是必點
hours: 24 小時
cost: $100-200/人
address: 18 Raffles Quay, Singapore 048582
mapLink: https://maps.google.com/?cid=xxx

### 住宿 | Marina Bay Sands
checkIn: 15:00
checkOut: 11:00
price: SGD 450/晚
nights: 2
address: 10 Bayfront Ave, Singapore 018956
notes: 確認碼 MBS20260501
copyable: 確認碼 MBS20260501

---

## Day 2 | 2026/05/02 (六) | 聖淘沙 & 老城區

route: 市區 → 聖淘沙 → 牛車水
dayNote: 全程 MRT，Sentosa Express 單程 SGD 4

### 景點 | 環球影城 Universal Studios Singapore
time: 09:00
endTime: 17:00
nameEn: Universal Studios Singapore
description: 建議購買 Express Pass，熱門設施等候時間長
hours: 10:00-18:00（建議提前確認）
cost: SGD 83/人
ticket: 成人 SGD 83/人，Express Pass SGD 55起
address: 8 Sentosa Gateway, Singapore 098269
mapLink: https://maps.google.com/?cid=xxx
notes: ⚠️ 強烈建議提前購票，現場票價更高
copyable: 訂票代號 USS-20260502XYZ

### 吃喝 | 麥士威熟食中心 Maxwell Food Centre
time: 18:30
nameEn: Maxwell Food Centre
description: 道地新加坡小販中心，天天海南雞飯是必吃
hours: 08:00-22:00
cost: $80-120/人
address: 1 Kadayanallur St, Singapore 069184
mapLink: https://maps.google.com/?cid=xxx

### 景點 | 小印度 Little India
time: 20:00
nameEn: Little India
description: 感受印度文化氛圍，購買特色紀念品
address: Little India, Singapore
cancelled: true
cancelReason: 行程太滿，移至 Day 3 備選

---

## Day 3 | 2026/05/03 (日) | 返台

route: 新加坡 → 台北
dayNote: Grab 至機場，約 SGD 25-35

### 景點 | 星耀樟宜 Jewel Changi Airport
time: 09:00
endTime: 12:00
nameEn: Jewel Changi Airport
description: 全球最美機場，雨霧漩渦瀑布必看，可在此購買伴手禮
hours: 24 小時
address: 78 Airport Blvd, Singapore 819666
mapLink: https://maps.google.com/?cid=xxx

### 移動 | 返台
time: 14:00
endTime: 18:30
description: CI752 SIN→TPE
notes: 建議 11:00 前抵達機場辦理登機
copyable: 訂票代號 CI752-20260503DEF

---

## 美食清單

### 新加坡（全程）

- 天天海南雞飯 Tian Tian Hainanese Chicken Rice | 必吃！麥士威熟食中心 | SGD 5-8
- 辣螃蟹 Chilli Crab | 推薦 Jumbo Seafood，2人份約 SGD 80-100
- 肉骨茶 Bak Kut Teh | 松發肉骨茶，早餐必試 | SGD 10-15
- 椰漿飯 Nasi Lemak | 各大小販中心均有 | SGD 3-6
- 榴槤 Durian | 貓山王當季必試，金鳳榴槤城 | SGD 20-50/kg

---

## 航班資訊

### 去程（全員）
- CI751 | 桃園(TPE) → 新加坡(SIN) | 08:00 → 13:30 | 飛行 4h30m
- 費用：TWD 18,500/人

### 回程（全員）
- CI752 | 新加坡(SIN) → 桃園(TPE) | 14:00 → 18:30 | 飛行 4h30m
- 費用：含去程票價

---

## 行李清單

### 📄 證件
- 護照（效期 6 個月以上）
- 機票確認信（印出或截圖）
- 訂房確認信

### 👕 衣物
- 輕薄排汗上衣 x 4
- 短褲 x 3
- 備用內衣褲 x 4

### 🩺 醫藥
- 胃藥
- 止痛藥
- 防蚊液
- 防曬乳（SPF50+）

### 📱 電子
- 手機充電線
- 行動電源（≤20000mAh）
- 旅行插頭轉接頭（英式三腳插頭 Type G）

---

## 旅遊須知

### 入境規定
- 台灣護照免簽，可停留 30 天
- 嚴禁攜帶口香糖入境（罰款高達 SGD 1000）
- 不可攜帶生鮮食品、動植物
- 攜帶菸草超過 1 條需申報繳稅

### 交通
- MRT 是最便宜的交通方式，買 EZ-Link 卡或用 Apple Pay 感應
- Grab 類似台灣 Uber，建議下載備用
- 禁止在 MRT 內飲食，罰款 SGD 500

### 當地習慣
- 餐廳通常已含 10% 服務費，不需額外小費
- 全年高溫約 28-34°C，午後雷陣雨頻繁，帶折疊傘
- 語言：英文通用
- 插頭：英式三腳插頭（Type G），記得帶轉接頭
```

---

## 4. MD 格式規則說明

### 4.1 YAML Frontmatter
| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | 網站標題 |
| `emoji` | ✅ | 國旗 emoji |
| `subtitle` | ✅ | 副標題（日期/天數描述）|
| `people` | ✅ | 人數（整數）|
| `tripType` | ✅ | 路線類型（自由填寫）|
| `transport` | ✅ | 交通方式陣列 |
| `weather` | ❌ | 天氣資訊（依日期標題關鍵字自動對應）|

### 4.2 每日行程語法
```
## Day {N} | {YYYY/MM/DD} ({星期}) | {標題}

route: {路線描述}        ← 選填
dayNote: {當日備注}      ← 選填，顯示在活動列表上方
```

### 4.3 活動項目語法（全部欄位）
活動以 `### {類型} | {名稱}` 開頭，後接 `key: value` 行：

```
### {類型} | {活動名稱}
time: {HH:MM}              ← 選填，24小時制
endTime: {HH:MM}           ← 選填，結束時間，顯示為「09:00 - 11:30」
nameEn: {英文名稱}         ← 選填，address 和 mapLink 皆未填時，用此自動產生 Google Maps 搜尋連結
description: {說明}        ← 選填
hours: {營業時間}          ← 選填
cost: {費用}               ← 選填，顯示為費用標籤（金色底色）
ticket: {票價}             ← 選填，顯示為特殊票價框
address: {完整地址}        ← 選填，點擊直接開啟 Google Maps 導航；同時用於給司機看地址 Modal
mapLink: {Google Maps URL} ← 選填，有值時優先使用，覆蓋 address 產生的導航連結
notes: {備注}              ← 選填，顯示為警告框
meta: {重要資訊}           ← 選填，顯示為醒目資訊區塊（如光影秀時間）
copyable: {可複製文字}     ← 選填，顯示為可點擊複製的代號框（附 Toast 提示）
docLink: {外部連結}        ← 選填
cancelled: true            ← 選填，標記為已排除，顯示刪除線並摺疊
cancelReason: {原因}       ← 選填，搭配 cancelled 使用
```

### 4.4 支援的活動類型
| 類型 | 自動圖示 | 說明 |
|------|---------|------|
| `景點` | 📍 | 觀光景點 |
| `吃喝` | 🍽️ | 餐廳、小吃 |
| `移動` | 自動偵測（見 4.5）| 交通 |
| `住宿` | 🏠 | 每日住宿（獨立解析，見 4.6）|
| `作業` | 📋 | 待辦事項 |
| `參考` | 💡 | 參考資訊 |

### 4.5 移動類型自動圖示偵測
根據活動名稱或 description 自動選擇：
- 含 `搭機`/`飛機`/`航班`/`CI`/`BR`/`SIN`/`TPE` → ✈️
- 含 `MRT`/`地鐵` → 🚇
- 含 `Grab`/`計程車`/`Uber` → 🚕
- 含 `步行`/`散步` → 🚶
- 其他 → 🚗

### 4.6 住宿語法（專屬欄位）
住宿使用 `### 住宿 | {名稱}` 語法，解析為當日的住宿 section：
```
### 住宿 | {飯店名稱}
checkIn: {HH:MM}
checkOut: {HH:MM}
price: {費用}
nights: {晚數}
address: {完整地址}    ← 點擊直接開啟 Google Maps 導航；同時用於給司機看地址 Modal
notes: {備注}
copyable: {確認碼}     ← 可複製的訂房確認碼
```

### 4.7 美食清單語法
```markdown
## 美食清單

### {城市}（{適用天數}）

- {名稱} {英文名稱} | {備注說明} | {價格}
```
> 每筆格式：`名稱 | 備注 | 價格`，`|` 分隔，全部選填

### 4.8 航班語法
```markdown
## 航班資訊

### {路線說明}
- {航班號} | {出發地(機場碼)} → {目的地(機場碼)} | {出發} → {抵達} | 飛行 {時長}
- 費用：{說明}
```

### 4.9 行李清單語法
```markdown
## 行李清單

### {emoji} {分類名稱}
- {物品描述}
```

### 4.10 旅遊須知語法
```markdown
## 旅遊須知

### {標題}
（自由段落或清單格式）
```

---

## 5. 前端功能規格

### 5.1 五個 Tab

| Tab | 功能 | 資料來源 |
|-----|------|---------|
| 🗓 行程 | 每日活動時間軸、地圖、住宿 | MD days |
| 🍽 美食 | 依城市分類的餐廳清單 | MD 美食清單 |
| ✈️ 航班 | 去回程航班資訊 | MD 航班資訊 |
| 🧳 行李 | 可勾選打包清單 + 進度條 | MD 行李清單 + localStorage |
| 📋 須知 | 入境/交通/當地習慣等 | MD 旅遊須知 |

### 5.2 行程 Tab 細節

**日期選擇器**
- 水平滾動，顯示日期 + 星期
- 自動高亮今日（依當前系統日期比對 `## Day N | YYYY/MM/DD`）

**自動定位至當前活動（來自台中 HTML）**
- 頁面載入時，若今天是行程日期，自動切換至當日並滾動至目前進行中的活動
- 判斷邏輯：當前時間 >= 活動 time 且 < 下一個活動 time → 高亮該活動卡片（卡片短暫發光）
- 非行程日期則不觸發，直接顯示第一天

**活動卡片（展開/收合）**
- 標題列：時間範圍（`time - endTime`）+ 類型標籤 + 活動名稱
- 收合時顯示：時間、類型、名稱、cost 標籤
- 展開後顯示全部欄位詳細資訊

**活動卡片展開後顯示的元素**
| 元素 | 條件 | 樣式 |
|------|------|------|
| description | 有值 | 一般文字 |
| hours | 有值 | 小標籤 |
| cost | 有值 | 金色費用標籤 |
| ticket | 有值 | 橘色票價框 |
| meta | 有值 | 醒目資訊區塊（amber 底色）|
| copyable | 有值 | 可點擊複製框 + Toast 提示 |
| notes | 有值 | 警告框（左側橘色 border）|
| Google Maps 按鈕 | address 或 mapLink 有值（或 nameEn 有值）| 主色調按鈕，點擊直接開啟 Google Maps |
| 給司機看地址按鈕 | address 有值 | 次要按鈕，點擊開啟 Modal 顯示大字地址 |
| 備注 textarea | 永遠顯示 | 自動存 localStorage |

**給司機看地址 Modal（來自台中 HTML）**
- 點擊後從底部滑出全螢幕 Modal
- 顯示大字地址，方便直接給司機看
- 同時顯示 Google Maps 導航連結

**天氣資訊**
- 依日期標題關鍵字對應 frontmatter `weather` 資料
- 顯示在活動列表上方，有設定才顯示

**已排除景點**
- `cancelled: true` 的活動摺疊在底部，顯示刪除線
- 點擊展開/收合，顯示 cancelReason

**每日備注**
- 每日底部有今日備注 textarea，自動存 localStorage

### 5.3 美食 Tab 細節
- 依城市分組，可展開/收合
- 顯示名稱（中英文）、備注、價格
- 每筆附 Google Maps 連結（`mapLink` 有值用之，否則用名稱自動組搜尋連結）

### 5.4 航班 Tab 細節
- 依去程/回程（或多個路線）分組
- 顯示：航班號、出發地 → 目的地（含機場碼）、出發/抵達時間、飛行時長
- 費用說明單獨一行

### 5.5 行李 Tab 細節
- 打包進度條（已勾 / 總數 %）
- 依分類折疊顯示，附分類 emoji 圖示
- 勾選狀態存 localStorage
- 航空行李通用提示區塊（液體 100ml、電池規定、重量 23kg，硬編碼）

### 5.6 須知 Tab 細節
- 依 `## 旅遊須知` 下的 `###` 小節自動生成卡片
- 支援 Markdown 清單（`- ` 開頭）渲染為 `<ul>`

### 5.7 搜尋功能
- Header 搜尋框，全局搜尋
- 搜尋範圍：活動名稱（中英文）、description、住宿名稱、美食名稱
- 點擊結果跳轉至對應 Tab + 自動展開對應卡片

### 5.8 資料備份
- 須知 Tab 內，匯出 localStorage 資料（備注、行李勾選）→ JSON 下載
- 匯入：讀取 JSON 還原

### 5.9 Header 滾動收縮（來自台中 HTML）
- 初始：完整高度，顯示 title + subtitle + badges + 搜尋框
- 滾動超過 10px：header 縮小，只顯示 title + 搜尋框
- Tab bar 的 `top` 值跟著調整，確保緊接在 header 下方

### 5.10 Toast 通知
- 全局底部 Toast，顯示 2 秒後消失
- 使用場景：複製代號成功

---

## 6. 前端解析邏輯規格

### 6.1 資料取得
```javascript
const raw = document.getElementById('trip-data').textContent;
```

### 6.2 解析流程
```
1. 抓取 <script id="trip-data"> 的 textContent
2. 分離 frontmatter（--- 之間）與 body
3. 手寫解析 YAML frontmatter → config 物件
4. 解析 body：
   a. 以 ## 開頭的行切分各區塊
   b. ## Day N | ... → days[]
      - 在 Day 區塊內，以 ### 開頭切分活動
      - ### 住宿 | 名稱 → day.accommodation{}
      - 其他 ### 類型 | 名稱 → day.activities[]
      - 每個活動區塊的 key: value 行 → 屬性解析
   c. ## 美食清單 → food[]
   d. ## 航班資訊 → flights{}
   e. ## 行李清單 → packingList[]
   f. ## 旅遊須知 → tips{ sections[] }
5. 組裝 DATA 物件
6. 呼叫 render() 渲染 UI
```

> 注意：不使用 gray-matter 等 npm 套件，全部使用 Vanilla JS 手寫解析，因為是單一 HTML 無 build 流程。

### 6.3 DATA 物件結構
```javascript
const DATA = {
  // 全域設定（來自 frontmatter）
  title: "新加坡 2026",
  emoji: "🇸🇬",
  subtitle: "2026/05/01 - 05/03 (3天2夜)",
  people: 4,
  tripType: "自由行",
  transport: ["MRT", "Grab", "步行"],
  weather: {
    "新加坡": { temp: "28-34°C", condition: "...", tips: "...", url: "..." }
  },

  // 每日行程
  days: [
    {
      day: 1,
      date: "2026/05/01",      // 用於自動定位比對
      weekday: "五",
      title: "抵達新加坡",
      route: "台北 → 新加坡",
      dayNote: "無需租車，全程搭乘 MRT / Grab",
      activities: [
        {
          type: "移動",
          nameCn: "搭機出發",
          nameEn: "",
          time: "08:00",
          endTime: "13:30",
          description: "CI751 TPE→SIN",
          hours: "",
          cost: "",
          ticket: "",
          notes: "提早 2 小時到桃園機場",
          meta: "",
          copyable: "訂票代號 CI751-20260501ABC",
          address: "",
          mapLink: "",
          docLink: "",
          cancelled: false,
          cancelReason: ""
        }
      ],
      accommodation: {
        name: "Marina Bay Sands",
        checkIn: "15:00",
        checkOut: "11:00",
        price: "SGD 450/晚",
        nights: 2,
        address: "10 Bayfront Ave, Singapore 018956",
        notes: "確認碼 MBS20260501",
        copyable: "確認碼 MBS20260501"
      }
    }
  ],

  // 美食清單
  food: [
    {
      city: "新加坡",
      days: "全程",
      items: [
        {
          name: "天天海南雞飯",
          nameEn: "Tian Tian Hainanese Chicken Rice",
          note: "必吃！麥士威熟食中心",
          price: "SGD 5-8"
        }
      ]
    }
  ],

  // 航班
  flights: {
    routes: [
      {
        label: "去程（全員）",
        legs: [
          {
            flight: "CI751",
            from: "桃園", fromCode: "TPE",
            to: "新加坡", toCode: "SIN",
            depart: "08:00", arrive: "13:30",
            duration: "4h30m"
          }
        ],
        cost: "TWD 18,500/人"
      }
    ]
  },

  // 行李清單
  packingList: [
    {
      cat: "證件",
      icon: "📄",
      items: [
        { item: "護照（效期 6 個月以上）" }
      ]
    }
  ],

  // 旅遊須知
  tips: {
    sections: [
      {
        title: "入境規定",
        items: [
          "台灣護照免簽，可停留 30 天",
          "嚴禁攜帶口香糖入境（罰款高達 SGD 1000）"
        ]
      }
    ]
  }
};
```

---

## 7. 視覺設計規格

### 7.1 色彩系統（新加坡紅主色）
```css
:root {
  --primary: #c0392b;
  --primary-dark: #922b21;
  --primary-light: #fadbd8;
  --accent: #e67e22;
  --accent-light: #fef5e7;
  --bg: #f5f4f1;
  --surface: #ffffff;
  --text: #1c2b28;
  --text-2: #5f7672;
  --text-3: #94a5a1;
  --border: #e4e8e7;
  --shadow: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --r: 10px;
  --r-sm: 7px;

  /* 活動類型色 */
  --type-景點: #2a7c6f; --type-景點-bg: #e6f2ef;
  --type-吃喝: #c8956c; --type-吃喝-bg: #fdf0e5;
  --type-移動: #6889a0; --type-移動-bg: #e8f0f5;
  --type-作業: #8b7da8; --type-作業-bg: #eeeaf5;
  --type-住宿: #a08060; --type-住宿-bg: #f5efe8;
  --type-參考: #d97706; --type-參考-bg: #fef3c7;
}
```

### 7.2 字型
`"PingFang TC", "Noto Sans TC", "Microsoft JhengHei", -apple-system, sans-serif`

### 7.3 Header
- 背景：深色漸層（`linear-gradient(135deg, #1a2a2a, #c0392b 60%, #e74c3c)`）
- 動態內容（從 DATA 讀取）：`{emoji} {title}`、`{subtitle}`、badges（tripType、people人、transport 各一個）、搜尋框
- 滾動收縮：超過 10px 縮小高度

### 7.4 活動卡片高亮動畫（自動定位用）
```css
@keyframes cardGlow {
  0%, 100% { box-shadow: var(--shadow); border-color: var(--border); }
  50%       { box-shadow: 0 0 15px rgba(192,57,43,0.35); border-color: var(--primary); }
}
.card-glow { animation: cardGlow 1.5s ease-in-out 2; }
```

### 7.5 Toast
- 底部居中，圓角 pill 樣式
- 顯示 2 秒後 fade out

### 7.6 給司機看地址 Modal
- 從底部滑入（`transform: translateY`）
- 大字顯示地址（font-size: 1.8rem，font-weight: bold）
- 附 Google Maps 導航連結

### 7.7 手機優先設計（Mobile-First）

**核心原則：桌機也以手機比例顯示，不做寬螢幕展開。**

```css
/* 內容永遠置中，最大寬度鎖定為手機尺寸 */
body {
  background: #1a1a2e;   /* 桌機時的背景色，讓手機容器浮在中間 */
  display: flex;
  justify-content: center;
}

#app {
  width: 100%;
  max-width: 390px;        /* iPhone 14 Pro 寬度，手機主流尺寸 */
  min-height: 100dvh;
  background: var(--bg);
  position: relative;
  overflow-x: hidden;
}
```

> 在桌機上，`#app` 容器維持 390px 寬度，置中顯示，兩側為深色背景。手機上則 100% 寬度填滿螢幕。

**必要的 meta 標籤：**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,
  maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#c0392b">
```

**Safe Area（iPhone 劉海/動態島支援）：**
```css
header  { padding-top: env(safe-area-inset-top); }
.tab-bar { padding-bottom: env(safe-area-inset-bottom); }
```

**觸控優化：**
```css
* { -webkit-tap-highlight-color: transparent; }
button, [data-action] { touch-action: manipulation; }  /* 消除 300ms 延遲 */
.scrollable { -webkit-overflow-scrolling: touch; }
```

**RWD 斷點（僅一個，用於桌機置中效果）：**
```css
@media (min-width: 430px) {
  body { background: #1a1a2e; }   /* 桌機顯示深色兩側背景 */
}
```
> 沒有傳統的 tablet / desktop 展開佈局，一律維持手機比例。

### 7.8 加入主畫面（Apple Web App Meta 方案）

不需要 `sw.js` 或 `manifest.json`，透過 meta 標籤即可實現「加入主畫面後全螢幕執行」，保持單一 HTML 零外部依賴。

**必要 meta 標籤（寫在 `<head>` 內）：**
```html
<!-- iOS：加入主畫面後全螢幕執行，隱藏瀏覽器 UI -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="SG 2026">

<!-- Android：主題色 -->
<meta name="theme-color" content="#c0392b">

<!-- 主畫面圖示（base64 inline，無需外部圖片檔）-->
<link rel="apple-touch-icon" href="data:image/png;base64,{BASE64_ICON}">
```

> `apple-mobile-web-app-title` 從 frontmatter 的 `short_name` 動態生成，或直接寫死行程名稱縮寫。

**使用體驗：**
| 功能 | iOS Safari | Android Chrome |
|------|-----------|---------------|
| 加入主畫面 | 分享 → 加入主畫面 | 書籤方式加入 |
| 全螢幕執行（無瀏覽器 UI）| ✅ | ✅（書籤方式有限支援）|
| 自訂 App 圖示 | ✅ | ✅ |
| 離線瀏覽 | ❌（需要網路）| ❌（需要網路）|

> 離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。若未來有強烈需求，可再補 `sw.js`。

**圖示製作建議：**
- 尺寸：180×180px（iOS apple-touch-icon 標準尺寸）
- 格式：PNG，轉為 base64 後 inline 進 HTML
- 內容：行程 emoji 或國旗，背景使用 `--primary` 主色調

---

## 8. 部署規格（GitHub Pages）

### 8.1 GitHub Actions（無 build，直接部署）
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./          # 直接 serve repo 根目錄
          publish_branch: gh-pages
          exclude_assets: '.github'
```

> 因為沒有 build 步驟，直接把 repo 根目錄的 HTML 檔案 serve 出去即可。

### 8.2 GitHub Pages 設定步驟（一次性）
1. Repo → Settings → Pages
2. Source 選 `gh-pages` branch，根目錄 `/`
3. 儲存後網址自動生效

### 8.3 日常工作流程
```
1. 開啟 singapore-2026/index.html，找到 <script id="trip-data"> 區塊
2. 編輯 MD 內容
3. git add . && git commit -m "update itinerary"
4. git push
→ GitHub Actions 部署（約 30 秒，無 build）
→ https://ytlanton.github.io/antonstrip/singapore-2026/ 自動更新
```

### 8.4 新增行程流程
```
1. 複製 singapore-2026/ 資料夾 → japan-2027/
2. 修改 index.html 內的 <script id="trip-data"> MD 內容
3. 修改 frontmatter（title、emoji、subtitle 等）
4. git push → 自動部署
→ 網址：https://ytlanton.github.io/antonstrip/japan-2027/
```

---

## 9. 不在範圍內（Out of Scope）

| 功能 | 原因 |
|------|------|
| 記帳功能 | 需求移除 |
| 分享按鈕 | 需求移除 |
| Google My Maps iframe | 需求移除，改用 address 直接連 Google Maps |
| Firebase / 後端 | 單機靜態網站 |
| 使用者登入 | 無需帳號 |
| Node.js / build 工具 | 單一 HTML 不需要 |
| 天氣 API 即時串接 | MD 內靜態填寫 |
| PWA Service Worker / manifest | 改用 Apple Web App meta 標籤，保持單一 HTML |
| 離線瀏覽 | 需要 SW 外部檔案才能實現，目前不在範圍內 |

---

## 10. 開發任務清單

### Phase 1：核心骨架
- [ ] HTML 基礎結構（header、tabs、main、driver modal、toast）
- [ ] 完整 CSS（CSS Variables、手機優先、`max-width: 390px` 置中、桌機深色兩側背景）
- [ ] 所有必要 meta 標籤（viewport、apple-mobile-web-app、theme-color）
- [ ] Safe Area padding（iPhone 劉海/動態島）
- [ ] 觸控優化（tap-highlight、touch-action）
- [ ] Vanilla JS MD 解析器（frontmatter + body 各區塊）
- [ ] 行程 Tab 基礎（day selector + 活動卡片展開/收合）
- [ ] `<script id="trip-data">` 內填入新加坡 3 天範例資料
- [ ] 本地直接開啟 HTML 可正常顯示

### Phase 2：完整 Tab 功能
- [ ] 美食 Tab（依城市分組、Google Maps 連結）
- [ ] 航班 Tab（去/回程顯示）
- [ ] 行李 Tab（勾選 + 進度條 + localStorage）
- [ ] 須知 Tab（MD sections 自動渲染）

### Phase 3：進階功能（台中借鑑）
- [ ] 自動定位至當前活動（時間比對 + 卡片高亮動畫）
- [ ] 給司機看地址 Modal（底部滑入）
- [ ] address 點擊直接開啟 Google Maps（優先 mapLink，其次 address，最後 nameEn 搜尋）
- [ ] cost 費用標籤顯示
- [ ] copyable 可複製代號 + Toast
- [ ] meta 醒目資訊區塊
- [ ] endTime 結束時間顯示（`09:00 - 11:30`）
- [ ] Header 滾動收縮
- [ ] 搜尋功能（全局搜尋 + 跳轉）
- [ ] 備注功能（活動備注 + 每日備注 + localStorage）
- [ ] 天氣資訊顯示

### Phase 4：收尾與部署
- [ ] Apple Web App meta 標籤完整設定（`apple-mobile-web-app-capable`、`apple-touch-icon` base64 圖示等）
- [ ] 資料匯出/匯入（localStorage JSON 備份）
- [ ] `.github/workflows/deploy.yml` 設定
- [ ] GitHub Repo 建立 + Pages 設定
- [ ] iOS Safari 實機測試（加入主畫面、全螢幕執行）
- [ ] Android Chrome 實機測試
- [ ] push → 自動部署完整流程測試

---

## 附錄：完整架構對照

| 項目 | 台中 HTML（借鑑來源）| 本專案 v2.2 |
|------|--------------------|-----------------------|
| 資料格式 | Markdown Table（`\| col \| col \|`）| 自訂 MD（YAML + `###` 語法）|
| 資料位置 | `<script>` 內的 `scheduleRaw` 字串 | `<script id="trip-data" type="text/plain">` |
| Tab 數量 | 2（Day 1 / Day 2）| 5（行程/美食/航班/行李/須知）|
| 樣式框架 | Tailwind CSS CDN | 純 CSS（inline）|
| 地圖 | 無 | 無（address 直接連 Google Maps）|
| 搜尋 | 無 | 全局搜尋 |
| 行李清單 | 無 | 有（含勾選 + 進度條）|
| 航班資訊 | 有（作為活動行項目）| 獨立 Tab |
| 備注功能 | 無 | 有（localStorage）|
| 自動定位 | ✅ 有 | ✅ 有 |
| 給司機看地址 | ✅ 有 | ✅ 有 |
| address 點擊導航 | ✅ 有 | ✅ 有 |
| cost 費用顯示 | ✅ 有 | ✅ 有 |
| copyable 複製 | ✅ 有 | ✅ 有 |
| meta 資訊區塊 | ✅ 有 | ✅ 有 |
| endTime 結束時間 | ✅ 有 | ✅ 有 |
| 分享按鈕 | ✅ 有 | ✗ 移除 |
| Header 收縮 | ✅ 有 | ✅ 有 |
| 手機優先設計 | ✅ 有（Tailwind）| ✅ 有（max-width: 390px 置中）|
| 桌機也維持手機比例 | ✗ 無 | ✅ 有（桌機兩側深色背景）|
| 加入主畫面 | ✅ 有 | ✅ 有（Apple Web App meta）|
| 全螢幕執行 | ✅ 有 | ✅ 有（apple-mobile-web-app-capable）|
| App 圖示 | ✗ 無 | ✅ 有（base64 inline apple-touch-icon）|
| PWA manifest / SW | ✗ 無 | ✗ 不需要（meta 標籤已足夠）|
| 離線瀏覽 | ✗ 無 | ✗ 不在範圍內 |
| 部署方式 | 單一 HTML（無部署）| GitHub Pages |
| 多行程支援 | ✗ 無 | ✅ 多個 HTML 檔案 |