# MovtiGroup Landing Page

Landing page رسمی **MovtiGroup** — سایت استاتیک چندزبانه (فارسی / انگلیسی) با Jekyll و انتشار روی GitHub Pages.

🔗 **دامنه اصلی:** [`movtigroup.me`](https://movtigroup.me)  
📧 **ایمیل:** `info@movtigroup.me`

---

## ویژگی‌ها

- 🌐 **پشتیبانی دوزبانه** — نسخه فارسی (RTL) و انگلیسی (LTR)
- 📝 **بلاگ فنی** — ۳۸+ مقاله در حوزه‌های AI، DevOps، Data Science و ...
- 👥 **صفحه تیم** — معرفی اعضای تیم MovtiGroup
- 🚀 **صفحه پروژه‌ها** — نمایش پروژه‌های فعال
- 📞 **صفحه تماس** — فرم ارتباطی با اطلاعات تماس
- 🔍 **بهینه‌سازی SEO** — متا تگ‌ها، Open Graph، Structured Data (JSON-LD)، sitemap
- 🎨 **طراحی ریسپانسیو** با SCSS و انیمیشن‌های سفارشی
- 📄 **پیجینیشن بلاگ** — صفحه‌بندی خودکار مقالات

---

## ساختار پروژه

```
├── index.html                  # صفحه اصلی (فارسی)
├── en/                         # نسخه انگلیسی
│   ├── index.html
│   ├── blog/index.html
│   ├── teams/index.html
│   ├── projects/index.html
│   └── contact/index.html
├── blog/                       # صفحه اصلی بلاگ
├── teams/                      # صفحه تیم
├── projects/                   # صفحه پروژه‌ها
├── contact/                    # صفحه تماس
├── _posts/                     # مقالات بلاگ (FA + EN)
├── _layouts/                   # قالب‌های Jekyll
│   ├── default.html
│   └── post.html
├── _sass/                      # فایل‌های SCSS
│   ├── _variables.scss
│   ├── _animations.scss
│   └── _thailand.scss
├── assets/
│   ├── css/styles.css          # استایل‌های اصلی
│   ├── css/main.scss           # نقطه ورود SCSS
│   ├── js/main.js              # اسکریپت‌های جاوااسکریپت
│   └── images/                 # تصاویر، آیکون‌ها و فاویکون
├── _data/
│   ├── navigation.yml          # داده منوی ناوبری
│   └── translations.yml        # ترجمه‌ها
├── _config.yml                 # تنظیمات Jekyll
├── Gemfile                     # وابستگی‌های Ruby
├── CNAME                       # تنظیم دامنه سفارشی
└── robots.txt                  # قوانین خزنده‌ها
```

---

## تکنولوژی‌ها

| مورد           | فناوری                                                          |
| -------------- | --------------------------------------------------------------- |
| موتور سایت‌ساز | [Jekyll](https://jekyllrb.com/)                                 |
| استایل‌دهی     | SCSS / CSS                                                      |
| اسکریپت‌نویسی  | JavaScript (Vanilla)                                            |
| میزبانی        | [GitHub Pages](https://pages.github.com/)                       |
| پلاگین‌ها      | jekyll-feed, jekyll-seo-tag, jekyll-sitemap, jekyll-paginate-v2 |

---

## موضوعات بلاگ

مقالات بلاگ در دسته‌های زیر منتشر شده‌اند:

- 🤖 **هوش مصنوعی** — یادگیری ماشین، یادگیری عمیق، شبکه‌های عصبی، NLP، بینایی ماشین، Generative AI
- 🏥 **کاربرد AI** — سلامت، کشاورزی، مالی، آموزش، امنیت، انرژی، خودروهای خودران
- 🔧 **DevOps** — Docker، CI/CD، FastAPI، Git Workflow، Redis، Portainer
- 🗄️ **دیتابیس** — PostgreSQL، MySQL، SQL vs NoSQL
- 🌐 **وب** — امنیت وب، رمزگذاری سیستم‌های ایرانی، VPN/DDNS
- 🔮 **آینده‌نگری** — روندهای آینده AI، اخلاق AI، استارتاپ‌های AI ایرانی

---

## اجرای محلی

### پیش‌نیازها

- Ruby (>= 2.7)
- Bundler
- Jekyll

### نصب و اجرا

```bash
# نصب وابستگی‌ها
bundle install

# اجرای سرور محلی
bundle exec jekyll serve

# مشاهده سایت
# http://localhost:4000
```

### نسخه انگلیسی

```
http://localhost:4000/en/
```

---

## SEO

در صفحات اصلی این موارد برای بهینه‌سازی موتورهای جستجو تنظیم شده‌اند:

- متا تگ‌های `description`، `keywords`، `robots`
- Canonical URL
- Open Graph / Twitter Card metadata
- Structured Data (JSON-LD) برای Organization
- `sitemap.xml` خودکار (توسط jekyll-sitemap)
- `robots.txt` برای راهنمایی خزنده‌ها

---

## استقرار (Deploy)

این مخزن یک سایت استاتیک است و از طریق **GitHub Pages** منتشر می‌شود.

1. تغییرات را روی `main` (یا `master`) کامیت کنید.
2. GitHub Actions یا GitHub Pages به‌صورت خودکار سایت را بیلد و منتشر می‌کند.
3. دامنه `movtigroup.me` از طریق فایل `CNAME` به GitHub Pages متصل است.

> ⚠️ اگر سایت روی دامنه نمایش داده نشد، تنظیمات DNS دامنه باید به GitHub Pages اشاره کند.

---

## مجوز

این پروژه متعلق به **MovtiGroup** است.
