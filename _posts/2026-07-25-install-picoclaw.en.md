---
layout: post
title: "How to Install PicoClaw: AI Agent on $10 Hardware"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-picoclaw/
description: "Guide to install PicoClaw on Raspberry Pi, RISC-V boards, and other affordable hardware for edge AI."
categories: ['picoclaw', 'openclaw', 'tutorial', 'go', 'edge-computing']
---

PicoClaw runs a full AI agent on $10 hardware. This guide covers installation on Raspberry Pi and RISC-V devices.

## 📋 Prerequisites

- Raspberry Pi (Zero 2W, 3, 4, 5) or RISC-V board
- MicroSD card (8GB+)
- Stable internet connection
- Power supply for your device

## 🍓 Raspberry Pi Installation

### Step 1: Flash Raspberry Pi OS
```bash
# Using Raspberry Pi Imager
# Choose Raspberry Pi OS Lite (64-bit)
# Enable SSH during setup
```

### Step 2: Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y golang sqlite3 git
```

### Step 3: Install PicoClaw
```bash
# Option A: Quick install
curl -fsSL https://picoclaw.dev/install.sh | bash

# Option B: From source
git clone https://github.com/sipeed/picoclaw
cd picoclaw
make install
```

### Step 4: Configure
```bash
picoclaw init --name my-pi-assistant
picoclaw config set provider.type openai
picoclaw config set provider.api_key "sk-your-key"
picoclaw config set channels.telegram.token "YOUR_TOKEN"
```

### Step 5: Run
```bash
# Start PicoClaw
picoclaw start

# Or run as systemd service
picoclaw service install
sudo systemctl start picoclaw
```

## 🖥️ RISC-V Installation (Sipeed LicheeRV)

### Step 1: Flash Debian
```bash
# Download LicheeRV Debian image
# Flash to MicroSD using dd
sudo dd if=LicheeRV-Debian.img of=/dev/sdX bs=1M status=progress
```

### Step 2: Install
```bash
sudo apt update
sudo apt install -y golang sqlite3
curl -fsSL https://picoclaw.dev/install-riscv.sh | bash
```

### Step 3: Configure and Run
```bash
picoclaw init
picoclaw config set provider.type ollama
picoclaw config set provider.url http://localhost:11434
picoclaw start
```

## 🐳 Docker Installation (Any Platform)

```yaml
version: '3.8'
services:
  picoclaw:
    image: picoclaw/picoclaw:latest
    restart: unless-stopped
    volumes:
      - ./config:/root/.picoclaw
      - ./data:/root/.picoclaw/data
    environment:
      - OPENCLAW_URL=http://openclaw:18789
```

```bash
docker-compose up -d
```

## ⚙️ Resource Optimization

### For Raspberry Pi Zero (512MB RAM)
```toml
# ~/.picoclaw/config.toml
[performance]
max_memory = "128MB"
max_concurrent = 5
enable_cache = true

[provider]
type = "ollama"
url = "http://your-server:11434"  # Offload LLM to a bigger machine
```

### For RISC-V (64MB RAM)
```toml
[performance]
max_memory = "32MB"
max_concurrent = 2
enable_cache = false
use_compressed_model = true
```

## ✅ Verification

```bash
# Check system resources
picoclaw doctor

# Test connection
picoclaw test

# View dashboard
picoclaw dashboard
```

Expected output on Pi Zero:
```
Platform:       Raspberry Pi Zero 2W
RAM usage:      8.2MB / 512MB
CPU usage:      12%
Disk usage:     45MB
Status:         ✅ Healthy
Channels:       1/1 connected
```

## 🐛 Troubleshooting

### Out of Memory
```bash
# Check memory usage
free -h

# Reduce PicoClaw memory limit
picoclaw config set performance.max_memory "64MB"
picoclaw restart
```

### Slow Response
```bash
# Use a remote LLM provider instead of local
picoclaw config set provider.type openai
picoclaw config set provider.api_key "sk-your-key"
picoclaw restart
```

---

**Resources:**
- [PicoClaw GitHub](https://github.com/sipeed/picoclaw)
- [PicoClaw Documentation](https://picoclaw.dev)
