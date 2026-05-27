---
sprint_id: sprint-001-pwa-install-prompt
project: antonstrip
adapter: content-site
work_type: new-feature
mode: production
from_role: sprint-close
to_role: human
produced_at: 2026-05-27
references:
  - "{SPRINT_DIR}/intake.md"
  - "{SPRINT_DIR}/plan.md"
  - "{SPRINT_DIR}/contract.md (v2.0)"
  - "{SPRINT_DIR}/review.md (v3.0)"
  - "{SPRINT_DIR}/self_review.md (v1.1)"
  - "{SPRINT_DIR}/blockers.md (v1.2)"
  - "{SPRINT_DIR}/output/notes_for_retrospective.md"
status: complete
---

## PDM Summary

**這輪做了什麼**：為 4 個行程（HK / MO / Singapore / AKAME）加上手機「裝到主畫面」浮層 + Service Worker 離線快取。共動 4 個既有頁 + 加 16 個新檔（manifest / sw.js / icon × 4），程式碼層全做完。

**結果是什麼**：總分 **0.665 / 1.00**，🟡 **條件性達標**（≥0.60、< 0.80）。本輪走「接受條件性達標收尾」路徑——直接 sprint-close、不再補件。Singapore Service Worker 截圖時點處於 redundant 狀態（離線能力 = 0）+ 最核心的 AC-08 飛航實測沒做（16% 權重只給 0.4），這兩個缺口交給 sprint-002 處理。

**最重要的事**：本 sprint 還沒「真的飛航能用」，主畫面安裝 + 手機端 UX 也沒實機驗收——程式碼是寫好了，但要相信「真的能離線」要等下輪補件 + 真飛航測試。範圍紀律 100% 是本輪最大亮點（明知 3 個錯誤值的 apple-mobile-web-app-title 也沒順手修）。校準範例 C-F + C-G 兩個都核准追加到中央 03_evaluator.md。

---

# Sprint Closeout — sprint-001-pwa-install-prompt

## 本輪結果

- **Work Type**：new-feature
- **Adapter**：content-site
- **Mode**：production
- **Evaluator 總分**：0.665 / 1.00（v3.0 第三輪獨立 sub-agent 重評，覆蓋 v2.0）
- **判定**：🟡 **條件性達標**
- **收尾路徑**：B —— **接受 0.665 條件性達標、直接收尾**，未補件
- **未驗收口袋**：Singapore SW redundant + AC-08 真飛航 + AC-04/05/06 三條手機 UX flow（共 38% 權重未實機驗）→ 全部交 sprint-002 處理

---

## 對 review.md 的回應與決策

### Anton 在收尾前的裁決

讀完 review.md v3.0 後 Anton 選擇「**接受 0.665 條件性達標、直接 sprint-close**」（review 路徑 B），原因：

1. 本輪程式碼層完整、結構紮實——產出物有重用價值（manifest / sw / icon 是 antonstrip 後續所有 PWA 工作的地基）
2. 補件的最高槓桿動作（修活 Singapore SW + 補 3 行程 DevTools Offline + 桌面跨頁 localStorage 測試）**和 sprint-002「編輯工作流簡化」可以同批處理**——分開做反而會打斷 context
3. 真飛航實測需要實機 + 出門才能驗（在家無線網路狀態與飛航不等價）——獨立排成 sprint-001b 或 sprint-002 內的子任務更乾淨

### 對 review 紅旗的逐條處置

