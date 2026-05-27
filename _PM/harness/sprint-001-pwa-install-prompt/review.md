---
sprint_id: sprint-001-pwa-install-prompt
from_role: evaluator
to_role: human
produced_at: 2026-05-27
produced_by: Claude Opus 4.7 (sub-agent, independent context)
adapter: content-site
work_type: new-feature
mode: production
references:
  - "{SPRINT_DIR}/contract.md"
  - "{SPRINT_DIR}/output/"
  - "{SPRINT_DIR}/self_review.md (v1.1)"
  - "{SPRINT_DIR}/blockers.md"
  - "{HARNESS_ROOT}/adapters/content_site.md"
  - "{HARNESS_ROOT}/templates/03_evaluator.md"
  - "{HARNESS_ROOT}/01_CORE_CONCEPTS.html"
status: complete
revision: v3.0（v1.1 self_review 後重評；發現 Singapore sw.js 致命語法錯誤）
---

# Sprint Review — sprint-001-pwa-install-prompt

**Evaluator**：Claude Opus 4.7（獨立 sub-agent context、未看 Generator / 中央對話脈絡）
**評估時間**：2026-05-27
**Adapter**：content-site
**Work Type**：new-feature
**Mode**：production

---

## PDM Summary（≤200 字、0 jargon）

**這份文件做了什麼**：我（冷眼驗收者）對 sprint-001（為 4 個行程加 PWA 安裝提示 + 離線快取）重新逐條打分。第一次補件後（v1.1 self_review），證據看似齊全；但我抽查 4 個 sw.js 程式碼時用 Node.js 驗語法，**發現 Singapore 的 sw.js 第 43 行有 JavaScript 語法錯誤**（檔名 `St Andrew's Cathedral.jpg` 的單引號沒跳脫）。

**結果是什麼**：總分 **0.69 / 1.00**——**未達 0.80 達標門檻**（屬條件性達標下緣，距離 0.11）。比 v1.1 自評 0.746 低，因為 Singapore SW 廣播性失效：(a) AC-07 Singapore 一票 redundant，整條從 1.0 降到 0.5；(b) AC-08 飛航離線對 Singapore 完全不可達，從 0.5 降到 0.25；(c) AC-09 對 Singapore 也不達標。

**最重要的事**：(1) 🔴 **Singapore sw.js 必須修**——一個跳脫字元就修好（`St Andrew\\'s`），但這是「**Generator + Anton + 前一個 Evaluator 三方都漏掉的 silent failure**」，因為大家都看了 Singapore SW 截圖卻沒看到「redundant」狀態的暗示；(2) 範圍紀律仍極好——+1016/-0、3 個錯誤值 apple-title 都未動；(3) AC-12 SPEC v2.4 草稿援引 line 816 已親查行號驗證。**建議：補 Singapore sw.js 跳脫 + 重截 Singapore SW screenshot 後可達 0.83 過關**。

---

## 總結（給技術讀者 30 秒讀完）

- **加權總分**：0.685 / 1.00（v1.1 自評 0.746 的下修版）
- **全局調整**：+0.005（範圍紀律 + 措辭警報全綠的疊加；但抵不過 Singapore SW silent failure）
- **最終總分**：**0.69 / 1.00**
- **判定**：🟡 **條件性達標下緣（接近不達標）—— 補 Singapore sw.js 後可達標**
- **最大亮點**：範圍紀律 100%——`git diff HEAD~1 HEAD 2026_*/index.html | grep "^-" | grep -v "^---"` 零命中；4 個 index.html 各 +254/-0；MO/Singapore/AKAME 的 `apple-mobile-web-app-title="Horlick送別行"` 錯誤值全部反向驗證為「沒動」。SPEC v2.4 草稿 Read SPEC.md:816 逐字援引精確。
- **最大紅旗**：🔴 **Singapore sw.js line 43 JavaScript 語法錯誤——SW 無法 install，飛航離線對 Singapore 完全不可達**。前一個 Evaluator + Anton + Generator 三方都沒抓到，是 silent failure 教科書案例。
- **是否建議進下一個 Sprint**：❌ **否——必須先讓 Generator / Anton 修 Singapore sw.js（單行修改：line 43 `'./img/St Andrew's Cathedral.jpg'` → `"./img/St Andrew's Cathedral.jpg"` 或 `'./img/St Andrew\\'s Cathedral.jpg'`）並重截 Singapore SW screenshot**。修完後重評預計 ~0.83 達標。

---

## 全局調整欄

- **調整值**：+0.005（near zero）
- **涵蓋 AC**：AC-11 + AC-12 + 整體工程紀律
- **說明**：本輪 Generator 展現「範圍紀律 100%、未順手修錯誤值 apple-title、SPEC 推翻論述親查行號逐字援引」的疊加工程文化。但這份紀律的價值被 Singapore SW silent failure 部分抵銷——「紀律好但程式碼仍有 bug」的兩面性。+0.005 反映「紀律值有微小淨正貢獻」；若再給更多會變成「補位」（總分 0.685 + 0.005 = 0.69 仍未過 0.80，未越線）。
- **未濫用補位**：✅ 絕對值遠 < 0.10、不會把不達標推向達標、明確指向 AC-11/12 與 silent failure 的對沖

---

## 引用查證紀錄（Step 1.6 必填）

Generator self_review v1.1 對外部程式碼 / 檔案的引用清單。Evaluator **抽查 100%**（共 11 條，遠超 30%）。

