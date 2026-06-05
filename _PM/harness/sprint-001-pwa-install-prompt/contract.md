---
sprint_id: sprint-001-pwa-install-prompt
project: antonstrip
adapter: content-site
mode: production
version: v2.0
from_role: planner
to_role: generator
produced_at: 2026-05-20 (v1.0 起草) → 2026-05-20 (v2.0 修訂)
references:
  - "{SPRINT_DIR}/intake.md"
  - "{SPRINT_DIR}/plan.md"
  - "{SPRINT_DIR}/references/image.png"
  - "{SPRINT_DIR}/references/ex.html"
  - "{HARNESS_ROOT}/adapters/content_site.md"
  - "{HARNESS_ROOT}/templates/04_sprint_contract.md"
  - "{HARNESS_ROOT}/01_CORE_CONCEPTS.html"
  - "{PROJECT_ROOT}/_PM/SPEC.md"
contract_locked_at: (待 Anton Harness 中央同步完成後填)
status: complete
---

## Change Log（v1.0 → v2.0）

> 本次修訂源自 Anton 透過 Harness 中央對話 review v1.0 後的 4 點裁決。

| # | 變動 | 影響範圍 |
|---|---|---|
| 1 | **同意推翻 SPEC v2.3** — 新增 AC-12 強制 Step 7 產出 `output/SPEC_v2.4_note.md` 並援引 v2.3 line 816 預埋條款 | AC-12 新增、權重重分配、已知妥協項 #5 措辭 |
| 2 | **sync-meta.py 不擴張** — 維持 v1.0 原案 | 無改動，確認 |
| 3 | **取消 AKAME 特例硬編** — 事實修正：4 個行程都沒 trip-data frontmatter，但都有 og meta 可用；Step 1 / AC-01 改為「一致從 og meta 取資料」 | AC-01 措辭、已知妥協項 #1 刪除 |
| 4 | **桌面浮層加 viewport 判斷** — AC-03 新增「viewport ≥ 1024px 浮層不顯示」驗證；AC-10 截圖數從 14 張提升到 18 張（加 4 張桌面隱藏驗證） | AC-03、AC-10、已知妥協項 #6 刪除 |
| 5 | **權重重分配** — 11 條 AC → **12 條**（加 AC-12 SPEC_v2.4_note 產出）；總工時 8.3h → 8.6h | ⑤ 評分權重表 |

---

## PDM Summary

> 給非技術 PDM 看的白話總結——≤200 字、不含 jargon、5 分鐘讀完掌握合約。

**這份文件做了什麼**：為 sprint-001（為手機加 PWA 安裝提示 + 離線可用）列出 **12 條**可逐條打勾的驗收條件 + 對應權重。v2.0 整合 Anton review 後的 4 點裁決。

**結果是什麼**：共 12 條 AC，加總權重 100%。最重要的兩條：「飛航模式下完整離線可用（16%）」+「Android 與 iOS 兩平台安裝路徑都可走（各 11%）」。達標門檻 ≥ 0.80。

**最重要的事**：v2.0 新增 AC-12（SPEC v2.4 草稿要援引 v2.3 line 816 自己預埋的「未來可補 sw.js」延伸條款——本 sprint 不是憑空推翻 v2.3）。AC-03 加桌面隱藏驗證（手機 viewport < 768px 才顯示浮層、桌面 viewport ≥ 1024px 不顯示）。**4 個行程不再有 AKAME 特例**，一致從 og meta 取資料。範圍紀律 AC-11 仍是剎車——4 個 index.html 中發現的 `apple-mobile-web-app-title` 錯誤值**本 sprint 不修**。

---

## Sprint Metadata（繼承自 intake.md）

```yaml
sprint_id: sprint-001-pwa-install-prompt
project: antonstrip
adapter: content-site
mode: production
contract_locked_at: (待 Anton Harness 中央同步完成後填)
```

---

## ⓪ 本輪 Sprint 模式（`mode` 必填）

```yaml
mode: production
mode_reason: intake metadata 明標 production。本 sprint 真的會修改 4 個 index.html、新增 12 個檔（4 manifest.json + 4 sw.js + 8 icon PNG）+ 1 個 SPEC v2.4 草稿，並提交到 git push 上 GitHub Pages。AC 採實測通過型驗收（執行操作、附截圖、跑 Lighthouse），所有 AC 上限 1.0。
```

