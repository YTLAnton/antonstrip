---
sprint_id: sprint-001-pwa-install-prompt
from_role: evaluator
to_role: human (Anton)
produced_at: 2026-05-27
produced_by: Claude Opus 4.7（獨立 sub-agent，未看過 Generator 對話脈絡，亦未影響於前版 review）
adapter: content-site
work_type: new-feature
mode: production
references:
  - "{SPRINT_DIR}/contract.md (v2.0)"
  - "{SPRINT_DIR}/self_review.md (v1.1)"
  - "{SPRINT_DIR}/blockers.md (v1.2)"
  - "{SPRINT_DIR}/output/SPEC_v2.4_note.md"
  - "{SPRINT_DIR}/output/lighthouse_unavailable_note.md"
  - "{SPRINT_DIR}/output/notes_for_retrospective.md"
  - "{SPRINT_DIR}/output/inline_patches/body_pwa_block.html"
  - "{SPRINT_DIR}/output/install_screenshots/ (14 PNG)"
  - "{PROJECT_ROOT}/2026_*/manifest.json (4)"
  - "{PROJECT_ROOT}/2026_*/sw.js (4)"
  - "{PROJECT_ROOT}/2026_*/index.html (4 — head + body PWA block)"
  - "{PROJECT_ROOT}/_PM/SPEC.md:816"
  - "{HARNESS_ROOT}/01_CORE_CONCEPTS.html § p5"
  - "{HARNESS_ROOT}/templates/03_evaluator.md"
  - "{HARNESS_ROOT}/adapters/content_site.md"
status: complete
review_version: v3.0（第三輪獨立 sub-agent 重評；覆蓋 v2.0；發現新 P0 silent failure）
---

# Sprint Review — sprint-001-pwa-install-prompt（v3.0 重評）

**Evaluator**：Claude Opus 4.7（獨立 sub-agent）
**評估時間**：2026-05-27
**Adapter**：content-site
**Work Type**：new-feature
**Mode**：production

> ⚠️ 本檔覆蓋 v2.0 review。本輪是全新 sub-agent context，獨立讀 contract / output / 實際專案檔，並**親自打開所有截圖看內容**（不只是看檔名）。發現 v2.0 漏抓的 1 個 P0 silent failure。

---

## PDM Summary（≤200 字、無 jargon）

**這份文件做了什麼**：用「冷眼第三方」角度重新驗收 sprint-001 的 12 條 AC，方法是：跑 syntax check、開圖看內容、grep 既有檔、git blame 驗範圍紀律、Python 對照 SW 預快取 vs 實際圖片清單。

**結果是什麼**：總分 **0.665 / 1.00**，🟡 **條件性達標**（≥0.60、< 0.80）。前兩輪 Evaluator 漏抓的 P0 silent failure：**新加坡（Singapore）的 Service Worker 實際處於「redundant」狀態（不是活的）**——這在 AKAME 截圖底部清楚可見、但前兩版 review 沒打開圖看。Singapore 的離線能力 = 0。

**最重要的事**：**不要直接收尾**。最小修補（30 分鐘可做）：(1) Anton 在桌面 Chrome 重新註冊 Singapore SW（DevTools → Application → Service Workers → Unregister → 重整頁），驗證能達 activated；(2) 然後抓一張 Singapore SW activated 的乾淨截圖覆蓋現有那張。修完後可重評估到 ~0.78（接近達標）。次重要：拿手機跑 1 張真飛航 + 完整載入截圖補 AC-08。

---

## 總結（給技術讀者 30 秒讀完）

- **加權總分**：0.685 / 1.00
- **全局調整**：-0.02（見全局調整欄；4 條 AC 共用「DevTools = 等價實機」假設的集中風險）
- **最終總分**：**0.665 / 1.00**
- **判定**：🟡 **條件性達標**（≥ 0.60、< 0.80）
- **最大亮點**：範圍紀律 100% — git blame 確認 3 個錯誤的 `apple-mobile-web-app-title` 最後修改是 2026-04-09，sprint-001 commits（b6b0879、733a7cf）沒動該行；SW 預快取對 4 行程實際 `img/` 內容 100% 覆蓋（程式驗證：HK 21/21、MO 2/2、Singapore 37/37、AKAME 18/18，零遺漏零多餘）；4 manifest.json 通過 `python -m json.tool`；SPEC v2.3 line 816 引用逐字準確。
- **最大紅旗**：🔴 **AC-07：Singapore Service Worker 實際是 `redundant` 狀態**——`lighthouse_2026_07_AKAME_sw.png` 底部清楚顯示 `http://localhost:8000/2026_05_Singapa... #1451 is redundant`（灰點而非綠點）。但 self_review v1.1 line 111 宣稱「4 個行程 sw.js 全部 activated and is running」——**Generator 自評書面承諾與截圖證據相違**。Singapore 離線能力 = 0、AC-08 中 Singapore 的 16%/4 = 4% 權重直接歸零。
- **是否建議進下一個 Sprint**：🟡 **補件後再議**——最小補件 30 分鐘：重新註冊 Singapore SW 並截圖；可順帶補桌面 Chrome DevTools Offline mode 跑其他 3 行程的 offline 證據。

---

## 全局調整欄

```
- 調整值：-0.02
- 涵蓋 AC：AC-04、AC-05、AC-08、AC-09
- 說明：這 4 條 AC 共同依賴「DevTools Application panel + 程式碼閱讀 = 等價於實機驗證」
  這個 lighthouse_unavailable_note.md 提出的假設。該假設論述紮實（覆蓋 Lighthouse PWA
  原 8 項 boolean check 中的 6 項靜態 + 2 項動態），但本輪沒有獨立反例測試
  （例：在另一個未做 PWA 的同類靜態站套同一驗證方式是否會誤判通過）。
  集中風險：若假設有破口，4 條 AC 同時失分。
  扣 0.02 反映此跨 AC 風險，不取補位用途。
  （絕對值 0.02 ≤ 0.10、有具體 AC 對應、有獨立論證。）
```

---

## 引用查證紀錄（Step 1.6 必填）

Generator 的 self_review.md / SPEC_v2.4_note.md / output/ 含大量外部引用。抽查清單（共 6 條，超過 30% 抽查要求）：

### 引用 1：SPEC.md line 816 原文
- Generator 引用（SPEC_v2.4_note.md line 46）：「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。**若未來有強烈需求，可再補 `sw.js`**。」
- 查證動作：實際 Read `_PM/SPEC.md` line 805-825
- 行 816 真實內容：「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。若未來有強烈需求，可再補 `sw.js`。」
- 結論：**✅ 逐字吻合**，無編造。AC-12 引用驗證通過。

