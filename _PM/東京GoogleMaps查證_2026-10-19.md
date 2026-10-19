# 東京行程 Google Maps 查證結果（2026-10-19）

- 查證對象：`2026_10_Tokyo/itinerary.md` Day 1～Day 6 有實體地點的卡片（行號為查證時 HEAD `79aed76` 的 `###` 標題所在行，之後若有人改檔會位移）。
- 方法：Claude in Chrome 開 Google Maps（語系日文），讀地址與展開後的每週營業時間；旅遊日對照：Day 1＝10/22 週四、Day 2＝10/23 週五、Day 3＝10/24 週六、Day 4＝10/25 週日、Day 5＝10/26 週一。
- 本檔只記錄查證，**未修改 itinerary.md**。
- 通用限制：Maps 的營業時間是「一般每週時段」，不含國定假日特例與臨時公告；各頁面未偵測到臨時休業／閉店／搬遷公告（GENDY 見存疑清單）。迪士尼園區內店家的 Maps 時間只是園區預設時間，實際以官方日曆為準。
- 類型：缺漏補上／不一致修正／一致。營業時間格式比照 itinerary 既有寫法。
- 網址欄：優先採卡片內 `mapLink`；卡片沒有或 mapLink 是搜尋清單時，改列我實際查到該店的搜尋網址。

---

## 一、需補上或修正的項目（優先看這區）

