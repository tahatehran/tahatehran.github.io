---
layout: post
title: "نصب و مانیتورینگ با Portainer در لینوکس"
date: 2026-05-23 18:00:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/portainer-linux/
description: "مدیریت بصری کانتینرهای داکر با استفاده از پنل قدرتمند Portainer."
---

اگر از خط فرمان داکر خسته شده‌اید، Portainer بهترین رابط گرافیکی برای مدیریت کانتینرهای شماست.

## 📊 چرا Portainer؟
این ابزار به شما اجازه می‌دهد وضعیت تمام کانتینرها، ایمیج‌ها و شبکه را به صورت لحظه‌ای مانیتور کنید.

## 🚀 نصب سریع
```bash
docker run -d -p 9443:9443 --name portainer --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data portainer/portainer-ce:latest
```

با پورتینر، مدیریت زیرساخت لذت‌بخش‌تر می‌شود.