---

## ① 本輪工作類型（`work_type` 必填）

```yaml
work_type: new-feature
reason: PWA 安裝提示 + 跨平台安裝路徑 + Service Worker 離線快取——這三件能力 antonstrip 之前都沒有。SPEC.md v2.3 line 816 自己預埋了「若未來有強烈需求，可再補 sw.js」延伸條款；本 sprint 啟用該後路加回完整 PWA，屬全新功能加入而非修現有 bug 或重構。
```

---

## ② 本 Sprint 範圍

本 Sprint 範圍：為 antonstrip 4 個行程靜態頁（HK / MO / Singapore / AKAME）加入完整 PWA 能力，包含：(1) 每行程獨立 manifest.json（每個是獨立 App、各自 icon、**一致從 og meta 取資料、無特例**）；(2) 每行程 Service Worker 預快取整份行程（首次造訪後完全離線可用，含圖片）；(3) 共用浮層提示 UI 含「安裝」與「X 永久關閉」（依 `references/image.png` 規格，**僅在 viewport < 768px 顯示**）；(4) Android Chrome 走 `beforeinstallprompt` 原生 prompt 路徑、iOS Safari 走「分享 → 加入主畫面」引導教學 modal 路徑；(5) 跨平台手動測試 + Lighthouse PWA audit + 18 張截圖佐證；(6) 產出 `output/SPEC_v2.4_note.md` 草稿援引 v2.3 line 816 延伸條款，sprint-close 整併到 SPEC.md 主檔。

---

## ③ 範圍外（Non-goals）

### 從 intake.md 繼承

- 不做 iOS 原生 App（純 PWA、走 Web Standard）
- 不做帳號系統或同步機制（純前端、不存使用者資料）
- 不改任何編輯工具（sync-meta.py / frontmatter 約定 / markdown 編輯流程）—— 留給 sprint-002
- 不改 OG 卡片或 meta 標籤（baseline 已驗證健康）
- 不順便美化既有頁面樣式（即使工程上很容易）

### Planner 補充

- 不調整 4 個行程的視覺呈現（color scheme、排版、layout 100% 不變）
- 不重構 index.html 內既有 inline CSS / inline JS（不論看起來多冗長）
- 不改任何 `itinerary.md` 或 frontmatter 內容
- 不動 `_PM/SPEC.md`——v2.3 → v2.4 升版的紀錄寫在 `output/SPEC_v2.4_note.md` 草稿，由 sprint-close 整併
- 不順便升級任何外部資源版本（Google Fonts、OpenWeatherMap 圖示等）
- 不新增任何 build step / Node.js 依賴（保持 v2.3 「零建置」原則）
- **不修「Sprint 期間發現但範圍外的議題」段列的 bug**——具體：MO / Singapore / AKAME 的 `apple-mobile-web-app-title` 都是錯誤值 `"Horlick送別行"`（從 HK 複製忘改），本 sprint **不修**，留 sprint-close 決定處置（見 plan.md 末段）

### ③.1 範圍紀律的計量單位

按 templates/04_sprint_contract.md ③.1 定義，「1 個檔 = 1 個 unique file path」。本 sprint 預期 git diff `--name-only` 輸出：

```
新增（16 個產出檔）：
  2026_04_HK/manifest.json
  2026_04_HK/sw.js
  2026_04_HK/img/icon-192.png
  2026_04_HK/img/icon-512.png
  2026_04_MO/manifest.json
  2026_04_MO/sw.js
  2026_04_MO/img/icon-192.png
  2026_04_MO/img/icon-512.png
  2026_05_Singapore/manifest.json
  2026_05_Singapore/sw.js
  2026_05_Singapore/img/icon-192.png
  2026_05_Singapore/img/icon-512.png
  2026_07_AKAME/manifest.json
  2026_07_AKAME/sw.js
  2026_07_AKAME/img/icon-192.png
  2026_07_AKAME/img/icon-512.png

修改（4 個——只動 <head> 內 manifest link + <body> 浮層 div + inline <script>）：
  2026_04_HK/index.html
  2026_04_MO/index.html
  2026_05_Singapore/index.html
  2026_07_AKAME/index.html

新增 sprint 工作檔（不計入產出但允許）：
  _PM/harness/sprint-001-pwa-install-prompt/output/install_screenshots/*
  _PM/harness/sprint-001-pwa-install-prompt/output/SPEC_v2.4_note.md  ← v2.0 新增（AC-12）
  _PM/harness/sprint-001-pwa-install-prompt/output/silent_failure_probe.md（如有）
  _PM/harness/sprint-001-pwa-install-prompt/self_review.md
  _PM/harness/sprint-001-pwa-install-prompt/blockers.md（如有）
```

