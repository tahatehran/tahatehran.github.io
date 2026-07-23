---
layout: post
title: "دستورات ضروری لینوکس برای توسعه‌دهندگان"
date: 2026-07-20 12:00:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/linux-commands/
description: "آشنایی با دستورات کاربردی لینوکس که هر توسعه‌دهنده باید بداند، از grep و sed تا systemctl و جستجوی فایل‌ها."
categories: [python, linux, docker, api]
---

لینوکس به عنوان سیستم‌عامل غالب در سرورها و محیط‌های توسعه، تسلط بر دستورات آن یکی از مهارت‌های ضروری برای توسعه‌دهندگان است.

## 🔍 جستجو و فیلتر کردن

### grep
جستجوی الگو در متن فایل‌ها:
```bash
grep -r "error" /var/log/
```

### find
یافتن فایل‌ها بر اساس معیارهای مختلف:
```bash
find /home -name "*.log" -mtime -7
```

## 🔧 مدیریت سرویس‌ها

### systemctl
مدیریت سرویس‌های سیستم:
```bash
systemctl status nginx
systemctl restart docker
```

## 📦 مدیریت فایل‌ها

### tar
فشرده‌سازی و استخراج:
```bash
tar -czf backup.tar.gz /path/to/dir
```

## 💡 نتیجه‌گیری

تسلط بر این دستورات، بهره‌وری شما در محیط لینوکس را به شدت افزایش می‌دهد.
