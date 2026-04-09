#!/usr/bin/env python3
"""
sync-meta.py
從每個行程的 <script id="trip-data"> frontmatter 自動同步 OG / SEO meta tags。

frontmatter 欄位對應：
  title    → <title>, og:title
  subtitle → og:description, meta[name=description]
  url      → og:url（若無此欄位則從資料夾名稱自動推導）
"""

import re
import subprocess
import sys
from pathlib import Path

BASE_URL = "https://ytlanton.github.io/antonstrip"

OG_BLOCK_TEMPLATE = """\
  <!-- ╔══════════════════════════════════════════╗
       ║  🔧 可調整區：分享預覽（LINE / FB 卡片）  ║
       ╚══════════════════════════════════════════╝ -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{url}">
  <meta name="description" content="{description}">
  <!-- ═══════════════════════════════════════════ -->"""


def extract_frontmatter(html: str) -> dict:
    m = re.search(r'<script[^>]+id=["\']trip-data["\'][^>]*>(.*?)</script>', html, re.DOTALL)
    if not m:
        return {}
    fm_m = re.search(r'^---\s*\n(.*?)\n---', m.group(1), re.DOTALL | re.MULTILINE)
    if not fm_m:
        return {}
    fm = fm_m.group(1)

    result = {}
    for key in ('title', 'subtitle', 'url'):
        km = re.search(rf'^{key}:\s*"?([^"\n]+?)"?\s*$', fm, re.MULTILINE)
        if km:
            result[key] = km.group(1).strip()
    return result


def update_meta(html: str, title: str, description: str, url: str) -> str:
    # <title>
    html = re.sub(r'(<title>)[^<]*(</title>)', rf'\g<1>{title}\g<2>', html)

    # OG block が存在する場合は各タグを更新
    def replace_attr(pattern, value, content):
        return re.sub(pattern, rf'\g<1>{value}\g<2>', content)

    if 'og:title' in html:
        html = replace_attr(r'(<meta property="og:title" content=")[^"]*(")', title, html)
        html = replace_attr(r'(<meta property="og:description" content=")[^"]*(")', description, html)
        html = replace_attr(r'(<meta property="og:url" content=")[^"]*(")', url, html)
        html = replace_attr(r'(<meta name="description" content=")[^"]*(")', description, html)
    else:
        # OG block が存在しない → <title> の直前に挿入
        block = OG_BLOCK_TEMPLATE.format(title=title, description=description, url=url)
        html = re.sub(r'(\s*<title>)', f'\n{block}\n\\1', html, count=1)

    return html


def main(check_only=False):
    root = Path(__file__).parent
    modified = []

    for html_file in sorted(root.glob("*/index.html")):
        folder = html_file.parent.name
        if folder.startswith('_'):
            continue

        original = html_file.read_text(encoding='utf-8')
        meta = extract_frontmatter(original)

        if not meta.get('title'):
            print(f"  [skip]    {folder}: frontmatter 缺少 title")
            continue

        title = meta['title']
        description = meta.get('subtitle', '')
        url = meta.get('url', f"{BASE_URL}/{folder}/")

        updated = update_meta(original, title, description, url)

        if updated != original:
            if check_only:
                print(f"  [drift]   {folder}: meta 與 frontmatter 不同步")
                modified.append(folder)
            else:
                html_file.write_text(updated, encoding='utf-8')
                print(f"  [updated] {folder}")
                modified.append(str(html_file))
        else:
            print(f"  [ok]      {folder}")

    if not check_only and modified:
        subprocess.run(['git', 'add'] + modified, cwd=root)

    return len(modified)


if __name__ == '__main__':
    check_only = '--check' in sys.argv
    print("sync-meta: 同步 OG meta tags...\n")
    count = main(check_only)
    if check_only and count:
        print(f"\n{count} 個檔案未同步，請執行 python sync-meta.py 修正。")
        sys.exit(1)
    elif count:
        print(f"\n{count} 個檔案已更新。")
    else:
        print("\n所有檔案已是最新狀態。")
