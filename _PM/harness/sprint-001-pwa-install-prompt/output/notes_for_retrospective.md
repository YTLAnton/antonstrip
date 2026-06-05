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

### IMP-候選-F：每階段 AI 報告必須含「給 PDM 的下一步指令」段（PDM 自助流程）

- **嚴重度**：🔴 P0
- **提出者**：Anton（PDM）2026-05-27 Evaluator 第二輪重評期間
- **觀察原文**：「我無法確定每一個步驟應該要下甚麼指令，之後我們需要更加明確的引導或是教學文件，並且可能在每一步驟地輸入報告中也補上下一步要做的事情（要 AI 判斷下一步應該是甚麼然後描述）」
- **問題本質**：
  Sprint 流程跨多階段（intake → planner → generator → evaluator → 補件 → evaluator 重評 → sprint-close → Harness 中央 retrospective），但**每個階段的 AI 產出檔末段缺少「給 PDM 的下一步指令」**——PDM 看完 plan.md / self_review.md / review.md 後不知道下一步該怎麼動手。
- **現況舉例**：
  - `self_review.md` v1.0 末段：「下一步：Evaluator 接手（必須開新對話、context reset）」——對技術人懂、對 PDM 太抽象（「context reset 是什麼」「開哪個對話」「打什麼指令」）
  - `review.md` v2.0 結尾：「請呼叫 `/harness:sprint-close` 收尾」——但**沒講該在哪個 cwd、不達標時該怎麼補件、補件後該再跑哪個指令**
  - `plan.md` v2.0 末段：「Plan 版本：v2.0 ... 待 Anton 回覆 Harness 中央同步完成後 context reset 呼叫 `/harness:generator`」——同樣假設 PDM 懂「context reset」
- **回灌建議**（v0.7 IMP）：

  **(1) 每階段強制加「給 PDM 的下一步」段**

  | 模板 | 末段強制段名 | 內容必含 |
  |---|---|---|
  | `templates/01_planner.md` plan.md 格式 | 「下一步：Generator 接手」 | 該開新對話嗎 / 該下什麼指令 / 該在哪個 cwd / 預估時間 / 哪些情況要停下找人 |
  | `templates/02_generator.md` self_review.md 格式 | 「下一步：Evaluator 接手」 | 同上、加「補件後該重跑哪個指令」 |
  | `templates/03_evaluator.md` review.md 格式 | 「下一步：分支」 | 達標 → sprint-close 指令；不達標 → 補件路徑（補哪些 AC、用什麼工具、補完該怎麼重跑） |
  | `skills/sprint-close/SKILL.md` closeout.md 格式 | 「下一步：Harness 中央整理」 | 該在哪個 cwd 對話、該下哪個指令、該檢查 retrospective 哪個段 |

  **(2) 「下一步」段強制白話**

  必須是「**PDM 對著做**」的等級：
  ```markdown
  ## 下一步：Evaluator 接手

  1. **開新對話**（不是繼續這個）
     - 按 Claude Code 介面右上角「+」開新對話
     - 為什麼開新對話：Harness 核心紀律「Evaluator 必須跟 Generator 的對話 context 完全隔離」
  2. **確認你在 antonstrip 專案下對話**（不是 Harness 中央）
     - cwd 應該是 `C:\Users\anton_liu\Downloads\ANTI\antonstrip`
  3. **輸入指令**：`/harness:evaluator sprint-001-pwa-install-prompt`
  4. **預估時間**：15~20 分鐘（Evaluator sub-agent 跑完）
  5. **遇到這些情況停下找人**：
     - Evaluator 報錯找不到 contract.md（路徑問題）
     - Evaluator 在 5 分鐘內回報「無法讀取 sprint 工作檔」
  ```

  **(3) 整套使用教學加「PDM 自助對照表」**

  在 `USAGE.html` 新增一節「我現在卡在哪、下一步該做什麼」——以階段為軸的決策樹：

  ```
  我剛 ____ 完，現在 ____：
  → 剛填完 intake → 開新對話、cwd 在專案下、輸入 /harness:planner {sprint-id}
  → 剛產出 plan.md + contract.md → review 一下、有疑問改 plan 再跑一次 planner；OK 後開新對話跑 /harness:generator {sprint-id}
  → 剛產出 self_review.md → 開新對話跑 /harness:evaluator {sprint-id}
  → 看到 review.md 達標 ≥0.80 → 開新對話跑 /harness:sprint-close {sprint-id}
  → 看到 review.md 不達標 → 看「不達標下一步」段（IMP-候選-A 規範）
  → sprint-close 完成 → 回 Harness 中央 cwd、整理 retrospective
  ```

- **跟 IMP-候選-A 的關係**：
  IMP-A 是「Evaluator 不達標時必須詳列補件 SOP」、IMP-F 是「每階段 AI 報告都必須詳列下一步指令」——**IMP-A 是 IMP-F 的 Evaluator 子集**。建議 v0.7 落地時兩個一起改、相互呼應。