**任何超出上述清單的檔案變動視為違反範圍紀律，AC-11 直接扣分。特別注意：3 個 index.html 內的 `apple-mobile-web-app-title` 錯誤值不可順手修。**

---

## ④ 驗收條目（12 條，可布林判斷）

> **mode = production**——所有 AC 採實測通過型驗收，上限 1.0。

### content-site adapter 必填條目的本 sprint 對應

> 依 `adapters/content_site.md` § 1.1~1.4 規範，content-site sprint 通常要含「內容範圍區分」「事實來源條目」「動線可行性」「渲染管線」。**本 sprint 不動內容**（不寫 itinerary、不改地址 / 時間 / 票價、不改 OG meta），因此 § 1.1~1.3 標明「不適用」，§ 1.4 渲染管線收進 AC-11 範圍紀律。adapter § 2.2「措辭警報」仍適用於 self_review.md 與 output/ 內任何 .md 檔。

```markdown
| 內容類別 | 本 sprint 是否觸及 |
|---|---|
| 已過去的旅程（2026-04-13 之前的 HK/MO/Singapore 過去段）| ❌ 不查核（凍結，本 sprint 不動內容）|
| 即將發生（AKAME 7 月、Singapore 未來段）| ❌ 不查核（本 sprint 不動內容）|
| 遠期 | ❌ 不查核 |
```

### 4.1 AC 條目