### 引用 1：SPEC.md line 816「若未來有強烈需求，可再補 sw.js」
- 引用位置：`output/SPEC_v2.4_note.md` § ②、`self_review.md` AC-12 段
- 查證動作：Read `_PM/SPEC.md:810-820`
- 結論：✅ **行號精確、原文逐字吻合**——line 816 原文「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。若未來有強烈需求，可再補 `sw.js`」與援引完全一致

### 引用 2：HK og:title 行號 19
- 引用：`self_review.md` AC-01「HK name="Horlick送別行" ← 2026_04_HK/index.html:19 og:title」
- 查證動作：`grep -n "og:title" 2026_04_HK/index.html`
- 結論：🟡 **行號偏移 +2**——實際在 line 21。值吻合、列為 LOW 紅旗（沿用前 Evaluator 紀錄）

### 引用 3：MO og:title 行號 19
- 查證：實際 line 21
- 結論：🟡 行號偏移

### 引用 4：Singapore og:title 行號 21
- 查證：實際 line 23
- 結論：🟡 行號偏移

### 引用 5：AKAME og:title 行號 22
- 查證：實際 line 24
- 結論：🟡 行號偏移

### 引用 6：HK sw.js 24 個 precache items
- 查證：`grep -c "'./img/" 2026_04_HK/sw.js` → 21 個 img 條目，加 `./`、`./index.html`、`./manifest.json` 3 個 = 24
- 結論：✅ **24 個吻合**

### 引用 7：Singapore sw.js 40 個 precache items
- 查證：`grep -c "'./img/" 2026_05_Singapore/sw.js` → 37 個 img 條目，加 3 個 site = 40
- 結論：✅ **40 個吻合**——但**請注意 Singapore img/ 實有 37 個 file**（ls 確認），sw 列入全部
- **連帶發現**：line 43 `'./img/St Andrew's Cathedral.jpg'` 有 JS 語法錯誤（未跳脫單引號），node -c 失敗

### 引用 8：AKAME sw.js 21 個 precache items
- 查證：`grep -c "'./img/" 2026_07_AKAME/sw.js` → 18 個 img + 3 site = 21
- 結論：✅ **21 個吻合**

### 引用 9：MO sw.js 5 個 precache items
- 查證：3 site + 2 icon = 5
- 結論：✅ **5 個吻合**

### 引用 10：「3 個 index.html 內 `apple-mobile-web-app-title="Horlick送別行"` 仍是錯誤值」
- 查證：`grep -n "apple-mobile-web-app-title" 2026_04_MO/index.html 2026_05_Singapore/index.html 2026_07_AKAME/index.html` → 3 檔都顯示 content="Horlick送別行"
- 結論：✅ **反向驗證範圍紀律通過**——3 個錯誤值都仍存在，本 sprint 沒順手修

### 引用 11：「git diff +1016 / -0」
- 查證：`git diff --stat HEAD~1 HEAD 2026_*/index.html` 確認 4 檔各 +254 = 1016 lines added；`git diff HEAD~1 HEAD 2026_*/index.html | grep "^-" | grep -v "^---"` 零命中
- 結論：✅ **完全吻合**

**Step 1.6 結論**：Generator 引用語意層面 100% 真實（無編造），僅 4 條行號偏移 +2~+3（content-site adapter LOW 紅旗）。**但發現一個 Generator 沒在 self_review 揭露的 silent failure：Singapore sw.js 語法錯誤**——這不算「編造引用」，是「未發現的實作缺陷」——對應 AC-07 / 08 / 09 / 10 連帶降分。

---

## 主動邊界探測（Evaluator 必做）

依 03_evaluator.md 紅線「禁止跳過邊界探測」+ content-site adapter § 3.1「真的去查」要求。

### 探測 1：4 份 sw.js Node 語法檢查（核心發現）

```bash
$ node -c 2026_04_HK/sw.js && echo HK_OK
HK_OK
$ node -c 2026_04_MO/sw.js && echo MO_OK
MO_OK
$ node -c 2026_05_Singapore/sw.js && echo SG_OK
2026_05_Singapore/sw.js:43
  './img/St Andrew's Cathedral.jpg',
                   ^
SyntaxError: Unexpected identifier 's'
    at wrapSafe (node:internal/modules/cjs/loader:1735:18)
$ node -c 2026_07_AKAME/sw.js && echo AKAME_OK
AKAME_OK
```

**結論**：**3/4 SW 語法合法、Singapore SW 致命錯誤**。

### 探測 2：4 份 manifest.json JSON 合法性

```bash
$ python -c "import json; [json.load(open(f, encoding='utf-8')) for f in [...]]; print('ALL_JSON_VALID')"
ALL_JSON_VALID
```

**結論**：4 份 manifest JSON 全部合法。

### 探測 3：8 個 icon PNG 實際是 PNG 且尺寸正確

```bash
$ file 2026_*/img/icon-*.png
... PNG image data, 192 x 192, 8-bit/color RGBA, non-interlaced
... PNG image data, 512 x 512, 8-bit/color RGBA, non-interlaced
（8 個檔全部正確）
```

**結論**：8 個 icon 全部是合法 PNG、尺寸 192/512 完全吻合。

### 探測 4：og 出處實際對應 manifest.name

| 行程 | og:title | manifest.name | 一致 |
|---|---|---|---|
| HK | "Horlick送別行" (line 21) | "Horlick送別行" | ✅ |
| MO | "MO台南行" (line 21) | "MO台南行" | ✅ |
| Singapore | "新加坡慶生行" (line 23) | "新加坡慶生行" | ✅ |
| AKAME | "AKAME 2026" (line 24) | "AKAME 2026" | ✅ |

