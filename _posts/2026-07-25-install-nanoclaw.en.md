---
layout: post
title: "How to Install NanoClaw: Multi-Channel AI Agent Gateway"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-nanoclaw/
description: "Complete guide to install NanoClaw and connect OpenClaw to WhatsApp, Telegram, and Discord with container isolation."
categories: ['nanoclaw', 'openclaw', 'tutorial', 'docker', 'messaging']
---

NanoClaw connects your OpenClaw assistant to multiple messaging platforms with container isolation. Follow this guide to get started.

## 📋 Prerequisites

- Node.js 18+ installed
- Docker installed (for container isolation)
- OpenClaw running on localhost
- Messaging platform accounts/bots

## 🚀 Quick Install

### Step 1: Install NanoClaw CLI
```bash
npm install -g nanoclaw
```

### Step 2: Initialize Configuration
```bash
nanoclaw init --name my-nanoclaw
cd my-nanoclaw
```

### Step 3: Configure Channels
```bash
# Telegram
nanoclaw config set channels.telegram.token "YOUR_BOT_TOKEN"
nanoclaw config set channels.telegram.enabled true

# Discord
nanoclaw config set channels.discord.token "YOUR_BOT_TOKEN"
nanoclaw config set channels.discord.enabled true

# WhatsApp (requires WhatsApp Business API)
nanoclaw config set channels.whatsapp.phone_number_id "YOUR_ID"
nanoclaw config set channels.whatsapp.access_token "YOUR_TOKEN"
nanoclaw config set channels.whatsapp.enabled true
```

### Step 4: Connect to OpenClaw
```bash
nanoclaw config set openclaw.url http://localhost:18789
nanoclaw config set openclaw.secret "YOUR_HMAC_SECRET"
```

### Step 5: Start NanoClaw
```bash
nanoclaw start
```

## 🐳 Docker Compose Installation

```yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "18789:18789"
    volumes:
      - ./openclaw-data:/root/.openclaw
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  nanoclaw:
    image: nanoclaw/gateway:latest
    ports:
      - "18791:18791"
    volumes:
      - ./nanoclaw-config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - OPENCLAW_URL=http://openclaw:18789
      - TELEGRAM_TOKEN=${TELEGRAM_TOKEN}
      - DISCORD_TOKEN=${DISCORD_TOKEN}
    depends_on:
      - openclaw

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

```bash
# Create .env file
cat > .env << 'EOF'
OPENAI_API_KEY=sk-your-key-here
TELEGRAM_TOKEN=your-telegram-bot-token
DISCORD_TOKEN=your-discord-bot-token
EOF

# Start everything
docker-compose up -d
```

## 🔧 Channel Setup Guides

### Telegram Bot Setup
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow prompts
3. Copy the bot token
4. Set it in NanoClaw: `nanoclaw config set channels.telegram.token "TOKEN"`

### Discord Bot Setup
1. Go to [Discord Developer Portal](https://discord.com/developers)
2. Create a new application
3. Go to Bot → Add Bot
4. Copy the token
5. Enable Message Content Intent
6. Invite bot to your server

### WhatsApp Setup
1. Go to [Meta Business](https://business.facebook.com)
2. Create a WhatsApp Business account
3. Get Phone Number ID and Access Token
4. Configure webhook URL: `http://your-server:18791/webhook/whatsapp`

## ✅ Verification

```bash
# Check NanoClaw status
nanoclaw status

# Test Telegram bot
# Send a message to your bot on Telegram

# Check logs
nanoclaw logs --tail 50
```

## 🐛 Troubleshooting

### Bot Not Responding
```bash
# Check if NanoClaw is running
nanoclaw status

# Check channel connections
nanoclaw channels status

# Test OpenClaw connection
curl http://localhost:18789/health
```

### Docker Socket Permission Error
```bash
# Add your user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

---

**Resources:**
- [NanoClaw Documentation](https://docs.nanoclaw.dev)
- [OpenClaw Gateway Guide](https://docs.openclaw.ai/gateway)