### 引用 2：4 個 manifest.json 的 og:title 對應
- Generator 引用（self_review.md line 43-47）：HK name="Horlick送別行" ← og:title；MO name="MO台南行" ← og:title；Singapore name="新加坡慶生行" ← og:title；AKAME name="AKAME 2026" ← og:title
- 查證動作：對 4 個 index.html grep `og:title`、4 個 manifest.json 讀 `name` 欄位
- 結論：**✅ 全部吻合**——AC-01 資料來源驗證通過、無特例硬編。

### 引用 3：sw.js precache 涵蓋實際 img/ 內容
- Generator 引用（self_review.md line 109）：HK 24 個 precache items（含 21 圖 + 3 root）、MO 5 個、Singapore 40 個、AKAME 21 個
- 查證動作：寫 Python 程式對 4 個 sw.js 的 `PRECACHE` array 抓出 entries、對照 `os.listdir(img/)`
- 結論：**✅ 全 4 行程精確吻合**——HK 21/21 img、MO 2/2、Singapore 37/37（含含單引號的 `St Andrew's Cathedral.jpg` 用雙引號正確處理）、AKAME 18/18，零遺漏、零多餘。比 self_review 數字（24/5/40/21）精準對齊。

### 引用 4：apple-mobile-web-app-title 錯誤值未修
- Generator 引用（self_review.md line 235，contract AC-11 + § 給 Evaluator 指令最後一條）：「3 個 index.html 內錯誤值 `apple-mobile-web-app-title="Horlick送別行"` 在 sprint 結束後仍是錯誤值（git blame 確認本 sprint 沒動）」
- 查證動作：對 4 個 index.html grep `apple-mobile-web-app-title`、git blame 該行
- 結論：**✅ 範圍紀律完美**
  - HK line 11、MO line 11、Singapore line 10、AKAME line 11 全部仍是 `content="Horlick送別行"`
  - `git blame -L 11,11 2026_04_MO/index.html` → commit `df4c7351`、Anton 2026-04-09 21:31:26（**早於 sprint 開工 2026-05-20**）
  - sprint-001 commits（`b6b0879` feat PWA、`733a7cf` fix 補件期）都沒動該行

### 引用 5：git diff +1016 / -0 純插入
- Generator 引用（self_review.md line 184-189）：「4 files changed, 1016 insertions(+)」
- 查證動作：`git status --short` + `git diff --stat 2026_*/index.html`
- 結論：**🟡 部分查證**——sprint 已 commit（b6b0879 + 733a7cf），git working tree 已清空，無法直接跑 `git diff 2026_*/index.html` 對比 sprint 前後。但行數驗證：`wc -l` 顯示 HK 3015 行、MO 3030、Singapore 3285、AKAME 3280。HK 與 MO 差距與 +254 行注入概念一致；Singapore/AKAME 較大（既有不同）。間接支持「純插入」說法。完美驗證需 `git diff b6b0879~1 b6b0879 -- 2026_*/index.html --stat`，但本輪不阻擋打分。

### 引用 6：body_pwa_block.html viewport + isMobileViewport 雙閘
- Generator 引用（self_review.md line 64-65）：CSS `@media (min-width: 768px) { .pwa-install-prompt { display: none !important } }`（主閘）+ JS `isMobileViewport = window.innerWidth < 768`（次閘）
- 查證動作：Read `output/inline_patches/body_pwa_block.html` line 81-86、line 165
- 結論：**✅ 雙層保險程式碼真的就位**——line 81-86 CSS media query 確認、line 165 JS check 確認、line 179 `if (isStandalone || !isMobileViewport) return;` 確認 early return。AC-03 桌面隱藏邏輯實作正確。

**抽查結論**：6 條全部驗證 4 ✅ + 1 部分 ✅ + 0 ❌。**Generator 沒有編造引用**——這是工程紀律的硬證據之一。

---

## 逐條 AC 評分

### AC-01 ｜ 4 manifest.json 結構 + 從 og meta 取資料

- **評分**：✅ **0.85**
- **權重**：8%
- **加權貢獻**：0.85 × 0.08 = 0.068
- **證據**：
  - 4 manifest.json 通過 `python -m json.tool`（JSON 合法）
  - 必要欄位齊全：name / short_name / description / start_url=`./` / scope=`./` / display=`standalone` / theme_color=`#121212` / background_color=`#121212` / icons 陣列 4 個 entry（192/512 × any/maskable）
  - name 從 og:title 取（引用 2 驗證）、description 取自「YYYY/MM/DD - MM/DD」格式（與 HK index.html line 22 `og:description content="2026/04/11 - 04/12 (2天1夜)"` 吻合）
  - DevTools Manifest panel 截圖（4 行程都有）顯示 Identity / Presentation 完整、無紅色錯誤（只有黃色「Richer PWA Install UI won't be available... add at least one screenshot」非阻擋性警告）
- **判斷理由**：結構與資料來源驗證紮實。扣 0.15 因為 (a) icon 視覺是 fallback 路徑（品牌色 + 文字 logo 而非「既有照片裁切」，Blocker-02 已標）——這是 contract 期待但有妥協；(b) DevTools 警告「manifest 缺 `screenshots` 欄位」雖非阻擋但屬 manifest spec 推薦欄位、未補。
- **補上需要做**：若 Anton 想升至 1.0：(a) 把 4 個 icon 換成真照片裁切（保持檔名）；(b) manifest 加 `"screenshots": [...]` 陣列（每行程 1~2 張 mobile + desktop 模式截圖路徑）。

### AC-02 ｜ 4 index.html `<head>` 注入 manifest + apple-touch-icon

- **評分**：✅ **1.0**
- **權重**：5%
- **加權貢獻**：1.0 × 0.05 = 0.05
- **證據**：對 4 個 index.html grep（content 模式）：
  - HK line 14-15、MO line 14-15、Singapore line 13-14、AKAME line 14-15 都含 `<link rel="manifest" href="./manifest.json">` + `<link rel="apple-touch-icon" href="./img/icon-512.png">`
  - 4 個 index.html 都保留既有 `apple-mobile-web-app-capable` / `mobile-web-app-capable`（HK line 8-9 grep 範圍可見）
  - **錯誤值的 apple-mobile-web-app-title 也保留**（引用 4 驗證）
- **判斷理由**：機械性、低風險條目，實作完全符合。

### AC-03 ｜ 浮層 UI + viewport 判斷

- **評分**：✅ **0.85**
- **權重**：8%
- **加權貢獻**：0.85 × 0.08 = 0.068
- **證據**：
  - 程式碼層：body_pwa_block.html line 14-141 完整 CSS（底部固定、左 icon、文字、橘鈕 `#f97316`、X 鈕）對照 `references/image.png` 視覺要素完備
  - viewport gate：CSS media query line 81-86 + JS isMobileViewport line 165、line 179 early return（引用 6 驗證）
  - 桌面 ≥ 1024px 隱藏：4 張 `desktop_*_no_overlay.png` 親自打開看內容——HK/MO/Singapore/AKAME 都是桌面 Chrome 視窗（URL bar 顯示 `localhost:8000/2026_*_*/`）、視窗寬度明顯 > 1024px、頁面正常顯示但**無浮層**（驗 AC-03 b 通過）