```markdown
- [ ] AC-01 ｜ 4 個行程資料夾各有獨立 `manifest.json`，含必要欄位（`name`、`short_name`、`description`、`start_url: "./"`、`scope: "./"`、`display: "standalone"`、`theme_color`、`background_color`、`icons` 陣列 [192x192, 512x512] × purpose [any, maskable]）。**4 份的 `name` / `description` / `theme_color` 都能在對應 index.html 的 og meta（og:title / og:description）或 theme-color meta 找到出處——無硬編、無特例**（v2.0 修訂）。JSON 格式合法，能通過 W3C manifest 驗證工具。
  - 📣 **PDM 版**：4 趟行程各自有「App 身分檔」，內容一致從現有 og meta 抓——裝起來在主畫面是 4 個獨立 App

- [ ] AC-02 ｜ 4 個 `index.html` 的 `<head>` 區段都注入：`<link rel="manifest" href="./manifest.json">` + `<link rel="apple-touch-icon" href="./img/icon-512.png">`。既有的 `apple-mobile-web-app-capable` 與 `mobile-web-app-capable` meta 標籤保留不動。**既有的（錯誤值的）`apple-mobile-web-app-title` 也保留不動**（本 sprint 不修，見 plan.md 末段）。
  - 📣 **PDM 版**：4 個行程頁的 `<head>` 都接上 manifest 與 iOS 圖示，瀏覽器才知道「這是個可安裝 App」

- [ ] AC-03 ｜ 4 個 `index.html` 都實作底部浮層提示 UI，視覺對照 `references/image.png`：底部固定位置、左圖示、中文字「加入主畫面，方便旅途中快速查看！」（或等義繁中）、右橘色「安裝」按鈕、X 關閉按鈕。**viewport 判斷（v2.0 新增）**：(a) `window.innerWidth < 768px` 時可顯示浮層；(b) **桌面 Chrome viewport ≥ 1024px 時浮層不顯示**（DOM 中 `display: none` 或不存在）。桌面 mobile mode（< 768px）截圖比對相似度 ≥ 80%。
  - 📣 **PDM 版**：手機尺寸（< 768px）才會跳出像截圖那樣的安裝提示；桌面（≥ 1024px）電腦螢幕看不到（不打擾桌面使用者）

- [ ] AC-04 ｜ Android Chrome 真機（或 DevTools Device Mode）：載入任一行程頁 → 1.5 秒後浮層出現 → 點「安裝」觸發 `beforeinstallprompt` 原生 prompt → 確認後 App 出現在桌面。附截圖（`output/install_screenshots/android_*.png`）。
  - 📣 **PDM 版**：Android 手機開行程頁可以一鍵裝到桌面

- [ ] AC-05 ｜ iOS Safari 真機（或 iOS Simulator）：載入任一行程頁 → 1.5 秒後浮層出現 → 點「安裝」跳出 modal 教學「請按下方分享圖示 → 加入主畫面」（含示意圖或 emoji）。附截圖（`output/install_screenshots/ios_*.png`）。
  - 📣 **PDM 版**：iPhone 開行程頁，點「安裝」會教用戶「怎麼用 Safari 的內建功能加到主畫面」

- [ ] AC-06 ｜ 點 X 按鈕後 `localStorage.getItem('pwa-install-dismissed') === '1'`；重新整理該頁 / 切到其他行程頁 / 重新開瀏覽器後，浮層**不再出現**。已安裝偵測（`display-mode: standalone`）為 true 時也不顯示。
  - 📣 **PDM 版**：用戶點 X 之後這台手機所有行程頁都不會再跳這個提示

- [ ] AC-07 ｜ 4 個行程都成功註冊 Service Worker（Chrome DevTools > Application > Service Workers 顯示 `activated`）。SW install phase 預快取：該行程 `./index.html`、`./manifest.json`、`./img/` 內**全部圖檔**、`./img/icon-192.png`、`./img/icon-512.png`。Cache 名稱含版本字串 `v1.0.0`。
  - 📣 **PDM 版**：4 個行程都裝了「背景下載管家」，首次造訪時把全部圖文存到手機本地

- [ ] AC-08 ｜ **飛航模式測試**：先以正常網路造訪任一行程頁讓 SW 完成預快取 → 開飛航模式 → 從主畫面打開該 PWA → 頁面完整載入（含**所有 img/ 圖片**、CSS、JS、內容文字），無 404 / 無破圖。附飛航模式螢幕截圖 + DevTools Network panel 顯示「from ServiceWorker」截圖。
  - 📣 **PDM 版**：飛機上沒網路也能從主畫面打開行程、看到所有內容（含圖片）

- [ ] AC-09 ｜ 桌面 Chrome 對 4 個行程跑 Lighthouse PWA audit，**PWA 分數 ≥ 90**（installable + offline ready 兩項都打勾）。附 4 份 Lighthouse 報告截圖在 `output/install_screenshots/lighthouse_*.png`。
  - 📣 **PDM 版**：Google Chrome 內建的「PWA 體檢工具」對 4 個行程都打 90 分以上

- [ ] AC-10 ｜ `output/install_screenshots/` 內含**至少 18 張截圖**（v2.0：v1 的 14 張 + 桌面隱藏驗證 4 張）：Android 5 張 + iOS 5 張 + Lighthouse 4 張 + **桌面 Chrome 正常視窗（≥ 1024px viewport）4 個行程截圖確認浮層不顯示 4 張**。檔名規範：`{platform}_{行程}_{場景}.png`（桌面隱藏驗證命名為 `desktop_{行程}_no_overlay.png`）。
  - 📣 **PDM 版**：18 張實機/桌面截圖作為「真的做出來了 + 桌面真的看不到提示」的證據

- [ ] AC-11 ｜ **範圍紀律**：`git diff --name-only` 輸出**完全符合** ③.1 列出的清單（16 新增 + 4 修改 + 允許的 sprint 工作檔）。4 個 index.html 的修改範圍**僅限**：(a) `<head>` 內新增 manifest / apple-touch-icon link；(b) `<body>` 末新增浮層 div；(c) 末尾新增 inline `<script>` 註冊 SW 與處理 prompt 邏輯。**其他既有行**（OG meta、CSS、既有 JS、frontmatter、layout、**錯誤值的 apple-mobile-web-app-title**）零修改。Generator 在 self_review.md 附 `git diff --stat` 證據。
  - 📣 **PDM 版**：本輪只動 PWA 相關的地方，連發現的小 bug（apple-mobile-web-app-title 錯誤）也不順手修——嚴守範圍紀律

- [ ] AC-12 ｜（v2.0 新增）`output/SPEC_v2.4_note.md` 草稿存在，必含：(a) v2.3 → v2.4 變動摘要（新增 PWA 三組件）；(b) **明確援引 SPEC.md v2.3 line 816 原文「離線瀏覽是唯一犧牲...若未來有強烈需求，可再補 `sw.js`」作為推翻 v2.3 的合法性依據**——證明本 sprint 是啟用 v2.3 自己預埋的延伸條款，不是憑空推翻；(c) v2.4 應補的設計原則修訂段落草稿；(d) 列出本 sprint 新增的 16 個產出檔在專案結構中的位置。Sprint-close 流程會引用此草稿整併到 SPEC.md 主檔。
  - 📣 **PDM 版**：寫一份「為什麼可以推翻 SPEC v2.3」說明書草稿——援引 v2.3 自己第 816 行寫的「未來可以補 sw.js」當合法依據，sprint 結束時整併到正式 SPEC
```