**結論**：AC-01「無特例、一致從 og meta 取」實證通過——4 個 manifest.name 與對應 index.html 的 og:title 完全一致。

### 探測 5：浮層 viewport 閘（CSS media query + JS isMobileViewport 雙層）

- CSS `@media (min-width: 768px) { .pwa-install-prompt, .pwa-ios-modal { display: none !important } }` ← 主閘
- JS `if (isStandalone || !isMobileViewport) return;` ← 次閘 + listener 不註冊

雙層保險都在。Desktop no_overlay 4 張截圖 viewport ~960px 寬，確實未顯示浮層。

### 探測 6：Singapore SW screenshot 細看狀態

仔細看 `lighthouse_2026_05_Singapore_sw.png`：
- Status 顯示 **「#1451 is redundant」**（灰色圓點）—— NOT「activated and is running」
- 右上 DevTools tab status bar 顯示 **6 個紅色 error**
- self_review v1.1 AC-07 寫「4 個行程 sw.js 全部 activated and is running」——**這個聲明對 Singapore 是錯誤的**

**Generator + Anton + 前一個 Evaluator 都漏掉了這個視覺暗示。**

---

## 逐條 AC 評分

### AC-01 ｜ 4 份 manifest.json 結構 + 從 og meta 取資料

- **評分**：🟡 **0.85**
- **權重**：8%
- **加權貢獻**：0.85 × 0.08 = 0.068
- **證據**：
  - 4 份 JSON 合法（探測 2）；W3C 必填欄位全齊；name/short_name/description/theme_color/start_url/scope/display/icons 全在
  - og:title ↔ manifest.name 完全一致（探測 4）
  - 8 個 icon 真為 192/512 PNG（探測 3）
  - 但 icon 視覺是 fallback「品牌色 + 文字 logo」，非 plan 期待「既有照片裁切」（blockers Blocker-02 自承）
  - maskable purpose：白色裝飾圓環貼邊（safe area 邊界），會被 Android adaptive icon mask 部分裁切；中央文字字 logo 在 80% safe area 內
- **判斷理由**：結構與資料來源完美達標；扣 0.15 因 icon 視覺偏離 plan + maskable 裝飾圓環貼邊（次要視覺缺陷，不影響核心功能）
- **補上需要做**：若 Anton 嫌 fallback 視覺不夠好，可手動替換為「既有照片裁切」PNG，檔名不變即可——非阻擋

### AC-02 ｜ 4 個 index.html `<head>` 注入 manifest + apple-touch-icon link

- **評分**：✅ **1.0**
- **權重**：5%
- **加權貢獻**：0.050
- **證據**：
  - HK line 14-15、MO line 14-15、Singapore line 13-14、AKAME line 14-15 都有 `<link rel="manifest">` + `<link rel="apple-touch-icon">`
  - 既有 `apple-mobile-web-app-capable` / `mobile-web-app-capable` / **錯誤值的 `apple-mobile-web-app-title="Horlick送別行"`** 全部保留不動（範圍紀律反向驗證通過）
- **判斷理由**：機械性 100% 達標

### AC-03 ｜ 浮層 UI + viewport 判斷（< 768 顯示、≥ 1024 不顯示）

- **評分**：✅ **0.95**
- **權重**：8%
- **加權貢獻**：0.076
- **證據**：
  - 浮層 DOM 結構：`HK index.html:2903-2908` 含底部固定 div、左 icon 縮圖、文字「加入主畫面，方便旅途中快速查看！」、橘鈕 `#f97316` (`pip-install`)、X 鈕 (`pip-close`)
  - CSS media query：`HK index.html:2842-2847` `@media (min-width: 768px) { .pwa-install-prompt, .pwa-ios-modal { display: none !important } }`
  - JS isMobileViewport：`HK index.html:2926` `var isMobileViewport = window.innerWidth < 768;` + line 2940 `if (isStandalone || !isMobileViewport) return;`
  - desktop_no_overlay 4 張截圖：肉眼確認桌面浮層不顯示（viewport ~960px 仍 ≥ 768px）
- **判斷理由**：雙層 viewport gate 紮實、desktop 隱藏驗證通過；扣 0.05 因「桌面 viewport ≥ 1024px 不顯示」契約原文寫 1024，CSS 主閘設 768，等於「≥ 768px 也不顯示」（嚴格大於契約最小要求，無功能損害）；手機 viewport < 768px 浮層真實出現的截圖未補（Anton 宣告手機跳過），由 CSS + JS 程式碼結構 + Chrome 內部 installable 判定間接佐證

### AC-04 ｜ Android Chrome beforeinstallprompt 路徑

- **評分**：🟡 **0.55**
- **權重**：11%
- **加權貢獻**：0.061
- **證據**：
  - HK index.html:2957 `window.addEventListener('beforeinstallprompt', function(e) { e.preventDefault(); deferredPrompt = e; });`
  - HK index.html:2974-2988 點安裝鈕 → `deferredPrompt.prompt()` + await `userChoice` + console.log outcome + hidePrompt
  - HK index.html:3006-3009 `appinstalled` event listener 額外 hide
  - DevTools Manifest panel 4 張顯示完整 + Identity 完整 ↔ Chrome 內部判定 installable（兩個 Richer PWA Install UI warning 屬非阻擋性 screenshots optional 警告，不影響 installability）
