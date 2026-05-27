---
sprint_id: sprint-001-pwa-install-prompt
project: antonstrip
adapter: content-site
version: v2.0
from_role: planner
to_role: generator
produced_at: 2026-05-20 (v1.0 起草) → 2026-05-20 (v2.0 修訂)
references:
  - "{SPRINT_DIR}/intake.md"
  - "{SPRINT_DIR}/references/image.png"
  - "{SPRINT_DIR}/references/ex.html"
  - "{HARNESS_ROOT}/adapters/content_site.md"
  - "{HARNESS_ROOT}/templates/01_planner.md"
  - "{HARNESS_ROOT}/templates/04_sprint_contract.md"
  - "{HARNESS_ROOT}/templates/06_pdm_summary_guide.md"
  - "{HARNESS_ROOT}/01_CORE_CONCEPTS.html"
  - "{HARNESS_ROOT}/pilots/03_antonstrip/baseline.html"
  - "{PROJECT_ROOT}/_PM/SPEC.md"
  - "{PROJECT_ROOT}/sync-meta.py"
  - "{PROJECT_ROOT}/2026_04_HK/index.html"
  - "{PROJECT_ROOT}/2026_04_MO/index.html"
  - "{PROJECT_ROOT}/2026_05_Singapore/index.html"
  - "{PROJECT_ROOT}/2026_07_AKAME/index.html"
status: complete
---

## Change Log（v1.0 → v2.0）

> 本次修訂源自 Anton 透過 Harness 中央對話 review v1.0 後的 4 點裁決，及實地驗證 4 個 index.html 後修正的事實錯誤。

| # | 變動 | 影響範圍 |
|---|---|---|
| 1 | **同意推翻 SPEC v2.3** — Step 7 新增產出 `output/SPEC_v2.4_note.md`，論述援引 v2.3 line 816 自己預埋的「未來可補 `sw.js`」延伸條款（不是憑空推翻，是啟用既定後路）| Step 7 產物 + 已知妥協項 #5 措辭 |
| 2 | **sync-meta.py 不擴張** — 維持 v1.0 原案，4 份 manifest 手動產出。記為 sprint-002 候選改進項 | 無改動，確認 |
| 3 | **取消 AKAME 特例硬編路徑** — 實地驗證後事實修正：**4 個行程都沒有 `<script id="trip-data">` frontmatter，但 4 個都有完整 og:title + og:description**——Step 1 改為「一致地從 og meta 取 name / short_name / description」| Step 1 規格、主動驗證紀錄 #1、已知妥協項 #1 刪除 |
| 4 | **桌面浮層加 viewport 判斷** — Step 3 加「viewport < 768px 才顯示」邏輯，AC-03 補「viewport ≥ 1024px 不顯示」驗證。Step 3 工時 1h → 1.3h，總工時 8.3h → 8.6h | Step 3、AC-03、已知妥協項 #6 刪除 |
| 5 | **附帶發現記入 closeout 用** — sprint 期間發現的範圍外 bug（MO/Singapore/AKAME 的 `apple-mobile-web-app-title` 都是錯誤值 "Horlick送別行"，從 HK 複製忘改）新增「Sprint 期間發現但範圍外的議題」段，**本 sprint 不修**，sprint-close 時轉給 sprint-002 或獨立 sprint | 新增段（plan 末段）|

---

## PDM Summary

> 給非技術 PDM 看的白話總結——≤200 字、不含 jargon、5 分鐘讀完掌握規劃。

**這份文件做了什麼**：把 intake「為手機加上 PWA 安裝提示 + 離線可用」需求，拆成 7 個可執行步驟，每步附預估時間與驗收。v2.0 整合 Anton review 後的 4 點裁決。

**規劃結果**：共 7 步，預估總時長 **~8.6 小時**（v1 是 8.3h，Step 3 加 viewport 判斷 +0.3h）。最大不確定點仍是 Step 5（Service Worker 離線快取）—— iOS / Android 行為差異 + 4 個行程的圖檔可能命名不規則，可能要 2 小時。

