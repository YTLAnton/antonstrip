---
sprint_id: sprint-001-pwa-install-prompt
from_role: evaluator
to_role: human
produced_at: 2026-05-26
produced_by: Claude Opus 4.7 (sub-agent, independent context)
adapter: content-site
work_type: new-feature
mode: production
references:
  - "{SPRINT_DIR}/contract.md"
  - "{SPRINT_DIR}/output/"
  - "{SPRINT_DIR}/self_review.md"
  - "{SPRINT_DIR}/blockers.md"
  - "{HARNESS_ROOT}/adapters/content_site.md"
  - "{HARNESS_ROOT}/templates/03_evaluator.md"
  - "{HARNESS_ROOT}/01_CORE_CONCEPTS.html"
status: complete
revision: v2.0（取代 v1.0；修正 PRECACHE 計數錯誤、maskable icon 過度警示、新增 Blocker-03 評估）
---

# Sprint Review — sprint-001-pwa-install-prompt

**Evaluator**：Claude Opus 4.7（獨立 sub-agent context、未看 Generator 對話）
**評估時間**：2026-05-26
**Adapter**：content-site
**Work Type**：new-feature
**Mode**：production

---

## PDM Summary（≤200 字、0 jargon）

**這份文件做了什麼**：我（冷眼驗收者）對 sprint-001（為 4 個行程加 PWA 安裝提示 + 離線快取）逐條對照 12 條驗收條件，給每條打分並附證據。

**結果是什麼**：總分 **0.59 / 1.00**——**未達 0.80 達標門檻**。原因不是 Generator 偷懶，而是「程式碼寫完了，但需要在真實 Android 手機 / iPhone / 桌面 Chrome 上跑出 18 張截圖、跑 Lighthouse 評分」才能驗收 7 條 AC，而 LLM 環境沒這些。Generator 誠實列出限制（沒造假截圖）、寫了給 Anton 跑的操作手冊。

**最重要的事**：(1) **本輪 Conditionally Hold——Anton 依 `output/testing_protocol.md` 跑完 18 張截圖後，預計可重新評分到 ~0.92 達標**；(2) **本 sprint 程式碼層面紀律極好**——範圍嚴守（+1016 / -0 零刪除）、措辭警報全綠、SPEC v2.4 援引 line 816 驗證通過；(3) **maskable icon 視覺有可改善但非致命**——文字在 80% safe area 內、僅白色裝飾圓環會被裁；(4) **testing_protocol.md 對 PDM 不友善**（Blocker-03 自承）——這條也影響 sprint 整體可交付品質。

---

## 總結（給技術讀者）

- **加權總分**：0.572 / 1.00
- **全局調整**：+0.02（範圍紀律 + 誠實揭露 blockers + 措辭警報全綠的疊加價值）
- **最終總分**：**0.59 / 1.00**
- **判定**：🟡 **條件性達標的邊緣（接近不達標）—— 補件後可達標**
- **最大亮點**：範圍紀律與 SPEC v2.4 援引論述完美——`git diff --stat` 顯示 4 個 index.html 各 +254 / -0（零修改既有行）、`git diff | grep "^-[^-]"` 零命中，3 個錯誤值 `apple-mobile-web-app-title` 反向驗證未動（MO line 11 git blame：`df4c7351 2026-04-09`，sprint 開始前），AC-12 SPEC_v2.4_note 親自 Read SPEC.md:816 並逐字援引
- **最大紅旗**：AC-04~AC-10 共 **70% 權重的 AC** 都因 LLM 環境無實機而停在「程式碼層面已就位、實機驗證 ⏸」狀態。Contract 是 production mode、沒列「無實機時上限」fallback——這是 Harness 模板本身的缺口，不是 Generator 錯
- **是否建議進下一個 Sprint**：❌ **否——必須先讓 Anton 跑完 testing_protocol.md 18 張截圖 + 4 份 Lighthouse 報告後重新評分**。若補件後達標再進 sprint-002

---

## 全局調整欄

- **調整值**：+0.02
- **涵蓋 AC**：AC-11、AC-12 + 整體紀律
- **說明**：本輪 Generator 展現「**沒實機就誠實標 blocker，絕不造假截圖**」+「**範圍紀律 100%（零刪除、未順手修 apple-title 錯誤）**」+「**SPEC 推翻論述親自查行號並逐字援引**」+「**措辭警報全綠**」的疊加工程文化。各別 AC 已在個別評分反映，全局加 0.02 反映「即使分數 < 0.80，誠實揭露限制 + 嚴守範圍的工程紀律本身有價值」——這個價值若被忽視，會獎勵未來 Generator 為了達標而造假
- **未濫用補位**：+0.02 不會把本輪從不達標推進達標（0.572 → 0.59 仍 < 0.80），符合「全局調整不可拿來補位」原則

---

## 引用查證紀錄（Step 1.6 必填）

Generator 對外部程式碼 / 檔案的引用清單。本輪 Evaluator **抽查 100%**（共 9 條，遠超 30% 強制門檻）。

### 引用 1：SPEC.md line 816「若未來有強烈需求，可再補 sw.js」
- Generator 引用位置：`output/SPEC_v2.4_note.md` § ②、`self_review.md` AC-12 段
- 查證動作：Read `_PM/SPEC.md:810-820`
- 結論：✅ **行號精確、原文逐字吻合**——line 816 原文「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。若未來有強烈需求，可再補 `sw.js`」與 Generator 援引完全一致

