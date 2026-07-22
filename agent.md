# Blog Structure Guide

This file documents the canonical structure of the MovtiGroup blog. Do not lose this structure. If you add new posts, follow this guide exactly.

## Post locations

- English posts: `_posts/*.en.md`
- Persian posts: `_posts/*.fa.md`

## Front matter rules

Every post MUST have:

```yaml
---
layout: post
title: "Exact Title Here"
date: YYYY-MM-DD HH:MM:SS +0330
lang: en|fa
locale: en|fa
dir: ltr|rtl
author: MovtiGroup
permalink: /blog/slug-goes-here/
description: "Exact Title Here"
---
```

### Language-specific rules

- `lang: en` → `locale: en`, `dir: ltr`
- `lang: fa` → `locale: fa`, `dir: rtl`

### Permalink rules

- English posts: `/en/blog/slug-goes-here/` or `/blog/slug-goes-here.en/`
- Persian posts: `/blog/slug-goes-here.fa/` or `/blog/slug-goes-here/`

### Filename rules

- English: `YYYY-MM-DD-slug-goes-here.en.md`
- Persian: `YYYY-MM-DD-slug-goes-here.fa.md`

No `.en.` inside the permalink slug for English posts unless explicitly required by theme.

## Categories

Use categories sparingly. Only add to these groups:

- `openclaw`, `kiloclaw`, `openclaw-comparison` for OpenClaw-related posts
- `kilo-ai`, `ai-coding`, `free-models` for Kilo AI posts
- `docker`, `devops`, `linux` for Docker and system posts

Categories are tags, not folders. Do not create category archive pages unless requested.

## Content rules

- Keep line length under 120 chars
- Use real headings (`##`, `###`) not bold text
- Use tables for comparisons
- Use real lists (`-`, `1.`) not inline text
- Do not put emojis in titles or headings
- Persian posts: use proper Fingilish tech terms with Persian explanation

## Mobile rules

- Test on narrow viewports (320px width)
- Do not rely on hover interactions
- Use `touch-action: pan-y` on scroll containers
- Use `-webkit-overflow-scrolling: touch` for smooth scrolling
- Avoid fixed position elements that cover content

## Build rules

- Do not change `_config.yml` pagination without testing
- Do not add custom JS that shadows theme CSS
- All new posts must render as 200 on production before marking done
- Check `https://movtigroup.me/blog/` after every push

## Current counts

- Total posts target: ~60
- English target: ~50
- Persian target: ~10
- Maintain a 5:1 ratio English to Persian

## Recent changes

- 2026-07-23: Added 12 new Kilo AI posts (6 EN, 6 FA)
- 2026-07-23: Fixed permalink format for English posts
- 2026-07-23: Added mobile touch scrolling CSS
- 2026-07-23: Updated _config.yml for multilingual defaults