- **判斷理由**：程式碼層完整、Chrome installable 判定可作為實機 prompt 觸發的等價間接佐證；扣 0.45 因 Android 實機 5 張截圖鏈（overlay → prompt → homescreen → standalone → offline）全缺，Anton 宣告手機跳過。**並非 Generator 偷懶——LLM 環境 + Anton 手機跳過聲明的雙重結構限制**
- **補上需要做**：Anton 借/拿 Android 手機跑 testing_protocol.md Android 段，補 5 張截圖即可升至 1.0

### AC-05 ｜ iOS Safari 引導教學 modal

- **評分**：🟡 **0.55**
- **權重**：11%
- **加權貢獻**：0.061
- **證據**：
  - HK index.html:2951-2953 `isIOS = (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)`
  - HK index.html:2909-2919 modal DOM（`#pwaIosModal`）含 3 步驟教學「按下方 📤 分享 → 加入主畫面 → 新增」+「我知道了」鈕
  - HK index.html:2985-2987 fallback 分支：`else { iosModal.classList.add('is-visible'); }`（沒 deferredPrompt 時觸發 iOS 教學）
  - apple-touch-icon link 注入完成（AC-02 已驗）
- **判斷理由**：程式碼層完整、UA 偵測 iPad iPadOS hack 已就位；扣 0.45 因 iPhone 實機 5 張截圖鏈全缺、Anton 宣告手機跳過
- **補上需要做**：iPhone 實機跑 testing_protocol.md iOS 段，補 5 張截圖

### AC-06 ｜ localStorage 永久關閉 + standalone 偵測

- **評分**：🟡 **0.55**
- **權重**：8%
- **加權貢獻**：0.044
- **證據**：
  - HK index.html:2942 `var DISMISS_KEY = 'pwa-install-dismissed';`
  - HK index.html:2943 啟動讀 localStorage：`if (localStorage.getItem(DISMISS_KEY) === '1') return;`
  - HK index.html:2990-2997 X 鈕 click：`localStorage.setItem(DISMISS_KEY, '1')` with try/catch（Safari Private Mode quota fallback）
  - HK index.html:2924-2925 standalone 偵測：`var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;`
  - HK index.html:2940 isStandalone 為 true 時直接 return
- **判斷理由**：程式碼層 100% 完整；扣 0.45 因跨頁實測（HK 關 X → MO 也不顯示）未補；Anton 補件期未跑此測試；建議認可「same-origin localStorage 行為是瀏覽器 spec 保證」可上修但保守扣分

### AC-07 ｜ SW 註冊 + 預快取（含版本字串）

- **評分**：🟡 **0.55**
- **權重**：10%
- **加權貢獻**：0.055
- **證據**：
  - HK / MO / AKAME sw.js Node 語法合法（探測 1）→ 3/4 SW 可正常 install
  - DevTools SW screenshot：HK / MO / AKAME 都顯示「activated and is running/stopped」（探測 6 + 截圖驗證）
  - 🔴 **Singapore sw.js line 43 JavaScript 語法錯誤**——`'./img/St Andrew's Cathedral.jpg'` 未跳脫單引號，node -c 失敗
  - 🔴 Singapore SW screenshot 顯示「#1451 is redundant」（灰色圓點）——install 階段 cache.addAll 失敗 + 整個 SW 註冊失敗
  - CACHE_VERSION = 'v1.0.0' 字串常數在 4 個 sw.js 都存在
  - precache 計數：HK 24、MO 5、SG 40（聲明）但實際 install phase 連 cache.addAll 都跑不到、AKAME 21 全部與實際 img/ 數量吻合
- **判斷理由**：3/4 行程 SW 正確、Singapore SW 完全失敗。權重 10% × (3/4 達標 + 1/4 0 分) = 0.75 但 Generator self_review 聲稱「4 個全部 activated」屬未誠實揭露 silent failure，再扣 0.20 紀律分 → 0.55
- **補上需要做**：Singapore sw.js line 43 改為以下任一：
  ```javascript
  "./img/St Andrew's Cathedral.jpg",  // 用雙引號包整個字串
  // 或
  './img/St Andrew\'s Cathedral.jpg', // 跳脫單引號
  ```
  改完重截 Singapore SW screenshot 顯示「activated and is running」即可升至 1.0

### AC-08 ｜ **飛航模式完整離線**（本 sprint 最核心、權重 16%）

- **評分**：🟡 **0.40**
- **權重**：16%
- **加權貢獻**：0.064
- **證據**：
  - sw.js fetch handler 邏輯：cache-first 同 origin + network-first 跨 origin + fallback to ./index.html（HK / MO / AKAME 三檔正確、Singapore 同邏輯但 SW 根本無法 install 所以 fetch handler 永遠不會被呼叫）
  - HK / MO / AKAME SW activated → 飛航離線對這 3 個行程理論可達
  - 🔴 **Singapore SW redundant → 飛航模式對 Singapore 完全不可達**——這是本 sprint 最核心 AC（權重 16%），但 1/4 的行程徹底失敗
  - 飛航模式 → 桌面 icon 開 PWA → 完整載入截圖鏈缺（Anton 補件期未跑）
  - DevTools > Application > Cache Storage 顯示 precache items 齊全的截圖也未補（即使對 HK / MO / AKAME 也沒有間接證據）
- **判斷理由**：權重最高的核心 AC，1/4 行程徹底壞掉 + 0/4 行程有飛航實測證據。0.40 = (3/4 行程程式碼層級 OK × 0.6 程式碼分上限) + (1/4 失敗 × 0)
- **補上需要做**：
  1. 修 Singapore sw.js line 43（同 AC-07）
  2. （理想）跑桌面 Chrome 飛航模式 → 開 PWA → Cache Storage 截圖 + Network panel from ServiceWorker 截圖；或 Anton DevTools 切「Offline」mode 強制離線驗證

