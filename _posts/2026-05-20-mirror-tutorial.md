---
layout: post
title: "آموزش شروع کار با پروژه Mirror"
date: 2026-05-20 10:00:00 +0330
lang: fa
categories: [fa]
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/mirror-tutorial/
description: "راهنمای سریع برای استفاده از اسکریپت‌ها و اجرای محلی پروژه Mirror. آموزش Mirror را در موتی‌گروپ بخوانید."
---

این آموزش براساس اطلاعات مخزن [movtigroup/Mirror](https://github.com/movtigroup/Mirror) آماده شده است.

## ۱) معرفی
Mirror مجموعه‌ای از مستندات و ابزارهای آینه نرم‌افزاری است که برای دسترسی سریع‌تر و پایدارتر به سرویس‌ها استفاده می‌شود.

## ۲) دستورات One-click
- لینوکس (اوبونتو/دبیان):
```bash
bash <(curl -sSL https://Linux.ththt.ir)
```
- نصب داکر و آینه:
```bash
bash <(curl -sSL https://install.ththt.ir/docker.sh)
```
- فقط تنظیم آینه داکر:
```bash
bash <(curl -sSL https://install.ththt.ir/mirror.sh)
```

## ۳) اجرای محلی مستندات
برای اجرای محلی پروژه:
```bash
docker-compose up -d --build
```
سپس آدرس `http://localhost:8080` را باز کنید.

## ۴) لینک‌های مهم
- مخزن GitHub: [github.com/movtigroup/Mirror](https://github.com/movtigroup/Mirror)
- وبسایت مستندات: [doc.movtigroup.ir](https://doc.movtigroup.ir)