---

## ⑤ 評分權重

| AC | 權重 | 理由 |
|---|---|---|
| AC-01 manifest 基礎 | 8% | 結構性必要、v2.0 簡化後（無特例）更易做 |
| AC-02 index.html 注入 | 5% | 機械性、低風險 |
| AC-03 浮層 UI + viewport 判斷 | 8% | 用戶可見、含 v2.0 桌面隱藏邏輯 |
| AC-04 Android 安裝路徑 | 11% | 核心目標之一（兩大平台之一）|
| AC-05 iOS 引導路徑 | 11% | 核心目標之一（兩大平台之一）|
| AC-06 localStorage 永久關閉 | 8% | 用戶 ⑤ 明確要求的體驗 |
| AC-07 SW 註冊與預快取 | 10% | 離線能力的基礎建設 |
| AC-08 **飛航模式完整離線** | **16%** | **本 sprint 最核心成功定義**（intake ⑤ + 澄清問題 1 (C) 選項）|
| AC-09 Lighthouse PWA ≥ 90 | 5% | 客觀第三方驗證 |
| AC-10 18 張截圖 | 5% | 證據完備性（含 v2.0 桌面隱藏 4 張）|
| AC-11 範圍紀律 | 10% | content-site adapter + intake non-goal + v2.0 不修 apple-title 錯誤 |
| **AC-12 SPEC_v2.4_note 草稿（v2.0 新增）**| **3%** | sprint-close 後續整併的種子文件，重要但工程量低 |
| **合計** | **100%** | |

### 計分規則
- ✅ 達標：1.0
- 🟡 部分：0.5
- ❌ 未達：0.0
- 最終總分 = 加權總分 + Evaluator 全局調整（±0.10）
- ≥ **0.80** = sprint 達標
- 0.60~0.79 = 條件性達標、需補件
- < 0.60 = 不達標

---

## ⑥ 已知妥協項

> **v2.0 變動**：v1 的妥協項 #1（AKAME 特例硬編）刪除——事實修正後一致從 og meta 取資料、無特例。v1 的妥協項 #6（桌面 Chrome 也會看到浮層）刪除——v2.0 加 viewport 判斷已根治。剩餘 5 條重新編號。

1. **未來新行程需手動產出 manifest + sw + icon**——本 sprint 採「sync-meta.py 不擴張」紀律（嚴守 intake ⑥ + Anton v2.0 review 確認），未來新增第 5 趟旅程時要手動加 4 個檔（manifest / sw / 2 icons）+ 修 index.html。這是 **sprint-002 候選改進項**（可在 sprint-002「編輯工作流簡化」時順帶處理 sync-meta.py 擴張）。

2. **iOS 引導教學依賴未來 Safari 不變**——iOS Safari 沒有標準 `beforeinstallprompt` API，必須用 UA 偵測 + 手動 modal。若未來 iOS 改變「加到主畫面」UX，引導文字會過時。本輪不做 telemetry 偵測（無後端、純靜態站）。

3. **SW cache 配額爆量時被瀏覽器清除**——Service Worker cache 在儲存壓力下會被瀏覽器淘汰。本 sprint 不做 quota monitoring 或 fallback，未來若用戶報告「之前裝過離線忽然壞了」，需要 sprint-XXX 補快取健康檢查。