- **本輪的應急做法**：Harness 中央 Claude（這個對話）人肉補上「下一步指令」——但這不可持續，必須寫進模板讓未來自動化。

---

### IMP-候選-E：截圖檔名 / 副檔名規範要寫進模板

- **嚴重度**：🔵 P2
- **提出者**：Anton 2026-05-27（Windows 截圖工具雙副檔名 `.png.png` 陷阱）
- **觀察**：Anton 兩次踩到「檔名輸入 `xxx.png`、存檔類型 PNG 自動補 `.png`」變成 `xxx.png.png`
- **回灌建議**：
  1. `templates/02_generator.md` Generator 產出 testing_protocol.md 列截圖檔名時，**明示「檔名輸入時不要加 `.png`」**
  2. `templates/04_sprint_contract.md` 截圖類 AC 加註「Windows 截圖工具雙副檔名陷阱」提醒

---

### IMP-候選-J：Harness 中央 Claude 引導 PDM 時自己也踩 IMP-F 的坑（指令過度冗長）

- **嚴重度**：🟡 P1
- **提出者**：Anton（PDM）2026-05-27 sprint-close 啟動前
- **觸發事件**：Anton 看到我寫「`/harness:sprint-close sprint-001-pwa-install-prompt`」後反問「**必須寫全名嗎？不能只寫 `/harness:sprint-close`?**」——查 SKILL.md 確認 argument 是 optional、skill 會自動偵測最近 sprint
- **問題本質**：
  Harness 中央 Claude（我自己）寫指引時為了「過度保險」總是給 argument 全名——但這違反了 IMP-候選-F「明確下一步」的精神。**冗餘 ≠ 明確**。對 PDM 來說多打的字會讓他懷疑「是不是必須」、變成假信息。
- **同類問題**：
  我整個 sprint 對話中對所有 `/harness:*` skill 都建議「打全名」：
  - `/harness:planner sprint-001-pwa-install-prompt`
  - `/harness:generator sprint-001-pwa-install-prompt`
  - `/harness:evaluator sprint-001-pwa-install-prompt`
  - `/harness:sprint-close sprint-001-pwa-install-prompt`
  
  全部 argument optional、單一 sprint 場景下都自動偵測最近的。
- **回灌建議**（v0.7 IMP）：
  1. **`USAGE.html` 5 步走指令展示時明示 argument 是 optional**：
     ```
     /harness:sprint-close              # 自動偵測最近的 sprint
     /harness:sprint-close sprint-001-xxx  # 明示指定（多 sprint 並行時用）
     ```
  2. **`templates/03_evaluator.md` review.md「下一步」段（IMP-F 落地）強制使用 skill 預設值（不打 argument）作為示範**——除非真的需要明示
  3. **`skills/*/SKILL.md` 的 `description` 段明示「無 argument 時自動偵測最近 sprint」**
  4. **記憶層處置**：我自己（Harness 中央 Claude）下次給 PDM 指令時、預設不打 argument

- **跟 IMP-F 的關係**：
  IMP-F 主張「每階段 AI 報告含明確下一步」、本 IMP-J 補一條子規則：「下一步的指令樣本應該用最簡形式（不打多餘 argument）」

---

### IMP-候選-G：台灣繁中規範必須擴張到 sub-agent 報告 + AI 產出檔

- **嚴重度**：🔴 P0
- **提出者**：Anton（PDM）2026-05-27 Evaluator 第二輪重評後
- **觸發事件**：Evaluator 第二輪 sub-agent 報告大量英文（"Sprint Review Summary"、"Critical Finding"、"Verification Highlights"、"Path to Pass"、表格 column header 全英文）—— Anton 立刻指正「**嚴格規定要給我看的文字、溝通、敘述都必須是台灣繁體中文**」
- **問題本質**：
  既有 `feedback_taiwan_traditional_chinese.md` 記憶只規範「Anton 對話」——但 sub-agent 在 `context: fork` 啟動時**沒讀到 user 記憶**，所以 Evaluator sub-agent 沒繼承這條規定。Harness 模板層完全沒寫「全程台灣繁中」硬規則。
- **回灌建議**（v0.7 IMP）：
  1. **所有 `templates/0X_*.md`** Step 1（讀檔階段）明示：「**本任務所有產出（report / 寫入檔 / 對話 summary）必須全程台灣繁體中文，不可英文混合、不可簡體**」
  2. **所有 `skills/*/SKILL.md`** 同樣明示
  3. **`01_CORE_CONCEPTS.html`** 新增「**第 6 原則：語言一致性**」
  4. **`adapters/*.md`** 各自加一條
  5. **`templates/04_sprint_contract.md`** ④ 驗收條目段加規則：「Evaluator 評分時若發現產出檔含英文段落 / 表格、扣 AC-11 範圍紀律或新增 AC-N 語言一致性 0.5~1.0」
