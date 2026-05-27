# Sprint Blockers — sprint-001-pwa-install-prompt

> Generator 環境（LLM + 終端，無瀏覽器 / 無實機 / 無 GUI）的硬體限制造成的卡點，誠實列出。
> 非「規格不清」或「技術障礙」——是執行環境本身能力上限。

---

## Blocker-01：Step 6 跨平台手動測試 + 截圖無法在 Generator 環境內完成

- **發現於 Step**：plan.md Step 6（測試 + 截圖）
- **問題本質**：environment（執行環境能力上限）
- **影響的 AC**：AC-04（Android 安裝路徑）、AC-05（iOS 引導路徑）、AC-06（localStorage 永久關閉跨頁實測）、AC-07（SW activated 狀態）、AC-08（飛航模式離線實測）、AC-09（Lighthouse PWA ≥ 90）、AC-10（18 張截圖）
- **我嘗試過**：
  1. 確認 Generator 環境是 Windows PowerShell + Python + Edit/Read 工具，**沒有 GUI 瀏覽器、沒有 Android/iOS 模擬器、沒有 Chrome DevTools、沒有 Lighthouse CLI**——這些都是 LLM 環境的客觀限制
  2. 程式碼層面 Generator 已盡力——4 manifest.json + 4 sw.js + 8 icon PNG + 4 index.html 注入完成（Step 1~5 ✅）；剩下的全是「在真實瀏覽器 / 真實裝置觀察行為」這類無法靠 Generator 完成的工作
  3. 不嘗試造假截圖——不可能誠實地在沒跑過的情況下截到 Chrome DevTools 畫面 / 主畫面 icon / 飛航模式畫面
- **目前狀態**：完全卡住——需要 **人類在實機 / 瀏覽器 / Lighthouse 上跑出 18 張截圖**
- **建議解法**：
  - **選項 A（推薦）**：Anton 依 `output/testing_protocol.md` 流程，在 Android 手機 + iPhone（或 BrowserStack） + 桌面 Chrome 跑測試、截圖、放進 `output/install_screenshots/`，再呼叫 Evaluator 驗收
  - **選項 B**：Evaluator 自己跑這 18 張（Evaluator 環境若有 headless Chrome + Lighthouse CLI 也可），但這違反「生成評估分離」的原則
  - **選項 C**：將 AC-04~AC-10 改為「程式碼層面驗證」（讀 index.html 的 script、檢查 service worker 的 fetch handler 邏輯），跳過實機測試——Contract 上限會降至 0.5（但 Contract 已 lock，這需要使用者裁決）

---

## Blocker-02（潛在）：缺少 Anton 視覺驗收 icon

- **發現於 Step**：Step 2（icon 產出）
- **問題本質**：spec-ambiguity（plan 寫「從各行程既有 img/ 內挑一張代表圖 → 用工具裁切」，但 Generator 環境無圖片裁切/縮放 GUI 也無法選「代表性圖片」憑直覺判斷）
- **我嘗試過**：
  1. **採用 plan 中的 fallback 路徑**——「若行程沒有合適視覺，使用該行程 `theme_color` + 簡單文字 logo 作為 fallback」
  2. 4 行程的 theme-color 都是 `#121212`（純黑），icon 全黑不可讀，因此**每行程選擇一個有辨識度的品牌色**（HK 青 #0891b2 / MO 紅 #be3340 / Singapore 綠 #0f766e / AKAME 橘 #d97706），白色 CJK 文字置中、80% safe area，圓形視覺輪廓
  3. 結果視覺上能辨識「哪一趟旅程」（AC-01 驗收條件「視覺上能辨識是「哪一趟旅程」」可滿足）
  4. 但這**不是用既有照片裁切**——是 fallback 文字 icon
- **目前狀態**：部分繞過——產出可用，但若 Anton 想要「真照片裁切版」需要手動替換
- **建議解法**：Anton review icon 視覺後決定是否替換（替換時保留檔名 `icon-192.png` / `icon-512.png` 即可，不影響其他層）

---

## 影響 AC 一覽

| AC | 受影響程度 | 原因 |
|---|---|---|
| AC-01 | 🟡 部分 | manifest 結構完成；icon 視覺是 fallback 文字版非「既有照片裁切」 |
| AC-02 | ✅ 完成 | head 注入已完成 |
| AC-03 | 🟡 部分 | DOM + CSS + viewport 閘已就位；視覺比對 80% 需人工截圖比對 |
| AC-04 | ⏸ 等實機 | beforeinstallprompt JS 已就位，需 Android 實機驗證 |
| AC-05 | ⏸ 等實機 | iOS modal 已就位，需 iPhone 驗證 |
| AC-06 | ⏸ 等實機 | localStorage 邏輯已就位，需跨頁實測 |
| AC-07 | ⏸ 等瀏覽器 | SW 註冊邏輯已就位，需 DevTools 確認 activated |
| AC-08 | ⏸ 等實機 | precache 邏輯已就位，需飛航模式實測 |
| AC-09 | ⏸ 等 Lighthouse | 需桌面 Chrome 跑 Lighthouse PWA audit |
| AC-10 | ❌ 未完成 | 需要 18 張截圖；Generator 環境無法產生 |
| AC-11 | ✅ 完成 | 範圍紀律已守住（git diff 驗證見 self_review） |
| AC-12 | ✅ 完成 | SPEC_v2.4_note.md 已產出 |

---

## 給 Evaluator 的明確提示

**請優先讀 `output/testing_protocol.md`**——那是給人類執行的操作手冊。

