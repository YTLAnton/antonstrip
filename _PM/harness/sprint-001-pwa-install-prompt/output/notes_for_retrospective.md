---
sprint_id: sprint-001-pwa-install-prompt
project: antonstrip
purpose: 試點過程中對 Harness 自身的觀察 — sprint-close 帶回 Harness 中央 retrospectives/
written_at: 2026-05-26 ~ 2026-05-27
written_by: Anton（PDM 觀察）+ Harness 中央 Claude (Opus 4.7)
status: in-progress（補件期持續累積）
---

# Phase 6 antonstrip sprint-001 期間對 Harness 的觀察

> 本檔記錄 sprint 執行 / 補件過程中發現的 Harness 自身改進點。sprint-close 時整併到中央 `retrospectives/after_pilot_03_antonstrip.html`，回灌到 v0.7 改進 backlog。

---

## IMP 候選清單

### IMP-候選-A：驗收報告必須詳列「如何驗收」操作 SOP

- **嚴重度**：🔴 P0
- **提出者**：Anton（PDM）2026-05-27 補件期觀察
- **觀察**：
  本輪 Evaluator 產出的 `review.md` v2.0 給了分數（0.59）、紅旗（9 條）、AC 評分（每條 0.0~1.0），但**沒寫「補件後若要重評，PDM 該怎麼操作才能讓 AC 升分」**。
  Anton 看到 0.59 後第一個反應是「這分數要怎麼補？」——必須回到 contract.md 對照 12 條 AC 的原文、再找 testing_protocol.md 的步驟、發現 Lighthouse 物理不可達、跟 Harness 中央 Claude 對話才找到等價驗收路徑。**這段路 PDM 自己走不出來**。
- **問題本質**：Evaluator 報告對「分數低於門檻時的補件路徑」缺乏明示——只標「未達標」卻不指引「怎麼達標」。對 PDM 來說 review.md 等於黑箱。
- **回灌建議**（v0.7 IMP）：
  1. `templates/03_evaluator.md` Step 4 review.md 格式新增**強制段「補件 / 重評 SOP」**，含：
     - 每條未滿分 AC 的「達標還缺什麼具體證據」
     - 收集該證據的「操作步驟」（含工具、命令、檔名規範、存放路徑）
     - 「Evaluator 二次驗收時讀哪個檔、看什麼欄位、按什麼標準評」
     - 若補件遇到工具限制（如本輪 Lighthouse 缺 PWA category），Evaluator 應在報告內主動探討等價替代並寫進 SOP
  2. `templates/04_sprint_contract.md` 寫 AC 時必須附「驗收 SOP」段——每條 AC 描述「怎麼驗、用什麼工具、結果長什麼樣才算過」，**不只寫「達標 = ≥0.80」這種空泛條件**
  3. PDM Summary 段擴充——當 sprint 不達標時，PDM Summary 第一段必須白話寫「補件路徑」（≤200 字）

- **本輪的應急做法**：Harness 中央 Claude 臨時寫了 `output/lighthouse_unavailable_note.md` 補上 Lighthouse 缺席的等價驗收 SOP——這是手寫補救，不應該每次都靠對話人工救火

---

### IMP-候選-B：contract 不該硬綁特定工具的特定 UI（會被工具改版淘汰）

- **嚴重度**：🟡 P1
- **提出者**：Anton（PDM）+ Harness 中央 Claude 2026-05-26
- **觀察**：
  本輪 contract.md AC-09 寫「Lighthouse PWA ≥ 90」——這假設了 Chrome / Lighthouse 永遠提供 PWA category。但 Chrome 113+（2023 年）已移除 PWA category——contract 寫出來就過時了。
- **詳細說明**：見 `output/lighthouse_unavailable_note.md` 「對 Harness v0.7 的回灌建議」段
- **回灌建議**（v0.7 IMP）：
  1. `templates/04_sprint_contract.md` 寫 AC 時必須寫**驗收意圖**、不只寫「工具操作步驟」
     - ❌ 反例：「跑 Lighthouse PWA audit、分數 ≥ 90」
     - ✅ 正例：「PWA 達 installable + offline ready 標準（驗證方式可選：(a) Lighthouse PWA audit ≥ 90 如工具仍提供；或 (b) DevTools Application panel 等價替代）」
  2. 新增校準範例 **C-F：工具版本漂移**
  3. AC 必附「fallback 條款」：「若工具已改版 / 移除特定功能，可改用等價替代並在 self_review 說明等價性論證」

---

