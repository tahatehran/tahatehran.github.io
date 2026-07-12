---
layout: post
title: "Complete Guide: Deploying Hermes on a VPS"
date: 2026-07-12 13:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/hermes-vps/
description: "Step-by-step guide to deploy and configure Hermes on a cloud VPS — from server selection to stable Docker deployment with security."
---

Hermes is a communication/bridge layer (gateway) that connects AI assistants to various channels (Telegram, web, API). In this article, we explain how to deploy Hermes on a VPS step by step.

## 🖥️ Choosing the Right VPS

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 1 core | 2 cores |
| RAM | 1 GB | 2 GB |
| Disk | 10 GB SSD | 20 GB SSD |
| OS | Ubuntu 22.04 | Debian 12 |

**Provider suggestion:** Oracle Cloud Free (4 ARM cores, 24 GB RAM free) for testing, or Hetzner (€2/month) for production.

## 📦 Step 1: Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install helpers
sudo apt install -y curl git ufw
```

## 🐳 Step 2: Docker Compose for Hermes

`docker-compose.yml`:

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

`.env` file:

```
HERMES_TOKEN=your-secret-token-here
```

## ⚙️ Step 3: Hermes Configuration

`config.json`:

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

## 🔥 Step 4: Firewall & Security

```bash
# Enable UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 8080/tcp

# Or restrict to specific IP
sudo ufw allow from 1.2.3.4 to any port 8080
```

### Using Nginx as Reverse Proxy

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

Then get HTTPS with Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d hermes.yourdomain.com
```

## 🚀 Step 5: Run & Monitor

```bash
# Run
docker-compose up -d

# Check status
docker ps
docker logs hermes

# Health check
curl http://localhost:8080/health
```

### systemd Monitoring (optional)

If you want Hermes as a system service instead of Docker:

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

## 💾 Backup

```bash
# Periodic backup
tar -czf hermes-backup-$(date +%Y%m%d).tar.gz ./data

# Or via cron
0 3 * * * tar -czf /backup/hermes-$(date +\%Y\%m\%d).tar.gz /opt/hermes/data
```

## ✅ Final Checklist

- [ ] VPS with sufficient resources provisioned
- [ ] Docker installed and tested
- [ ] `.env` filled with secure token
- [ ] Firewall configured
- [ ] HTTPS enabled (optional but recommended)
- [ ] Health check passed
- [ ] Backup scheduled

---

**Note:** Always keep Hermes behind a security layer (Reverse Proxy + HTTPS) and use strong tokens.
