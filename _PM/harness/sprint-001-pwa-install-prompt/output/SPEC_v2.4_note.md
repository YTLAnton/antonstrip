---
spec_target: _PM/SPEC.md
from_version: v2.3
to_version: v2.4
sprint: sprint-001-pwa-install-prompt
produced_by: generator (Claude Opus 4.7)
produced_at: 2026-05-26
status: draft（sprint-close 整併到 SPEC.md 主檔）
ac: AC-12
---

# SPEC.md v2.3 → v2.4 變動草稿

> 本檔由 sprint-001-pwa-install-prompt Generator 產出，**不是定稿**——sprint-close 流程負責把這份整併到 `_PM/SPEC.md` 主檔。

---

## PDM Summary

**這份文件做了什麼**：說明為什麼 sprint-001 可以推翻 SPEC.md v2.3「移除 PWA、零外部依賴」原則，**並援引 v2.3 自己第 816 行預埋的延伸條款作為合法性依據**——本 sprint 不是憑空推翻，是啟用既定後路。

**核心論點**：v2.3 line 816 原文寫「離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。**若未來有強烈需求，可再補 `sw.js`**」——本 sprint 啟用該條款。

**新增 16 個檔**：4 manifest.json + 4 sw.js + 8 icon PNG（清單見下文）。

---

## ① 變動摘要（v2.3 → v2.4）

| 維度 | v2.3 | v2.4 |
|---|---|---|
| PWA manifest | 移除 | **加回**（每行程 1 份，獨立 scope）|
| Service Worker | 移除 | **加回**（每行程 1 份，cache-first 同 origin）|
| 離線能力 | ❌ 不支援 | ✅ 飛航模式完整可用（首訪後）|
| App icon | 文字 emoji（apple-touch-icon 預設）| PNG 192/512 雙尺寸 + maskable purpose |
| 單一 HTML 原則 | 嚴格（CSS / JS 全部 inline）| **部分鬆綁**：HTML inline 原則保留、新增 3 個 sibling 檔案（manifest / sw / 2 icon）|
| 零建置原則 | 嚴格 | **保留**（無 npm / webpack / TS 編譯）|
| 安裝路徑 | 用 apple-mobile-web-app-capable meta 走 iOS Safari 加入主畫面 | **新增雙路徑**：Android Chrome → beforeinstallprompt 原生 prompt；iOS Safari → 引導教學 modal |

---

## ② 為什麼可以推翻 v2.3 — 援引 line 816

`_PM/SPEC.md` 第 816 行（v2.3 版本）原文：

> 離線瀏覽是唯一犧牲。旅遊中通常有網路，影響極小。**若未來有強烈需求，可再補 `sw.js`**。

**論述鏈**：

1. **v2.3 自己預埋了延伸條款**——「可再補 `sw.js`」明文寫進規格，這不是反對 PWA，是「現在不做、未來可做」
2. **本 sprint 的觸發點**：使用者 intake ⑤ 明確標「最有價值 = 飛航模式下完整離線」、澄清問題 1 選項 (C) 偏好「先做就做完整」
3. **「強烈需求」已滿足**——不只是 sw.js，要 PWA 三件套（manifest + sw + icon）才能讓 iOS / Android 安裝路徑都通
4. **不是憑空推翻**——是 v2.3 自己給的後路被啟用

Anton 在 plan v1.0 → v2.0 review 階段已明確同意推翻（plan.md「主動驗證紀錄」#4 已記）。

---

## ③ v2.4 應補的設計原則修訂段落（草稿）

> 以下是建議插入 `_PM/SPEC.md` 第 7 章（PWA 設計）的修訂內容。sprint-close 整併時 Anton 可調整措辭。

### 7.0 設計原則修訂（v2.4 新增）

v2.3 將 PWA 視為「未來可選功能」（line 816 預埋）。v2.4 啟用該後路，因為使用者明確需求 = 飛航模式下完整離線：

- **保留**：HTML inline 原則（CSS / JS 不引入外部檔案）；零建置；單一 HTML 為主軸
- **鬆綁**：允許 4 個 sibling 檔案（`manifest.json` / `sw.js` / `img/icon-192.png` / `img/icon-512.png`）——這 4 個是 PWA 規格的硬要求，無法 inline 進 HTML
- **新增約定**：每行程獨立 PWA（各自 manifest、各自 scope、各自 SW）——對應 v2.2「每行程獨立 App」精神

### 7.1 PWA 三件套規範（新增）

#### 7.1.1 manifest.json

每行程資料夾下放一份 `manifest.json`，從同行程 `index.html` 的 og meta 取資料：

| manifest 欄位 | 來源 |
|---|---|
| `name` | `<meta property="og:title">` content |
| `short_name` | `name`（多數情況中文短，可直接用）|
| `description` | `<meta property="og:description">` content |
| `theme_color` | `<meta name="theme-color">` content |
| `background_color` | 與 theme_color 同色或相關色 |
| `start_url` / `scope` | `./` |
| `display` | `standalone` |
| `icons` | `./img/icon-192.png` + `./img/icon-512.png`，purpose `any` + `maskable` 各一 |

#### 7.1.2 sw.js

每行程 1 份 `sw.js`，scope `./`：