### 引用 2：HK og:title 行號 19
- Generator 引用：`self_review.md` AC-01 段「HK name="Horlick送別行" ← `2026_04_HK/index.html:19` og:title」
- 查證動作：`grep -n "og:title" 2026_04_HK/index.html`
- 結論：🟡 **行號偏移 +2**——實際在 line 21（self_review 寫 19）。值與內容吻合、不影響語義，列為 LOW 紅旗

### 引用 3：MO og:title 行號 19
- 查證動作：同上
- 結論：🟡 行號偏移——實際 line 21（self_review 寫 19）

### 引用 4：Singapore og:title 行號 21
- 查證動作：同上
- 結論：🟡 行號偏移——實際 line 23（self_review 寫 21）

### 引用 5：AKAME og:title 行號 22
- 查證動作：同上
- 結論：🟡 行號偏移——實際 line 24（self_review 寫 22）

### 引用 6：HK sw.js 24 個 precache items
- Generator 引用：`self_review.md` AC-07 段
- 查證動作：`grep -c "^  './" 2026_04_HK/sw.js` 與 Read PRECACHE array 逐行清點（lines 8-33）
- 結論：✅ **24 個吻合**——3 site (`./`、`./index.html`、`./manifest.json`) + 19 既有 jpg + 2 icon-png = 24
- **更正先前 v1.0 review 誤判**：v1.0 評為「實際 23、差 1」是 grep 計數錯誤，self_review 數字正確

### 引用 7：Singapore sw.js 40 個 precache items
- 查證動作：`grep -c "^  './" 2026_05_Singapore/sw.js` 與 Read PRECACHE array 逐行清點（lines 8-49）
- 結論：✅ **40 個吻合**——3 site + 35 既有 img + 2 icon = 40
- **更正先前 v1.0 review 誤判**：v1.0 評為「實際 38、差 2」是 grep 計數錯誤，self_review 數字正確

### 引用 8：AKAME sw.js 21 個 precache items
- 查證動作：Read `2026_07_AKAME/sw.js` PRECACHE array
- 結論：✅ 21 個吻合（3 site + 16 既有 png + 2 icon = 21）

### 引用 9：MO sw.js 5 個 precache items
- 查證動作：Read `2026_04_MO/sw.js` PRECACHE array
- 結論：✅ 5 個吻合（MO 原無內容圖片，僅 3 site + 2 icon = 5）

**總體結論**：無編造引用。9 個引用中：
- ✅ 完全吻合：5 個（SPEC line 816 + 4 個 sw.js PRECACHE 計數）
- 🟡 小偏移：4 個（全部是 og:title 行號 +2 偏移）

行號偏移不構成 hallucination（檔案 / 函式 / 值都存在），但反映 Generator 在自評時對行號沒重新 grep——列為 LOW 紅旗，不降 AC 分數。**自評的 PRECACHE 計數 5 條全對**——Generator 在這部分相當嚴謹。

---

## 逐條 AC 評分

### AC-01 ｜ 4 manifest.json 結構 + 從 og meta 取資料（無特例）

- **評分**：🟡 0.7
- **權重**：8%
- **加權貢獻**：0.7 × 0.08 = **0.056**
- **證據**：
  - 4 份 manifest.json 通過 JSON 結構檢查：必填欄位齊全（name、short_name、description、start_url、scope、display、theme_color、background_color、icons）
  - icons 陣列：4 entries × [192x192 any、512x512 any、192x192 maskable、512x512 maskable]——尺寸 + purpose 雙覆蓋
  - 8 個 icon PNG `file` 驗證：4 × 192x192 + 4 × 512x512 RGBA non-interlaced（尺寸正確）
  - 資料來源一致性 ✓：
    - HK manifest.name="Horlick送別行" ↔ `2026_04_HK/index.html:21` og:title 一致
    - MO manifest.name="MO台南行" ↔ `2026_04_MO/index.html:21` og:title 一致
    - Singapore manifest.name="新加坡慶生行" ↔ `2026_05_Singapore/index.html:23` og:title 一致
    - AKAME manifest.name="AKAME 2026" ↔ `2026_07_AKAME/index.html:24` og:title 一致
    - 4 個 theme_color=#121212 ↔ 4 個 `<meta name="theme-color">` 一致
  - 無 AKAME 特例（v2.0 修訂要求）✓
- **判斷理由**：JSON 結構與資料來源紀律完美。**maskable icon 視覺有改善空間**：Evaluator 親自 view HK icon-512.png——文字 "Horlick" 確實在 `safe_margin = 0.1 × 512 = 51px` 之內（中央 80% 內），但白色裝飾圓環畫在 `safe_margin // 2 = 26px` 邊距上（僅 5% 內縮）。Android maskable 渲染（圓形 / 圓角矩形裁切到中央 ~80%）時，**文字會保留、白色裝飾圓環會被裁掉**——影響視覺品質但不破壞識別性。`generate_icons.py:67-69` 註解寫 "10% padding -> 80% safe area" 是針對文字（已守住），裝飾圓環則屬於可改進項
- **補上需要做**：(a) 修 `generate_icons.py:86-93` 把 ring 改畫在 `safe_margin`（10% 內縮）而非 `safe_margin // 2`（5% 內縮），重生 8 個 PNG；OR (b) 接受裝飾環被裁的視覺折衷，將 AC-01 升回 1.0（文字保留就夠）

### AC-02 ｜ 4 index.html `<head>` 注入 manifest + apple-touch-icon