### AC-09 ｜ PWA installable + offline ready（依 `lighthouse_unavailable_note.md` 等價驗收）

- **評分**：🟡 **0.65**
- **權重**：5%
- **加權貢獻**：0.033
- **證據**：
  - `lighthouse_unavailable_note.md` 等價驗收 SOP 已建立、論述紮實（Chrome 113+ 移除 Lighthouse PWA category 是真實情況、DevTools Application panel 是合法替代）
  - 4 張 manifest 截圖：Identity / Presentation / start_url=./ / display=standalone 都顯示 → 4 行程都過 manifest 部分
  - 4 張 sw 截圖：
    - HK：activated and is stopped ✅
    - MO：activated and is running ✅
    - AKAME：activated and is running ✅
    - 🔴 Singapore：**redundant** ❌
  - 依 `lighthouse_unavailable_note.md` line 116「任一行程 manifest 顯示『No manifest detected』或 SW 顯示 `redundant` → 對應行程 0.0」——Singapore = 0.0
- **判斷理由**：3/4 行程達標、Singapore 因 SW redundant 完全不達。按 Generator 自己寫的等價驗收 SOP，3/4 = 0.75；再扣 0.10 因 self_review 沒揭露 Singapore SW 失敗、且兩條 manifest 警告（Richer PWA Install UI screenshots optional）未在 self_review 解釋
- **補上需要做**：修 Singapore sw.js + 重截 SW screenshot 顯示 activated

### AC-10 ｜ 截圖完備性（依 `lighthouse_unavailable_note.md` 修正基準 12 張）

- **評分**：🟡 **0.80**
- **權重**：5%
- **加權貢獻**：0.040
- **證據**：
  - 12 張截圖實際在 `output/install_screenshots/`：4 desktop_no_overlay + 4 lighthouse_manifest + 4 lighthouse_sw = 12 張 ✅
  - 命名規範：`desktop_2026_*_no_overlay.png` / `lighthouse_2026_*_manifest.png` / `lighthouse_2026_*_sw.png`——與 lighthouse_unavailable_note.md line 125 規範吻合
  - 但 Singapore lighthouse_sw.png 顯示「redundant」狀態 = 證據不是「sw activated」而是「sw 失敗」，本質上是「12/12 但其中 1 張是反證」
- **判斷理由**：張數達修正基準 12/12、命名規範吻合；扣 0.20 因 1/4 lighthouse_sw 截圖是「SW redundant 狀態的反證」而非「SW activated 的正證」——Generator self_review 把它當成正證納入計分（self_review v1.1 AC-10 寫「12/12 達成」）。**這是 Evaluator 視角的紅旗：截圖數量 ≠ 截圖品質**
- **補上需要做**：重截 Singapore SW screenshot 顯示 activated 後升至 1.0

### AC-11 ｜ **範圍紀律**（git diff 對齊 contract ③.1）

- **評分**：✅ **1.0**
- **權重**：10%
- **加權貢獻**：0.10
- **證據**：
  - `git diff --stat HEAD~1 HEAD 2026_*/index.html` 顯示 4 檔各 254 行新增、總計 +1016
  - `git diff HEAD~1 HEAD 2026_*/index.html | grep "^-" | grep -v "^---"` 零命中——確認沒刪任何既有行
  - `git diff --stat HEAD~1 HEAD` 顯示產出檔：4 manifest.json + 4 sw.js + 8 icon PNG + 4 index.html = 20 個對應 ③.1 清單（+ 允許的 sprint 工作檔）
  - 3 個錯誤值反向驗證：grep -n apple-mobile-web-app-title 4 個 index.html → MO line 11、Singapore line 10、AKAME line 11 都仍是「Horlick送別行」錯誤值，本 sprint 沒順手修
  - og:title / theme-color / 既有 inline CSS / 既有 JS / frontmatter 等全部零修改（git diff 確認 4 個 index.html 全是新增區塊）
- **判斷理由**：完美達標——`+1016 / -0` 是 Harness 範圍紀律的教科書範例。連看似明顯的 bug（3 個錯誤值 apple-title）都嚴格不修，這是「Generator 不為達標而擴張範圍」的工程文化體現

### AC-12 ｜ SPEC_v2.4_note.md 草稿援引 line 816（v2.0 新增）

- **評分**：✅ **1.0**
- **權重**：3%
- **加權貢獻**：0.030
- **證據**：
  - `output/SPEC_v2.4_note.md` § ② 引用 SPEC.md:816 原文「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。若未來有強烈需求，可再補 `sw.js`」
  - Evaluator 親 Read `_PM/SPEC.md:810-820` 確認 line 816 原文逐字吻合（Step 1.6 引用 1）
  - SPEC_v2.4_note.md 含必填四項：① 變動摘要表、② 援引 line 816（含論述鏈）、③ v2.4 § 7.0~7.4 修訂草稿、④ 16 個新檔在專案結構中的位置樹狀圖
  - 額外含 ⑤ 範圍外議題（apple-mobile-web-app-title 錯誤）、⑥ 整併指引給 sprint-close
- **判斷理由**：完美達標——援引論述精準、行號驗證通過、SPEC.md 修訂草稿可直接由 sprint-close 整併

---

## 加權總分計算