- **判斷理由**：桌面隱藏邏輯雙層保險、程式碼與截圖都對齊；桌面截圖 4 行程都通過。扣 0.15 因為**手機 viewport < 768px 真實浮層截圖完全缺**（手機跳過聲明）——雖然 CSS media query 邏輯反向推論手機會顯示，但 contract AC-03 寫「桌面 mobile mode（< 768px）截圖比對相似度 ≥ 80%」這個正向驗證沒做（DevTools Device Mode 切 iPhone 也可截、但無）。
- **補上需要做**：桌面 Chrome DevTools 點 device toolbar → 切 iPhone 12 Pro → 截 4 張 `mobile_*_overlay.png` 補正向驗證。

### AC-04 ｜ Android Chrome beforeinstallprompt 路徑

- **評分**：🟡 **0.55**
- **權重**：11%
- **加權貢獻**：0.55 × 0.11 = 0.0605
- **證據**：
  - 程式碼層：body_pwa_block.html line 196-199 `window.addEventListener('beforeinstallprompt', ...)`；line 213-227 installBtn click handler 含 `deferredPrompt.prompt() + userChoice` 流程；line 245-248 `appinstalled` listener
  - Anton 宣告手機跳過 → 5 張 `android_*` 截圖全 0/5
  - 「等價佐證」：4 張 manifest panel 截圖顯示 Chrome 判定 manifest installable、4 張 sw 截圖中 HK/MO/AKAME 顯示 activated（Singapore redundant 例外，見 AC-07）
- **判斷理由**：程式碼完整正確。但 **AC-04 是「Android Chrome 真機（或 DevTools Device Mode）：載入頁 → 1.5 秒後浮層 → 點安裝 → beforeinstallprompt prompt → App 出現桌面」這條 UX flow 的端到端驗收**——這幾步任何一步斷掉 AC-04 都不算過。Chrome installable 判定 ≠ 「prompt 真的彈出」≠ 「app 真的進桌面」。手機跳過聲明合理（執行環境限制），但分數必須反映「實機 UX 鏈未驗」這個客觀缺口。
- **校準依據**：03_evaluator.md 範例 R-D「Generator 自承漏項給 0.7（不到上限）」——本條 Generator 自承程式碼 ✅、實機 ⏸ 而宣告手機跳過，類比給 0.55（程式碼層 0.5 + 等價佐證上修 0.05）。比 R-D 略低因 R-D 的 dry-run 推論結構更紮實，本案是 production mode 跳測。
- **補上需要做**：(a) 拿任一台 Android 手機跑 testing_protocol.md Android 5 張截圖；或 (b) 桌面 Chrome DevTools Device Mode 切 Android → 開 `chrome://flags` 啟用 `Bypass user engagement checks` → 手動觸發 beforeinstallprompt 截圖。任一補件 + 真實看到 prompt 彈出 → 升 1.0。

### AC-05 ｜ iOS Safari 引導教學 modal

- **評分**：🟡 **0.55**
- **權重**：11%
- **加權貢獻**：0.55 × 0.11 = 0.0605
- **證據**：
  - 程式碼層：body_pwa_block.html line 190-192 `isIOS` UA 偵測（含 iPad iPadOS `MacIntel + maxTouchPoints > 1` hack）；line 224-226 fallback 顯示 `#pwaIosModal`；line 148-158 modal DOM 含 3 步驟教學
  - 手機跳過 → 5 張 `ios_*` 截圖全 0/5
- **判斷理由**：同 AC-04 邏輯——程式碼完整、實機 UX flow 未驗、isIOS hack 對新 iPadOS 不保證可靠（self_review 妥協項 #2）。給 0.55。
- **補上需要做**：iOS Simulator（Xcode）或 BrowserStack 跑 iPhone Safari → 截 5 張 ios_*.png。或桌面 Chrome DevTools Device Mode 切 iPhone Safari UA → 截 modal 截圖（次優方案）。

### AC-06 ｜ localStorage 永久關閉 + standalone 偵測

- **評分**：🟡 **0.5**
- **權重**：8%
- **加權貢獻**：0.5 × 0.08 = 0.04
- **證據**：
  - 程式碼層：body_pwa_block.html line 181-182 啟動讀 `localStorage.getItem('pwa-install-dismissed') === '1'` early return；line 229-236 closeBtn 寫入 + try/catch；line 163-164 isStandalone 雙偵測（`matchMedia` + `navigator.standalone`）；line 179 early return
  - 跨頁實測：Anton 補件期未跑（「打開 HK → 點 X → 切 MO 應仍隱藏」這個 same-origin localStorage 共用驗證）
  - standalone 偵測截圖：DevTools 截圖無法佐證 `display-mode: standalone` 行為（必須真從主畫面 icon 開 PWA 才能驗）
- **判斷理由**：程式碼邏輯正確、但跨頁 dismiss 行為這條核心 UX 完全沒實測——對 PDM 而言，這條 AC 的價值就是「用戶在 HK 頁點 X 之後 MO 頁也別煩他」，沒實測 = 沒驗到。標準 0.5。
- **補上需要做**：桌面 Chrome（不需要手機）跑 5 步驟：開 HK → 等 1.5 秒看浮層 → 點 X → 切 MO → 驗證浮層不出現 → 截 3 張：HK 浮層出現、HK 點 X 後、MO 不顯示。再加 1 張 `localStorage.clear()` 後 HK 重整浮層回來。

### AC-07 ｜ SW 註冊 + 預快取（含版本字串）

- **評分**：🟡 **0.7**（**重大下修：v2.0 給 0.95，本輪發現 Singapore redundant**）
- **權重**：10%
- **加權貢獻**：0.7 × 0.1 = 0.07
- **證據**：
  - 程式碼層：4 sw.js 都通過 `node -c`（含 Singapore sw.js Line 43 用雙引號包單引號 `"./img/St Andrew's Cathedral.jpg"` 是合法 JS、`node -c` 確認無 SyntaxError——**notes_for_retrospective.md IMP-H 對「SyntaxError」的根因判斷有誤**）
  - 預快取對 img/ 100% 覆蓋（引用 3 驗證）
  - cache 名稱含 `v1.0.0`（HK line 6 `pwa-2026-04-hk-${CACHE_VERSION}`、MO/Singapore/AKAME 同模式）
  - DevTools 截圖逐張打開看內容：
    - `lighthouse_2026_04_HK_sw.png`：HK 顯示 `#1447 activated and is running`（綠點）✅
    - `lighthouse_2026_04_MO_sw.png`：MO 上半 `#1450 activated and is running`（綠點）✅；下半 HK `#1447 activated and is stopped`（綠點 + stopped 是正常 idle 不是失敗）
    - `lighthouse_2026_05_Singapore_sw.png`：縮圖太小無法清楚辨識
    - `lighthouse_2026_07_AKAME_sw.png`：AKAME 上半 `#1452 activated and is running`（綠點）✅；**下半 Singapore 顯示 `http://localhost:8000/2026_05_Singap...  #1451 is redundant`（灰點、紅色標記）❌**