### IMP-候選-C：testing_protocol.md 對 PDM 不夠白話（前置動作隱含 jargon）

- **嚴重度**：🔴 P0
- **提出者**：Anton 2026-05-26 補件第一天踩 file:// CORS
- **詳細說明**：見 `blockers.md` Blocker-03
- **問題核心**：Generator 寫 testing_protocol.md 時假設 PDM 看得懂「python -m http.server」、知道為什麼不能 file:// 雙擊——這違反 v0.6 PDM 友善寫作守則
- **回灌建議**：
  1. `templates/02_generator.md` Step 4 規範：若產出「給 PDM 操作的 protocol」類文件，**前置段必須含「絕對不能這樣做」的反向警告**（不只列正向步驟）
  2. PDM 友善反例庫補一條：「列技術指令但不講為什麼必須這樣做、不講錯誤做法會怎樣壞」

---

### IMP-候選-D：production mode + LLM Generator + 含實機驗收 AC = 死局

- **嚴重度**：🔴 P0
- **提出者**：Evaluator review.md v2.0 紅旗 #1（高優先）
- **詳細說明**：見 `review.md` 紅旗清單
- **問題核心**：本輪 Generator 程式碼層全做完、AC-04~10 等實機卡 70% 權重在 0.5 上限——LLM 永遠跑不出實機截圖。Contract 沒「截圖類 AC 由 human 補件」明示 fallback。
- **回灌建議**：
  1. `templates/04_sprint_contract.md` production mode + 含 UX 驗收的 sprint **必須在 contract.md 開頭明示「人工接力段」**
  2. `templates/00_intake_brief.md` 加自我檢查：「本 sprint 是否需要實機驗收？若是 PDM 是否能跑？」
  3. 新增校準範例 C-D「production+LLM 死局」（Evaluator review.md 已草擬）

---

### IMP-候選-E：截圖檔名 / 副檔名規範要寫進模板

- **嚴重度**：🔵 P2
- **提出者**：Anton 2026-05-27（Windows 截圖工具雙副檔名 `.png.png` 陷阱）
- **觀察**：Anton 兩次踩到「檔名輸入 `xxx.png`、存檔類型 PNG 自動補 `.png`」變成 `xxx.png.png`
- **回灌建議**：
  1. `templates/02_generator.md` Generator 產出 testing_protocol.md 列截圖檔名時，**明示「檔名輸入時不要加 `.png`」**
  2. `templates/04_sprint_contract.md` 截圖類 AC 加註「Windows 截圖工具雙副檔名陷阱」提醒

---

### 亮點：Evaluator v1.0 → v2.0 自我修正——核心三角架構通過二階驗證

- **嚴重度**：🌟 設計成功硬證據（非 IMP，是要寫進 retrospective 的成功案例）
- **觀察**：
  本輪 Evaluator 跑了兩版 review.md，v2.0 修正 v1.0 兩個錯誤：
  1. v1.0 誤認「Generator 數錯 precache」→ v2.0 親自 `grep -c` 確認 Generator 全對、Evaluator v1.0 自己 grep 錯
  2. v1.0 誤判「Maskable icon 文字會被裁」→ v2.0 讀 generate_icons.py 程式碼 + 看實際圖確認文字在 80% safe area 內、不會裁
- **價值**：
  Phase 4 AAABAO 試點只看到「Evaluator 抓 Generator 沒看見的紅旗」——這次首次出現「Evaluator 自我發現 v1.0 寫錯」並產 v2.0。**這是 Harness 核心設計（生成評估分離 + Evaluator 獨立 sub-agent）通過二階驗證的硬證據**。
- **回灌建議**：
  寫進 `retrospectives/after_pilot_03_antonstrip.html` 「Validated Design Decisions」段——可以用來支撐 Phase 7 簡化發布的對外信心。

---

## 累積中——sprint-close 整理時帶回 Harness 中央

本檔在 sprint-close（`/harness:sprint-close`）流程被讀取，內容整併到 `Harness/retrospectives/after_pilot_03_antonstrip.html`（PDM 閱讀層 HTML）。

整併原則：
- 每個 IMP 候選給編號（IMP-19、IMP-20、...，承接 Phase 5 之後）
- 排優先級（P0 / P1 / P2）
- 列入 v0.7 sprint backlog
- 跨 sprint 的學習保留、本 sprint 一次性的執行細節（如「我在 17:55 截 HK manifest」）不帶回

---

> Notes 版本：v1.0｜起草 2026-05-27｜補件期持續累積中