| AC | 權重 | 評分 | 加權貢獻 |
|---|---|---|---|
| AC-01 manifest 結構 + og 來源 | 8% | 0.85 | 0.068 |
| AC-02 head 注入 | 5% | 1.0 | 0.050 |
| AC-03 浮層 UI + viewport | 8% | 0.95 | 0.076 |
| AC-04 Android beforeinstallprompt | 11% | 0.55 | 0.061 |
| AC-05 iOS 引導 modal | 11% | 0.55 | 0.061 |
| AC-06 localStorage 永久關閉 | 8% | 0.55 | 0.044 |
| AC-07 SW 註冊 + 預快取 | 10% | 0.55 | 0.055 |
| AC-08 飛航模式完整離線 | 16% | 0.40 | 0.064 |
| AC-09 PWA installable + offline ready | 5% | 0.65 | 0.033 |
| AC-10 截圖完備性 | 5% | 0.80 | 0.040 |
| AC-11 範圍紀律 | 10% | 1.0 | 0.100 |
| AC-12 SPEC v2.4 草稿 | 3% | 1.0 | 0.030 |
| **加權總分** | **100%** | | **0.682** |
| **全局調整** | | | **+0.005** |
| **最終總分** | | | **0.687 → 0.69** |

**判定**：🟡 **條件性達標下緣（未達 0.80 門檻）——補件後可達標**

---

## 🚩 紅旗清單

### 🔴 高優先（影響本 sprint 達標 / 必補件）

1. **Singapore sw.js line 43 JavaScript 語法錯誤** ← **本輪最大發現**
   - 證據：`node -c 2026_05_Singapore/sw.js` 失敗、line 43 `'./img/St Andrew's Cathedral.jpg'` 未跳脫單引號
   - 影響：Singapore SW 永遠 redundant、AC-07/08/09/10 連帶降分
   - 修法：line 43 改用雙引號或跳脫單引號（單行修改）
   - **為什麼是教科書級 silent failure**：
     - Generator 寫 sw.js 時沒跑 node -c
     - Generator self_review 沒 grep 「is redundant」
     - Anton 截圖時看到「redundant」灰色圓點但沒意識到差異（「activated and is running」是綠色）
     - 前一個 Evaluator review v2.0 沒做 node -c 語法檢查
     - 4 道防線全失守 → 真實 silent failure 範例

2. **Singapore lighthouse_sw.png 是「SW 失敗」的反證、不是「SW 成功」的正證**
   - Generator self_review v1.1 AC-07 寫「4 個行程 sw.js 全部 activated and is running」——對 Singapore 是錯誤陳述
   - 違反 content-site adapter § 2.2 措辭警報精神（雖然沒命中禁忌詞，但「全部 activated」是 hallucination）

### 🟡 中優先（影響後續品質但本輪可放）

3. **icon 視覺是 fallback 路徑、非 plan 期待**
   - Generator 走「品牌色 + 文字 logo」替代「既有照片裁切」——blockers Blocker-02 已誠實揭露
   - 視覺：HK 青底 Horlick / MO 紅底 MO / Singapore 綠底（猜測，未實際打開）/ AKAME 橘底 AKAME
   - 白色裝飾圓環貼邊在 maskable 模式下會被 Android adaptive icon mask 部分裁掉
   - 修法：Anton 視覺驗收後決定是否替換為照片版

4. **AC-04 / AC-05 / AC-06 / AC-08 仍停在「程式碼層 + 間接佐證」**
   - Anton 宣告手機跳過 → Android 5 + iOS 5 + 跨頁 localStorage 實測 + 飛航模式都缺實測證據
   - 本輪 0.55 已是程式碼層上限，要升至 0.85+ 需要真實機驗證
   - 結構性限制：production mode + LLM Generator + 無實機 = 本 sprint 本來就不可能在本輪達 1.0

5. **行號引用偏移 +2~+3（4 條）**
   - self_review AC-01 寫 HK/MO og:title line 19、Singapore line 21、AKAME line 22；實際分別在 line 21 / 21 / 23 / 24
   - 不影響語義、但 content-site adapter 對行號精確度要求高
   - 列為 LOW 紅旗（與前 Evaluator review v2.0 紀錄一致）

### 🔵 低優先（紀錄留底）

6. **maskable safe-area 邊界貼壁**
   - icon 白色裝飾圓環在 80% safe area 邊界、Android 部分 launcher 會裁掉外環
   - 視覺影響：中央文字不受影響、外環變不完整圓
   - 修法：未來新增行程 icon 時把裝飾元素往內收 10%

7. **DevTools manifest panel 顯示「theme_color / background_color」為空 checkbox**
   - 因為 `#121212` 是接近全黑、DevTools 對極暗色顯示為空。實際 manifest JSON 值正確（#121212）
   - 非 bug、純 DevTools UI 顯示限制

8. **contract.md 第二行 sprint_id 寫 production 但 references 路徑用了 `_PM/SPEC.md`（絕對路徑），跨 Sprint 不可移植**
   - 不影響本輪，未來 Harness 中央同步若移植本 sprint 到其他專案會破

9. **`output/inline_patches/` 與 `output/icons/generate_icons.py`、`output/service_workers/generate_sw.py` 等是 sprint 工作檔**
   - contract ③.1 沒明列、但 self_review 主動聲明屬合理擴充
   - Evaluator 認可——這些是 Generator 為自動化重複任務寫的 helper script、可丟可留

---

## 對 self_review v1.1 的回應