- **記憶層處置**：`feedback_taiwan_traditional_chinese.md` v0.2 強化版已寫入（2026-05-27），含「範圍」對照表 + 各類產出是否強制（Anton 對話 / sub-agent 報告 / AI 產出檔 / commit message / 程式碼識別符等）

---

### IMP-候選-H：Evaluator Step 1.6 必加語法檢查（方向對；本輪 Singapore 失效真實根因待查）

- **嚴重度**：🔴 P0
- **提出者**：Evaluator 第二輪自身回灌建議 2026-05-27、**Evaluator v3.0 + Anton 2026-05-27 修正根因論述**
- **本筆 v1.0 → v1.1 修正紀錄**：
  - v1.0（2026-05-27 早些時段）原文宣稱：「Singapore sw.js Line 43 未轉義單引號 `'./img/St Andrew's Cathedral.jpg'` 造成 SyntaxError」——**這個因果鏈是錯的**
  - v1.1（2026-05-27 晚些時段 sprint-close 後）修正：Evaluator v3.0 親自跑 `node -c 2026_05_Singapore/sw.js` 確認**無 SyntaxError**（雙引號內含單引號是合法 JS、Harness 中央 Claude 改成雙引號後 syntax 確實通過、但 Singapore SW 仍是 redundant 灰點）
  - **真實根因待查**：可能是補件期間多次 unregister/重整循環、`clients.claim()` 競態、或 install/activate 階段的非語法錯誤——本 sprint 不修、留 sprint-002
- **這條 IMP 仍然成立的理由**：
  「Evaluator 必跑 syntax check（node -c / python -m py_compile / json.tool）」這個方向**仍是好實踐**——只是不要再宣稱「修了 syntax 就能修 Singapore」這個錯誤的因果鏈
- **觸發事件**：Singapore SW 顯示 redundant 狀態，self_review v1.1 line 111 卻書面承諾「4 個行程 sw.js 全部 activated and is running」——Generator 沒實機驗、Anton 看「灰點」但沒辨識「灰 vs 綠」、前兩輪 Evaluator 沒打開圖
- **4 道防線全漏**：
  1. ❌ Generator 寫程式時沒跑 `node -c` syntax check（雖然 syntax 不是真因、但流程應該跑）
  2. ❌ self_review v1.1 沒做運行時驗證、誤宣稱「4 個行程 sw.js 全部 activated and is running」
  3. ❌ Anton 截圖時看到「灰點」但沒辨識「灰 vs 綠」差異
  4. ❌ 前一輪 Evaluator v2.0 沒打開圖看狀態指示燈
- **第 5 道防線**（補件期新增）：
  5. ❌ **Harness 中央 Claude（我自己）跨界修 syntax 後沒重測 SW 是否真的 activated 就寫進 IMP-H** —— 太快下「syntax 修好就完事」結論
- **回灌建議**（v0.7 IMP）：
  1. **`templates/03_evaluator.md` Step 1.6** 新增硬規則：
     ```
     對所有 AI 產出的程式碼檔（.js / .py / .ts / .json 等）必須跑語法檢查：
     - JavaScript：node -c <file>
     - Python：python -m py_compile <file>
     - JSON：python -m json.tool <file> > /dev/null
     - 跑失敗 → 對應 AC 直接扣分 + 列 P0 紅旗
     ```
  2. **`templates/02_generator.md` Step 4** self_review 必含「我已對所有產出檔跑 syntax check、結果如下」段
  3. 校準範例新增 **C-G**：「Generator 沒跑 syntax check / Evaluator 補抓的 silent failure」

---

### IMP-候選-I：Evaluator 對截圖證據必須「打開圖片看文字內容」

- **嚴重度**：🔴 P0
- **提出者**：Evaluator 第二輪自身回灌建議 2026-05-27
- **觸發事件**：Anton 截了 `lighthouse_2026_05_Singapore_sw.png`，但這張圖實際顯示「**灰點**」（redundant 狀態）而非「**綠點**」（activated）——self_review v1.1 寫「12/12 截圖達標」但**沒看圖**就批准。前一輪 Evaluator v2.0 也沒打開圖、只看檔名存在。
- **問題本質**：
  「檔名 ≠ 證據品質」——AI 看到檔名 `*_sw.png` 存在就假設證據成立，沒實際看圖內容。
- **回灌建議**（v0.7 IMP）：
  1. **`templates/03_evaluator.md` Step 1.6** 引用查證段新增：
     ```
     對所有截圖類證據必須「打開圖片看文字內容」：
     - 用 Read tool 讀圖（多模態 LLM 能看圖內容）
     - 不可只看檔名 / 檔案大小作為證據
     - 截圖內若有狀態指示（綠/黃/紅燈、activated/redundant 等）必須親自辨識並寫進 review
     ```
  2. **`templates/02_generator.md` self_review** 必含「我已對每張截圖實際打開、確認顯示內容符合 AC 期待」段
  3. 校準範例新增 **C-H**：「截圖檔名存在但內容不符的 silent failure 探測」

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