**需要 PDM 注意的事**：v2.0 取消了「AKAME 特例硬編」這條複雜路徑——實地驗證發現 4 個行程都沒 frontmatter 但都有 og meta，所以**一致走 og meta 路徑就好**，更簡單。另外發現 3 個行程的 `apple-mobile-web-app-title` 都是錯的（從 HK 複製忘改），**本 sprint 不修**，留給 sprint-002。SPEC v2.3 衝突已正式同意推翻，sprint-close 會把變動整併到 SPEC 主檔。

---

## 主動驗證紀錄（Step 1.1）

1. **原假設（v1.0）**：4 個行程資料夾結構一致、都有 `<script id="trip-data">` frontmatter；AKAME 是特例
   - **v1.0 結論**：撤回，AKAME 是特例
   - **v2.0 更新**：v1.0 的撤回**仍不夠準確**——Anton 透過 Harness 中央對話實地驗證 4 個 index.html 後確認：**4 個行程都沒有 `<script id="trip-data">` frontmatter**（不只 AKAME，HK / MO / Singapore 也都沒有）。但 4 個都有完整 og:title + og:description（HK "Horlick送別行" / MO "MO台南行" / Singapore "新加坡慶生行" / AKAME "AKAME 2026"），可一致使用。
   - **v2.0 真正結論**：sync-meta.py 對 4 個行程**全部會 skip**（不只 AKAME），本 sprint 不依賴 sync-meta.py 產出 manifest；Step 1 改為「**一致地從 og:title / og:description 取 manifest name / short_name / description**」——沒有特例、沒有硬編，4 個行程一視同仁。

2. **原假設**：antonstrip 是 SPEC.md 描述的 `singapore-2026/`、`japan-2027/` 資料夾命名
   - **驗證**：`ls antonstrip` 實際結果
   - **結論**：撤回——實際是 `2026_04_HK/`、`2026_04_MO/`、`2026_05_Singapore/`、`2026_07_AKAME/` 4 個。SPEC.md 範例命名落後於實際。本 sprint 用實際資料夾名為準，**不去調整 SPEC.md 命名範例**（範圍外）。

3. **原假設**：既有 index.html 沒有 manifest / sw 註冊
   - **驗證**：Grep `manifest|service.?worker` 在 antonstrip
   - **結論**：確認——只 `_PM/SPEC.md` 與 reference `ex.html` 提到，4 個行程的 index.html 都沒有。本 sprint 是「從零加入 PWA」。

4. **保守判斷已使用者裁決（A）**：**SPEC.md v2.3 衝突 → 同意推翻**
   - v1.0 提出張力：v2.3「移除 PWA、保持單一 HTML、零外部依賴」vs 本 sprint 要做完整 PWA + SW
   - **v2.0 裁決**：Anton 同意推翻。**進一步事實**——Read SPEC.md line 816 確認原文寫：「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。**若未來有強烈需求，可再補 `sw.js`**。」這證明 v2.3 自己**預埋了延伸條款**，本 sprint 不是憑空推翻而是啟用既定後路。Step 7 產出 `output/SPEC_v2.4_note.md` 草稿，sprint-close 整併到 SPEC.md。

5. **保守判斷已使用者裁決（B）**：**sync-meta.py 不擴張 → 維持原案**
   - v1.0 提出：傾向不擴張（嚴守 intake ⑥ non-goal）
   - **v2.0 裁決**：Anton 同意維持。4 份 manifest 手動產出。未來新行程要手動補 manifest / sw / 2 icons + 修 index.html，記為 **sprint-002 候選工作**。