- **判斷理由**：3/4 行程 SW 正常 activated（HK + MO + AKAME），但 **Singapore 在截圖時點處於 redundant 狀態——這是 SW 已被新版本取代但沒順利移交、或 install/activate 階段出錯後的「廢棄」狀態**。可能成因：(a) 補件期間 Anton 多次手動 Unregister/重整 Singapore 觸發 SW 廢棄循環；(b) `clients.claim()` 競態；(c) cache 寫入失敗導致 install reject。但無論成因，**截圖時 Singapore SW 確實沒在工作**，這就直接拖垮 AC-08 中 Singapore 的離線能力。
- **與 self_review v1.1 衝突**：self_review line 111 寫「DevTools > Application > Service Workers panel 顯示 4 個行程 sw.js 全部 `activated and is running`」——**這個書面承諾與實際截圖內容相違**。Generator 與 Anton 沒打開圖看，是 silent failure 的典型案例。
- **補上需要做**：Anton 在桌面 Chrome → DevTools → Application → Service Workers → 找到 Singapore 那條 → 點 Unregister → 重新整理 Singapore 頁面 → 等 SW 重新註冊 → 截一張新的 Singapore SW activated 截圖覆蓋現有那張。修完後本條可升 0.95（扣 0.05 給「截圖時點 redundant 是真實發生過、表示 SW 生命週期可能有壓力點」）。

### AC-08 ｜ **飛航模式完整離線**（最核心 16%）

- **評分**：🟡 **0.4**
- **權重**：16%
- **加權貢獻**：0.4 × 0.16 = 0.064
- **證據**：
  - 程式碼層：4 sw.js fetch handler 都是 cache-first 同 origin + network-first 跨 origin + index.html fallback，邏輯正確
  - install phase `cache.addAll(PRECACHE)` 對 4 行程預快取齊全（引用 3 驗證）
  - 實機證據：**只有 HK 1 張**——`devtools_offline_2026_04_HK.png` 打開看內容：Network panel 上方 Network mode 下拉框顯示 `Offline`、頁面標題「Horlick送別行」載入、地址欄 `localhost:8000/2026_04_HK/`、Network 表大量 200 status 含 `index.html / css / png / Jpg`（這是 DevTools Offline mode 不是真飛航）
  - `devtools_cache_2026_04_HK.png` 看內容：Cache Storage 列出 `pwa-2026-04-HK-... default` 含多個檔案、表中可見 `2026_04_HK/img/...`、`Audio_*.wav` 等
  - MO/Singapore/AKAME：**沒有任何 offline 模式截圖**
  - Singapore 額外問題：AC-07 redundant 狀態下，Singapore 的 SW fetch handler 根本不會跑、Cache Storage 也可能不完整
- **判斷理由**：本 sprint **存在的主要理由**（intake ⑤ 用戶價值 #1 + contract 權重 16% 最大條）就是這條。實機證據：
  - HK 1 張（DevTools Offline ≠ 真飛航，但至少證明 SW fetch handler 真的在 serve）→ 部分達標
  - MO/Singapore/AKAME 三行程：0 張 offline 證據；Singapore 還疊加 SW redundant → 完全沒驗
  - 真飛航測試（手機關 Wi-Fi/數據、從桌面 icon 開 PWA）：0 張
- 給 0.4 分配邏輯：4 行程平均、HK 給 0.7（DevTools Offline 加 cache 內容齊全的等價佐證）、MO 給 0.4（程式碼層 + 預快取齊全但無 offline 截圖）、AKAME 給 0.4（同 MO）、Singapore 給 0.1（SW redundant 直接打斷離線鏈）。平均 ≈ 0.4。
- **補上需要做**（依重要性排序）：
  1. **Singapore SW 修活**（30 分鐘）：先把 AC-07 列的步驟做完
  2. **桌面 Chrome DevTools Offline mode 跑其他 3 行程**（15 分鐘）：MO/Singapore/AKAME 各截 1 張 `devtools_offline_*.png`
  3. **真飛航實測**（10 分鐘 + 任一裝置）：手機關 Wi-Fi+Cellular Data 從主畫面 icon 開 PWA → 截「app 開啟 + 圖片載入完整」1 張。建議用 HK（既有圖多最有說服力）。
  - 全做完可升 0.8。

### AC-09 ｜ PWA installable + offline ready（DevTools 等價）

- **評分**：✅ **0.85**
- **權重**：5%
- **加權貢獻**：0.85 × 0.05 = 0.0425
- **證據**：
  - `lighthouse_unavailable_note.md` 論述完整：Chrome 113+ 移除 PWA category 是真實事件、DevTools Application panel 覆蓋 Lighthouse PWA 原 8 項 boolean check 中 6 項靜態（HTTPS/localhost、viewport、apple-touch-icon、manifest installable、splash screen、theme color）+ 2 項動態（offline 200 by SW activated、start_url offline by precache）
  - 4 張 manifest panel 截圖：Identity 完整（Name/Short name/Description 不空）、Presentation 完整（Start URL `./`、Display `standalone`）、Icons 區（DevTools 在 manifest panel 滾下會看到 4 個 entry，本批截圖滾的位置只截到 Identity + Presentation 上半，但 manifest.json 本身已驗 4 個 entry）
  - 4 張 SW 截圖：HK/MO/AKAME activated；**Singapore redundant（AC-07 重大缺口）**
- **判斷理由**：等價驗收論述紮實、DevTools 截圖完整覆蓋 Lighthouse 原 PWA 評分基礎。扣 0.15 因為 Singapore SW redundant 直接打破「offline 200」這項動態檢查的驗證。若 Singapore 修活、本條可升 1.0。
- **補上需要做**：同 AC-07。

### AC-10 ｜ 截圖完備性（修正基準 12 張）

- **評分**：✅ **0.75**
- **權重**：5%
- **加權貢獻**：0.75 × 0.05 = 0.0375
- **證據**：實際 `output/install_screenshots/` 含 14 張 PNG：
  - 4 張 `desktop_*_no_overlay.png` ✅
  - 4 張 `lighthouse_*_manifest.png` ✅
  - 4 張 `lighthouse_*_sw.png`（但 Singapore 那張顯示 redundant；不是「達標證據」而是「silent failure 證據」🟡）
  - 額外：`devtools_cache_2026_04_HK.png` + `devtools_offline_2026_04_HK.png`（AC-08 補件，非 contract 命名規範但有價值）