| 行號 | 卡片標題 | 店名 | 欄位 | 類型 | itinerary 現值 | Google Maps 值（旅遊當天適用者標 ★） | Maps 網址 |
|---|---|---|---|---|---|---|---|
| 80 | 行程｜新宿周邊 | Échiré Pâtisserie（エシレ・パティスリー オ ブール 新宿） | address | 缺漏補上 | （無） | 〒160-0022 東京都新宿区新宿3-14-1 伊勢丹新宿店本館 地下1階 | https://www.google.com/maps/place/%C3%89chir%C3%A9+P%C3%A2tisserie+Au+Beurre+Shinjuku+Store/data=!4m2!3m1!1s0x60188d09bcd76a0b:0x57449a4f5f19abfc |
| 80 | 行程｜新宿周邊 | 3COINS（店別不明，見存疑） | address | 缺漏補上（存疑） | （無） | 候選：3COINS ルミネエスト新宿店 〒160-0022 東京都新宿区新宿3-38-1 ルミネエスト 3F | https://www.google.com/maps/search/?api=1&query=3COINS%20%E3%83%AB%E3%83%9F%E3%83%8D%E3%82%A8%E3%82%B9%E3%83%88%E6%96%B0%E5%AE%BF%E5%BA%97 |
| 80 | 行程｜新宿周邊 | 3COINS（同上） | hours | 缺漏補上（存疑） | （無） | 週一至五 11:00–21:00／週六日 10:30–21:00（★週四 10/22＝11:00–21:00） | 同上 |
| 102 | 景點｜都民廣場 + 移動 | 東京都庁第一本庁舎 北展望室 | hours | 不一致修正 | 北展望室 09:30–17:00 | 北展望室 09:30–17:30（週一定休）；★10/22 週四營業 | https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%BA%81%E7%AC%AC%E4%B8%80%E6%9C%AC%E5%BA%81%E8%88%8E%20%E5%8C%97%E5%B1%95%E6%9C%9B%E5%AE%A4 |
| 162 | 行程｜Studio RAAR | 女装サロン studio RAAR | hours | 缺漏補上 | 全預約制（營業時間待確認） | 每日 10:00–20:00（Maps 未標預約制，仍以預約時段為準）；★週五 10:00–20:00 | https://www.google.com/maps/search/?api=1&query=%E5%A5%B3%E8%A3%85%E3%82%B5%E3%83%AD%E3%83%B3%20studio%20RAAR |
| 182 | 購物｜3 Coins 原宿旗艦店 + GENDY + The T Bar + 出雲大社 | The T Bar（ロイヤルブルーティー六本木ブティック・THE T BAR） | hours | 不一致修正 | The T Bar 11:00–20:00 | 週二至六 11:00–19:00，週一、週日定休；★週五 10/23＝11:00–19:00 | https://www.google.com/maps/search/?api=1&query=%E3%83%AD%E3%82%A4%E3%83%A4%E3%83%AB%E3%83%96%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%BC%E5%85%AD%E6%9C%AC%E6%9C%A8%E3%83%96%E3%83%86%E3%82%A3%E3%83%83%E3%82%AF%20THE%20T%20BAR |
| 200 | 行程｜Bluenote | ブルーノート東京 | hours | 不一致修正 | 平日 17:00–23:00／週末 15:30–22:00 | 週一至五 16:30–22:30／週六日 15:00–21:30；★週五 10/23＝16:30–22:30（實際以演出場次開場時間為準，Maps 未列） | https://www.google.com/maps/place/Blue+Note+%E6%9D%B1%E4%BA%AC/data=!4m2!3m1!1s0x60188b66ac4e8099:0xd95752cfa6157050 |
| 210 | 飲食｜焼鳥篠原 | 焼鳥篠原 | hours | 不一致修正 | 17:30–23:00（週日休） | 17:30–23:00，**週二定休**（週日有營業）；★週五 17:30–23:00 | https://www.google.com/maps/place/Yakitori+Shinohara/data=!4m2!3m1!1s0x60188b14680c24f9:0xc83ddbcaea0d07ec |
| 251 | 購物｜7-Eleven 外苑前站前店 | セブン‐イレブン外苑前駅前店 | hours | 缺漏補上 | （無） | 24 小時營業（週一至日） | https://www.google.com/maps/search/?api=1&query=%E3%82%BB%E3%83%96%E3%83%B3-%E3%82%A4%E3%83%AC%E3%83%96%E3%83%B3%20%E5%A4%96%E8%8B%91%E5%89%8D%E9%A7%85%E5%89%8D%E5%BA%97 |
| 263 | 飲食｜RistoPizza by Napoli sta ca | RistoPizza by Napoli sta ca 麻布台ヒルズ店 | hours | 不一致修正 | 週六 11:30–15:00（LO 14:30）, 18:00–22:30；週一公休 | ★週六 11:30–14:30, 18:00–22:00；週一公休（一致）。其他日：週二至四 11:30–14:00, 18:00–21:30；週五 11:30–14:00, 18:00–22:00；週日 11:30–14:30, 18:00–21:30 | https://www.google.com/maps/search/?api=1&query=RistoPizza%20by%20Napoli%20sta%20ca |
| 272 | 飲食｜Dashi Okume Azabudai Hills | だし尾粂 麻布台ヒルズ店 | hours | 不一致修正 | 11:00–20:00 | 每日 10:00–20:00 | https://www.google.com/maps/place/Dashi+Okume+Azabudai+Hills/data=!4m2!3m1!1s0x60188b33bf2683a5:0xd546a05fc32dd349 |
| 280 | 行程｜流れ星を探して | コニカミノルタ プラネタリアTOKYO | hours | 不一致修正 | 10:30–21:30 | 週一至五 10:30–21:15／週六日 10:00–21:45；★週六 10/24＝10:00–21:45（場次另計） | https://www.google.com/maps/place/Konica+Minolta+Planetaria+Tokyo/data=!4m2!3m1!1s0x60188b253e27bfd1:0x67b3b6fb0eafa9d1 |
| 291 | 購物｜Workman Colors 銀座店 + LOFT + 綠壽庵清水 + DOLCE TACUBO | 銀座 緑寿庵清水 | hours | 不一致修正 | 綠壽庵清水 11:00–19:30 | 週一二四五 11:00–19:30／**週六日 11:00–18:30**／週三定休；★週六 10/24＝11:00–18:30 | https://www.google.com/maps/place/%E9%8A%80%E5%BA%A7+%E7%B6%A0%E5%A3%BD%E5%BA%B5%E6%B8%85%E6%B0%B4/data=!4m2!3m1!1s0x60188bef100a66d3:0x3de6ee54dfa99c31 |
| 309 | 景點｜ntv big clock | 日テレ大時計 | hours | 缺漏補上 | （無） | 週一至五 12:00–20:00／週六日 10:00–20:00；★週六 10/24＝10:00–20:00（Maps 無時鐘演出時間） | https://www.google.com/maps/search/?api=1&query=%E6%97%A5%E3%83%86%E3%83%AC%E3%82%BF%E3%83%AF%E3%83%BC%20%E6%97%A5%E3%83%86%E3%83%AC%E5%A4%A7%E6%99%82%E8%A8%88 |
| 324 | 飲食｜JULIA | JULIA | hours | 不一致修正 | 12:00–15:00, 18:00–22:00（全預約制） | 週一、三至日 12:00–24:00，**週二定休**；★週六 10/24＝12:00–24:00（Maps 未標午晚分段與預約制） | https://www.google.com/maps/place/JULIA/data=!4m2!3m1!1s0x60188b3ff1ef2209:0xac7d643b21d1b553 |
| 354 | 景點｜排隊入園（Day 4 樂園） | 東京ディズニーランド | address | 缺漏補上 | （無） | 〒279-0031 千葉県浦安市舞浜1-1 | https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89 |
| 381 | 飲食｜中央大街咖啡館 (世界市集) | センターストリート・コーヒーハウス | address | 缺漏補上 | （無） | 〒279-0031 千葉県浦安市舞浜1-1（園區層級地址，無店鋪門牌） | https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89%20%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E3%83%BB%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC%E3%83%8F%E3%82%A6%E3%82%B9 |
| 381 | 同上 | 同上 | hours | 缺漏補上（低可信） | （無） | 每日 09:00–21:00（等同園區預設時間） | 同上 |
| 441 | 景點｜水晶宮 (探險樂園) | クリスタルパレス・レストラン | address | 缺漏補上 | （無） | 〒279-0031 千葉県浦安市舞浜1-1（園區層級） | https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89%20%E3%82%AF%E3%83%AA%E3%82%B9%E3%82%BF%E3%83%AB%E3%83%91%E3%83%AC%E3%82%B9%E3%83%BB%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3 |
| 441 | 同上 | 同上 | hours | 缺漏補上（低可信） | （無） | 每日 11:00–19:45 | 同上 |
| 505 | 景點｜提早入園搶票（Day 5 海洋） | 東京ディズニーシー | address | 缺漏補上 | （無） | 〒279-8511 千葉県浦安市舞浜1-13 | https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%82%B7%E3%83%BC |
| 511 | 飲食｜ファンタジースプリングス・レストラン（飯店早餐） | ファンタジースプリングス・レストラン | address | 缺漏補上 | （無） | 〒279-8526 千葉県浦安市舞浜1-2 東京ディズニーシー・ファンタジースプリングスホテル | https://www.google.com/maps/search/?api=1&query=%E3%83%95%E3%82%A1%E3%83%B3%E3%82%BF%E3%82%B8%E3%83%BC%E3%82%B9%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%B9%E3%83%BB%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%20%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%82%B7%E3%83%BC%E3%83%BB%E3%83%95%E3%82%A1%E3%83%B3%E3%82%BF%E3%82%B8%E3%83%BC%E3%82%B9%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%B9%E3%83%9B%E3%83%86%E3%83%AB |
| 511 | 同上 | 同上 | hours | 不一致修正 | 早餐約 06:30–10:00 | 每日 06:30–11:00／11:30–15:30／17:00–22:30（早餐時段至 11:00） | 同上 |
| 543 | 飲食｜醜小鴨小館 (夢幻泉鄉) | スナグリーダックリング | address | 缺漏補上 | （無） | 〒279-0031 千葉県浦安市舞浜 ファンタジースプリングス ラプンツェルの森 | https://www.google.com/maps/search/?api=1&query=%E3%82%B9%E3%83%8A%E3%82%B0%E3%83%AA%E3%83%BC%E3%83%80%E3%83%83%E3%82%AF%E3%83%AA%E3%83%B3%E3%82%B0%20%E6%9D%B1%E4%BA%AC%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC%E3%82%B7%E3%83%BC |
| 543 | 同上 | 同上 | hours | 缺漏補上（低可信） | （無） | 每日 09:30–20:30 | 同上 |
| 585 | 飲食｜艾倫戴爾皇家宴會廳 (夢幻泉鄉) | アレンデール・ロイヤルバンケット | address | 缺漏補上 | （無） | 〒279-0031 千葉県浦安市舞浜 ファンタジースプリングス フローズンキングダム | https://www.google.com/maps/search/?api=1&query=%E3%82%A2%E3%83%AC%E3%83%B3%E3%83%87%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%AD%E3%82%A4%E3%83%A4%E3%83%AB%E3%83%90%E3%83%B3%E3%82%B1%E3%83%83%E3%83%88 |
| 585 | 同上 | 同上 | hours | 缺漏補上（低可信） | （無） | 每日 10:00–20:00 | 同上 |