6. **參考素材已讀**：
   - `references/image.png`：底部浮層提示，左圖示 + 「加入主畫面，方便旅途中快速查看！」+ 「安裝」橘鈕 + X 鈕——UI 目標
   - `references/ex.html`：Next.js BoboTravel 範例，`<link rel="manifest" href="/manifest.json" crossorigin="use-credentials">` + Apple Web App meta 系列——技術參考（**不可直接複製 element**，僅擷取設計概念）

7. **附帶發現（sprint 期間發現但範圍外）**：
   - Anton 中央對話實地驗證 4 個 index.html 時發現：**MO / Singapore / AKAME 的 `<meta name="apple-mobile-web-app-title">` 都是錯誤值 "Horlick送別行"**（從 HK 複製忘改）。
   - 這是獨立小 bug，**本 sprint 不修**（嚴守範圍紀律）。
   - 詳細處置見 plan.md 末段「Sprint 期間發現但範圍外的議題」。

---

## 模式選擇

`mode: production`（intake 已標）——本 sprint 真的會修改 4 個 index.html、新增 12 個檔（4 manifest + 4 sw + 8 icon），並提交到 git。所有 AC 採實測通過型驗收。

---

## 計畫步驟（共 7 步，預估總時長 8.6 小時）

### Step 1：產出 4 份 manifest.json（一致從 og meta 取資料）

- **產物**：
  - `2026_04_HK/manifest.json`、`2026_04_MO/manifest.json`、`2026_05_Singapore/manifest.json`、`2026_07_AKAME/manifest.json`
  - 每份含必要欄位：`name`、`short_name`、`description`、`start_url: "./"`、`scope: "./"`、`display: "standalone"`、`theme_color`、`background_color`、`icons` 陣列（192x192 + 512x512 PNG，maskable + any 兩種 purpose）
- **資料來源（4 個行程一致）**：
  - `name` ← `<meta property="og:title">` content（HK "Horlick送別行" / MO "MO台南行" / Singapore "新加坡慶生行" / AKAME "AKAME 2026"）
  - `short_name` ← `name` 截前 8~12 字（中文）；若 og:title 已短可直接用
  - `description` ← `<meta property="og:description">` content（含日期天數）
  - `theme_color` ← 既有 `<meta name="theme-color">` content（HK 看實際 / AKAME 是 `#121212`）
  - `background_color` ← 與 theme_color 同色或相關淺色（Generator 判斷）
  - `start_url` / `scope` 一律 `./`（相對路徑、每行程獨立 scope）
- **依賴**：無（可獨立進行）
- **預估**：1 小時
- **驗收**：Generator 自驗——
  - `cat */manifest.json` 4 份格式合法 JSON
  - 必要欄位齊全（用 W3C manifest spec 對照）
  - 4 份的 `name` / `description` / `theme_color` 都能在對應 index.html 的 og meta 找到出處（**無硬編、無特例**）

### Step 2：產出每行程的 icon-192.png + icon-512.png

- **產物**：每行程 `img/icon-192.png` 與 `img/icon-512.png`（共 8 個 PNG 檔）
- **產出方式**：
  - 從各行程既有 `img/` 內挑一張代表圖（HK Horlick、MO 台南代表、Singapore 主視覺、AKAME 主視覺）→ 用工具裁切 + 縮放 → 加 maskable safe area（中央 80% 內容、四周 10% 純色邊框）
  - 若行程沒有合適視覺，使用該行程 `theme_color` + 簡單文字 logo 作為 fallback
- **依賴**：Step 1（manifest 已決定 icon 檔名）
- **預估**：1.5 小時（含挑圖 + 裁切）
- **驗收**：Generator 自驗——
  - 8 個 PNG 檔尺寸正確（192x192 / 512x512）
  - 視覺上能辨識是「哪一趟旅程」
  - maskable safe area 對齊 W3C 規範

### Step 3：實作浮層提示 UI + viewport 判斷（共用 component）

