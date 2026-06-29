---
layout: post
title: "پیکربندی MySQL با داکر"
date: 2024-05-23 13:00:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/mysql-docker/
description: "آموزش گام‌به‌گام راه‌اندازی دیتابیس MySQL با استفاده از Docker Compose."
---

راه‌اندازی MySQL با داکر بسیار ساده و سریع است. در این آموزش یاد می‌گیرید چگونه با Docker Compose یک دیتابیس پایدار ایجاد کنید.

## 🛠 فایل docker-compose.yml
کافیست یک فایل با محتوای زیر بسازید:
```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret_password
    ports:
      - "3306:3306"
```

سپس با دستور `docker-compose up -d` دیتابیس شما آماده استفاده است!
