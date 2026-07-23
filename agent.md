# Blog Structure Guide

This file documents the canonical structure of the MovtiGroup blog. Do not lose this structure. If you add new posts, follow this guide exactly.

## Current Counts

- **Total posts: 126** (69 English + 57 Persian)
- English posts: `_posts/*.en.md` → 69 files
- Persian posts: `_posts/*.fa.md` → 57 files

## Post Locations

- English posts: `_posts/YYYY-MM-DD-slug.en.md`
- Persian posts: `_posts/YYYY-MM-DD-slug.fa.md`

Every post lives in the `_posts/` directory. There are no subdirectories for posts.

**IMPORTANT:** All posts use language-specific extensions:
- English: `*.en.md`
- Persian: `*.fa.md`

Do NOT use plain `.md` for Persian posts.

## Front Matter Rules

Every post MUST have this exact front matter structure:

```yaml
---
layout: post
title: "Exact Title Here"
date: YYYY-MM-DD HH:MM:SS +0330
lang: en|fa
locale: en|fa
dir: ltr|rtl
author: MovtiGroup
permalink: /en/blog/slug/ # or /blog/slug/
description: "Exact Title Here"
categories: [category1, category2]
---
```

### Required Fields

| Field         | Required | Notes                                              |
| ------------- | -------- | -------------------------------------------------- |
| `layout`      | Yes      | Always `post`                                      |
| `title`       | Yes      | Exact title, must match `description` for SEO      |
| `date`        | Yes      | Format: `YYYY-MM-DD HH:MM:SS +0330`                |
| `lang`        | Yes      | `en` or `fa`                                       |
| `locale`      | Yes      | `en` or `fa` — must match `lang`                   |
| `dir`         | Yes      | `ltr` for English, `rtl` for Persian               |
| `author`      | Yes      | Always `MovtiGroup`                                |
| `permalink`   | Yes      | Must follow permalink conventions (see below)      |
| `description` | Yes      | Exact same text as `title`                         |
| `categories`  | Yes      | Array from the allowed categories list (see below) |

### Language-Specific Rules

- `lang: en` → `locale: en`, `dir: ltr`
- `lang: fa` → `locale: fa`, `dir: rtl`

## Permalink Conventions

### English Posts

- **File:** `_posts/YYYY-MM-DD-slug.en.md`
- **Permalink:** `/en/blog/slug/`
- **Example:** `/en/blog/ai-agents-vs-rpa-business-automation-2026/`

### Persian Posts

- **File:** `_posts/YYYY-MM-DD-slug.md`
- **Permalink:** `/blog/slug/`
- **Example:** `/blog/code-agents/`

### Important Permalink Rules

- **NEVER** use `.en.` inside the permalink slug for English posts
- **NEVER** change existing post URLs or titles
- English permalinks always start with `/en/blog/`
- Persian permalinks always start with `/blog/`
- Slugs should be lowercase, hyphenated, and descriptive

## Category Rules

### Category Page Conventions

Each category has two pages:

- **EN:** `blog/category/{name}.md` → permalink `/en/blog/category/{name}/`
- **FA:** `blog/category/{name}.fa.md` → permalink `/blog/category/{name}/`

### Allowed Categories

Use ONLY these categories. Do not invent new ones without updating this file and creating the category pages.

| Category        | Title           | Description                                                  |
| --------------- | --------------- | ------------------------------------------------------------ |
| `ai-agents`     | AI Agents       | عوامل هوش مصنوعی، autonomous agents، دستیارهای هوشمند        |
| `api`           | API             | رابط‌های برنامه‌نویسی، REST، GraphQL                         |
| `docker`        | Docker & DevOps | راهنمای نصب و استفاده از Docker، کانتینر، CI/CD و DevOps     |
| `tutorial`      | Tutorials       | آموزش‌های قدم به قدم، راهنمای عملی و مثال‌های کاربردی        |
| `general`       | General         | مطالب عمومی در مورد فناوری، برنامه‌نویسی و هوش مصنوعی        |
| `python`        | Python          | برنامه‌نویسی پایتون، داده‌کاوی، FastAPI، کتابخانه‌ها         |
| `security`      | Security        | امنیت سایبری، تست نفوذ، حریم خصوصی، حفاظت از داده‌ها         |
| `databases`     | Databases       | دیتابیس‌ها، PostgreSQL، MySQL، SQL vs NoSQL                  |
| `openclaw`      | OpenClaw        | مطالب مربوط به OpenClaw، مقایسه‌ها، راهنمای استفاده و مدیریت |
| `comparison`    | Comparisons     | مقایسه ابزارها، پلتفرم‌ها و فناوری‌های مختلف                 |
| `linux`         | Linux           | سیستم عامل لینوکس، دستورات، مدیریت سرور، آموزش‌ها            |
| `devops`        | DevOps          | عملیات توسعه و زیرساخت، CI/CD، مانیتورینگ                    |
| `kilo-ai`       | Kilo AI         | ابزارهای هوش مصنوعی Kilo، مدل‌های کدنویسی، benchmark         |
| `ai-coding`     | AI Coding       | کدنویسی با هوش مصنوعی، ابزارهای برنامه‌نویسی، Copilot        |
| `gateway`       | Gateway         | دروازه‌های AI، پروکسی، load balancing                        |
| `ai-tools`      | AI Tools        | ابزارها و پلتفرم‌های هوش مصنوعی                              |
| `model-routing` | Model Routing   | مسیریابی مدل‌ها، انتخاب مدل بر اساس وظیفه                    |
| `free-models`   | Free Models     | مدل‌های رایگان و open-source هوش مصنوعی                      |
| `benchmarks`    | Benchmarks      | معیارسنجی و مقایسه عملکرد مدل‌ها و ابزارها                   |
| `javascript`    | JavaScript      | برنامه‌نویسی جاوااسکریپت، فریم‌ورک‌ها، Node.js               |

