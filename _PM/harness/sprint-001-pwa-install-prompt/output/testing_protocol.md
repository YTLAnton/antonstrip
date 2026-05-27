# Testing Protocol — sprint-001-pwa-install-prompt

> 給人類執行的操作手冊。Generator 環境（LLM）無法跑實機 / 瀏覽器，本檔列 18 張截圖怎麼截、各 AC 怎麼驗。
> 依此跑完並把截圖放進 `output/install_screenshots/` 後再呼叫 Evaluator。

---

## PDM Summary

**這份文件做了什麼**：列出 sprint-001 程式碼已寫完，但需要在真實 Android 手機、iPhone、桌面 Chrome 上跑出 18 張截圖才能驗收 AC-04~AC-10 的具體操作步驟。

**怎麼用**：依下面 18 個任務逐一執行——每個任務寫了「在哪台裝置 / 開什麼網址 / 點哪個按鈕 / 截哪一刻 / 存哪個檔名」。跑完 18 張 → 放進 `output/install_screenshots/` → 呼叫 Evaluator。

**預估時間**：~1.5 小時（plan.md Step 6 預估）。Android 用實機或 DevTools Device Mode；iPhone 沒實機可用 BrowserStack 或 iOS Simulator（self_review 標明）。

---

## 前置動作

1. 確認本 sprint 的程式碼變動已 push 到 GitHub Pages（或 local serve `python -m http.server`）。
2. **每測一個 AC 前清除 localStorage / SW** 以重置狀態：
   - Chrome DevTools → Application → Storage → 點 `Clear site data`
   - 或實機：設定 → Safari/Chrome → 清除瀏覽資料
3. 用同一個行程做完整 5 場景測試（建議用 **2026_04_HK**——資料夾有 19 張既有圖片，飛航測試最有說服力）。

---

## 18 張截圖任務清單

### Android（5 張，AC-04 + AC-07 + AC-08 一部分）

| 檔名 | 任務 | 截圖時機 |
|---|---|---|
| `android_2026_04_HK_overlay.png` | 開行程頁，等 1.5 秒 | 浮層升起後立即截 |
| `android_2026_04_HK_prompt.png` | 點「安裝」按鈕 | Chrome 原生 install prompt 出現後截 |
| `android_2026_04_HK_homescreen.png` | 確認安裝、回桌面 | 桌面 icon 出現後截整個桌面（icon 要可見） |
| `android_2026_04_HK_standalone.png` | 從桌面 icon 點開 PWA | App 開啟後截首屏 |
| `android_2026_04_HK_offline.png` | 開飛航模式、從桌面再開 PWA | 完整載入後截（特別注意圖片有顯示） |

### iOS（5 張，AC-05 + AC-08 一部分）

| 檔名 | 任務 | 截圖時機 |
|---|---|---|
| `ios_2026_04_HK_overlay.png` | iPhone Safari 開行程頁，等 1.5 秒 | 浮層升起 |
| `ios_2026_04_HK_guidance.png` | 點「安裝」 | iOS 引導 modal 出現 |
| `ios_2026_04_HK_homescreen.png` | 依教學完成「加入主畫面」 | 主畫面 icon 出現後截 |
| `ios_2026_04_HK_standalone.png` | 從主畫面 icon 開 PWA | App 首屏（注意上方無 Safari URL bar） |
| `ios_2026_04_HK_offline.png` | 飛航模式、從主畫面開 | 完整載入後截（圖片要看到） |

### Lighthouse（4 張，AC-09）

> 桌面 Chrome → 開 DevTools → Lighthouse tab → 勾 `Progressive Web App` → 跑。Mobile mode。

| 檔名 | 對象 |
|---|---|
| `lighthouse_2026_04_HK.png` | HK Lighthouse 報告（PWA 分數 + Installable + offline ready 要綠勾） |
| `lighthouse_2026_04_MO.png` | MO 同上 |
| `lighthouse_2026_05_Singapore.png` | Singapore 同上 |
| `lighthouse_2026_07_AKAME.png` | AKAME 同上 |

### 桌面隱藏驗證（4 張，AC-03 b、AC-10 v2.0 新增）

> 桌面 Chrome 正常視窗，viewport ≥ 1024px（用 DevTools 看 viewport size 數字截在角落）。
> 進站等 3 秒以上，**驗證浮層不出現**。

| 檔名 | 對象 |
|---|---|
| `desktop_2026_04_HK_no_overlay.png` | HK 桌面首頁無浮層 |
| `desktop_2026_04_MO_no_overlay.png` | MO 同上 |
| `desktop_2026_05_Singapore_no_overlay.png` | Singapore 同上 |
| `desktop_2026_07_AKAME_no_overlay.png` | AKAME 同上 |

---

## AC-06 附加實測（不額外截圖、但要在 self_review 報告結果）

1. 在手機（任一平台）開 HK 行程頁 → 等浮層 → 點 **X**
2. 重整該頁 → 浮層不再出現（✅）
3. 切到 MO 行程頁（同 origin）→ 浮層不再出現（✅，因為 localStorage 跨 same-origin 共用）
4. 清 localStorage → 重新整理 → 浮層再次出現（驗證 localStorage 寫入 key 是 `pwa-install-dismissed`）

回報到 self_review.md「AC-06 實測」段。

---

## AC-07 補充：DevTools Service Worker 狀態截圖

跑 Lighthouse 時順手截一張 **Chrome DevTools → Application → Service Workers** 的畫面，顯示 4 個行程的 SW 都是 `activated` 狀態（也可分 4 張，看你方便）。這張塞進 `lighthouse_*.png` 同一批。

---

## AC-08 詳細：飛航模式測試流程

1. 用正常網路訪問 HK 行程頁，捲到底（讓所有圖片進視覺懶載入 → 觸發 SW cache fetch）
2. 確認 DevTools → Application → Cache Storage → `pwa-2026-04-hk-v1.0.0` 內有 24 個 entries（含 index.html + manifest + 21 jpg + 2 icon）
3. 飛航模式
4. 從桌面 icon 重新打開 PWA（不能用 Chrome URL bar，要從主畫面 icon）
5. 頁面要完整顯示（含圖片）→ 截 `android_2026_04_HK_offline.png` / `ios_2026_04_HK_offline.png`
6. 開 DevTools Network panel（連飛航時）→ 任一資源都顯示 `from ServiceWorker` → 截 `android_2026_04_HK_sw_network.png`（可選加碼）

---

## 完成檢查

跑完 18 張後：

```bash
ls _PM/harness/sprint-001-pwa-install-prompt/output/install_screenshots/
```

應該看到 18 個 .png 檔，命名嚴格符合上表。若有檔名不一致，會影響 Evaluator 比對 AC-10。

---

## 給 Evaluator 的提示

- **18 張截圖在不在**：先做這個檢查（AC-10 結構性）
- **桌面 4 張 no_overlay 是不是真的沒浮層**：肉眼看
- **Lighthouse 報告分數 ≥ 90**：看 4 張報告的 PWA 分數欄
- **android/ios offline 那 2 張是不是飛航模式下還有完整圖片**：飛機 icon 在狀態列、圖片不破

---

> 本檔由 Generator 產出，給 Anton 與 Evaluator 共用；Generator 自身無法執行 Step 6。
> 版本：v1.0｜2026-05-26