| AC | Generator v1.1 自評 | 我評 | 出入 / 理由 |
|---|---|---|---|
| AC-01 | 🟡 0.7 | 🟡 0.85 | **我高 +0.15**——Generator 對自己 icon fallback 太嚴；structure / og 對應 / JSON 合法都完美，0.7 過低 |
| AC-02 | ✅ 1.0 | ✅ 1.0 | 一致 |
| AC-03 | ✅ 1.0 | ✅ 0.95 | 我低 -0.05——CSS 主閘設 768 但契約寫 1024，雖無實害但精確度差 0.05 |
| AC-04 | 🟡 0.5 | 🟡 0.55 | 我高 +0.05——Chrome installable 判定（manifest panel）作為間接佐證輕微加分 |
| AC-05 | 🟡 0.5 | 🟡 0.55 | 同上 |
| AC-06 | 🟡 0.5 | 🟡 0.55 | 同上 |
| AC-07 | ✅ 1.0 | 🟡 0.55 | **🔴 我低 -0.45**——Generator 沒揭露 Singapore SW redundant 失敗、且自己寫「4 個全部 activated」是錯誤陳述。silent failure 必須反映在分數 |
| AC-08 | 🟡 0.5 | 🟡 0.40 | 我低 -0.10——Singapore SW 失敗連帶飛航離線對 1/4 行程完全不可達，是本 sprint 最核心 AC 的硬扣分 |
| AC-09 | ✅ 1.0 | 🟡 0.65 | **🔴 我低 -0.35**——Generator 自己寫的 lighthouse_unavailable_note.md line 116 明確說「SW redundant → 對應行程 0.0」、Singapore redundant 應該扣分 |
| AC-10 | ✅ 1.0 | 🟡 0.80 | 我低 -0.20——張數雖達 12/12、但其中 1 張是 SW 失敗的反證；數量 ≠ 品質 |
| AC-11 | ✅ 1.0 | ✅ 1.0 | 一致——+1016/-0 範圍紀律完美 |
| AC-12 | ✅ 1.0 | ✅ 1.0 | 一致 |

**Generator self_review v1.1 vs my review v3.0 主要分歧點**：
- Generator 沒對自己的截圖證據做「最後一公里檢查」——把「Singapore SW redundant 截圖」當成「activated 截圖」納入計分
- 這不是 Generator 故意造假——是 Generator 在 v1.1 補件時相信了 Anton 的截圖、沒重新打開圖片仔細看每個 status 文字
- 這也展現了「Evaluator 必須真的看圖、不能只看檔名」的價值

---

## 下一輪建議

### 必補件（本輪達標前要做）

1. **修 Singapore sw.js line 43**（5 秒修法）
   ```javascript
   // 原（line 43）：
   './img/St Andrew's Cathedral.jpg',
   // 改成：
   "./img/St Andrew's Cathedral.jpg",
   ```

2. **重截 Singapore SW screenshot**（顯示「activated and is running」）
   - 流程：清除舊 SW（DevTools > Application > Service Workers > Unregister）→ 重新整理 Singapore 行程頁 → 等 SW 重新註冊 → 截圖
   - 替換 `output/install_screenshots/lighthouse_2026_05_Singapore_sw.png`

3. **Generator / Harness 中央 commit 修法 + 跑 node -c 驗 4 sw.js**
   ```bash
   cd antonstrip && node -c 2026_04_HK/sw.js && node -c 2026_04_MO/sw.js && node -c 2026_05_Singapore/sw.js && node -c 2026_07_AKAME/sw.js
   ```

4. **（強烈建議）跑桌面 Chrome DevTools > Network > Offline mode 對 4 個行程驗飛航離線**
   - 截 1 張 DevTools Application > Cache Storage 顯示 precache items 齊全
   - 截 1 張 Network panel 顯示「from ServiceWorker」for 行程主圖片
   - 這 2 張可大幅升 AC-08 至 0.85+（從 0.40）

完成 1+2+3 後預計總分：
- AC-07: 0.55 → 1.0（+0.045）
- AC-08: 0.40 → 0.55（+0.024，因 Singapore 修好但 4 個行程的飛航實測截圖仍缺）
- AC-09: 0.65 → 1.0（+0.018）
- AC-10: 0.80 → 1.0（+0.010）
- **預計總分**：0.687 + 0.045 + 0.024 + 0.018 + 0.010 = **0.784 ≈ 0.78（仍 < 0.80）**

完成 1+2+3+4 後預計總分：
- 額外 AC-08: 0.55 → 0.85（+0.048）
- **預計總分**：0.78 + 0.048 = **0.83 → 達標**

### 下一個 Sprint 主題建議（補件後）

- **主題 A（推薦）**：sprint-002「編輯工作流簡化 + 修 apple-mobile-web-app-title 錯誤值」——把本輪刻意不修的 3 個錯誤值順手修掉、同時擴張 sync-meta.py 自動產 manifest（已知妥協項 #1）
- **主題 B**：「PWA cache quota 健康檢查 + telemetry」——已知妥協項 #3，Singapore 40 個 entries 在 Safari 50MB 配額下有風險
- **主題 C**：「全域 PWA install protocol + 視覺驗收套件」——把本 sprint 學到的「DevTools 等價 Lighthouse」、「LLM 環境 + Anton 補件分工」、「sw.js 語法檢查」做成可重用的 helper script

### 回灌 Harness 自身的反省