- **產物**：每個 index.html `<body>` 底部新增浮層 div + 對應 inline CSS（依 v2.3 inline 原則）
- **規格**（依 `references/image.png`）：
  - 位置：底部固定（`position: fixed; bottom`），避開既有底部 nav（若有）
  - 結構：左圖示 + 中文字「加入主畫面，方便旅途中快速查看！」+ 右「安裝」橘鈕 + X 鈕
  - 樣式：白底 / 圓角 / 陰影、按鈕用該行程 `theme_color`
  - 動畫：頁面載入 1.5 秒後 fade-in 升起
  - 響應式：mobile 優先
- **viewport 判斷**（v2.0 新增）：
  - **僅在 `window.innerWidth < 768px` 時顯示浮層**（手機尺寸）
  - 實作方式 Generator 自選：(a) CSS `@media (min-width: 768px) { .pwa-prompt { display: none } }`；或 (b) JS 在註冊提示前檢查 viewport
  - 桌面 Chrome（典型 viewport ≥ 1024px）永遠看不到浮層（AC-03 強制驗證此條件）
  - **resize 行為**：若用戶把瀏覽器從寬拉窄到 < 768px，浮層可顯示（採 CSS media query 時自動成立）
- **依賴**：無
- **預估**：1.3 小時（v1 1h + viewport 判斷 +0.3h）
- **驗收**：Generator 自驗——
  - 4 個 index.html 都有浮層 div
  - 桌面 Chrome DevTools mobile mode（< 768px）截圖比對 `references/image.png` 視覺一致
  - 桌面 Chrome 正常視窗（≥ 1024px）下浮層 `display: none` 或不在 DOM
  - 不影響既有畫面 layout（既有元素位置零位移）

### Step 4：實作 Android beforeinstallprompt + iOS 引導教學 + X 永久關閉

- **產物**：每個 index.html 新增 inline `<script>` 區塊（依 v2.3 inline 原則）
- **邏輯**：
  - **Android Chrome**：監聽 `beforeinstallprompt` event → 點「安裝」鈕呼叫 `prompt()` → 處理 `userChoice`
  - **iOS Safari**：偵測 iOS UA（無 beforeinstallprompt）→ 點「安裝」鈕跳出 modal 教學「按下方分享圖示 → 加入主畫面」（含截圖示意或 emoji 示意）
  - **X 按鈕**：寫入 `localStorage.setItem('pwa-install-dismissed', '1')` → 該 origin 永久不再顯示
  - **已安裝偵測**：`window.matchMedia('(display-mode: standalone)').matches` 為 true 時不顯示提示
  - **初次顯示閾值**：頁面載入後 1.5 秒延遲（避免首屏干擾）
  - **viewport 閘**：與 Step 3 一致——viewport ≥ 768px 不顯示
- **依賴**：Step 3（浮層 UI 已存在）
- **預估**：1.5 小時
- **驗收**：Generator 自驗——
  - Android Chrome DevTools 模擬：浮層出現 → 「安裝」觸發 prompt → X 後重整不再出現
  - iOS Safari 模擬（Responsive Mode iPhone preset）：浮層出現 → 「安裝」跳教學 modal
  - localStorage flag 在 4 個行程跨頁有效（同 origin）

### Step 5：實作 Service Worker（完整離線含行程內容）

- **產物**：
  - 每行程 `sw.js`（共 4 份；或單一 root `sw.js` + scope 設定——Generator 評估後決定，預設**每行程獨立**以符合「每行程獨立 App」紀律）
  - 註冊邏輯放在 Step 4 的 inline `<script>` 內
- **快取策略**：
  - **install phase**：預快取該行程的 `./index.html`、`./img/` 內所有圖片、`./manifest.json`、各 icon
  - **fetch phase**：
    - 同 origin 同 scope：**cache-first**（離線優先，首次造訪後完全離線可用）
    - 外部資源（Google Fonts、OpenWeatherMap 圖、Google Maps）：**network-first with cache fallback**
  - **activate phase**：清除舊版本 cache（用 cache version 字串）