- **評分**：✅ 1.0
- **權重**：5%
- **加權貢獻**：1.0 × 0.05 = **0.05**
- **證據**：
  - `git diff 2026_04_HK/index.html` 顯示 `<head>` 內 +2 行：
    ```
    +  <link rel="manifest" href="./manifest.json">
    +  <link rel="apple-touch-icon" href="./img/icon-512.png">
    ```
    插在既有 `<link id="app-icon" rel="icon" href="data:,">` 之後
  - 同模式套用 4 個檔（diff 一致）
  - 既有的 `apple-mobile-web-app-capable` / `mobile-web-app-capable` / `apple-mobile-web-app-title`（含 3 個錯誤值）保留不動——`git blame -L 10,12 2026_04_MO/index.html` 顯示 line 11 commit `df4c7351 Anton Liu 2026-04-09`，明顯早於 sprint 開始
- **判斷理由**：機械性注入到位、零既有行被動

### AC-03 ｜ 浮層 UI + viewport 判斷（< 768 顯示、≥ 1024 不顯示）

- **評分**：🟡 0.7
- **權重**：8%
- **加權貢獻**：0.7 × 0.08 = **0.056**
- **證據**：
  - 浮層 DOM（`output/inline_patches/body_pwa_block.html:142-147`）：底部固定（`bottom: 12px`、`position: fixed`）、左 `<img class="pip-icon" src="./img/icon-192.png">`、文字「加入主畫面，方便旅途中快速查看！」、橘鈕「安裝」（`background: #f97316`）、X 鈕（`#pwaCloseBtn`）✓
  - **雙層 viewport 閘**：
    - CSS 主閘（line 81-86）：`@media (min-width: 768px) { .pwa-install-prompt, .pwa-ios-modal { display: none !important } }`——桌面任何嘗試 display: flex 都被 !important 蓋掉，**含 iOS modal 也閘住**
    - JS 次閘（line 165、179）：`isMobileViewport = window.innerWidth < 768`、`if (isStandalone || !isMobileViewport) return`——避免桌面註冊 listener
  - 桌面截圖（≥1024px no_overlay 4 張）❌ 缺
- **判斷理由**：程式碼層雙保險到位、CSS 與 JS 邏輯彼此補位、reference image 對應元素都齊。但 contract 明寫「桌面 mobile mode（< 768px）截圖比對相似度 ≥ 80%」+ AC-10 列 4 張 `desktop_*_no_overlay.png`——**0/4 張截圖**，視覺驗證未做
- **補上需要做**：Anton 在桌面 Chrome 跑 4 個行程截「viewport ≥ 1024px 無浮層」+ DevTools Device Mode 切手機尺寸截「浮層 vs reference image 比對」

**邊界探測（Evaluator 主動）**：
- 程式碼層讀 `body_pwa_block.html:163-164`，`isStandalone` 偵測同時用 `matchMedia('(display-mode: standalone)')` 與 `window.navigator.standalone`（iOS Safari 專屬）——雙路徑 ok
- 但注意 line 167-177：**SW 註冊邏輯放在 isStandalone/isMobileViewport early return 之前**——桌面 Chrome 也會註冊 SW。這對 AC-09 Lighthouse 桌面測試**有利**（installable 可達標），但意味著 SW 在桌面持續執行（無傷大雅）

### AC-04 ｜ Android Chrome beforeinstallprompt 路徑

- **評分**：🟡 0.5
- **權重**：11%
- **加權貢獻**：0.5 × 0.11 = **0.055**
- **證據（程式碼層）**：
  - `body_pwa_block.html:196-199`：`window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredPrompt = e; })` ✓
  - `body_pwa_block.html:213-227`：`installBtn.click` → `deferredPrompt.prompt()` → await `userChoice` → console.log outcome → `deferredPrompt = null` → `hidePrompt()` ✓
  - `body_pwa_block.html:245-248`：`appinstalled` event listener 額外 hide ✓
  - 流程順序：load → beforeinstallprompt 暫存 → 1.5s setTimeout 顯浮層 → click → prompt
- **缺**：實機截圖 5 張（android_*_overlay/prompt/homescreen/standalone/offline）全 0
- **判斷理由**：程式碼層邏輯正確、套用標準 Web API、無明顯錯誤；但 contract production mode 要求實機 + 截圖，無證據顯示在真實 Android Chrome 上 prompt 真的彈出
- **補上需要做**：Anton 依 testing_protocol.md「Android 5 張」操作

### AC-05 ｜ iOS Safari 引導教學 modal

- **評分**：🟡 0.5
- **權重**：11%
- **加權貢獻**：0.5 × 0.11 = **0.055**
- **證據（程式碼層）**：
  - `body_pwa_block.html:190-192`：iOS UA 偵測——`/iPad|iPhone|iPod/.test(ua) && !window.MSStream` 主路徑 + `navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1`（iPadOS Safari 13+ 自報 MacIntel hack）
  - `body_pwa_block.html:224-226`：沒 deferredPrompt → 顯示 `iosModal.classList.add('is-visible')`
  - Modal 內容（line 148-158）：「按 Safari 下方的 📤 分享」→「選『加入主畫面』」→「確認名稱後按『新增』即可」3 步驟 ✓
  - 關閉路徑：「我知道了」鈕 OR 點 modal 背景（line 238-243）
- **缺**：5 張 iOS 截圖（overlay/guidance/homescreen/standalone/offline）全 0
- **判斷理由**：邏輯正確、UA hack 是業界通用做法、modal 文案清楚；但 iPadOS UA 偵測 hack 在未來 Safari 改動時可能失效（Generator 已在 known compromise #2 標）
- **補上需要做**：Anton 用 iPhone 實機 OR BrowserStack OR iOS Simulator 跑 5 張

**邊界探測**：iPad Safari 自報 `MacIntel` 是真實已知行為（Apple 自 iOS 13 開始）。若使用者 iPad 連接外接鍵盤觸控板、`maxTouchPoints > 1` 仍 true——這個 hack 是業界通用，可接受