- **判斷理由**：截圖數量上 14 張 > 修正基準 12 張、命名規範符合。但**「截圖數量 ≠ 截圖品質」**——本輪 Evaluator 親自打開圖看內容才發現：
  - Singapore SW 截圖實際顯示 redundant 狀態（不是達標證據）
  - 4 張 manifest 截圖只截到 Identity + Presentation、Icons 區滾動位置沒抓到
  - Singapore SW 截圖縮圖很小、字體擠得很密（看起來像把 Singapore + AKAME 兩個 SW 都塞進同一張截圖）
- contract AC-10 原 18 張基準在 lighthouse_unavailable_note.md 修正為 12 張（手機跳過後）。14/12 達標但其中 1 張（Singapore SW）實際是反向證據。所以給 0.75 而非 1.0。
- **補上需要做**：(a) Singapore SW 修活後重截；(b) 4 張 manifest 截圖滾到 Icons 區重截（或單獨截 Icons 區放大圖）；(c) 桌面 DevTools Offline mode 補 MO/Singapore/AKAME 各 1 張 `devtools_offline_*.png`。修完可升 0.95。

### AC-11 ｜ 範圍紀律（git diff 對齊 contract ③.1）

- **評分**：✅ **1.0**
- **權重**：10%
- **加權貢獻**：1.0 × 0.1 = 0.1
- **證據**：
  - sprint 已 commit（b6b0879、733a7cf）。git log 確認 sprint commit 範圍。
  - git working tree 目前只有 `M _PM/harness/sprint-001-pwa-install-prompt/review.md`（即本檔修改中）——其他都已提交
  - **反向驗證**：`git blame -L 11,11 2026_04_MO/index.html` → `df4c7351 2026-04-09`——sprint commit 沒動該行（引用 4 驗證）
  - 16 新檔（4 manifest + 4 sw + 8 icon）全部在指定位置（HK/MO/Singapore/AKAME 各自的根 + img/ 子層）
  - 4 個 index.html 行數（3015 / 3030 / 3285 / 3280）相對既有檔案概念合理（純插入無覆蓋）
  - self_review 自己提供 `git diff --stat 2026_*/index.html` 顯示 4 files × 254 insertions / 0 deletions
- **判斷理由**：範圍紀律本輪最大亮點。明知 MO/Singapore/AKAME 的 `apple-mobile-web-app-title="Horlick送別行"` 是錯誤值卻沒順手修——這需要工程紀律（多數 LLM Generator 會擅自順手「improve」）。給 1.0。
- **補上需要做**：無。

### AC-12 ｜ SPEC_v2.4_note.md 草稿援引 line 816

- **評分**：✅ **1.0**
- **權重**：3%
- **加權貢獻**：1.0 × 0.03 = 0.03
- **證據**：
  - `output/SPEC_v2.4_note.md` 存在
  - ① 變動摘要表完整對比 v2.3 → v2.4 7 個維度（line 30-38）
  - ② 援引 SPEC.md line 816 原文逐字準確（引用 1 驗證、line 46）
  - ③ § 7.0~7.4 設計原則修訂草稿（line 64-134）含 PWA 三件套規範細節
  - ④ 16 新檔在專案結構樹狀圖（line 137-169）
  - ⑤ 整併指引給 sprint-close（line 184-197）
- **判斷理由**：所有 contract AC-12 要求 (a)(b)(c)(d) 都覆蓋；論述紮實。給 1.0。

---

## 加權總分試算

| AC | 權重 | 評分 | 加權貢獻 |
|---|---|---|---|
| AC-01 | 8% | 0.85 | 0.068 |
| AC-02 | 5% | 1.0 | 0.050 |
| AC-03 | 8% | 0.85 | 0.068 |
| AC-04 | 11% | 0.55 | 0.0605 |
| AC-05 | 11% | 0.55 | 0.0605 |
| AC-06 | 8% | 0.5 | 0.040 |
| AC-07 | 10% | 0.7 | 0.070 |
| AC-08 | 16% | 0.4 | 0.064 |
| AC-09 | 5% | 0.85 | 0.0425 |
| AC-10 | 5% | 0.75 | 0.0375 |
| AC-11 | 10% | 1.0 | 0.100 |
| AC-12 | 3% | 1.0 | 0.030 |
| **加權總分** | **100%** | | **0.685** |
| 全局調整 | — | — | -0.02 |
| **最終總分** | — | — | **0.665** |

---

## 🚩 紅旗清單

### 🔴 高優先

1. **Singapore Service Worker 實際是 redundant 狀態**（AC-07 核心、AC-08 核心）
   - 證據：`lighthouse_2026_07_AKAME_sw.png` 底部顯示 `#1451 is redundant`（灰點）
   - Generator self_review v1.1 line 111 宣稱「4 個行程 sw.js 全部 activated and is running」——書面承諾與實際截圖相違
   - 影響：Singapore 離線能力 = 0（precache 沒寫入、fetch handler 不會被呼叫）
   - 修補：DevTools → Application → Service Workers → 找 Singapore → Unregister → 重整頁 → 等註冊 → 重截。30 分鐘內可解決。

2. **AC-08（最核心 16% 權重）只有 HK 1 張 DevTools Offline + 0 張真飛航**
   - intake ⑤ 用戶價值 #1 = 飛航模式可用——這是本 sprint 存在的主要理由
   - 程式碼層完整 + 預快取 100% 覆蓋 → 結構上應該能離線、但**沒一個行程經過完整端到端驗證**
   - 修補：30 分鐘 + 1 台手機/任一台 iPad 即可解決

3. **Generator + Anton + 前兩輪 Evaluator 都「沒打開圖看」**（流程紅旗、本輪自己抓到）
   - Singapore SW redundant 在圖上肉眼可見（灰點、紅字 "is redundant"）
   - 但 self_review v1.1 與 review v1.0/v2.0 都通過了這張圖
   - 根因：AI 流程預設「檔名存在 = 證據成立」，沒實際打開圖看
   - 修補：03_evaluator.md Step 1.6 必須加「截圖必須打開看內容」硬規則（IMP 候選見 notes_for_retrospective.md）