| # | 紅旗 | 處置 | 對應動作 |
|---|---|---|---|
| 🔴 1 | Singapore Service Worker 截圖時點 redundant | **下輪修**（sprint-002 第一件事）| 桌面 Chrome 重新註冊 SW + 截 activated 截圖；估 30 分鐘 |
| 🔴 2 | AC-08 飛航實測只有 HK 1 張 DevTools Offline + 0 張真飛航 | **下輪+下下輪混合**（sprint-002 補 DevTools Offline；真飛航實測在出門時順帶做）| DevTools Offline 3 行程估 20 分鐘；真飛航實測延後到下次旅行前 |
| 🔴 3 | Generator + Anton + 前兩輪 Evaluator 都「沒打開圖看」（流程紅旗）| **回灌中央**——IMP-候選-I 已寫進 notes_for_retrospective、本 closeout 也帶回 retrospective HTML | 中央 templates/03_evaluator.md Step 1.6 補硬規則；中央 templates/02_generator.md self_review 強制段 |
| 🔴 4 | notes_for_retrospective IMP-H 對 Singapore 失效根因解釋錯（SyntaxError 不存在）| **本輪修正**——closeout 後直接編輯 notes_for_retrospective.md 把 IMP-H 描述改為「真實根因待查、但 syntax check 仍是好實踐」| 在 retrospective 回灌前修描述、避免讀者誤判因果鏈 |
| 🟡 5 | AC-04/05/06 共 30% 權重全靠程式碼層 + 等價佐證 | **下輪做**——sprint-002 用桌面 Chrome Device Mode 補 | 不需實機、~30 分鐘桌面操作 |
| 🟡 6 | icon 視覺是 fallback 不是「既有照片裁切」 | **接受妥協**——本輪 fallback 已過得去、不阻擋使用者體驗 | 真要替換等下次「為 antonstrip 換主視覺」獨立 sprint 處理 |
| 🟡 7 | contract AC-09 硬綁過時工具（Lighthouse PWA category）| **回灌中央**——IMP-候選-B 寫進 retrospective、v0.7 改進 backlog | 中央 templates/04_sprint_contract.md 加「驗收意圖、不寫工具操作步驟」規則 |
| 🔵 8 | manifest.json `screenshots` 欄位未補 | **接受妥協**——DevTools 黃色警告非阻擋、不影響 installable | 等下次手動產出新行程時順帶補 |
| 🔵 9 | 跨 origin network-first cache 沒設 TTL | **接受妥協**——self_review 妥協項 #3 已明標、待真實踩到再修 | 未來 sprint-XXX 加 quota monitoring |
| 🔵 10 | body_pwa_block.html Android race condition（1.5~2 秒內快點安裝會看到 iOS modal）| **下下輪做**——sprint-003 候選議題 | 在 else 分支加 isIOS 判斷、Android 顯示 disabled 或等待 state |

### Generator notes_for_retrospective IMP-H 修正動作

closeout 後 Anton 將動手把 `output/notes_for_retrospective.md` IMP-候選-H 段標題改為「**Evaluator Step 1.6 必加語法檢查（方向對；本輪 Singapore 失效真實根因待查）**」，並在內文補上：
> 本輪 Evaluator v3.0 親自跑 `node -c 2026_05_Singapore/sw.js` 確認**無 SyntaxError**（雙引號內含單引號是合法 JS）。Singapore SW 顯示 redundant 的真實根因待查（可能是補件期間多次 unregister/重整循環、`clients.claim()` 競態、或 install/activate 階段非語法的錯誤）。但「Evaluator 必跑 syntax check」這個方向仍是好實踐——只是不要再宣稱「修了 syntax 就能修 Singapore」這個錯誤的因果鏈。

---

## 對 Harness 模板的改進建議（回灌中央 retrospectives/）

本輪 sprint 在工程紀律上有亮點、但同時暴露了 5 個模板層空白。每條都會帶進中央 `retrospectives/after_pilot_03_antonstrip.html`，由 Harness v0.7 sprint backlog 決定落地時點。

### IMP-19（承接 Phase 5 編號）｜驗收報告必須詳列「不達標時的補件 SOP」

- **嚴重度**：🔴 P0
- **本輪依據**：notes_for_retrospective IMP-候選-A——本輪 Evaluator v1.0/v2.0 給了分數但沒寫「怎麼補到達標」，PDM 拿到 0.59 後反問「這分數要怎麼補？」。Anton 必須回頭跟中央 Claude 對話才找到等價驗收路徑。
- **回灌建議**：`templates/03_evaluator.md` Step 4 review.md 格式新增強制段「補件 / 重評 SOP」（含每條未滿分 AC 的「缺什麼證據 / 怎麼收集 / Evaluator 二次驗收看什麼」）；`templates/04_sprint_contract.md` 寫 AC 時附「驗收 SOP」段。本輪 v3.0 review 已經自帶這段、可作為 v0.7 模板的標竿。
- **影響面**：跨所有 work_type / 所有 adapter——任何不達標 sprint 都會踩。

### IMP-20｜contract 不該硬綁特定工具的特定 UI

- **嚴重度**：🟡 P1
- **本輪依據**：notes_for_retrospective IMP-候選-B——AC-09 寫「Lighthouse PWA ≥ 90」但 Chrome 113+ 已移除 PWA category。Generator 在 self_review 補 `lighthouse_unavailable_note.md` 是手動救火、不可持續。
- **回灌建議**：`templates/04_sprint_contract.md` 寫 AC 必須寫**驗收意圖**而非工具操作步驟；AC 必附「fallback 條款」；校準範例新增 **C-F：工具版本漂移**（本輪 Evaluator 已草擬、Anton 核准追加）。
- **影響面**：所有 production mode 含「跑 Lighthouse / 跑特定 audit tool」AC 的 sprint。