### AC-06 ｜ localStorage 永久關閉 + standalone 偵測

- **評分**：🟡 0.5
- **權重**：8%
- **加權貢獻**：0.5 × 0.08 = **0.04**
- **證據（程式碼層）**：
  - `body_pwa_block.html:181-182`：啟動讀 `DISMISS_KEY = 'pwa-install-dismissed'`，=== `'1'` early return
  - `body_pwa_block.html:202`：setTimeout 內第二次檢查 dismissed（避免 race）
  - `body_pwa_block.html:229-236`：X 鈕點擊 → `localStorage.setItem(DISMISS_KEY, '1')` + try/catch 保護 Safari Private Mode quota error
  - `body_pwa_block.html:163-164`：isStandalone 偵測（display-mode 主 + iOS navigator.standalone 副）→ line 179 early return
- **缺**：跨頁實測未跑（HK 關 X → MO 是否也不出現？需手動驗）
- **判斷理由**：localStorage key 名與 contract 一致、early return 邏輯雙重保護、Private Mode 例外有 try/catch
- **補上需要做**：依 testing_protocol.md AC-06 段四步流程跑（同 origin localStorage 跨頁共享驗證）

### AC-07 ｜ SW 註冊 + 預快取（含版本字串）

- **評分**：🟡 0.5
- **權重**：10%
- **加權貢獻**：0.5 × 0.10 = **0.05**
- **證據（程式碼層）**：
  - 4 個 sw.js 都含 `CACHE_VERSION = 'v1.0.0'` + `CACHE_NAME = \`pwa-{slug}-${CACHE_VERSION}\`` ✓
  - install handler：`caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())` + `.catch()` warn log ✓
  - activate handler：刪除同 slug 不同版本舊 cache + `clients.claim()` ✓
  - **PRECACHE 計數（Evaluator `grep -c "^  './"` 確認）**：
    - HK sw.js **24 個**（3 site + 19 既有 jpg + 2 icon-png）✓
    - MO sw.js **5 個**（3 site + 2 icon；MO 本無內容圖片）✓
    - Singapore sw.js **40 個**（3 site + 35 既有 img + 2 icon）✓
    - AKAME sw.js **21 個**（3 site + 16 既有 png + 2 icon）✓
  - 註冊邏輯：`body_pwa_block.html:167-177` `navigator.serviceWorker.register('./sw.js', { scope: './' })` + catch warn
- **缺**：DevTools Application > Service Workers 顯示 `activated` 的截圖 4 張全 0
- **判斷理由**：SW 程式碼結構符合 best practice、scope 紀律對齊、cache 命名含版本字串便於後續 bump、precache 涵蓋所有同 origin 資源、4 份 sw.js 程式碼結構一致（無特例）
- **補上需要做**：4 行程在桌面 Chrome 開頁、看 DevTools Application > Service Workers tab 截 activated 狀態

**邊界探測（Evaluator）**：
- Singapore PRECACHE 含 `./img/St Andrew's Cathedral.jpg`（line 43）——檔名含**單引號** + **空格**。`addAll()` 內部會對 URL string 做 encoding，**通常**能處理，但這是公認的潛在邊界 case，飛航測試應特別檢查這張是否有 cache hit
- HK PRECACHE 含中文檔名（`./img/前九廣鐵路鐘樓.jpg` 等 10+ 個）——同樣依賴瀏覽器 URL encode 正確性
- Singapore 含 `1887 by André-2.webp` + `1887 by André.jpg`（重音符 é）——額外的 Unicode 邊界

### AC-08 ｜ 飛航模式完整離線（**權重 16%、本 sprint 最核心**）

- **評分**：🟡 0.5
- **權重**：16%
- **加權貢獻**：0.5 × 0.16 = **0.08**
- **證據（程式碼層）**：
  - fetch handler（4 sw.js）：
    - 同 origin → **cache-first**（caches.match 命中直接回；miss 才 fetch + put-to-cache）
    - 跨 origin → **network-first with cache fallback**（適合字型 / 天氣 / 地圖）
    - 同 origin fetch 失敗 → fallback to `./index.html`（避免 nav 死掉）
  - install phase 已 addAll 全行程所有 img/——首訪後完全離線可用
- **缺**：飛航模式實測截圖 2 張（android_offline / ios_offline）全 0、DevTools Network 顯示 from ServiceWorker 截圖 0
- **判斷理由**：fetch handler 結構正確、cache-first 對靜態內容是業界標準做法、跨 origin fallback 邏輯合理；但 **production 16% 權重 AC 完全無實機證據**——這條的滿分必須見飛機 icon + 完整圖文載入
- **補上需要做**：依 testing_protocol.md AC-08 完整 6 步流程

**邊界探測（Evaluator 強烈紅旗）**：
- **Cache Storage 配額**：Singapore 40 個 entries（含多張 webp）對 Safari ~50MB quota 是壓力測試。Generator 在 self_review compromise #4 標了「無 quota monitoring」——這意味著 PWA 真實使用一段時間後可能突然壞掉，**這條紅旗應列為下一輪 sprint 必處理項**
- **HK 中文檔名 + Singapore 含 `'` + `é` 的檔名**：依賴瀏覽器 URL 自動 encode，在 SW addAll() 上線通常 ok，但若 GitHub Pages 上線後對中文/特殊字元有 encode 差異會 cache miss——應在飛航測試時特別驗

### AC-09 ｜ Lighthouse PWA ≥ 90