- `CACHE_VERSION` 字串常數，內容更新時 bump
- install phase 預快取：`./`、`./index.html`、`./manifest.json`、`./img/*`（含 icon）
- fetch phase：同 origin cache-first；跨 origin（字型 / 天氣 / 地圖）network-first with cache fallback
- activate phase：刪除舊版 cache

#### 7.1.3 icon

每行程 `img/` 內 `icon-192.png` + `icon-512.png`：

- 192×192 / 512×512 PNG
- maskable safe area = 中央 80%（四周 10% padding）
- 視覺上能辨識「是哪一趟旅程」（行程品牌色 + 文字 logo 或代表性照片裁切）

### 7.2 安裝路徑（取代 v2.3 § 7 既有段落）

#### 7.2.1 Android Chrome

監聽 `beforeinstallprompt` event → 浮層提示 → 用戶點「安裝」呼叫 `prompt()` → 處理 `userChoice`。

#### 7.2.2 iOS Safari

UA 偵測 → 浮層提示 → 用戶點「安裝」跳教學 modal「分享 → 加入主畫面」。

#### 7.2.3 浮層 UI（共用）

- 位置：底部固定 `position: fixed; bottom: 12px`
- 規格：左 icon + 文字「加入主畫面，方便旅途中快速查看！」+ 橘鈕「安裝」+ X 鈕
- viewport 閘：**僅 `window.innerWidth < 768px` 顯示**；桌面 ≥ 1024px 永遠不顯示
- X 永久關閉：寫 `localStorage.setItem('pwa-install-dismissed', '1')`
- 已安裝偵測：`window.matchMedia('(display-mode: standalone)').matches === true` 時不顯示

### 7.3 v2.3 line 816「離線是唯一犧牲」段落作廢

v2.3 line 814-816 段落（「離線瀏覽 ❌ ❌」與「離線是唯一犧牲」）改為：

> 離線瀏覽：v2.4 起以 Service Worker 預快取實現完整離線（含圖片）。SW 註冊邏輯放在 index.html inline `<script>` 內，符合「JS 仍然 inline」原則。

### 7.4 icon 製作建議（取代 v2.3 § 7「圖示製作建議」）

v2.3「轉 base64 inline 進 HTML」改為：

> 圖示：PNG sibling 檔案 `img/icon-192.png` + `img/icon-512.png`，不再 inline。檔案小（< 30KB 雙尺寸合計）影響可忽略，且 manifest spec 不接受 data URL 的 icon 路徑。

---

## ④ 本 sprint 新增 16 個檔在專案結構中的位置

```
antonstrip/
├── 2026_04_HK/
│   ├── manifest.json              ← 新（AC-01）
│   ├── sw.js                      ← 新（AC-07）
│   ├── img/
│   │   ├── icon-192.png           ← 新（AC-01 icons）
│   │   └── icon-512.png           ← 新（AC-01 icons）
│   └── index.html                 ← 修（AC-02、03、04、05、06）
├── 2026_04_MO/
│   ├── manifest.json              ← 新
│   ├── sw.js                      ← 新
│   ├── img/                       ← 新資料夾（MO 原本沒有 img/）
│   │   ├── icon-192.png           ← 新
│   │   └── icon-512.png           ← 新
│   └── index.html                 ← 修
├── 2026_05_Singapore/
│   ├── manifest.json              ← 新
│   ├── sw.js                      ← 新
│   ├── img/
│   │   ├── icon-192.png           ← 新
│   │   └── icon-512.png           ← 新
│   └── index.html                 ← 修
└── 2026_07_AKAME/
    ├── manifest.json              ← 新
    ├── sw.js                      ← 新
    ├── img/
    │   ├── icon-192.png           ← 新
    │   └── icon-512.png           ← 新
    └── index.html                 ← 修
```

合計：16 新檔 + 4 修檔 = 20 個檔案變動（完全對齊 contract ③.1 預期）。

---

## ⑤ Sprint 期間發現但範圍外的議題（轉錄自 plan.md）

> sprint-close 流程處理。

- MO / Singapore / AKAME 3 個 index.html 的 `<meta name="apple-mobile-web-app-title">` 都是錯誤值 `"Horlick送別行"`（從 HK 複製忘改）。本 sprint **不修**（AC-11 範圍紀律）。
- 建議處置：sprint-002（編輯工作流簡化）或獨立 sprint-001b。

---

## ⑥ 整併指引（給 sprint-close）

1. SPEC.md 第 7 章標題「7. iOS 圖示與 PWA 模擬（已移除）」改為「7. PWA 規格（v2.4 啟用）」
2. line 814-816 段落作廢——改為 § 7.3 內容
3. § 7.4 圖示製作建議從 base64 inline 改為 sibling PNG
4. 插入 § 7.0、7.1、7.2 新段落
5. 文件最後的「版本歷史」段加一條：

```markdown
## v2.4 — 2026-05-XX（sprint-001-pwa-install-prompt 整併）
- 啟用 v2.3 line 816 預埋條款 → 加入完整 PWA（manifest + sw + icon）
- 新增 § 7.0~7.4 規範
- 取代 v2.3 § 7「圖示與 PWA 模擬（已移除）」整章
```

---

> SPEC_v2.4_note 版本：v1.0（草稿）｜Generator：Claude Opus 4.7｜2026-05-26