4. **iOS 實機可能無法當場驗證**——若 Generator 沒有 iOS 實機，會用 iOS Simulator 或 BrowserStack 做近似驗證。`self_review.md` 必標明使用的測試環境。

5. **與 SPEC.md v2.3「保持單一 HTML、零外部依賴」原則衝突**——本 sprint 推翻此原則。**但 v2.3 line 816 自己預埋了「若未來有強烈需求，可再補 `sw.js`」延伸條款**——本 sprint 是啟用既定後路、不是憑空推翻。`output/SPEC_v2.4_note.md` 草稿（AC-12 強制產出）會記錄此論述，由 sprint-close 整併到 SPEC.md 主檔。Anton 已在 v2.0 review 確認接受。

---

## Planner 自審 checklist（v0.6 IMP-10 強制）

- [x] `mode` 已選（production）且附理由
- [x] 因 mode = production，所有 AC 採實測，上限 1.0
- [x] `work_type` 已選（new-feature）且附理由
- [x] AC 條目 **12 條**（在 5~20 範圍內，v2.0 加了 AC-12）
- [x] 每條 AC 可布林判斷、附 PDM 版翻譯
- [x] 寫法符合 `new-feature` 樣本（Spec AC 對應、不破壞既有 flow、範圍紀律）
- [x] 權重加總 = 100%（8+5+8+11+11+8+10+16+5+5+10+3 = 100）
- [x] 範圍外條目 ≥ intake 列的 5 條（補了 7 條，共 12 條；v2 補強「不修 apple-title 錯誤」）
- [x] 已知妥協項 5 條（v2 刪 2 條因事實修正與 viewport 判斷根治）
- [x] adapter content-site 補充條目已對照（§ 1.1~1.4 標明本 sprint 不動內容、§ 4.5 fallback 不觸發因 mode = production）
- [x] Plan / Contract 對應表存在（見 plan.md 末段）
- [x] **v2.0 Change Log 列出 4 點 Anton 裁決 + 衍生影響**

---

## 給 Generator 與 Evaluator 的明確指令

> **Generator**：你不可超出本 Contract 範圍。途中若想做「順便整理 inline CSS」、「順便補 iOS 偵測精度」、「順便擴張 sync-meta.py」、**「順便修 MO/Singapore/AKAME 的 apple-mobile-web-app-title 錯誤值」**等任何 ③ 範圍外的事，停下來寫進 `blockers.md`，不要私自擴張。Mode 是 production，所有 AC 都要實測證據（截圖 / Lighthouse 報告 / git diff 輸出），不可用心智模擬。**AC-12 是新增的硬要求**——SPEC_v2.4_note.md 必須援引 SPEC.md v2.3 line 816 原文（已驗證確認存在）。

> **Evaluator**：對照每條 AC 給 0 / 0.5 / 1 評分，附證據引用（檔案路徑 + 行號 + 截圖檔名）。額外執行 content-site adapter § 3.1 額外檢查清單中**仍適用**的項目：
> - ✅ 措辭警報（grep self_review.md / SPEC_v2.4_note.md / output/ 內任何 .md 找「我推測 / 應該是 / 大概 / 通常會 / 可能是」）
> - ✅ 連結可達（manifest.json 內所有 url 與 icons 路徑、apple-touch-icon href）
> - ❌ 即時查證（本 sprint 不動內容，不適用）
> - ❌ OG 預覽（本 sprint 不動 OG meta，不適用）
> - ✅ 內容腐爛範圍紀律（驗證「過去」內容沒被本 sprint 誤動，包含進 AC-11 範圍紀律檢查）
> - **✅（v2.0 新增）AC-11 紀律檢查時特別驗證**：3 個 index.html 內錯誤值 `apple-mobile-web-app-title="Horlick送別行"` 在 sprint 結束後**仍是錯誤值**（git blame 確認本 sprint 沒動）——這是範圍紀律的硬證據

---

> Contract 版本：**v2.0**｜Planner：Claude (Opus 4.7)｜2026-05-20 v1 起草、2026-05-20 v2 修訂｜待 Anton Harness 中央同步完成後 lock + 呼叫 /harness:generator（**必須開新對話、context reset**）