- **評分**：❌ 0.0
- **權重**：5%
- **加權貢獻**：0.0 × 0.05 = **0.0**
- **證據**：`output/install_screenshots/` 內無任何 `lighthouse_*.png`，僅 README.md 佔位
- **判斷理由**：客觀 0/4 份報告
- **補上需要做**：Anton 桌面 Chrome 對 4 個行程 URL 跑 Lighthouse PWA audit 並截報告

### AC-10 ｜ 18 張截圖

- **評分**：❌ 0.0
- **權重**：5%
- **加權貢獻**：0.0 × 0.05 = **0.0**
- **證據**：`ls output/install_screenshots/` 只有 README.md 一個檔——0/18 張
- **判斷理由**：客觀 0/18
- **補上需要做**：Anton 依 testing_protocol.md 跑完 18 張並命名嚴格符合規範

### AC-11 ｜ **範圍紀律**

- **評分**：✅ 1.0
- **權重**：10%
- **加權貢獻**：1.0 × 0.10 = **0.10**
- **證據**：
  - `git diff --stat 2026_*/index.html`：4 × +254 / -0 = **+1016 / -0**——零既有行被改
  - `git diff 2026_*/index.html | grep "^-[^-]"`：**零命中**——確認絕對零刪除
  - `git status --short`：M 4 修檔 + ?? 16 新檔（4 manifest + 4 sw + 8 icon）+ ?? `_PM/harness/`（contract ③.1 允許的 sprint 工作檔）
  - 4 個 index.html diff 變動範圍：
    - `<head>` 內 +2 行（manifest link + apple-touch-icon link）插在既有 line 11 後
    - body 內注入 PWA block（lightbox div 後、`</body>` 前）+252 行
  - **錯誤值 `apple-mobile-web-app-title="Horlick送別行"` 反向驗證**（grep 4 個 index.html 結果）：
    - HK line 11 `"Horlick送別行"` ← HK 正確值
    - MO line 11 `"Horlick送別行"` ← 錯誤值（contract 允許保留），git blame `df4c7351 2026-04-09`，sprint 前
    - Singapore line 10 `"Horlick送別行"` ← 錯誤值（保留）
    - AKAME line 11 `"Horlick送別行"` ← 錯誤值（保留）
    - 3 個錯誤值都**未被本 sprint 觸碰** ✓
- **判斷理由**：範圍紀律執行到極致——Generator 對「順手修小 bug 的誘惑」展現了完整自制力，這是工程紀律的教科書範例

### AC-12 ｜ SPEC_v2.4_note.md 援引 SPEC.md v2.3 line 816

- **評分**：✅ 1.0
- **權重**：3%
- **加權貢獻**：1.0 × 0.03 = **0.03**
- **證據**：
  - `output/SPEC_v2.4_note.md` 存在、12 個段落結構完整
  - § ② 援引 line 816 原文：「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。**若未來有強烈需求，可再補 `sw.js`**」
  - **Evaluator 親自 Read `_PM/SPEC.md:810-820`**：line 816 原文逐字一致 ✓
  - § ① 變動摘要表（v2.3 → v2.4 各維度對照）✓
  - § ③ v2.4 應補 § 7.0~7.4 草稿（PWA 三件套規範、安裝路徑、line 816 段落作廢、icon 製作改 sibling PNG）✓
  - § ④ 16 個新檔位置樹狀圖 ✓
  - § ⑤⑥ sprint-close 整併指引（含 5 步驟操作清單）✓
- **判斷理由**：論述鏈完整——「v2.3 自己預埋 → 使用者強烈需求觸發 → 啟用後路非憑空推翻」。引用查證一字不差。AC-12 是 v2.0 新增條目，Generator 對「為什麼可以推翻 v2.3」的論述紀律到位

---

## content-site adapter § 3.1 額外檢查

- ✅ **措辭警報**：`grep -E "我推測|應該是|大概|通常會|可能是"` 對 `output/` 全部 .md + `self_review.md` + `blockers.md`——**零實質命中**（contract / 規範引用本身不算）
- ✅ **連結可達（程式碼層面）**：4 manifest 內 icons.src 路徑 `./img/icon-192.png` / `./img/icon-512.png` 全部 8 個檔實際存在於 4 個 `2026_*/img/` 中（`file` 命令驗證 PNG header + 尺寸吻合：4 × 192x192 + 4 × 512x512 RGBA）；4 個 apple-touch-icon href 同樣 ✓
- ❌ **即時查證**：本 sprint 不動內容（不寫 itinerary、不改地址 / 票價），**不適用**——content-site adapter § 1.1~1.3 在 contract 已標明，§ 3.1 即時查證亦不適用
- ❌ **OG 預覽**：本 sprint 不動 OG meta，不適用——標明
- ✅ **內容腐爛範圍紀律**：git diff 確認 4 個 index.html 既有行零修改、frontmatter / itinerary.md 完全未動
- ✅ **AC-11 反向驗證**：3 個錯誤值 apple-mobile-web-app-title（MO/Singapore/AKAME）仍在錯誤值（git blame 確認 sprint 未動）

---

## 🚩 紅旗清單

### 🔴 高優先

1. **production mode + LLM 環境無實機 = Harness 模板缺口（最大紅旗）**
   - 本 sprint contract `mode: production` 要求所有 AC 實測（含截圖）
   - 但 Generator 是 LLM、沒有 Android / iPhone / Lighthouse CLI / 圖形瀏覽器
   - Generator 已做的「產出 testing_protocol.md 把實機部分推給人類」是合理應對，但**Contract 沒明訂這種 fallback**
   - 結果：AC-04~AC-10 共 **70% 權重的 AC** 全部停在 0.5 上限（程式碼層分）或 0.0（截圖類），總分硬性卡在 0.572 + 全局 0.02 = 0.59，**不可能在本輪達 0.80**
   - **回灌建議**：Harness `templates/03_evaluator.md` 與 `templates/04_sprint_contract.md` 補充「LLM 環境 + production sprint」fallback——例如「實機類 AC 若 Generator 提供 testing_protocol.md，Evaluator 給 0.5 程式碼層分；人類補完截圖後重新評分」。否則所有需實機的 production sprint 都會在 LLM Generator 下卡在「不可能達標」的死局

