# NYCU TAKENOKO 官網

國立陽明交通大學日語學習團隊（チームたけのこ）官方網站。靜態網站，Jekyll 產生共用 header/nav/footer，部署於 GitHub Pages。

正式網址：https://nctutakenoko.github.io/

## 技術棧

- 純 HTML + CSS + vanilla JS，無前端框架，無 npm 建置流程
- Jekyll（`github-pages` gem，版本與 GitHub Pages 伺服器一致），用途：
  1. 共用 header/nav/footer（`_layouts/default.html`）
  2. 歷年活動清單資料驅動（`_data/*.yml`）
- `assets/css/style.css` 為唯一樣式檔，無 CSS 前處理器

## 本機開發

```bash
git clone git@github.com:nycutakenoko/nycutakenoko.github.io.git
cd nycutakenoko.github.io
bundle install
bundle exec jekyll serve
```

開啟 `http://localhost:4000`。存檔後自動重新 build，需手動重新整理瀏覽器。

不可直接用瀏覽器開啟 `.html` 檔案預覽（Liquid 語法 `{% %}` `{{ }}` 需要 Jekyll build 才會被替換）。Ruby/Jekyll 安裝步驟見文末「環境安裝」。

## 常見維護任務

### 新增一個年度（朗讀比賽 / 日語辯論營）

1. 複製前一年的頁面檔案（例如 `reading-contest-2026.html`），改名為新年度，更新內容
2. 在對應的 `_data/reading_contest_years.yml` 或 `_data/debate_camp_years.yml` 加一筆新年度
   - nav 選單與總覽頁（`reading-contest.html` / `debate-camp.html`）的按鈕都是從這份資料自動產生，只需要改這一個地方

### 更換首頁橫幅照片 / 社群分享預覽圖

- 社群分享預設圖（Open Graph）：改 `_config.yml` 裡的 `image:` 一行，全站生效
- 首頁橫幅照片：`index.html` 裡 `.hero` 區塊的 `style="background-image: url(...)"`，改成新圖片路徑（圖片放在 `assets/img/uploads/`）

### 新增一般頁面

```html
---
layout: default
title: 頁面標題
description: 一句話描述（用於 SEO 與社群分享預覽）
---
<section class="section" style="border-bottom:none;">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">English Label</span>
			<h2>中文標題</h2>
		</div>
		<div class="page-prose">
			<p>內文...</p>
		</div>
	</div>
</section>
```

title 不需加「- NYCU TAKENOKO」，`jekyll-seo-tag` 會自動加上站名後綴。

常用 class：`.page-prose`（一般文字）、`.gallery` + `.gallery-item`（相簿，自動附燈箱）、`.quote-list` + `<blockquote>`（語錄列表）、`.simple-slideshow`（輪播，參考 `japanese-dojo.html`）、`.logo-grid`（贊助商 logo 牆）。

新頁面若要出現在導覽列，需自行加到 `_layouts/default.html` 的 nav 區塊。

### 新增照片

放進 `assets/img/uploads/`，在頁面內容裡用 `<img src="assets/img/uploads/檔名">` 引用即可，不需要額外設定。

## 專案結構

```
_layouts/default.html      共用 header + nav + footer
_data/
  reading_contest_years.yml   朗讀比賽歷年清單
  debate_camp_years.yml       日語辯論營歷年清單
_config.yml                 站台標題、描述、網址、預設分享圖片、外掛清單
assets/
  css/style.css              唯一樣式檔
  js/
    nav.js                    導覽選單（桌機下拉／手機抽屜）
    lightbox.js                相簿燈箱
    slideshow.js                輪播元件
  img/
    uploads/                   活動照片，部分檔案有 _orig（原始解析度）版本
    uploads/_unreferenced/     未被任何頁面引用的舊檔案，保留但未使用
    icons/                     Facebook/Instagram 官方 SVG 圖示
  docs/                      PDF / doc 附件
*.html                     頁面內容
robots.txt                指向 sitemap.xml
```

## 孤兒頁面

以下頁面存在但不在導覽列上（原始網站也從未連結過），且已標記 `sitemap: false` 排除於搜尋引擎地圖：

| 頁面 | 備註 |
|---|---|
| `sponsors.html` | 贊助廠商 logo 牆，內容與首頁贊助清單重疊 |
| `international-debate-championship-2019.html` | 2019 國際辯論賽籌辦介紹（原檔名 `about-us.html`） |
| `contact-us.html` | |
| `crowdfunding.html` | 2019/2020 群眾募資感謝名單 |
| `guest-lecturers.html` | 內容極少 |
| `internship.html` | |
| `past-record.html` | 歷屆辯論賽題目紀錄 |
| `theme--rule.html` | 辯論賽規則說明 |
| `interview.html` | 與 `alumni-interviews.html` 內容重疊，未合併 |

要收進導覽列：在 `_layouts/default.html` 加連結，並移除該頁 front matter 的 `sitemap: false`。

## 環境安裝

```bash
# Ubuntu/Debian
sudo apt install ruby-full build-essential
gem install --user-install bundler jekyll
echo 'export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"' >> ~/.bashrc
# 3.2.0 為 gem 路徑用的 Ruby ABI 版號，實際路徑可用 `gem environment gemdir` 確認

cd nycutakenoko.github.io
bundle config set --local path 'vendor/bundle'
bundle install
```

`vendor/bundle/`、`_site/`、`.bundle/`、`.jekyll-cache/` 已列於 `.gitignore`。