### IMP-21｜每階段 AI 報告必須含「給 PDM 的下一步指令」段（PDM 自助流程）

- **嚴重度**：🔴 P0
- **本輪依據**：notes_for_retrospective IMP-候選-F——PDM 看完 plan / self_review / review 後不知道下一步該怎麼動手。本輪 review v3.0 已自帶「補件 / 重評 SOP」段（從 v2.0 學到的），但只是 Evaluator 自己模仿、不是模板強制。
- **回灌建議**：所有 `templates/0X_*.md` 與 `skills/*/SKILL.md` 末段強制加「下一步」段；「下一步」必須白話到「PDM 對著做」等級（含開新對話按鈕位置、cwd 該在哪、指令樣本、預估時間、何時停下找人）。
- **影響面**：所有 sprint 階段、所有 work_type。

### IMP-22｜Evaluator Step 1.6 必加「截圖打開看內容」+ 程式碼類產出檔語法檢查

- **嚴重度**：🔴 P0
- **本輪依據**：notes_for_retrospective IMP-候選-H + IMP-候選-I——本輪 review v3.0 親自打開 14 張 PNG 看內容才發現 Singapore SW redundant；前兩輪 Evaluator 沒打開圖、Generator self_review 也沒打開圖。「檔名存在 ≠ 證據成立」是 silent failure 核心信任破口。
- **回灌建議**：
  1. `templates/03_evaluator.md` Step 1.6 新增硬規則「對所有截圖類證據必須用 Read tool 打開看文字內容、不可只憑檔名假設證據成立」
  2. `templates/02_generator.md` self_review 必含「我已對每張截圖實際打開、確認顯示內容符合 AC 期待」段
  3. `templates/03_evaluator.md` Step 1.6 對程式碼類檔（.js / .py / .ts / .json）必須跑 syntax check（`node -c` / `python -m py_compile` / `python -m json.tool`）
  4. 校準範例新增 **C-G：Generator 沒打開圖看 / Evaluator 補抓 silent failure**（本輪 Evaluator 已草擬、Anton 核准追加）
- **影響面**：所有含截圖類證據 / 程式碼類產出檔的 sprint。

### IMP-23｜content-site adapter 加「hybrid 情境條款」（程式碼 + 內容混合）

- **嚴重度**：🟡 P1
- **本輪依據**：本輪 sprint 是「為現有 content-site 加 UX 互動」這種 hybrid 情境——既有大量程式碼產出（4 sw.js / 4 manifest / 浮層 inline JS）、又有實機驗收要求（手機/桌面截圖、跨頁 localStorage 測試）。content-site adapter 預設假設「程式碼薄、內容厚」，沒處理這種混合情境。
- **回灌建議**：`adapters/content_site.md` § 五 antonstrip 特例補一條「**hybrid 情境**：當 content-site 加入互動 UI / Service Worker / PWA 等程式碼層產出時，採用以下混合驗收紀律——程式碼層按 runtime-service adapter § 1.4 嚴格 ×2 加權、實機驗收按 content-site § 3.1 截圖規範、實機未驗的 AC 上限同 dry-run mode 的 ‡ 上限 0.85」。
- **影響面**：content-site 後續所有「為現有頁加新功能」類 sprint（antonstrip 之後預期會多）。

### 亮點補件：Evaluator v1.0 → v2.0 → v3.0 自我修正

本輪 Evaluator 跑了三版 review，每版都修正前版錯誤：
- v1.0：誤認 Generator 數錯 precache
- v2.0：親自 grep 確認 Generator 沒數錯、但漏看 Singapore SW redundant
- v3.0：親自打開 14 張 PNG 看內容、發現 Singapore redundant，重評降分 0.21（從 0.876 → 0.665）

**價值**：Phase 4 AAABAO 只看到「Evaluator 抓 Generator 紅旗」、Phase 5 FTMO-Bridge 看到「Evaluator v1→v2 自我修正」，**本輪首次出現「Evaluator v1→v2→v3 三度自我修正、最後一版重砍 0.21 分」**。這是 Harness 核心設計（生成評估分離 + 獨立 sub-agent）通過三階驗證的硬證據——應該寫進 retrospective 「Validated Design Decisions」段，用來支撐 Phase 7 簡化發布的對外信心。