4. **notes_for_retrospective.md IMP-H 對 Singapore 失效的根因解釋是錯的**
   - IMP-H 主張：Singapore sw.js line 43 未轉義單引號 → SyntaxError → SW 完全不註冊
   - 實測 `node -c 2026_05_Singapore/sw.js` 無 syntax error（雙引號內含單引號是合法 JS）
   - 真實根因待查：可能是補件期 unregister 後沒成功重註冊、或 install/activate 階段非語法的錯誤
   - 影響：IMP-H 的回灌建議「Evaluator Step 1.6 必加 syntax check」雖然方向對（語法檢查永遠是好實踐）但「修這個就能修 Singapore」的因果鏈不成立、可能讓未來讀者誤判
   - 修補：sprint-close 時修正 IMP-H 描述、補真實根因（或標「待查」）

### 🟡 中優先

5. **AC-04/05/06 共 30% 權重全靠程式碼層 + 等價佐證**
   - 程式碼完整正確、但「Android 安裝路徑可走」「iOS 教學 modal 真彈出」「跨頁 dismiss 真生效」這三條 UX 行為任何一條都沒實機/桌面端到端驗證
   - 全部用桌面 Chrome 也能補（Device Mode 切手機 UA + DevTools Application → Storage → 跨頁觀察 localStorage）、不需要實機
   - 修補：30 分鐘桌面操作

6. **icon 視覺是 fallback（品牌色 + 文字）而非「既有照片裁切」**
   - 不是工程問題、是 UX 品質問題
   - Anton 未來新增第 5 個行程時，要不要繼續走 fallback？這是 sprint-002 候選議題

7. **contract AC-09 硬綁 Lighthouse PWA category**
   - Chrome 113+ 已移除、contract 寫出來就過時
   - lighthouse_unavailable_note.md 主動處理是亮點、但 Harness 模板（04_sprint_contract.md）應該防止這種事再發生
   - 修補：IMP 候選 B（Generator/Anton 已提出）落地

### 🔵 低優先

8. **manifest.json `screenshots` 欄位未補**
   - DevTools manifest panel 黃色警告「Richer PWA Install UI won't be available... add at least one screenshot with form_factor」
   - 非阻擋（已驗 installable）、但會影響 Chrome 安裝對話框視覺豐富度
   - 修補：sprint-002 或獨立 sprint-001b

9. **跨 origin（字型 / 天氣 / 地圖）的 network-first cache 沒設 TTL**
   - 4 sw.js fetch handler 跨 origin 路徑 `caches.put(req, copy)` 無容量上限或過期機制
   - 長期累積會佔用 SW 配額（self_review 已知妥協項 #3）
   - 修補：未來 sprint-XXX 加 quota monitoring

10. **body_pwa_block.html line 213-227 的 Android 用戶 race condition 風險**
    - 當 `setTimeout 1500ms` 到達時，浮層 fade-in 但 `beforeinstallprompt` 可能 still pending；若用戶在 1.5~2 秒內快速點安裝、`deferredPrompt` 為 null → fallthrough 到 `else { iosModal.classList.add('is-visible'); }` → **Android 用戶會看到 iOS 教學 modal**
    - 真實 UX bug、Generator 沒提到。發生機率低但確實存在
    - 修補：在 else 分支加 isIOS 判斷、Android 場景顯示「請稍候、安裝提示準備中」或 disabled state

---

## 對 self_review 的回應

| AC | Generator v1.1 自評 | Evaluator v3.0 評分 | 差異與原因 |
|---|---|---|---|
| AC-01 | 0.7 | 0.85 | Evaluator 上修 0.15。Generator 對 icon 視覺自評太嚴；contract AC-01 主要驗收結構與資料來源（不是視覺品質），icon 視覺差異是 spec ambiguity 而非實作錯誤。 |
| AC-02 | 1.0 | 1.0 | 一致 ✅ |
| AC-03 | 1.0 | 0.85 | Evaluator 下修 0.15。Generator 對 4 張 desktop_no_overlay 截圖過於樂觀；正向手機 viewport < 768px 浮層出現的驗證完全缺。 |
| AC-04 | 0.5 | 0.55 | 接近一致；Evaluator 略上修反映 DevTools manifest 顯示 installable + 程式碼完整。 |
| AC-05 | 0.5 | 0.55 | 同上 |
| AC-06 | 0.5 | 0.5 | 一致 |
| AC-07 | 1.0 | 0.7 | **Evaluator 重大下修 0.3**。Generator 自評書面承諾「4 個行程 sw.js 全部 activated and is running」但 `lighthouse_2026_07_AKAME_sw.png` 底部清楚顯示 Singapore SW redundant。**這是 Generator + Anton + 前兩輪 Evaluator 都漏抓的 silent failure**。 |
| AC-08 | 0.5 | 0.4 | Evaluator 下修 0.1。Generator 給 0.5 是基於「飛航實測沒做」的客觀缺口；Evaluator 額外發現 Singapore redundant 連帶拖累、且 MO/AKAME 也沒 DevTools offline 截圖（只有 HK 1 張），所以再扣 0.1。 |
| AC-09 | 1.0 | 0.85 | Evaluator 下修 0.15。Generator 對 4 張 manifest + 4 張 sw 截圖品質過於樂觀。 |
| AC-10 | 1.0 | 0.75 | Evaluator 下修 0.25。Generator 數截圖數量（14 > 12 修正基準）就給滿分、沒看內容品質。 |
| AC-11 | 1.0 | 1.0 | 一致 ✅ — 範圍紀律是本輪最大亮點 |
| AC-12 | 1.0 | 1.0 | 一致 ✅ |

**最大差異 = AC-07（差 0.3）**。原因：Generator 沒打開 lighthouse_2026_07_AKAME_sw.png 看內容、誤宣稱 4 行程 SW 全 activated。這是 self_review 流程的核心信任破口——v1.1 補件期 Anton 截圖時也沒辨識「灰 vs 綠」差異（notes_for_retrospective IMP-I 自己提到了，但只是事後反省）。

**對 Generator 自評加權總分 0.746 的回應**：Evaluator 算到 0.665（全局調整後）、與 Generator 自評差 0.081。差距主要來自 AC-07 重大下修（-0.03 加權）、AC-09 下修（-0.0075）、AC-10 下修（-0.0125）、AC-03 下修（-0.012）、加上全局調整 -0.02。

---

## 下一輪建議

### 必補件（本輪達標前要做）

**最高槓桿補件路徑（~1.5 小時，全程桌面 Chrome、不需手機）**：

1. **修活 Singapore SW + 重截**（30 分鐘，+0.025 加權）：
   - 桌面 Chrome 開 `http://localhost:8000/2026_05_Singapore/`
   - F12 → Application → Service Workers
   - 找到 `2026_05_Singapore` 那條 → 點 `Unregister`
   - Ctrl+Shift+R 強制重整
   - 等 SW 重新註冊（觀察 Update Cycle 出現 #1453 Install/Wait/Activate）
   - 看到綠點 + `activated and is running` 後截圖、命名 `lighthouse_2026_05_Singapore_sw.png` 覆蓋現有
   - 同時截一張 Cache Storage 列出 Singapore precache items 的截圖、命名 `devtools_cache_2026_05_Singapore.png`
   - **影響**：AC-07 從 0.7 升 0.95（+0.025 加權）、AC-09 從 0.85 升 1.0（+0.0075 加權）、AC-10 從 0.75 升 0.85（+0.005 加權）、AC-08 從 0.4 升 0.5（Singapore 不再拖累，+0.016 加權）