- **版本管理**：sw.js 開頭 `const CACHE_VERSION = 'v1.0.0'`；未來 sprint 更新內容時手動 bump
- **依賴**：Step 1（manifest.json 提供 scope 與檔名）、Step 2（icon 已存在可快取）
- **預估**：2 小時
- **驗收**：Generator 自驗——
  - 4 個行程都成功註冊 SW（Chrome DevTools Application > Service Workers 顯示 activated）
  - Network tab 飛航模式下，4 個行程首頁能完整載入（含圖片）
  - 重新整理後 cache hit（Network 顯示 from ServiceWorker）

### Step 6：跨平台手動測試 + 截圖

- **產物**：`output/install_screenshots/` 內含以下截圖：
  - Android Chrome：安裝前浮層 / 點安裝 prompt / 安裝後主畫面 icon / 主畫面開啟 / 飛航模式離線開啟（共 5 張 × 至少 1 個行程 = 5 張）
  - iOS Safari：浮層 / 安裝引導 modal / 加到主畫面後 icon / 主畫面開啟 / 飛航離線（共 5 張 × 至少 1 個行程 = 5 張）
  - 桌面 Chrome Lighthouse PWA audit 報告（4 行程 × 1 張 = 4 張）
  - **v2.0 新增**：桌面 Chrome 正常視窗（≥ 1024px viewport）下 4 個行程截圖確認**浮層不顯示**（4 張）
- **執行**：
  - 用實機（或 Chrome DevTools Device Mode + iOS Simulator if available）逐項操作
  - 若無 iOS 實機，用 BrowserStack 或 iOS Simulator 做合理近似（在 self_review.md 標明）
- **依賴**：Step 1~5 全部完成
- **預估**：1.5 小時
- **驗收**：Generator 自驗——
  - 18 張截圖齊全（v1 14 張 + v2 桌面隱藏驗證 4 張）
  - Lighthouse PWA score ≥ 90 (installable + offline)
  - 任一張顯示功能未達標 → 退回對應 Step 修

### Step 7：寫 self_review.md + 產出 SPEC_v2.4_note.md 草稿

- **產物 A**：`self_review.md`（依 `02_generator.md` 規範）
  - PDM Summary（≤200 字）
  - 每條 AC 自評 ✅ / 🟡 / ❌
  - 「要 Evaluator 特別檢查的點」清單（含 SPEC.md v2.3 → v2.4 變動的明文標記）
  - 主動承認的妥協項與已知限制
  - **silent failure 探測**：iOS 不支援標準 beforeinstallprompt，引導教學可能在新 iOS 版本失效；SW cache 在配額爆量時被瀏覽器清除——這兩條紅旗本輪不修，記入 self_review 供下輪追蹤
- **產物 B（v2.0 新增）**：`output/SPEC_v2.4_note.md` 草稿
  - 變動摘要：v2.3 → v2.4 加入 PWA（manifest.json + sw.js + icon PNG，破壞「零外部依賴、單一 HTML」原則）
  - 為什麼推翻：援引 **SPEC.md v2.3 line 816 自己預埋的「若未來有強烈需求，可再補 `sw.js`」延伸條款**——本 sprint 啟用既定後路，不是憑空推翻
  - v2.4 應補的設計原則修訂段落（草稿，sprint-close 整併到主檔）
  - 列出新增的 12 個檔在專案結構中的位置
- **依賴**：Step 1~6 完成
- **預估**：0.3 小時（self_review）+ 0 小時（v2.4_note 草稿在寫 self_review 時順手產出，無額外工時）
- **驗收**：Generator 自驗——
  - self_review.md handoff header 齊備、每條 AC 都有自評、紅旗清單存在
  - SPEC_v2.4_note.md 存在、明確援引 line 816、列出新增 12 個檔

---

## Plan 紀律提示給 Generator

