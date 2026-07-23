# Blog Post Writing Guide — MovtiGroup

This file explains exactly how to create new blog posts in both English and Persian. Follow every step precisely to maintain site structure.

---

## Quick Start

1. Create a new `.md` file in `_posts/`
2. Add front matter (see templates below)
3. Write your content in Markdown
4. Commit and push — the site builds automatically

---

## File Naming Convention

| Language    | Pattern                 | Example                       |
| ----------- | ----------------------- | ----------------------------- |
| **English** | `YYYY-MM-DD-slug.en.md` | `2026-07-24-my-article.en.md` |
| **Persian** | `YYYY-MM-DD-slug.fa.md` | `2026-07-24-my-article.fa.md` |

**Rules:**

- Date must be real (Jekyll won't build future-dated posts)
- Slug: lowercase, words separated by hyphens, no spaces or special characters
- English posts **must** end with `.en.md`
- Persian posts **must** end with `.fa.md`
- Do NOT use plain `.md` for Persian posts
- Do NOT use `.fa.en.md` or any other mixed extension

---

## Front Matter Templates

### English Post Template

```yaml
---
layout: post
title: "Your Exact English Title Here"
date: 2026-07-24 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/your-slug-here/
description: "A clear, concise description of the post (150-160 chars for SEO)"
categories: [category1, category2]
---
```

### Persian Post Template

```yaml
---
layout: post
title: "عنوان دقیق فارسی اینجا"
date: 2026-07-24 12:00:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/your-slug-here/
description: "توضیحات کوتاه و واضح درباره پست (۱۵۰-۱۶۰ کاراکتر برای SEO)"
categories: [category1, category2]
---
```

---

## Front Matter Fields — Required

| Field         | English Value               | Persian Value           | Notes                          |
| ------------- | --------------------------- | ----------------------- | ------------------------------ |
| `layout`      | `post`                      | `post`                  | Always `post`                  |
| `title`       | English title in quotes     | Persian title in quotes | Exact title, no HTML           |
| `date`        | `YYYY-MM-DD HH:MM:SS +0330` | Same format             | Iran time zone (+0330)         |
| `lang`        | `en`                        | `fa`                    | Language code                  |
| `locale`      | `en`                        | `fa`                    | Locale code                    |
| `dir`         | `ltr`                       | `rtl`                   | Text direction                 |
| `author`      | `MovtiGroup`                | `MovtiGroup`            | Always MovtiGroup              |
| `permalink`   | `/en/blog/slug/`            | `/blog/slug/`           | **Critical** — see rules below |
| `description` | English description         | Persian description     | Used in search & SEO           |
| `categories`  | `[cat1, cat2]`              | `[cat1, cat2]`          | From allowed list below        |

---

## Permalink Rules

| Language    | Pattern            | Example                     |
| ----------- | ------------------ | --------------------------- |
| **English** | `/en/blog/{slug}/` | `/en/blog/docker-tutorial/` |
| **Persian** | `/blog/{slug}/`    | `/blog/docker-tutorial/`    |

**Critical rules:**

- English posts **must** start with `/en/blog/`
- Persian posts **must** start with `/blog/`
- Slug should match between EN and FA posts (same topic = same slug)
- End with trailing slash `/`
- No spaces, use hyphens

---

## Allowed Categories

Use only these categories:

| Category        | Use For                                  |
| --------------- | ---------------------------------------- |
| `ai-agents`     | AI agents, LLM tools, autonomous systems |
| `ai-coding`     | AI-assisted coding, code generation      |
| `ai-tools`      | General AI tools and platforms           |
| `api`           | API development, REST, GraphQL           |
| `benchmarks`    | Performance benchmarks, comparisons      |
| `comparison`    | Tool/project comparisons                 |
| `docker`        | Docker, containers, orchestration        |
| `databases`     | SQL, NoSQL, database setup               |
| `devops`        | CI/CD, deployment, infrastructure        |
| `free-models`   | Free AI models, open weights             |
| `gateway`       | API gateways, proxies                    |
| `general`       | General tech topics                      |
| `javascript`    | JavaScript, Node.js, frontend            |
| `kilo-ai`       | Kilo AI tools and benchmarks             |
| `linux`         | Linux administration, commands           |
| `model-routing` | AI model routing, load balancing         |
| `openclaw`      | OpenClaw-related posts                   |
| `python`        | Python programming                       |
| `security`      | Security, privacy, VPN                   |
| `tutorial`      | Step-by-step tutorials                   |

**Rules:**

- Maximum 3-5 categories per post
- Use lowercase only
- Use existing categories from the list above
- New categories require updating `blog/category/` files (both `.md` and `.fa.md`)

---

## Content Writing Rules

### English Posts

- Write in clear, professional English
- Use proper Markdown formatting
- Include code blocks with language hints: ` ```python `
- Use `##` for main sections, `###` for subsections
- Keep paragraphs short (3-4 sentences max)
- Include links to GitHub repos and documentation
- Minimum 300 words

### Persian Posts

- Write in natural, professional Persian
- Use Persian numbers (۰۱۲۳۴۵۶۷۸۹) for text, Western numbers (0123456789) for code
- Technical terms can stay in English (Docker, Python, API)
- Use proper Persian punctuation (، ؛ ؟)
- RTL direction is automatic from front matter
- Minimum ۳۰۰ کلمه (300 words)

### Both Languages

- Start with a brief introduction (what the post covers)
- Use headings to break up content
- Include at least one code example or command
- End with a conclusion or next steps
- Link back to the GitHub repository when relevant

---

## Pairing EN/FA Posts

When writing the same article in both languages:

1. **Same slug** — Both posts use the same slug in the URL
2. **Same categories** — Use the same category tags
3. **Same date** — Use the same date
4. **Different permalinks** — EN: `/en/blog/slug/`, FA: `/blog/slug/`
5. **Different files** — `slug.en.md` and `slug.fa.md`

Example:

```
_posts/2026-07-24-docker-tutorial.en.md    # EN post
_posts/2026-07-24-docker-tutorial.fa.md    # FA post
```

---

## Step-by-Step: Creating a New Post

### Step 1: Choose language and create file

```bash
# For English:
touch _posts/2026-07-24-my-new-post.en.md

# For Persian:
touch _posts/2026-07-24-my-new-post.fa.md
```

### Step 2: Add front matter

Copy the appropriate template from above and fill in all fields.

### Step 3: Write content

````markdown
## Introduction

Brief intro about what this post covers.

## Main Section

Your content here. Use **bold** for emphasis and `code` for inline code.

### Subsection

More detailed content.

```python
# Code example
def hello():
    print("Hello from MovtiGroup!")
```
````

## Conclusion

Summary and next steps.

````

### Step 4: Verify before committing

Checklist:
- [ ] File name follows `YYYY-MM-DD-slug.{en,fa}.md` pattern
- [ ] All front matter fields are present
- [ ] `lang` matches file extension
- [ ] `permalink` starts with `/en/blog/` (EN) or `/blog/` (FA)
- [ ] `categories` are from the allowed list
- [ ] `description` is 150-160 characters
- [ ] Content is at least 300 words
- [ ] No broken Markdown syntax

### Step 5: Commit and push

```bash
git add _posts/2026-07-24-my-new-post.en.md
git commit -m "Add blog post: My New Post (EN)"
git push
````

---

## What Happens After Push

1. GitHub Pages builds the site automatically
2. The post appears on the blog index page (filtered by language)
3. The post is added to the search index (`blog/search-data.json`)
4. The post appears in category pages (if categories match)
5. SEO metadata is generated automatically (JSON-LD, Open Graph)

---

## Common Mistakes to Avoid

| Mistake                            | Fix                                     |
| ---------------------------------- | --------------------------------------- |
| Using `.md` for Persian posts      | Use `.fa.md`                            |
| Wrong permalink (`/blog/en/slug/`) | EN: `/en/blog/slug/`, FA: `/blog/slug/` |
| Missing `lang` field               | Add `lang: en` or `lang: fa`            |
| Wrong `dir` for language           | EN: `ltr`, FA: `rtl`                    |
| Using non-allowed categories       | Check the allowed categories list       |
| No `description` field             | Add a 150-160 char description          |
| Future date                        | Use today's date or earlier             |
| Duplicate permalinks               | Each post needs a unique permalink      |

---

## File Reference

| File                              | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `_posts/*.en.md`                  | English blog posts                     |
| `_posts/*.fa.md`                  | Persian blog posts                     |
| `_layouts/post.html`              | Post page template                     |
| `_layouts/default.html`           | Site-wide layout (header, footer, nav) |
| `blog/index.html`                 | Persian blog listing page              |
| `en/blog/index.html`              | English blog listing page              |
| `blog/search.html`                | English search page                    |
| `blog/search.fa.html`             | Persian search page                    |
| `blog/search-data.json`           | Search index (auto-generated)          |
| `blog/category/*.md`              | EN category pages                      |
| `blog/category/*.fa.md`           | FA category pages                      |
| `assets/css/styles.css`           | Global styles                          |
| `assets/css/pages.css`            | Page-specific styles                   |
| `assets/js/main.js`               | Global JavaScript                      |
| `assets/js/home.js`               | Homepage slider/animations             |
| `assets/js/blog-filter.js`        | Blog filtering                         |
| `assets/js/search.js`             | Search functionality                   |
| `scripts/generate_search_data.py` | Regenerate search index                |
| `agent.md`                        | Blog structure guide                   |
| `README.md`                       | Project documentation                  |