### Adding a New Category

To add a new category, create FOUR files:

1. `blog/category/{name}.md` (EN page)
2. `blog/category/{name}.fa.md` (FA page)
3. Add the category to this file's table
4. Add it to `blog/search-data.json` entries that use it

## Search Data Structure

The search index lives at `blog/search-data.json` and contains all 126 posts. Each entry has:

```json
{
  "title": "Post Title",
  "url": "/en/blog/slug/ or /blog/slug/",
  "description": "Same as title",
  "lang": "en or fa",
  "categories": ["category1", "category2"],
  "date": "YYYY-MM-DD HH:MM:SS +0330",
  "excerpt": "First ~150 chars of content"
}
```

### Search Pages

- **EN:** `blog/search.html` → `/blog/search/`
- **FA:** `blog/search.fa.html` → `/fa/blog/search/`
- Both fetch `search-data.json` and filter client-side
- Fuzzy matching on title, description, and categories

## Blog Page Structure

```
blog/
├── index.html              # /blog/ — All posts listing (EN), uses category layout
├── search.html             # /blog/search/ — Search page (EN)
├── search.fa.html          # /fa/blog/search/ — Search page (FA)
├── search-data.json        # Search index (all posts)
└── category/
    ├── ai-agents.md        # /en/blog/category/ai-agents/ (EN)
    ├── ai-agents.fa.md     # /blog/category/ai-agents/ (FA)
    ├── api.md              # (if exists)
    ├── docker.md           # /en/blog/category/docker/ (EN)
    ├── docker.fa.md        # /blog/category/docker/ (FA)
    └── ... (20 categories × 2 languages)
```

```
en/blog/
└── index.html              # /en/blog/ — Blog listing (EN)
```

## Content Rules

- Keep line length under 120 chars
- Use real headings (`##`, `###`) not bold text
- Use tables for comparisons
- Use real lists (`-`, `1.`) not inline text
- Do not put emojis in titles or headings
- Persian posts: use proper Fingilish tech terms with Persian explanation

## Mobile Rules

- Test on narrow viewports (320px width)
- Do not rely on hover interactions
- Use `touch-action: pan-y` on scroll containers
- Use `-webkit-overflow-scrolling: touch` for smooth scrolling
- Avoid fixed position elements that cover content

## Build Rules

- Do not change `_config.yml` pagination without testing
- Do not add custom JS that shadows theme CSS
- All new posts must render as 200 on production before marking done
- Check `https://movtigroup.me/blog/` after every push

## New Post Checklist

When creating a new post, follow ALL of these steps:

1. **Choose language:** EN → `.en.md`, FA → `.md`
2. **File name:** `YYYY-MM-DD-descriptive-slug.en.md` or `YYYY-MM-DD-descriptive-slug.md`
3. **Front matter:** Include ALL required fields (see Front Matter Rules)
4. **Permalink:** EN → `/en/blog/slug/`, FA → `/blog/slug/`
5. **Categories:** Use ONLY from the allowed list above
6. **Title = Description:** Keep them identical for SEO
7. **Update search-data.json:** Add the new post entry
8. **Test locally:** `bundle exec jekyll serve` and verify the post renders

## Recent Changes

- 2026-07-23: Added 12 new Kilo AI posts (6 EN, 6 FA)
- 2026-07-23: Added 20 AI agent business posts (EN only)
- 2026-07-23: Fixed permalink format for English posts
- 2026-07-23: Added mobile touch scrolling CSS
- 2026-07-23: Updated \_config.yml for multilingual defaults
- 2026-07-23: Expanded to 126 total posts (69 EN, 57 FA)
- 2026-07-23: Added 20 category pages with descriptions