2. **桌面 DevTools Offline mode 跑其他 3 行程**（20 分鐘，+0.022 加權）：
   - HK 已有 `devtools_offline_2026_04_HK.png`
   - MO/Singapore/AKAME 各跑一次：開頁 → F12 → Application → Service Workers → 確認 activated → 切 Network 上 `Offline` 下拉 → 重整頁 → 確認頁面與圖片完整載入 → 截 `devtools_offline_2026_04_MO.png` / `devtools_offline_2026_05_Singapore.png` / `devtools_offline_2026_07_AKAME.png`
   - **影響**：AC-08 從 0.5 升 0.7（+0.032 加權）

3. **桌面跨頁 localStorage 測試**（15 分鐘，+0.04 加權）：
   - 開 HK → 等 1.5 秒看浮層（Device Mode 切 iPhone）→ 截 `mobile_2026_04_HK_overlay.png`
   - 點 X → 截 `mobile_2026_04_HK_dismissed.png`
   - 切到 MO 頁面 → 截 `mobile_2026_04_MO_no_overlay_post_dismiss.png`
   - F12 → Application → Local Storage → 看到 `pwa-install-dismissed: 1` 截圖 `mobile_localstorage_dismissed.png`
   - 清 localStorage → 重整 HK → 浮層回來 → 截 `mobile_2026_04_HK_overlay_after_clear.png`
   - **影響**：AC-06 從 0.5 升 1.0（+0.04 加權）

4. **桌面 Chrome DevTools Device Mode 切 iPhone 觸發浮層**（10 分鐘，+0.012 加權）：
   - 與步驟 3 重疊；可同時截浮層在 iPhone viewport 內的視覺對照 `references/image.png`
   - **影響**：AC-03 從 0.85 升 1.0（+0.012 加權）

**全做完總分變化**：0.665 + 0.025 + 0.0075 + 0.005 + 0.016 + 0.032 + 0.04 + 0.012 = **~0.80**（達標下緣，可進 sprint-close）。

### 真飛航實測（補件次優先，30 分鐘 + 1 台裝置）

- 任一台手機/iPad，桌面 Chrome 訪問一次該行程讓 SW precache 完成 → 同網域用 PWA URL 或加入主畫面後從 icon 開啟 → 關 Wi-Fi + Cellular（飛航模式）→ 重新從主畫面 icon 開 PWA → 截「app 開啟 + 圖片完整載入」1 張
- **影響**：AC-08 直接升 0.85（+0.072 加權）、總分到 ~0.85（穩穩達標）

### 下一個 Sprint 主題建議

- **主題 A：sprint-001b 微補**（建議優先）：把上述必補件做完、修活 Singapore SW、補 6~8 張桌面截圖 + 真飛航 1 張。1~2 小時完工後重跑 Evaluator 升 ~0.85 達標。
- **主題 B：sprint-002 編輯工作流簡化**（intake 已預埋）：包含修 `apple-mobile-web-app-title` 錯誤值、sync-meta.py 擴張處理 manifest/sw、新增第 5 個行程的工作流模板化。
- **主題 C：sprint-003 浮層 UX bug 修正**：紅旗 #10 的 Android 用戶 race condition（1.5 秒內快速點安裝會看到 iOS modal）。

### 回灌 Harness 自身的反省

1. **`templates/03_evaluator.md` Step 1.6 必須補「截圖打開看內容」硬規則**（notes_for_retrospective IMP-I 已提出，本輪自己驗證了必要性——前兩版 Evaluator 漏抓 Singapore redundant 就是因為沒打開圖）
2. **`templates/04_sprint_contract.md` 必須補「AC 寫驗收意圖不寫工具操作步驟」**（IMP-B、本輪自己驗證了——AC-09「Lighthouse PWA ≥ 90」這種寫法已過時）
3. **`templates/02_generator.md` self_review 必須加「我已對每張截圖打開看、確認顯示內容符合 AC 期待」段**（IMP-I 延伸）
4. **`adapters/content_site.md` § 五 antonstrip 特例補一條 hybrid 情境條款**：content-site adapter 預設假設「程式碼薄、內容厚」，但 sprint-001 是「為現有 content-site 加 UX 互動」這種 hybrid 情境——adapter 沒明確指引如何處理「程式碼也得做、實機驗收也得做」的 sprint
5. **`templates/03_evaluator.md` 校準範例新增 C-F「工具版本漂移」與 C-G「Generator 沒打開圖看 / Evaluator 補抓 silent failure」**

### 校準範例補充建議

**範例 C-F：工具版本漂移**（本輪情境寫成草稿）：
```markdown
- Generator 產出：contract 寫「跑 Lighthouse PWA audit、分數 ≥ 90」、self_review 補件期發現 Chrome 113+ 已移除 PWA category
- Generator 反應：起草 `output/lighthouse_unavailable_note.md` 論述等價替代（DevTools Application panel 覆蓋原 8 項 boolean check 中 6 項靜態 + 2 項動態）、給 Evaluator 評分指引
- Evaluator 接到後：(a) 親自驗證 Chrome 真的移除 PWA category（IMP 候選 B）；(b) 親自驗證等價對映確實覆蓋；(c) 採用等價評分但保留 0.15 給「等價假設未被獨立反例測試」風險
- **該打分區間：✅ 0.85**（等價驗收 + 集中風險全局調整）
- **理由**：工具改版不是 Generator/Anton 失職，是 contract 隱含假設過時。Generator 主動補救 + 給 Evaluator SOP 是工程紀律亮點。
```

**範例 C-G：Generator 漏看截圖內容 / Evaluator 補抓**（本輪情境寫成草稿）：
```markdown
- Generator 產出：self_review 宣稱「4 個行程 sw.js 全部 activated and is running」
- 但實際 lighthouse_2026_07_AKAME_sw.png 截圖底部顯示 Singapore SW redundant（灰點、紅字）
- Generator + Anton + 前兩輪 Evaluator 都沒打開圖看
- 第三輪 Evaluator 親自開圖、發現失配
- **該打分：AC-07 從 1.0（Generator 自評）降至 0.7**
- **理由**：Generator 沒打開圖看 = 自評流程的核心信任破口。Evaluator 必須親自看圖驗證每一張的內容、不只看檔名存在。
```

---

## 我（Evaluator）的自我檢查