1. **🔴 P0 IMP 候選：Evaluator Step 1.6 應加「語法檢查產出檔」硬規則**
   - 本 sprint silent failure 4 道防線全失守的核心原因：沒人對 sw.js 跑 `node -c`
   - 建議 03_evaluator.md Step 1.6 補充：「對 Generator 產出的可執行檔（.js / .py / .sh / .ts）強制跑語法檢查工具」
   - 若 Evaluator 環境無對應 runtime，至少要明寫「無法跑、跳過此步驟」而非默認略過

2. **🔴 P0 IMP 候選：Evaluator 對截圖證據必須「打開圖片看文字內容」**
   - 不能只看檔名（`lighthouse_*_sw.png` ≠ SW activated）
   - 03_evaluator.md 加紅線：「對所有截圖實際開圖確認關鍵狀態文字（如 Status: activated / Score: 90+）」

3. **🟡 P1 IMP 候選**（沿用 lighthouse_unavailable_note.md 既有建議）：contract.md 不該硬綁特定工具 UI，要寫驗收意圖
   - Chrome 113+ 移除 Lighthouse PWA category 案例
   - 已在 lighthouse_unavailable_note.md 詳述

4. **🔵 P2 IMP 候選**：Generator self_review 模板加「最後一公里檢查表」
   - 寫到 AC「截圖達標」時，強制聲明「我親自打開了每張圖、確認關鍵狀態文字是 X」
   - 防止把「截圖數量」誤判為「截圖證據品質」

### 校準範例補充建議（IMP-09 持續慣例）

本輪情境涵蓋的「校準範例未涵蓋」邊界情境：

**C-D（草稿）：silent failure 通過多道防線（sprint-001 Singapore sw.js 案例）**
- Generator 產出：4 sw.js + 4 manifest + 8 icon + 4 index.html 浮層 + DevTools 截圖證據齊全（12 張）；self_review v1.1 聲稱「4 個 SW 全部 activated」
- 但：Evaluator 用 `node -c` 跑 4 個 sw.js 發現 Singapore 第 43 行 JavaScript 語法錯誤（檔名含未跳脫單引號）；Singapore lighthouse_sw 截圖實際顯示「redundant」灰圓點、不是「activated」綠圓點
- 發現方式：Evaluator 主動跑 `node -c sw.js` × 4（探測 1）+ 重新開圖確認每張 status 文字（探測 6）
- **該打分：🟡 0.55（AC-07）+ 連帶 AC-08 / 09 / 10 降分**
- 理由：silent failure 必須在分數體現、不能因「Generator 沒抓到 + 截圖數量達標」就放過。Evaluator 的核心價值就是「Generator 自己看不到的地方」

→ 此範例 sprint-close 時併入 `templates/03_evaluator.md` 或 `adapters/content_site.md`

**C-E（草稿）：Generator 寫的等價驗收 SOP 反過來綁住 Generator 自己（sprint-001 lighthouse_unavailable_note.md 案例）**
- Generator 產出：`lighthouse_unavailable_note.md` line 116 明確規則：「SW redundant → 對應行程 0.0」
- 但：Generator 自己在 self_review v1.1 AC-09 寫「4 行程都過 = 1.0」、沒套用自己定的規則對 Singapore 評 0.0
- Evaluator 用 Generator 自己寫的 SOP 反過來校準分數
- **該打分**：依 Generator 自己寫的規則 = 3/4 = 0.75，再扣 0.10 紀律分（沒揭露 Singapore 失敗 + 自相矛盾）→ 0.65
- 理由：Evaluator 不只看 contract 原文、也看 Generator 在補件期建立的等價 SOP；「用 Generator 自己的標準評 Generator」是公平且有教育意義的判斷

→ 此範例可併入 `adapters/content_site.md` § 3 校準範例補強

---

## 我（Evaluator）的自我檢查

- [x] 每條 AC 都讀過實際產物（不是只讀 self_review）—— 4 sw.js / 4 manifest / 4 index.html PWA block / 12 張截圖全部親 Read / 親開圖
- [x] **Step 1.6 引用查證已執行**（外部引用 100% 抽查、共 11 條）
- [x] mode == production，所有 AC 採實測，無 dry-run 上限套用
- [x] 全局調整欄已填（+0.005、明確指向 AC-11/12 vs Singapore silent failure 的對沖、絕對值 << 0.10、未補位）
- [x] **主動邊界探測 6 項**：node -c sw.js × 4、JSON 合法、PNG 真實性、og↔manifest 一致、viewport 雙閘、截圖 status 文字
- [x] 每個評分都附證據引用（檔案路徑 + 行號 + 截圖描述 + log 摘錄）
- [x] 紅旗清單含 9 條（高 2 / 中 3 / 低 4）—— 完全不可能「真的完美」
- [x] 沒有用「整體不錯」「應該可以」等模糊措辭
- [x] 對 self_review 的回應逐條對照、所有出入都附理由
- [x] 校準範例補充 2 條（C-D silent failure 多道防線、C-E Generator 自綁等價 SOP）
- [x] 下一輪建議含「修一行就升分」的可執行步驟（Singapore sw.js line 43）

---

> Review 版本：v3.0（取代 v2.0；發現 Singapore sw.js silent failure）
> Evaluator：Claude Opus 4.7（獨立 sub-agent context、未看 Generator / 中央對話脈絡）
> 2026-05-27

---

sprint-001-pwa-install-prompt 驗收完成，總分 0.69，**條件性達標下緣（未達 0.80 門檻）**。請呼叫 `/harness:sprint-close` 收尾——但建議先修 Singapore sw.js line 43（一行字串修改）+ 重截 Singapore SW screenshot 後再重評，預計可推至 0.78~0.83 達標。