若 Anton 已依協議跑完 18 張截圖、放進 `output/install_screenshots/`，再呼叫 Evaluator，AC-04~AC-10 才能正式評分。

**程式碼層面**（Step 1~5）的產物 Evaluator 仍可直接驗：
- 讀 4 個 manifest.json → 對照 og meta（AC-01 結構）
- 讀 4 個 sw.js → 檢查 precache list + fetch handler 邏輯（AC-07 程式碼層）
- 讀 4 個 index.html → 確認注入的 head links + body PWA block + script（AC-02、AC-03 結構、AC-04~AC-06 程式碼層）
- 跑 `git diff --name-only HEAD~1 HEAD` → 比對 contract ③.1 清單（AC-11）

---

## Blocker-03：testing_protocol.md 前置動作對 PDM 不友善（試點期發現）

- **發現於 Step**：Anton 依 testing_protocol.md 嘗試測試時
- **發現時間**：2026-05-26
- **問題本質**：documentation-quality（Generator 寫的 protocol 違反 v0.6 PDM 友善寫作守則）
- **症狀**：
  Anton 第一次嘗試測試時直接雙擊 `index.html`，瀏覽器拋出大量 CORS / Service Worker 註冊失敗錯誤：
  ```
  Access to manifest at 'file:///.../manifest.json' from origin 'null' has been blocked by CORS policy
  [PWA] SW registration failed: TypeError: ... URL protocol of the current origin ('null') is not supported
  ```
  PWA 必須跑在 `http://` 或 `https://` 協議，`file://` 雙擊一定失敗——這是 Web 標準。
- **protocol 真正寫了什麼**：
  第 20 行：「確認本 sprint 的程式碼變動已 push 到 GitHub Pages（**或** local serve `python -m http.server`）」
  → 寫法太「順帶」、用 jargon（`local serve`、`python -m http.server`）、沒解釋為什麼必須這樣做、PDM 不知道「雙擊 index.html 會壞」
- **違反 Harness v0.6 哪條原則**：
  - `templates/06_pdm_summary_guide.md` PDM 友善寫作守則第 1 條「我媽看得懂嗎」自我檢查
  - 「白話優先於精確」——「python -m http.server」是技術指令、不是白話
  - 反例庫應補一條：「假設 PDM 知道為什麼不能 file://」
- **回灌建議（v0.7 IMP 候選）**：
  1. `templates/02_generator.md` Step 4 self_review 若產出「給人類操作的 protocol」類文件，**必須含「為什麼這樣做」的白話版**（不只列指令）
  2. PDM 友善反例庫補一條：「列技術指令但不講為什麼必須這樣做」
  3. Generator 在寫 testing_protocol.md 這類 PDM 操作手冊時，前置段必須含「**雙擊 index.html 會壞**」這種反向警告，而不只是「應該怎樣做」
- **目前狀態**：Anton 在 Harness 中央對話被 Claude 引導後解決——`python -m http.server 8000` 已起、`http://localhost:8000/` 可用
- **本 sprint 評分影響**：
  Evaluator 評 AC-10「18 張截圖」或 self_review 文件品質時應將此 protocol 缺陷納入考量——Generator 對 PDM 友善層的執行不夠到位

---

## Blocker-04：Chrome 113+ 已移除 Lighthouse 的 Progressive Web App category（補件期發現）

- **發現於**：Anton 跑補件期 Lighthouse 截圖時（2026-05-26 17:48）
- **問題本質**：tool-version-drift（contract 寫的工具行為已被工具改版淘汰）
- **影響的 AC**：AC-09（Lighthouse PWA ≥ 90）+ AC-10（18 張中的 4 張 lighthouse_*.png）
- **事實**：2023 年 4 月 Chrome 113 / Lighthouse 11.0 棄用 PWA category；目前桌面 Chrome 最新版 DevTools Lighthouse 只剩 Performance / Accessibility / Best practices / SEO 4 項——**找不到 PWA 選項**
- **替代驗收**：Anton + Harness 中央 Claude 改用 **DevTools > Application > Manifest panel + Service Workers panel** 作為等價證據——完整覆蓋 Lighthouse PWA 原 8 項 boolean check
- **詳細說明書**：見 `output/lighthouse_unavailable_note.md`（內含 DevTools 等價對映表、Evaluator 評分修正指引、Harness v0.7 IMP 回灌建議）
- **新截圖規範**（取代原 `lighthouse_*.png` 4 張）：
  - `lighthouse_{trip}_manifest.png` × 4（Application > Manifest panel 截圖）
  - `lighthouse_{trip}_sw.png` × 4（Application > Service Workers panel 截圖）
  - 合計 8 張替代原 4 張
- **目前狀態**：HK 兩張已完成（2026-05-26 17:55、17:57）；MO / Singapore / AKAME 各 2 張待補
- **對 Harness 的回灌建議**：
  1. `templates/04_sprint_contract.md` 寫 AC 時必須寫「驗收意圖」、不只寫「工具操作步驟」（例：寫「PWA installable + offline ready」、不寫「Lighthouse PWA ≥ 90」）
  2. 校準範例補 C-F「工具版本漂移」案例
  3. 詳見 `output/lighthouse_unavailable_note.md` 末段 IMP 候選

---

> Blockers 版本：v1.2｜Generator：Claude Opus 4.7｜v1.0 起草 2026-05-26、v1.1 試點發現追加 2026-05-26、v1.2 Lighthouse 缺席事件追加 2026-05-26