- [x] 每條 AC 都讀過實際產物（不只讀 self_review）
- [x] **Step 1.6 引用查證已執行**（6 條引用、5 ✅ + 1 部分 ✅、超過 30% 抽查要求）
- [x] **本輪打開所有 14 張 PNG 看內容**（不只是看檔名存在）
- [x] mode = production，所有 AC 按實測證據評分（不放寬上限）
- [x] 全局調整欄已填（-0.02、具體 AC、有獨立論證、絕對值 < 0.10）
- [x] 主動探測 1+ 邊界 case：
  - 跑 `node -c` syntax check 4 個 sw.js（驗證 IMP-H 的 SyntaxError 主張）
  - 跑 `python -m json.tool` 4 個 manifest.json
  - 寫 Python 程式對照 SW precache vs 實際 img/ 內容
  - 用 git blame 反向驗證 apple-mobile-web-app-title 沒被本 sprint 動過
  - 親自打開 Singapore + AKAME SW 截圖看到 redundant 灰點
- [x] 每個評分都附證據引用（檔案路徑 + 行號 + 截圖內容描述）
- [x] 紅旗清單含 10 條（4 高 + 3 中 + 3 低）
- [x] 沒有用「整體不錯」這類模糊措辭
- [x] 全程繁體中文（feedback_taiwan_traditional_chinese.md 規範）

---

## 補件 / 重評 SOP（給 Anton 直接照做）

> 依 notes_for_retrospective IMP-候選-A 與 IMP-候選-F 規範，本段給「PDM 對著做」級的下一步。

### 路徑 A：補件至達標（推薦，~1.5 小時，全桌面 Chrome）

1. **修活 Singapore SW**（必做）：
   - 開 `http://localhost:8000/2026_05_Singapore/`（先確認 python -m http.server 8000 還在跑）
   - F12 → Application → Service Workers
   - 找 `http://localhost:8000/2026_05_Singapore/` 那條 → 點 `Unregister`（或 Update）
   - Ctrl+Shift+R 強制重整頁
   - 等 5 秒、看到綠點 + `activated and is running`
   - 截整個 DevTools 視窗（建議用 Win+Shift+S 區域截圖、命名 `lighthouse_2026_05_Singapore_sw.png`）→ 放進 `_PM/harness/sprint-001-pwa-install-prompt/output/install_screenshots/` 覆蓋現有
   - **不要在檔名輸入框補 `.png` 副檔名**（IMP-候選-E 雙副檔名陷阱）

2. **補 3 行程 DevTools Offline 截圖**（建議做）：
   - 對 MO / Singapore / AKAME 各做：
     - 開頁 → F12 → 確認 SW activated
     - Network tab → Network conditions 下拉 → 勾 `Offline`
     - 重整頁
     - 確認頁面文字 + 圖片完整載入
     - 截整個 Chrome 視窗、命名 `devtools_offline_2026_04_MO.png` / `devtools_offline_2026_05_Singapore.png` / `devtools_offline_2026_07_AKAME.png`
   - 放進同一資料夾

3. **跨頁 localStorage 測試 + 桌面 Device Mode 浮層截圖**（建議做）：
   - F12 → Toggle device toolbar（Ctrl+Shift+M）→ 切 iPhone 12 Pro
   - 開 HK 頁 → 等 1.5 秒看浮層 → 截 `mobile_2026_04_HK_overlay.png`
   - 點 X 鈕 → 浮層消失 → 截 `mobile_2026_04_HK_dismissed.png`
   - 切換 URL 到 MO 頁 → 確認浮層沒出現 → 截 `mobile_2026_04_MO_no_overlay_post_dismiss.png`
   - F12 → Application → Local Storage → `http://localhost:8000` → 確認看到 `pwa-install-dismissed = 1` → 截 `mobile_localstorage_dismissed.png`
   - 點 Application 內 `Clear site data` → 重整 HK → 浮層回來 → 截 `mobile_2026_04_HK_overlay_after_clear.png`

4. **重跑 Evaluator**：
   - 開新對話（必須 context reset）
   - cwd 在 `C:\Users\anton_liu\Downloads\ANTI\antonstrip`（或 Harness 中央亦可，Evaluator skill 會自己找）
   - 輸入 `/harness:evaluator`（或 `/evaluator`，視 skill 註冊路徑）
   - 預期：總分升至 ~0.80、達標、可進 sprint-close

### 路徑 B：直接收尾（如果決定接受 0.665 條件性達標）

- 接受本 sprint 在 16% 核心 AC-08 未完整驗證的狀態下進 sprint-close
- 開新對話 → 在 antonstrip cwd 下 → 輸入 `/harness:sprint-close sprint-001-pwa-install-prompt`
- 在 sprint-close 流程中明確標「本 sprint 條件性達標 0.665、AC-08 飛航未驗、Singapore SW redundant 待 sprint-002 處理」
- 把 Singapore redundant 議題寫進 sprint-002 backlog

### 路徑 C：直接補真飛航實測（最強證據，~30 分鐘 + 1 台裝置）

- 拿手機開 `https://ytlanton.github.io/antonstrip/2026_04_HK/`（或本機任一可達網址）
- 確認頁面完整載入（讓 SW precache 完成）
- Safari/Chrome → 分享 → 加入主畫面（iOS）或選單 → 安裝（Android）
- 打開飛航模式（設定 → 飛航模式 ON）
- 從主畫面 icon 開 PWA → 截「app 開啟 + 圖片完整顯示」1 張、命名 `mobile_2026_04_HK_offline_real_airplane.png`
- AC-08 直接升 0.85（最強證據），總分到 ~0.85

---

## 下一步：分支

### 達標分支
未觸發（總分 0.665 < 0.80）

### 條件性達標分支（本輪適用）

1. **PDM 評估**：看上述路徑 A/B/C，決定要不要補件。建議路徑 A（性價比最高、不需手機、~1.5 小時）。
2. **若選 A 或 C**：依「補件 / 重評 SOP」操作 → 重跑 Evaluator → 達標後進 sprint-close
3. **若選 B**：直接 sprint-close、把缺口寫進 sprint-002 backlog
4. **任一路徑後**：開新對話、在 antonstrip cwd 下、輸入 `/harness:sprint-close sprint-001-pwa-install-prompt`

### 不達標分支
未觸發（總分 0.665 ≥ 0.60）

---

> Review 版本：v3.0（第三輪獨立 sub-agent 重評；覆蓋 v2.0；發現新 P0 silent failure：Singapore SW redundant）｜Evaluator：Claude Opus 4.7｜2026-05-27
> **sprint-001-pwa-install-prompt 驗收完成，總分 0.665，條件性達標。請呼叫 `/harness:sprint-close` 收尾（或先依路徑 A 補件後重評）。**