### 連結不一致（非 address／hours 欄位，但會導航錯店）

| 行號 | 卡片標題 | 問題 | 建議 |
|---|---|---|---|
| 109 | 飲食｜Ginza Katsukami | 卡片 `address` 寫的是「銀座かつかみ弐」（東京都中央区銀座6-8-7 交詢ビル4F），但 `mapLink` 指向的是另一家「銀座かつかみ」（〒104-0061 東京都中央区銀座5-6-10 銀座ミヤコビル 5階）。兩家營業時間相同。 | 確認訂位的是哪一家；若是弐，mapLink 改為 https://www.google.com/maps/search/?api=1&query=%E9%8A%80%E5%BA%A7%E3%81%8B%E3%81%A4%E3%81%8B%E3%81%BF%E5%BC%90 |
| 182 | 購物｜…The T Bar… | `mapLink3` 是「The T Bar 青山」搜尋清單，非精確地點；正確店家為清單第 1 筆（六本木）。 | 改為上表 The T Bar 的網址 |
| 80 | 行程｜新宿周邊 | `mapLink4`（3COINS 新宿）是搜尋清單，含多家分店。 | 指定分店後再換精確連結 |

---

## 二、查不到／存疑清單

| 項目 | 狀況 | 建議 |
|---|---|---|
| KP Photography（L97） | Maps 上「KP Photography」只有紐西蘭與印度的同名店，**無東京店家**；「KP Photography Tokyo」「KP Photography 新宿」皆查無。集合座標 35.692517, 139.699419 在 Maps 上只是無店名座標點（Plus Code：MMVX+2Q3 新宿區），沒有門牌地址與營業時間。 | 地址、營業時間都無法由 Maps 補；請向攝影師確認集合點文字說明 |
| 3COINS（L80） | 卡片未指定分店；搜尋清單前三筆為 ルミネエスト新宿店／JR新宿駅南口店／西武新宿ペペ店。我只查了 ルミネエスト新宿店（離伊勢丹、おにぎり まんま 最近）。 | 需使用者指定分店；JR新宿駅南口店、ペペ店未查細節 |
| TOHO シネマズ 新宿（L80） | address 一致（〒160-0021 東京都新宿区歌舞伎町1-19-1 新宿東宝ビル 3F）；Maps **沒有營業時間資料**。 | 維持「依場次」 |
| 明治神宮（L149） | address 一致（〒151-8557 東京都渋谷区代々木神園町1-1）；Maps **沒有營業時間資料**，無法驗證「05:00–17:20」。 | 以官方日出日落公告為準 |
| GENDY 南青山店（L182） | 卡片備註寫「2026/9/16 搬到新址」，但 Maps 今天（10/19）仍顯示舊址：〒107-0062 東京都港区南青山5-12-2 倉澤ビルディング 1F，營業 11:00–19:00，無搬遷標示。 | 出發前以官方公告確認新址，Maps 此項不可信 |
| 黄金湯 新宿（L119、L220） | address 一致（〒160-0022 東京都新宿区新宿7-22-11 金沢マンション 1F）。Maps 每週時段：週一、四、五、六、日 12:30–24:00＋翌日 00:00–09:30；週三 12:30–24:00；週二僅 00:00–09:30（週一夜延伸），即**每週二整天休**，與卡片「公休第1、3週二」不同。旅遊日 Day 1（週四）、Day 2（週五）不受影響。 | 卡片公休規則存疑，可改寫為「週二公休（Maps）」並註明待確認 |
| DOLCE TACUBO 銀座（L291） | Maps 每日 11:00–19:00，與卡片一致；卡片「暫行 11:00–17:00」Maps 查無對應。 | 暫行時段屬官方公告，Maps 無法驗證 |
| LE CAFE V（L315）LO 19:00、迎賓館最終入場時間（L256） | Maps 未列最後點餐／最終入場時間，僅驗證了主營業時段。 | 無法驗證 |
| 園內餐廳（L381、L441、L543、L585、L511） | Maps 時間為通用資料，非迪士尼當日公告；Maps 的郵遞區號對海洋園區內店家顯示 279-0031（樂園區），非 279-8511。 | 以 Disney 官方 App 為準 |

