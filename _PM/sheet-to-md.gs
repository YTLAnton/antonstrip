/**
 * sheet-to-md.gs
 * 將 Google Sheet 時間軸行程表轉換為 antonstrip MD 格式
 *
 * 使用方式：
 *   1. Google Sheet → 擴充功能 → Apps Script
 *   2. 貼上此檔案全部內容，存檔
 *   3. 重新整理 Sheet，上方會出現「行程工具」選單
 *      或直接在編輯器選 exportTripMD 執行
 *
 * Sheet 格式假設：
 *   - 第 0 列：標題列，A1 空白，B1 起為日期（如 3/7(週六)）
 *   - 第 0 欄：時間欄（0:00, 1:00 ... Night）
 *   - 其餘儲存格：活動名稱（可多行，首行為名稱，其餘為 description）
 */

// --- 設定區 ---
var YEAR = 2026;
// --------------

function exportTripMD() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // 收集日期欄
  var days = [];
  for (var col = 1; col < data[0].length; col++) {
    if (String(data[0][col]).trim() !== '') {
      days.push({ col: col, header: data[0][col] });
    }
  }

  // 收集時間列
  var times = [];
  for (var i = 1; i < data.length; i++) {
    times.push(data[i][0]);
  }

  var md = '';

  for (var dayIdx = 0; dayIdx < days.length; dayIdx++) {
    var col = days[dayIdx].col;
    var header = days[dayIdx].header;
    var dateStr = formatDate(header);

    if (dayIdx > 0) md += '---\n\n';

    md += '## Day ' + (dayIdx + 1) + ' | ' + dateStr + ' |\n\n';
    md += 'route: \n';
    md += 'dayNote: \n';
    md += 'weatherTemp: \n';
    md += 'weatherCond: \n';
    md += 'weatherRain: \n';
    md += 'weatherTips: \n';
    md += '\n';

    for (var row = 1; row < data.length; row++) {
      var raw = String(data[row][col]).trim();
      if (raw === '') continue;

      var time = formatTime(times[row - 1]);

      // endTime = 下一個有內容的格子的起始時間
      var endTime = '';
      for (var r = row + 1; r < data.length; r++) {
        if (String(data[r][col]).trim() !== '') {
          endTime = formatTime(times[r - 1]);
          break;
        }
      }

      // 多行儲存格：第一行為名稱，其餘為 description 或 KV 欄位
      var lines = raw.split('\n');
      var name = lines[0].trim();
      var descParts = [];
      var cellKV = {};
      for (var li = 1; li < lines.length; li++) {
        var trimmed = lines[li].trim();
        if (!trimmed) continue;
        var kvMatch = trimmed.match(/^(\w+):\s*(.*)/);
        if (kvMatch) {
          cellKV[kvMatch[1]] = kvMatch[2].trim();
        } else {
          descParts.push(trimmed);
        }
      }
      var description = cellKV.description !== undefined ? cellKV.description : descParts.join(' | ');

      var type = inferType(name);

      md += '### ' + type + ' | ' + name + '\n';
      md += 'time: ' + time + '\n';
      if (endTime) md += 'endTime: ' + endTime + '\n';
      md += 'group: ' + (cellKV.group || '') + '\n';
      md += 'description: ' + description + '\n';

      if (type === '住宿') {
        md += 'checkIn: \n';
        md += 'checkOut: \n';
        md += 'price: NTD  / 晚\n';
        md += 'nights: \n';
        md += 'app: \n';
      } else {
        md += 'cost: NTD  / 人\n';
        md += 'hours: \n';
        md += 'ticket: \n';
        md += 'meta: \n';
      }

      md += 'address: \n';
      md += 'mapLink: \n';
      md += 'notes: \n';
      md += 'copyable: \n';
      md += 'docLink: \n';
      md += '\n';
    }
  }

  md += '---\n';

  showDialog(md);
}

// --- 工具函式 ---

function formatTime(val) {
  if (!val && val !== 0) return '';
  if (val instanceof Date) {
    return pad2(val.getHours()) + ':' + pad2(val.getMinutes());
  }
  var s = String(val).trim();
  if (s === 'Night' || s === 'night') return '00:00';
  var m = s.match(/^(\d+):(\d+)/);
  if (m) return pad2(parseInt(m[1])) + ':' + m[2];
  return s;
}

function formatDate(val) {
  var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  if (val instanceof Date) {
    var y = val.getFullYear();
    var mo = pad2(val.getMonth() + 1);
    var d = pad2(val.getDate());
    var w = weekdays[val.getDay()];
    return y + '/' + mo + '/' + d + ' (' + w + ')';
  }
  // 字串格式 "3/7(週六)" 或 "3/7（週六）"
  var s = String(val).trim();
  var match = s.match(/(\d+)\/(\d+)[（(].*?([一二三四五六日])[）)]/);
  if (match) {
    return YEAR + '/' + pad2(parseInt(match[1])) + '/' + pad2(parseInt(match[2])) + ' (' + match[3] + ')';
  }
  return s;
}

function inferType(name) {
  if (/酒店|飯店|旅館|inn|hotel/i.test(name))                          return '住宿';
  if (/tpe|hkg|kix|nrt|icn|cx\d|台鐵|高鐵|機|班機|自強|普悠瑪|送機|搭機|接機/i.test(name)) return '交通';
  if (/食|麵|飯|茶|粥|湯|點心|cafe|bar|leone|mora|餐|燒烤|火鍋|小吃|夜市/i.test(name)) return '飲食';
  if (/博物館|美術館|展覽|展|gallery|museum/i.test(name))              return '展覽';
  if (/購物|mall|商場|市集|超市|免稅|shopping/i.test(name))            return '購物';
  if (/休息|午休|小睡|check.in|check.out/i.test(name))                return '休息';
  return '景點';
}

function pad2(n) {
  return n < 10 ? '0' + n : String(n);
}

function showDialog(md) {
  var escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  var html = HtmlService.createHtmlOutput(
    '<style>' +
      'body { margin: 8px; font-family: sans-serif; }' +
      'textarea { width: 100%; height: 420px; font-size: 11px; font-family: monospace; }' +
      'button { margin-top: 6px; padding: 6px 18px; cursor: pointer; font-size: 13px; }' +
    '</style>' +
    '<textarea id="out">' + escaped + '</textarea>' +
    '<br>' +
    '<button onclick="var t=document.getElementById(\'out\');t.select();document.execCommand(\'copy\');this.textContent=\'✓ 已複製\'">' +
      '全選複製' +
    '</button>'
  ).setWidth(640).setHeight(520);

  SpreadsheetApp.getUi().showModalDialog(html, '行程 MD 輸出');
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('行程工具')
    .addItem('匯出 MD', 'exportTripMD')
    .addToUi();
}
