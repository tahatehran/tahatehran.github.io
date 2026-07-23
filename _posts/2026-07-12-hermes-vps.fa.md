---
layout: post
title: "راهنمای کامل راه‌اندازی Hermes روی VPS"
date: 2026-07-12 13:00:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/hermes-vps/
description: "نحوه استقرار و پیکربندی Hermes روی سرور ابری (VPS) — از انتخاب سرور تا اجرای پایدار با Docker و امنیت."
categories: [openclaw, comparison, ai-agents, docker, python, api]
---

Hermes یک لایه ارتباطی/واسط (gateway/bridge) است که دستیارهای هوشمند را به کانال‌های مختلف (تلگرام، وب، API) متصل می‌کند. در این مقاله، نحوه راه‌اندازی Hermes روی یک VPS را گام‌به‌گام توضیح می‌دهیم.

## 🖥️ انتخاب VPS مناسب

| منبع | پیشنهاد حداقل | پیشنهاد بهینه |
|------|---------------|----------------|
| CPU | ۱ هسته | ۲ هسته |
| RAM | ۱ گیگ | ۲ گیگ |
| دیسک | ۱۰ گیگ SSD | ۲۰ گیگ SSD |
| OS | Ubuntu 22.04 | Debian 12 |

**پیشنهاد ارائه‌دهنده:** Oracle Cloud Free (۴ هسته ARM، ۲۴ گیگ رم رایگان) برای تست، یا Hetzner (۲ یورو/ماه) برای تولید.

## 📦 گام ۱: آماده‌سازی سرور

```bash
# به‌روزرسانی سیستم
sudo apt update && sudo apt upgrade -y

# نصب Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# نصب ابزارهای کمکی
sudo apt install -y curl git ufw
```

## 🐳 گام ۲: داکر-کامپوز برای Hermes

فایل `docker-compose.yml`:

```yaml
version: "3.8"
services:
  hermes:
    image: your-hermes-image:latest
    container_name: hermes
    restart: unless-stopped
    cpus: "1.0"
    mem_limit: 750m
    ports:
      - "8080:8080"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - HERMES_TOKEN=${HERMES_TOKEN}
    env_file:
      - .env
```

فایل `.env`:

```
HERMES_TOKEN=your-secret-token-here
```

## ⚙️ گام ۳: پیکربندی Hermes

فایل پیکربندی `config.json`:

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "auth": {
      "mode": "token",
      "token": "your-secret-token-here"
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    }
  },
  "model": {
    "provider": "openai",
    "baseUrl": "https://api.openai.com/v1",
    "default": "gpt-4o-mini"
  }
}
```

## 🔥 گام ۴: فایروال و امنیت

```bash
# فعال‌سازی UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 8080/tcp

# یا محدود کردن دسترسی به IP خاص
sudo ufw allow from 1.2.3.4 to any port 8080
```

### استفاده از Nginx به‌عنوان Reverse Proxy

```nginx
server {
    listen 80;
    server_name hermes.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

سپس با Certbot گواهینامه HTTPS بگیرید:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d hermes.yourdomain.com
```

## 🚀 گام ۵: اجرا و مانیتورینگ

```bash
# اجرا
docker-compose up -d

# بررسی وضعیت
docker ps
docker logs hermes

# تست سلامت
curl http://localhost:8080/health
```

### مانیتورینگ با systemd (اختیاری)

اگر به‌جای Docker می‌خواهید Hermes را به‌عنوان سرویس سیستم اجرا کنید:

```ini
# /etc/systemd/system/hermes.service
[Unit]
Description=Hermes Service
After=network.target

[Service]
Type=simple
User=hermes
WorkingDirectory=/opt/hermes
ExecStart=/usr/bin/node /opt/hermes/dist/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

## 💾 بکاپ‌گیری

```bash
# بکاپ دوره‌ای از داده‌ها
tar -czf hermes-backup-$(date +%Y%m%d).tar.gz ./data

# یا استفاده از cron
0 3 * * * tar -czf /backup/hermes-$(date +\%Y\%m\%d).tar.gz /opt/hermes/data
```

## ✅ چک‌لیست نهایی

- [ ] VPS با منابع کافی راه‌اندازی شد
- [ ] Docker نصب و تست شد
- [ ] فایل `.env` با توکن امن پر شد
- [ ] فایروال تنظیم شد
- [ ] HTTPS فعال شد (اختیاری ولی توصیه‌شده)
- [ ] Health check پاس شد
- [ ] بکاپ‌گیری تنظیم شد

---

**نکته:** Hermes را همیشه پشت یک لایه امنیتی (Reverse Proxy + HTTPS) نگه دارید و از توکن‌های قوی استفاده کنید.