---

## 下一輪建議主題

### 主題 A：sprint-002 編輯工作流簡化（建議優先攻）

**背景**：本輪 intake ③「下一輪預想」已明標 baseline W-01a/b。配合本輪 sprint-001 結束後剩下的 6 條補件動作（Singapore SW、3 行程 DevTools Offline、桌面 localStorage 測試、Device Mode 浮層截圖），整批納入 sprint-002 範圍。

**範圍候選**（待 sprint-002 intake 確認）：
1. baseline W-01a/b：frontmatter 圖片約定 + 表格化編輯介面方向評估
2. **修活 Singapore SW + 重截**（從 sprint-001 結轉）
3. **桌面 DevTools Offline mode 跑 3 行程 + 跨頁 localStorage 測試**（從 sprint-001 結轉）
4. sync-meta.py 擴張處理 manifest / sw（讓未來第 5 個行程不用手動加 4 個檔）
5. **修 3 個 index.html 的 `apple-mobile-web-app-title` 錯誤值**（sprint-001 範圍外）

**Adapter 候選**：content-site + tooling（雙 adapter 試點，或開新 hybrid adapter）

### 主題 B：sprint-001b 微補（純補件、不擴張範圍）

**範圍**：只做 sprint-001 review v3.0 路徑 A 列的 1.5 小時補件 + 真飛航實測——讓 sprint-001 score 從 0.665 升至 ~0.85 達標。

**取捨**：純補件 sprint 工程量小、但要單獨開一輪 intake / plan / contract / generator / evaluator / sprint-close 流程，CP 值較低。**Anton 已選擇 B 不獨立做、併入 sprint-002**。

### 主題 C：sprint-003 浮層 UX bug 修正（候選議題）

- 紅旗 #10：Android 用戶 1.5~2 秒內快速點安裝會看到 iOS modal（race condition）
- 紅旗 #6：icon 替換成「既有照片裁切」（UX 品質）
- self_review 妥協項 #3：跨 origin cache 配額監測

**時機**：等真實踩到問題或 sprint-002 結束後再評估。

---

## 對 sprint+1 的種子（給 sprint-002 intake 的「⑥ 下一輪預想」用）

> sprint-002 攻 baseline W-01a/b 編輯工作流簡化，**同時把 sprint-001 結轉的 6 條補件動作併入範圍**（修活 Singapore SW、補 3 行程 DevTools Offline + 跨頁 localStorage 測試、修 3 個 index.html 的 `apple-mobile-web-app-title` 錯誤值、評估 sync-meta.py 擴張處理 manifest/sw）。Adapter 雙軌：content-site（編輯流程）+ 一條 hybrid 條款處理 PWA 補件。下下輪（sprint-003 候選）：浮層 Android race condition 修補 + icon 真照片裁切 + cache 配額監測。

---

## 下一步：分支

### 本輪 sprint-001 收尾完成後

1. ✅ closeout.md 已寫入（即本檔）
2. ✅ `_PM/harness/INDEX.md` 已更新（sprint-001 列入）
3. ✅ 中央 retrospectives/after_pilot_03_antonstrip.html 已新建並回灌本輪 sprint 段 + Generator notes
4. ✅ 中央 templates/03_evaluator.md 校準範例區追加 C-F + C-G

### 下一輪 sprint-002 啟動

1. **開新對話**（必須 context reset——本對話到此結束）
2. **cwd 在 `C:\Users\anton_liu\Downloads\ANTI\antonstrip`**
3. **手動填寫 `_PM/harness/sprint-002-{topic}/intake.md`**（複製 Harness 模板）
   - 在 intake ⑥「下一輪預想」段引用本檔「對 sprint+1 的種子」段
   - 在 intake ② 痛點段描述 baseline W-01a/b + sprint-001 結轉補件
4. **輸入 `/harness:planner`**——讓 Planner 規劃 sprint-002

### 不想立刻進下一輪

- 可暫停、等真飛航實測時機（例如下次旅行前一天）再啟動 sprint-002
- sprint-002 intake 在那時填會比現在準（屆時會更清楚補件優先級）

---

> Closeout 版本：v1.0｜sprint-close：Claude (Opus 4.7)｜2026-05-27
> **sprint-001-pwa-install-prompt 正式收尾，條件性達標 0.665。下一輪 sprint-002 請開新對話後啟動。**
