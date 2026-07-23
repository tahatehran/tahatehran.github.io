# MovtiGroup Landing Page

Landing page رسمی **MovtiGroup** — سایت استاتیک چندزبانه (فارسی / انگلیسی) با Jekyll و انتشار روی GitHub Pages.

Official landing page for **MovtiGroup** — a bilingual static site (Persian / English) built with Jekyll and deployed on GitHub Pages.

🔗 **دامنه اصلی / Main Domain:** [`movtigroup.me`](https://movtigroup.me)  
📧 **ایمیل / Email:** `info@movtigroup.me`

---

## ویژگی‌ها / Features

| Feature                                             | Description                                                                                               |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 🎠 **Hero Slider / اسلایدر اصلی**                   | Auto-rotating hero slider with smooth transitions on homepage / اسلایدر اصلی با چرخش خودکار               |
| 🔢 **Animated Stats / آمار متحرک**                  | Animated counters for posts, categories, and languages / شمارنده‌های متحرک برای مقالات و دسته‌بندی‌ها     |
| ✨ **Scroll-Reveal Animations / انیمیشن اسکرول**    | Elements animate into view on scroll for engaging UX / انیمیشن عناصر هنگام اسکرول برای تجربه کاربری بهتر  |
| 📰 **Latest Posts Preview / پیش‌نمایش مقالات**      | Latest blog posts displayed on homepage / پیش‌نمایش آخرین مقالات بلاگ در صفحه اصلی                        |
| 🌐 **پشتیبانی دوزبانه / Bilingual**                 | نسخه فارسی (RTL) و انگلیسی (LTR) / Persian (RTL) and English (LTR)                                        |
| 📝 **بلاگ فنی / Technical Blog**                    | **۱۳۱ مقاله** — ۷۴ مقاله انگلیسی و ۵۷ مقاله فارسی / **131 posts** — 74 English, 57 Persian                |
| 🔍 **جستجوی دوزبانه / Bilingual Search**            | جستجو با تطابق فازی در هر دو زبان / Fuzzy matching search across both languages                           |
| 🏷️ **فیلتر بر اساس دسته‌بندی / Category Filtering** | ۲۱ دسته‌بندی فعال با صفحات اختصاصی / 21 active categories with dedicated pages                            |
| 🔍 **بهینه‌سازی SEO / SEO Optimized**               | JSON-LD, Open Graph, Twitter Cards, sitemap.xml, robots.txt                                               |
| 🎨 **طراحی ریسپانسیو / Responsive Design**          | SCSS, smooth scrolling, touch-friendly mobile UI                                                          |
| 👥 **صفحه تیم / Team Page**                         | معرفی اعضای تیم MovtiGroup / Meet the MovtiGroup team                                                     |
| 🚀 **صفحه پروژه‌ها / Projects Page**                | نمایش پروژه‌های فعال / Showcase of active projects                                                        |
| 📞 **صفحه تماس / Contact Page**                     | فرم ارتباطی با اطلاعات تماس / Contact form with contact info                                              |
| 📄 **پیجینیشن / Pagination**                        | صفحه‌بندی خودکار مقالات بلاگ (۱۲ پست در صفحه) / Auto-paginated blog (12 posts per page)                   |
| 🤝 **همکاری‌ها / Collaborations**                   | Blog posts featuring dirac.run and kilo code collaborations / مقالات بلاگ با همکاری dirac.run و kilo code |
| 📱 **Telegram Drive Posts / پست‌های تلگرام درایو**  | 5 specialized posts on Telegram Drive features and usage / ۵ مقاله تخصصی درباره قابلیت‌های تلگرام درایو   |

---

## ساختار صفحه اصلی / Homepage Structure

صفحه اصلی شامل بخش‌های زیر است / The homepage includes the following sections:

| Section                     | Description                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| 🎠 **Hero Slider**          | Auto-rotating slider showcasing key features (5 slides, 5s interval) |
| 🔢 **Stats Counters**       | Animated counters: total posts (131), categories (21), languages (2) |
| ✨ **Features Grid**        | Scroll-reveal grid highlighting main site capabilities               |
| 📰 **Latest Posts**         | Preview of the 6 most recent blog posts with cards                   |
| 🏢 **Brands/Partners**      | Partner and technology logos section                                 |
| 🤝 **Collaborations**       | Featured collaborations with dirac.run and kilo code                 |
| 📞 **CTA (Call to Action)** | Final call-to-action section with contact links                      |

---

## ساختار پروژه / Project Structure

```
├── index.html                  # صفحه اصلی (فارسی) — حاوی اسلایدر، آمار، ویژگی‌ها، مقالات اخیر
├── en/                         # نسخه انگلیسی / English version
│   ├── index.html              # Homepage (EN) — حاوی اسلایدر، آمار، ویژگی‌ها، مقالات اخیر
│   ├── blog/index.html         # Blog listing (EN)
│   ├── teams/index.html
│   ├── projects/index.html
│   └── contact/index.html
├── blog/                       # صفحه اصلی بلاگ / Blog main pages
│   ├── index.html              # All posts listing (EN)
│   ├── search.html             # Search page (EN)
│   ├── search.fa.html          # Search page (FA)
│   ├── search-data.json        # Search index (all posts, 131 entries)
│   └── category/               # Category pages (21 categories × 2 languages)
│       ├── ai-agents.md        # /en/blog/category/ai-agents/
│       ├── ai-agents.fa.md     # /blog/category/ai-agents/
│       ├── docker.md
│       ├── docker.fa.md
│       └── ...
├── teams/                      # صفحه تیم / Team page
├── projects/                   # صفحه پروژه‌ها / Projects page
├── contact/                    # صفحه تماس / Contact page
├── _posts/                     # مقالات بلاگ (131 posts: 74 EN + 57 FA)
│   ├── *.en.md                 # English posts
│   └── *.md                    # Persian posts (no .en. extension)
├── _layouts/                   # قالب‌های Jekyll / Jekyll layouts
│   ├── default.html
│   ├── post.html
│   └── category.html
├── _sass/                      # فایل‌های SCSS
│   ├── _variables.scss
│   ├── _animations.scss
│   └── _thailand.scss
├── assets/
│   ├── css/styles.css
│   ├── css/main.scss
│   ├── js/main.js
│   └── images/
├── _data/
│   ├── navigation.yml          # داده منوی ناوبری
│   └── translations.yml        # ترجمه‌ها
├── _config.yml                 # تنظیمات Jekyll
├── Gemfile                     # وابستگی‌های Ruby
├── CNAME                       # تنظیم دامنه سفارشی
├── robots.txt                  # قوانین خزنده‌ها
├── agent.md                    # راهنمای ساختار بلاگ (برای عوامل AI)
└── README.md                   # این فایل
```

---

## دسته‌بندی‌های بلاگ / Blog Categories

مقالات بلاگ در ۲۱ دسته‌بندی منتشر شده‌اند:

| Category         | Title           | Description                                                  |
| ---------------- | --------------- | ------------------------------------------------------------ |
| `ai-agents`      | AI Agents       | عوامل هوش مصنوعی، autonomous agents، دستیارهای هوشمند        |
| `api`            | API             | رابط‌های برنامه‌نویسی، REST، GraphQL                         |
| `docker`         | Docker & DevOps | راهنمای نصب و استفاده از Docker، کانتینر، CI/CD و DevOps     |
| `tutorial`       | Tutorials       | آموزش‌های قدم به قدم، راهنمای عملی و مثال‌های کاربردی        |
| `general`        | General         | مطالب عمومی در مورد فناوری، برنامه‌نویسی و هوش مصنوعی        |
| `python`         | Python          | برنامه‌نویسی پایتون، داده‌کاوی، FastAPI، کتابخانه‌ها         |
| `security`       | Security        | امنیت سایبری، تست نفوذ، حریم خصوصی، حفاظت از داده‌ها         |
| `databases`      | Databases       | دیتابیس‌ها، PostgreSQL، MySQL، SQL vs NoSQL                  |
| `openclaw`       | OpenClaw        | مطالب مربوط به OpenClaw، مقایسه‌ها، راهنمای استفاده و مدیریت |
| `comparison`     | Comparisons     | مقایسه ابزارها، پلتفرم‌ها و فناوری‌های مختلف                 |
| `linux`          | Linux           | سیستم عامل لینوکس، دستورات، مدیریت سرور، آموزش‌ها            |
| `devops`         | DevOps          | عملیات توسعه و زیرساخت، CI/CD، مانیتورینگ                    |
| `kilo-ai`        | Kilo AI         | ابزارهای هوش مصنوعی Kilo، مدل‌های کدنویسی، benchmark         |
| `ai-coding`      | AI Coding       | کدنویسی با هوش مصنوعی، ابزارهای برنامه‌نویسی، Copilot        |
| `gateway`        | Gateway         | دروازه‌های AI، پروکسی، load balancing                        |
| `ai-tools`       | AI Tools        | ابزارها و پلتفرم‌های هوش مصنوعی                              |
| `model-routing`  | Model Routing   | مسیریابی مدل‌ها، انتخاب مدل بر اساس وظیفه                    |
| `free-models`    | Free Models     | مدل‌های رایگان و open-source هوش مصنوعی                      |
| `benchmarks`     | Benchmarks      | معیارسنجی و مقایسه عملکرد مدل‌ها و ابزارها                   |
| `javascript`     | JavaScript      | برنامه‌نویسی جاوااسکریپت، فریم‌ورک‌ها، Node.js               |
| `telegram-drive` | Telegram Drive  | قابلیت‌های تلگرام درایو، ذخیره‌سازی ابری، مدیریت فایل        |

---

## همکاری‌ها / Collaborations

این سایت شامل مقالات بلاگ با همکاری زیر است / This site features blog posts in collaboration with:

- **dirac.run** — مقالات تخصصی درباره ابزارها و پلتفرم‌های dirac.run
- **Kilo Code** — مقالات درباره ابزار هوش مصنوعی Kilo، مدل‌های کدنویسی و مقایسه‌ها
- **Telegram Drive** — ۵ مقاله تخصصی درباره قابلیت‌های تلگرام درایو

---

## ساختار بلاگ / Blog Structure

### مقالات / Posts

- **English:** `_posts/YYYY-MM-DD-slug.en.md` → permalink: `/en/blog/slug/`
- **Persian:** `_posts/YYYY-MM-DD-slug.md` → permalink: `/blog/slug/`

### جستجو / Search

- **EN:** `/blog/search/` — `/blog/search.html`
- **FA:** `/fa/blog/search/` — `blog/search.fa.html`
- **Data:** `blog/search-data.json` — JSON index of all 131 posts with title, url, description, lang, categories, date, excerpt
- جستجو شامل عنوان، توضیحات و دسته‌بندی‌ها می‌شود با تطبیق فازی / Search covers title, description, and categories with fuzzy matching

### دسته‌بندی‌ها / Categories

- **EN:** `/en/blog/category/{name}/` — `blog/category/{name}.md`
- **FA:** `/blog/category/{name}/` — `blog/category/{name}.fa.md`
- هر دسته‌بندی یک صفحه اختصاصی با فیلتر جاوااسکریپتی دارد / Each category has a dedicated page with JS filtering

---

## تکنولوژی‌ها / Tech Stack

| مورد / Item               | فناوری / Technology                                             |
| ------------------------- | --------------------------------------------------------------- |
| موتور سایت‌ساز / SSG      | [Jekyll](https://jekyllrb.com/)                                 |
| استایل‌دهی / Styling      | SCSS / CSS                                                      |
| اسکریپت‌نویسی / Scripting | JavaScript (Vanilla)                                            |
| میزبانی / Hosting         | [GitHub Pages](https://pages.github.com/)                       |
| پلاگین‌ها / Plugins       | jekyll-feed, jekyll-seo-tag, jekyll-sitemap, jekyll-paginate-v2 |

---

## SEO

صفحات اصلی شامل موارد زیر برای بهینه‌سازی موتورهای جستجو هستند:

- متا تگ‌های `description`، `keywords`، `robots`
- Canonical URL
- Open Graph / Twitter Card metadata
- Structured Data (JSON-LD) برای Organization
- `sitemap.xml` خودکار (توسط jekyll-sitemap)
- `robots.txt` برای راهنمایی خزنده‌ها

Main pages include the following SEO features:

- Meta tags: `description`, `keywords`, `robots`
- Canonical URLs
- Open Graph / Twitter Card metadata
- Structured Data (JSON-LD) for Organization
- Auto-generated `sitemap.xml` (via jekyll-sitemap)
- `robots.txt` for crawler guidance

---

## اجرای محلی / Local Development

### پیش‌نیازها / Prerequisites

- Ruby (>= 2.7)
- Bundler
- Jekyll

### نصب و اجرا / Install & Run

```bash
# نصب وابستگی‌ها / Install dependencies
bundle install

# اجرای سرور محلی / Run local server
bundle exec jekyll serve

# مشاهده سایت / View site
# http://localhost:4000 (Persian)
# http://localhost:4000/en/ (English)
# http://localhost:4000/blog/ (Blog listing)
```

---

## استقرار (Deploy)

این مخزن یک سایت استاتیک است و از طریق **GitHub Pages** منتشر می‌شود.

1. تغییرات را روی `main` کامیت کنید.
2. GitHub Actions یا GitHub Pages به‌صورت خودکار سایت را بیلد و منتشر می‌کند.
3. دامنه `movtigroup.me` از طریق فایل `CNAME` به GitHub Pages متصل است.

> ⚠️ اگر سایت روی دامنه نمایش داده نشد، تنظیمات DNS دامنه باید به GitHub Pages اشاره کند.

This repository is a static site published via **GitHub Pages**.

1. Commit changes to `main`.
2. GitHub Actions or GitHub Pages automatically builds and deploys the site.
3. The domain `movtigroup.me` is connected via the `CNAME` file.

---

## مجوز / License

این پروژه متعلق به **MovtiGroup** است.

This project is owned by **MovtiGroup**.

## File Organization / ساختار فایل‌ها

| File | Purpose |
|------|---------|
| \`assets/css/styles.css\` | Global styles |
| \`assets/css/pages.css\` | Page-specific styles |
| \`assets/js/main.js\` | Global JavaScript |
| \`assets/js/home.js\` | Homepage slider & animations |
| \`assets/js/blog-filter.js\` | Blog category filtering |
| \`assets/js/search.js\` | Blog search |
| \`write-post-blog.md\` | Blog post writing guide |
| \`scripts/generate_search_data.py\` | Regenerate search index |