2. **testing_protocol.md 對 PDM 不友善（Blocker-03 自承，影響整體可交付品質）**
   - Generator 已在 `blockers.md` 新增 Blocker-03 自承：testing_protocol.md line 20 寫「本 sprint 的程式碼變動已 push 到 GitHub Pages（**或** local serve `python -m http.server`）」——`python -m http.server` 是 jargon，PDM 雙擊 index.html 必壞（CORS / SW 註冊失敗），但 protocol 沒解釋
   - Anton 第一次嘗試測試時已撞牆，需要在 Harness 中央對話被引導才解決
   - 這是「Generator 對 PDM 友善層執行不到位」的具體證據——不直接降 AC 分（沒對應的單一 AC），但反映在「下一輪建議」與「整體品質」
   - **回灌建議**：`templates/02_generator.md` 寫操作 protocol 時必含「**為什麼必須這樣做**」白話版 + 反向警告（「雙擊 index.html 會壞」這類）

3. **Maskable icon 裝飾圓環會被裁（視覺品質中度問題）**
   - manifest 把 icon-192/512 同時掛 `any` + `maskable`（HK 等 4 個）
   - Evaluator 親自 view HK icon-512.png：文字 "Horlick" 在中央 80% safe area 內（`generate_icons.py:67-69` 已守住）——**文字會保留**
   - 但白色裝飾圓環畫在 `safe_margin // 2 = 26px`（5% 內縮）——maskable 渲染時**會被裁掉**
   - Android 主畫面強制圓形/圓角時，圖示會看到「純色背景 + 中央文字」，視覺品質降低但不破壞識別性
   - **修法**：(a) 改 `generate_icons.py:86-93` 讓 ring 也守 10% 內縮，重生 8 個 PNG（檔名不變）；OR (b) manifest 移除 maskable purpose 只保留 any（保守做法）
   - **比 v1.0 review 更精確的判讀**：v1.0 review 描述「圖內容（圓+文字）邊緣已貼到圖框邊緣，Android 用 maskable 渲染時會把字裁掉」——這描述過嚴。實測文字守 80% safe area、只有裝飾環會被裁

4. **Cache 配額對 Singapore 行程是壓力測試**
   - Singapore 40 entries（含多張 webp 大圖 + `1887 by André` 等含重音符檔名）對 Safari ~50MB quota 緊湊
   - Generator 已在 compromise #4 標「無 quota monitoring」——意味著真實使用一段時間後可能突然「離線不能用了」
   - **下一輪 sprint 候選**：補快取健康檢查（讓使用者知道 quota 狀態 / 自動降級策略）

### 🟡 中優先

5. **HK + Singapore 檔名特殊字元的 SW addAll 邊界**
   - HK 中文檔名 10+ 個（`./img/前九廣鐵路鐘樓.jpg` 等）
   - Singapore 單引號檔名 1 個（`./img/St Andrew's Cathedral.jpg`）+ 重音符 2 個（`./img/1887 by André.jpg`、`./img/1887 by André-2.webp`）
   - 依賴瀏覽器 URL encode 正確性。理論上 ok，但飛航測試應特別驗證這些檔在 Cache Storage 內可命中
   - **檢查方式**：DevTools Application > Cache Storage > 翻閱 entries 名稱

6. **self_review 行號偏移**
   - 4 個 og:title 行號全部差 2（self_review 寫 19/19/21/22，實際 21/21/23/24）
   - 不影響語義（檔案 / 函式 / 值都存在），但反映 Generator 在自評時沒回頭 grep 確認最新行號
   - **PRECACHE 計數** 5 條全對（24/5/40/21）——Generator 在這部分嚴謹
   - **回灌建議**：Generator 模板 Step 4 self_review 寫作前強制重新 grep 引用——避免「印象中的行號」

7. **icon 視覺偏離 plan 期待**
   - plan 期待「從既有 img/ 挑代表圖裁切」，Generator 走 fallback「品牌色 + CJK 文字 logo」
   - Generator 已在 blockers Blocker-02 + self_review 標明
   - Anton 可決定是否換 PNG（檔名不變即可）

### 🔵 低優先

8. **桌面 Chrome 仍會註冊 SW**（雖然浮層被閘住）
   - `body_pwa_block.html:167-177` 的 SW 註冊在 `isStandalone || !isMobileViewport` early return **之前**
   - 不違反 AC、對 Lighthouse 桌面分數有利
   - 但桌面使用者其實不需要 SW 預快取——多消耗一點儲存。可忽略

9. **iOS UA 偵測 hack 依賴 Safari 行為不變**
   - `navigator.platform === 'MacIntel' && maxTouchPoints > 1` 是業界通用 iPadOS hack
   - 未來 Safari 改動會失效——已在 compromise #2 標

---

## 對 self_review 的回應

Generator 自評加權 0.572，我評加權 0.572、加全局 +0.02 = **0.59**。基本一致。

逐條對照：