🚫 **不可超出本 plan 範圍**：
- 不可順便重構 index.html 既有結構（即使 inline CSS 很龐大）
- 不可動 sync-meta.py（Anton 已裁決維持不擴張）
- 不可改任何 `itinerary.md` 或 frontmatter 內容
- 不可調整 4 個行程的視覺呈現（OG 卡片、排版、color scheme）
- 不可動 `_PM/SPEC.md`（變動紀錄寫在 `output/SPEC_v2.4_note.md` 草稿，由 sprint-close 整併）
- **不可修「Sprint 期間發現但範圍外的議題」段列的 bug**（包含 apple-mobile-web-app-title 錯誤值）——留給後續 sprint

🟡 **發現紅旗無對應既有 AC 時**：採 plan 預設 (A) 補項建議格式——寫進 `output/silent_failure_probe.md` 的「回灌建議」段，不擴張既有 AC。

✅ **必須做**：
- Step 1~6 每步完成時 git diff 自查「只動了預期的檔案」
- Step 7 self_review.md 含每條 AC 的證據引用（檔案路徑 + 行號 + 截圖檔名）
- Step 7 SPEC_v2.4_note.md 草稿必含 line 816 援引

---

## Plan / Contract 對應表（給 Generator 與 Evaluator）

| Plan Step | 對應 Contract AC |
|---|---|
| Step 1（manifest）| AC-01 |
| Step 2（icon）| AC-01（icons 欄位） |
| Step 3（浮層 UI + viewport 判斷）| AC-03 |
| Step 4（Android + iOS + X）| AC-04 + AC-05 + AC-06 |
| Step 5（SW）| AC-07 + AC-08 |
| Step 6（測試 + 截圖）| AC-09 + AC-10 |
| Step 7（self_review + SPEC_v2.4_note）| 全 AC 自評 + AC-12 |
| 範圍紀律（all steps）| AC-11 + AC-02 |

---

## Sprint 期間發現但範圍外的議題（v2.0 新增——供 sprint-close 整理）

> 本段紀錄 sprint-001 過程中發現、但**明確不在本 sprint 範圍**的問題。sprint-close 時由 closeout 流程決定處置（轉 sprint-002 / 獨立 sprint / 記入 baseline）。

### 議題 1：MO / Singapore / AKAME 的 `apple-mobile-web-app-title` 錯誤值

- **發現時機**：Anton 透過 Harness 中央對話 review plan v1.0 時，實地驗證 4 個 index.html 過程中發現。
- **症狀**：MO、Singapore、AKAME 三個行程的 `<meta name="apple-mobile-web-app-title" content="...">` 值都是 `"Horlick送別行"`——應該是分別寫 "MO台南行" / "新加坡慶生行" / "AKAME 2026"。明顯是從 HK 複製貼上後忘了改。
- **嚴重度**：低（只影響 iOS 加入主畫面時的預設 App 標題；用戶仍可手動改）
- **本 sprint 是否處理**：❌ **不處理**。本 sprint 範圍嚴格限定為「新增 PWA 能力」——既有 meta 標籤的內容錯誤是獨立 bug，順便修會違反範圍紀律。
- **建議處置**：sprint-close 時決定——
  - 選項 A：併入 sprint-002（編輯工作流簡化）一起處理，可考慮「sync-meta.py 是否擴張到自動同步 apple-mobile-web-app-title」
  - 選項 B：獨立開 sprint-001b-fix-meta-title（10 分鐘 sprint）
  - 選項 C：作為 sprint-001 closeout 的「順手修」（不算 sprint-001 範圍但同階段提交）
- **本輪 Generator 對此議題的行為**：**完全不碰**。若實作 Step 1 manifest 時注意到此錯誤，**不要修**，記入 self_review.md「已知但不修」清單。

---

> Plan 版本：**v2.0**｜Planner：Claude (Opus 4.7)｜2026-05-20 v1 起草、2026-05-20 v2 修訂｜待 Anton 回覆 Harness 中央同步完成後 context reset 呼叫 /harness:generator