---

## 三、已比對且一致（供套用者確認不必改）

| 行號 | 卡片標題 | 店名 | 欄位 | Maps 值 | 備註／網址 |
|---|---|---|---|---|---|
| 80 | 新宿周邊 | おにぎり まんま | address | 〒160-0022 東京都新宿区新宿3-14-23 マヤビル 1F | https://www.google.com/maps/search/?api=1&query=Onigiri%20Shop%20Mamma%20%E6%96%B0%E5%AE%BF |
| 80 | 新宿周邊 | おにぎり まんま | hours | 每日 08:30–21:00 | 同上 |
| 80 | 新宿周邊 | Échiré Pâtisserie | hours | 每日 10:00–20:00 | 同第一區 Échiré 網址 |
| 71、126、227 | DOMO HOTEL（三張） | DOMO HOTEL | address | 〒160-0022 東京都新宿区新宿7-27-15 | https://www.google.com/maps/search/?api=1&query=DOMO%20HOTEL%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF7-27-15 |
| 102 | 都民廣場 + 移動 | 都民広場／南展望室 | address | 都民広場 〒163-8001 東京都新宿区西新宿2-8-1（24 小時）；展望室 〒160-8001 同番地 | 一致 |
| 102 | 都民廣場 + 移動 | 南展望室 | hours | 09:30–21:30（週二定休）；★10/22 營業 | 一致，建議補註「週二休；北展望室週一休」。https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%BA%81%E7%AC%AC%E4%B8%80%E6%9C%AC%E5%BA%81%E8%88%8E%20%E5%8D%97%E5%B1%95%E6%9C%9B%E5%AE%A4 |
| 109 | Ginza Katsukami | 銀座 かつかみ弐 | address | 〒104-0061 東京都中央区銀座6-8-7 交詢ビル 4階 | 一致。https://www.google.com/maps/search/?api=1&query=%E9%8A%80%E5%BA%A7%E3%81%8B%E3%81%A4%E3%81%8B%E3%81%BF%E5%BC%90 |
| 109 | Ginza Katsukami | 銀座 かつかみ弐／銀座かつかみ | hours | 每日 11:30–14:00, 18:00–21:30（兩家相同） | 一致 |
| 141 | 珈琲専科 メルヘン | 珈琲専科 メルヘン | address | 〒162-0052 東京都新宿区戸山2-33-101 都営戸山ハイツアパート 33 | 一致。https://www.google.com/maps/search/?api=1&query=%E7%8F%88%E7%90%B2%E5%B0%82%E7%A7%91%20%E3%83%A1%E3%83%AB%E3%83%98%E3%83%B3 |
| 141 | 珈琲専科 メルヘン | 同上 | hours | 週一至五 07:30–18:00，週六日定休；★週五 10/23 營業 | 一致 |
| 149 | 明治神宮 + 新宿御苑 | 新宿御苑 | address／hours | 〒160-0014 東京都新宿区内藤町11；09:00–16:30，週一定休；★週五營業 | 一致。https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E5%AE%BF%E5%BE%A1%E8%8B%91 |
| 162 | Studio RAAR | 女装サロン studio RAAR | address | 〒160-0022 東京都新宿区新宿5-18-12 6階 | 實質一致（Maps 無「八重洲ビル」「60A」，無法驗證） |
| 174 | 青山Ototo | 青山 おとと | address | 〒150-0001 東京都渋谷区神宮前3-1-28 BELL TOWN 青山 B1 | 實質一致，可補建物名 BELL TOWN 青山 與郵遞區號。https://www.google.com/maps/place/%E9%9D%92%E5%B1%B1Ototo%EF%BC%88%E9%9D%92%E5%B1%B1%E3%81%8A%E3%81%A8%E3%81%A8%EF%BC%89/data=!4m2!3m1!1s0x60188d8fa9c4c17b:0x89d35ec5cd17588c |
| 174 | 青山Ototo | 同上 | hours | 週一至五 12:00–14:00, 18:00–23:00；週六 12:00–14:00, 18:00–22:00；週日定休；★週五 10/23 一致 | 週六晚場 Maps 為 22:00，卡片寫 23:00（非旅遊日，不影響） |
| 182 | 購物｜3 Coins 原宿… | 3COINS 原宿本店 | address／hours | 〒150-0001 東京都渋谷区神宮前6-12-22 秋田ビル 1F；每日 11:00–20:00 | 一致，Maps 目前仍是 11:00–20:00，「資料較舊」註記可保留或移除。https://www.google.com/maps/search/?api=1&query=3%20Coins%20%E5%8E%9F%E5%AE%BF%E6%97%97%E8%89%A6%E5%BA%97 |
| 182 | 同上 | GENDY青山店 | address／hours | 〒107-0062 東京都港区南青山5-12-2 倉澤ビルディング 1F；每日 11:00–19:00 | 一致（但搬遷存疑，見第二區）。https://www.google.com/maps/place/GENDY+%E5%8D%97%E9%9D%92%E5%B1%B1%E5%BA%97/data=!4m2!3m1!1s0x60188b60ee15bc0f:0x4440657766936b94 |
| 182 | 同上 | The T Bar | address | 〒106-0032 東京都港区六本木7-18-15（Maps 無「1F」） | 一致 |
| 182 | 同上 | 出雲大社 東京分祠 | address／hours | 〒106-0032 東京都港区六本木7-18-5；每日 09:00–17:00 | 一致。https://www.google.com/maps/search/?api=1&query=%E5%87%BA%E9%9B%B2%E5%A4%A7%E7%A4%BE%E6%9D%B1%E4%BA%AC%E5%88%86%E7%A5%A0 |
| 200 | Bluenote | ブルーノート東京 | address | 〒107-0062 東京都港区南青山6-3-16 | 一致 |
| 210 | 焼鳥篠原 | 焼鳥篠原 | address | 〒106-0031 東京都港区西麻布1-4-40 西麻布篠ビル 1F | 一致（卡片寫「SHINOビル」，Maps 為「西麻布篠ビル」，可補郵遞區號） |
| 242 | しんぱち食堂 新宿東南口店 | 炭火焼干物定食 しんぱち食堂 新宿東南口店 | address／hours | 〒160-0022 東京都新宿区新宿3-35-5；每日 04:00–03:00 | 一致。https://www.google.com/maps/place/Shinpachi+Shokud%C5%8D+Shinjuku+Tonanguchi/data=!4m2!3m1!1s0x0:0x70bb1c28905d1260 |
| 251 | 7-Eleven 外苑前站前店 | セブン‐イレブン外苑前駅前店 | address | 〒107-0061 東京都港区北青山2-7-19 | 一致 |
| 256 | 迎賓館 | 迎賓館赤坂離宮 | address／hours | 〒107-0051 東京都港区元赤坂2-1-1；10:00–17:00，**週三定休**；★10/24 週六營業 | 一致，建議補註「週三休」。https://www.google.com/maps/search/?api=1&query=%E8%BF%8E%E8%B3%93%E9%A4%A8%E8%B5%A4%E5%9D%82%E9%9B%A2%E5%AE%AE |
| 263 | RistoPizza | 同上 | address | 〒106-0041 東京都港区麻布台1-3-1 ヒルズ タワープラザ 3階 | 一致 |
| 272 | Dashi Okume | 同上 | address | 〒106-0041 東京都港区麻布台1-2-4 | 一致 |
| 280 | 流れ星を探して | 同上 | address | 〒100-0006 東京都千代田区有楽町2-5-1 有楽町センタービル 9階 | 一致（卡片「有楽町マリオン9F」為同一大樓別名） |
| 291 | 購物｜Workman Colors… | Workman Colors イグジットメルサ銀座店 | address／hours | 〒104-0061 東京都中央区銀座5-7-10 中村積善会ビル 5階；每日 11:00–20:00 | 一致。https://www.google.com/maps/search/?api=1&query=Workman%20Colors%20%E9%8A%80%E5%BA%A7%E5%BA%97 |
| 291 | 同上 | 銀座ロフト | address／hours | 〒104-0061 東京都中央区銀座2-4-6 ベルビア館 1～5階；週一至六 11:00–21:00／週日 11:00–20:00 | 一致（★週六 11:00–21:00）。https://www.google.com/maps/search/?api=1&query=%E9%8A%80%E5%BA%A7%20LOFT |
| 291 | 同上 | 銀座 緑寿庵清水 | address | 〒104-0061 東京都中央区銀座6-2-1 Daiwa銀座ビル 1F | 一致（hours 不一致見第一區） |
| 291 | 同上 | DOLCE TACUBO GINZA | address／hours | 〒104-0061 東京都中央区銀座7-11-14 GINZAカムイビル 1F；每日 11:00–19:00 | 一致（「暫行」見存疑）。https://www.google.com/maps/search/?api=1&query=%E3%83%89%E3%83%AB%E3%83%81%E3%82%A7%E3%82%BF%E3%82%AF%E3%83%9C%E9%8A%80%E5%BA%A7%20DOLCE%20TACUBO%20GINZA |
| 309 | ntv big clock | 日テレ大時計 | address | 〒105-0021 東京都港区東新橋1-6-1 | 一致 |
| 315 | LE CAFE V | LE CAFE V（ルイ・ヴィトン 銀座並木通り店 7F） | address／hours | 〒104-0061 東京都中央区銀座7-6-1；每日 11:00–20:00 | 一致。https://maps.app.goo.gl/o2V4QNTurseL6mRn9 |
| 324 | JULIA | JULIA | address | 〒150-0001 東京都渋谷区神宮前3-1-25 | 一致（Maps 無「1F」） |
| 347、485、499 | 夢幻泉鄉飯店（三張） | 東京ディズニーシー・ファンタジースプリングスホテル | address | 〒279-8526 千葉県浦安市舞浜1-2 | 一致，可補郵遞區號 |
| 354、505 | 排隊入園／提早入園搶票 | 東京ディズニーランド／東京ディズニーシー | hours | 每日 09:00–21:00 | 一致（Maps 預設值，非 10/25、10/26 當日公告） |

---

## 四、統計（供回報）

- 補 address：9 筆（Échiré、3COINS〔存疑〕、迪士尼樂園、中央大街咖啡館、水晶宮、迪士尼海洋、ファンタジースプリングス・レストラン、醜小鴨小館、艾倫戴爾；另有夢幻泉鄉三卡、焼鳥篠原、Ototo 等僅可補郵遞區號或建物名，不計入）。
- 補 hours：8 筆（3COINS〔存疑〕、Studio RAAR、7-Eleven、日テレ大時計、中央大街咖啡館、水晶宮、醜小鴨小館、艾倫戴爾；其中園內 4 筆低可信）。
- 修正 hours：10 筆（北展望室、The T Bar、Bluenote、焼鳥篠原、RistoPizza、Dashi Okume、Planetaria、綠壽庵清水、JULIA、ファンタジースプリングス・レストラン）。
- 查不到：4 項（KP Photography 地址與時間、TOHO 時間、明治神宮時間、3COINS 店別）；另有存疑 GENDY 搬遷、黄金湯公休規則、Ginza Katsukami mapLink 指向錯店。
- 範圍外（依指示未查）：Day 0、航班與交通類卡、回家、迪士尼園內單一設施／表演卡、葛西 Airbnb。