| AC | Generator 自評 | Evaluator 評 | 出入 |
|---|---|---|---|
| AC-01 | 🟡 0.7（icon 偏 plan）| 🟡 0.7（**maskable 裝飾環會裁但文字守住**）| 出入：扣分理由不同。Generator 是「icon 視覺非照片」，我發現「maskable 文字守 safe area、僅裝飾環有改善空間」。**分數相同但理由更精確** |
| AC-02 | ✅ 1.0 | ✅ 1.0 | 一致 |
| AC-03 | 🟡 0.7 | 🟡 0.7 | 一致——程式碼到位、截圖缺 |
| AC-04 | 🟡 0.5 | 🟡 0.5 | 一致 |
| AC-05 | 🟡 0.5 | 🟡 0.5 | 一致 |
| AC-06 | 🟡 0.5 | 🟡 0.5 | 一致 |
| AC-07 | 🟡 0.5 | 🟡 0.5 | 一致——**Generator PRECACHE 計數 24/5/40/21 全對** |
| AC-08 | 🟡 0.5 | 🟡 0.5 | 一致——但我額外標「中文 + `'` + `é` 檔名 SW addAll 邊界」紅旗 |
| AC-09 | ⏸ 0.0 | ❌ 0.0 | 一致 |
| AC-10 | ❌ 0.0 | ❌ 0.0 | 一致 |
| AC-11 | ✅ 1.0 | ✅ 1.0 | 一致——我額外 git blame 驗證 3 個錯誤值的 commit 日期都早於 sprint |
| AC-12 | ✅ 1.0 | ✅ 1.0 | 一致——我親自 Read SPEC.md:810-820 驗證原文 |

**整體判斷**：Generator 自評相當誠實（沒高估自己）。我的全局 +0.02 反映誠實 + 紀律的疊加價值。Generator 在 self_review § 對 Harness 改進建議 + Blocker-03 主動標 testing_protocol.md PDM 缺陷——這種「自己抓出自己問題」的紀律值得肯定。

---

## 下一輪建議

### 必補件（本輪達標前必做）

1. **Anton 依 `output/testing_protocol.md` 跑完 18 張截圖**（Android 5 + iOS 5 + Lighthouse 4 + 桌面 no_overlay 4）
2. **Anton 跑 4 次 Lighthouse PWA audit**，4 個分數截圖證明 ≥ 90
3. **修 maskable icon 裝飾環 OR 接受裁切**（中央文字已守 safe area）——若選修，改 `generate_icons.py:86-93` ring 內縮從 5% → 10% 後重生 8 個 PNG（檔名不變）
4. **AC-06 跨頁實測回報**到 self_review.md 補一段 4 步流程結果

補完後**重新呼叫 Evaluator**——預計 AC-04~AC-10 從 0.5/0.0 升到 1.0，AC-01 若修 ring 後升回 1.0、若接受裁切維持 0.7~0.85，總分 **0.59 → ~0.92**（達標）。

### 下一個 Sprint 主題建議

- **主題 A：apple-mobile-web-app-title 錯誤值修正**——MO / Singapore / AKAME 3 個都是 `"Horlick送別行"`，獨立 sprint-001b 或併入 sprint-002 處理
- **主題 B：sync-meta.py 擴張為 PWA 三件套自動產出**——新增第 5 趟旅程時自動產出 manifest + sw + icon（解 known compromise #1）
- **主題 C：SW cache quota 監控與健康檢查**——Singapore 行程已是壓力測試（解 known compromise #3）
- **主題 D：sprint-close 整併 SPEC v2.4**——把 SPEC_v2.4_note.md 落到 SPEC.md 主檔

### 回灌 Harness 自身的反省（🔴 紅旗 1 + 2 衍生）

- **`templates/03_evaluator.md` 缺「LLM Generator + production sprint」fallback 條款**——本 sprint 反映此死局
- **`templates/04_sprint_contract.md` 應允許 Planner 在 production mode 寫「截圖類 AC 由 human 補件」auxiliary fallback**——避免把不可能的任務硬塞給 LLM Generator
- **`adapters/content_site.md` 對「程式+內容混合」sprint 不貼**——本 sprint 主要動 JS/CSS/SW、放在 content-site adapter 下勉強。建議新增 `mixed-site` adapter 或 content-site § 補「PWA / 互動類混合」規則
- **`templates/02_generator.md` 寫 PDM 操作 protocol 時必含「為什麼這樣做」白話版**——對應 Blocker-03 自承（testing_protocol.md line 20 缺反向警告「雙擊 index.html 會壞」）
- **Generator 模板缺「截圖類 AC handling」標準 fallback**——應規範：「Generator 環境無截圖能力時，產出 testing_protocol.md + 標明 blockers + 提供命名規範」就算合規

→ 寫進 `retrospectives/after_sprint-001-pwa.md`

### 校準範例補充建議（IMP-09 持續慣例）

本輪 sprint 觸及兩個既有範例**未涵蓋**的情境：

#### 草稿範例 C-D：production mode + LLM Generator 無實機 + 誠實標 blocker

- Generator 產出：程式碼全寫完（4 manifest + 4 sw + 8 icon + 4 head/body inject）+ 範圍紀律完美（+1016/-0）+ 寫 testing_protocol.md 把實機部分交給人類 + blockers.md 誠實列環境限制 + 沒造假截圖
- 但：production mode AC-04~AC-10 全部需實機證據，0/18 截圖 + 0/4 Lighthouse
- **該打分區間**：🟡 0.55 ~ 0.65（總分）+ +0.02 全局調整（誠實 + 紀律）
- **理由**：Generator 對「沒有就誠實標」做到極致，但 production mode 沒有 fallback 條款讓這種狀態能達 0.80。這暴露 Harness 模板缺口，但 Evaluator 不該為了「讓 Generator 達標」而違反證據主義打高分。**正確處置**：給條件性達標（補件後重評），同時把 Harness 模板缺口回灌 retrospective

#### 草稿範例 C-E：content-site adapter 下的「程式+內容混合」sprint

- Generator 產出：主要動 JS/CSS/SW、4 個 manifest.json、不動任何 itinerary 內容
- 但：content-site adapter § 3.1 額外檢查清單的「即時查證」「OG 預覽」這兩條本 sprint 都不適用
- **該打分原則**：Evaluator 在 review.md 顯式標「不適用」並說明理由，**不可硬套**。同時把這個觀察回灌「content-site adapter 是否需要 mixed-site sub-mode」討論

→ sprint-close 收尾時併入 03_evaluator.md 與 content_site.md 適當位置

---

## 我（Evaluator）的自我檢查

- [x] 每條 AC 都讀過實際產物（4 manifest.json + 4 sw.js + 4 index.html diff + 1 body_pwa_block.html + 1 generate_icons.py + 1 inject_body_patch.py + SPEC_v2.4_note + testing_protocol + 8 icon PNG 視覺 view + reference image.png 已對照）
- [x] **Step 1.6 引用查證已執行**——9 個外部引用全查（100%）：SPEC line 816 ✓、4 個 og:title 行號（行號有偏移）、4 個 sw.js precache 數量（全部正確，更正 v1.0 review 計數誤判）
- [x] mode = production，所以未套 dry-run 上限規則；但反映出 production mode 對 LLM Generator 截圖類 AC 的死局——已列高優先紅旗 + Harness 回灌
- [x] 全局調整欄已填（+0.02 反映工程紀律 + 誠實揭露的疊加價值，絕對值 ≤ 0.10、未拿來補位讓本輪達標）
- [x] 至少嘗試過邊界 case：
  - 桌面 Chrome 註冊 SW 但不顯浮層的雙閘衝突檢查（無衝突，但桌面 SW 仍註冊）
  - HK 中文檔名 + Singapore `'` 與 `é` 檔名的 addAll 邊界（列紅旗）
  - Maskable icon safe area 親自看圖確認（文字守住、裝飾環會裁——精修 v1.0 過嚴判讀）
  - JS 內 setTimeout race（額外 dismissed check 已防護 ✓）
  - git blame 反向驗證 4 個 apple-mobile-web-app-title commit 日期都早於 sprint
- [x] 每個評分都附證據引用（檔案路徑 + 行號）
- [x] 紅旗清單含 9 條（4 高 + 3 中 + 2 低）
- [x] 無模糊措辭——所有評分都有具體理由與補件建議
- [x] 對 Blocker-03（testing_protocol.md PDM 不友善）已單獨列為高優先紅旗 #2（v1.0 review 漏列）

---

## 加權分數總表

| AC | 權重 | 評分 | 加權 |
|---|---|---|---|
| AC-01 manifest 結構 + og 一致 | 8% | 🟡 0.7 | 0.056 |
| AC-02 head 注入 | 5% | ✅ 1.0 | 0.050 |
| AC-03 浮層 + viewport 雙閘 | 8% | 🟡 0.7 | 0.056 |
| AC-04 Android beforeinstallprompt | 11% | 🟡 0.5 | 0.055 |
| AC-05 iOS 引導 modal | 11% | 🟡 0.5 | 0.055 |
| AC-06 localStorage 永久關閉 | 8% | 🟡 0.5 | 0.040 |
| AC-07 SW 註冊 + precache | 10% | 🟡 0.5 | 0.050 |
| AC-08 飛航模式離線 | **16%** | 🟡 0.5 | 0.080 |
| AC-09 Lighthouse ≥ 90 | 5% | ❌ 0.0 | 0.000 |
| AC-10 18 張截圖 | 5% | ❌ 0.0 | 0.000 |
| AC-11 範圍紀律 | 10% | ✅ 1.0 | 0.100 |
| AC-12 SPEC_v2.4_note | 3% | ✅ 1.0 | 0.030 |
| **加權總分** | **100%** | | **0.572** |
| **全局調整** | | | **+0.02** |
| **最終總分** | | | **0.59** |

**判定**：🟡 **條件性達標的下緣**（未達 0.80，但補件後預計達 ~0.92）

---

## v1.0 → v2.0 review 修訂摘要

本 review 是 v2.0，取代 2026-05-26 上午產出的 v1.0。修訂三點：

1. **更正 PRECACHE 計數**：v1.0 評為「HK 實際 23、Singapore 實際 38」（聲稱 Generator self_review 有小誤差）。Evaluator 重新 `grep -c "^  './"` 並 Read PRECACHE array 逐行清點，**確認 self_review 數字 24/5/40/21 全對**——是 v1.0 review 自己 grep 計數錯誤。此項從「🟡 數字誤差」改為「✅ 完全吻合」
2. **精修 maskable icon 判讀**：v1.0 描述「圖內容（圓+文字）邊緣已貼到圖框邊緣，Android 用 maskable 渲染時會把字裁掉」——這描述過嚴。Evaluator 親自 view HK icon-512.png + Read `generate_icons.py:67`：文字守 10% padding（80% safe area），只有裝飾環畫在 5% 內縮處會被裁。AC-01 仍 0.7（裝飾環裁切是視覺品質損失）但「文字會被裁」的描述更正
3. **新增 Blocker-03 評估**：v1.0 review 寫於 16:13，blockers.md Blocker-03（testing_protocol.md PDM 不友善）於 17:26 才追加，v1.0 沒涵蓋。v2.0 將此列為高優先紅旗 #2

整體加權總分與最終總分（0.59）不變——上述修訂屬於證據精修，不改 AC 評分結果。

---

> Review 版本：v2.0｜Evaluator：Claude Opus 4.7（獨立 sub-agent）｜2026-05-26
