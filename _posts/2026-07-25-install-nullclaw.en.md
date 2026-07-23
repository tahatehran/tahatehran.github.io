---
layout: post
title: "How to Install NullClaw: The 678KB AI Agent Runtime"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-nullclaw/
description: "Quick guide to install NullClaw, the ultra-lightweight Zig-powered AI agent that runs in under 1MB RAM."
categories: ['nullclaw', 'openclaw', 'tutorial', 'zig', 'lightweight']
---

NullClaw is the lightest full-featured AI agent at just 678KB. Here's how to install and run it.

## 📋 Prerequisites

- Linux, macOS, or Windows (WSL2)
- Any modern CPU (ARM, x86, RISC-V supported)
- 1MB+ RAM available

## 🚀 Quick Install

### One-Line Install
```bash
curl -fsSL https://nullclaw.dev/install.sh | bash
```

### Verify Installation
```bash
nullclaw --version
# Expected: NullClaw v1.0.0 (678KB)
```

## 🔧 Build from Source

### Install Zig
```bash
# macOS
brew install zig

# Linux
sudo snap install zig --classic

# Or download from https://ziglang.org/download/
```

### Build NullClaw
```bash
git clone https://github.com/nullclaw/nullclaw
cd nullclaw

# Build optimized release
zig build -Doptimize=ReleaseFast

# The binary is at zig-out/bin/nullclaw
ls -lh zig-out/bin/nullclaw
# Expected: ~678KB
```

## ⚙️ Configuration

### Create Config File
```bash
mkdir -p ~/.nullclaw
cat > ~/.nullclaw/config.toml << 'EOF'
[agent]
name = "my-nullclaw"
model = "gpt-4"

[provider]
type = "openai"
api_key = "sk-your-key-here"

[channels]
telegram = { token = "YOUR_BOT_TOKEN", enabled = true }
discord = { token = "YOUR_BOT_TOKEN", enabled = true }
whatsapp = { enabled = false }

[skills]
directory = "./skills"
hot_reload = true

[storage]
type = "sqlite"
path = "./nullclaw.db"

[memory]
type = "sqlite"
max_entries = 10000
EOF
```

### Connect to OpenClaw
```bash
nullclaw config set openclaw.url http://localhost:18789
nullclaw config set openclaw.secret "your-hmac-secret"
```

## 🏃 Run NullClaw

```bash
# Start the daemon
nullclaw daemon start

# Or run interactively
nullclaw chat

# Check status
nullclaw status

# View logs
nullclaw logs --tail 20
```

## 📦 Install Skills

```bash
# Search for skills
nullclaw skills search "data analysis"

# Install a skill
nullclaw skills install office-excel

# List installed skills
nullclaw skills list

# Update all skills
nullclaw skills update --all
```

## ✅ Verification

```bash
# Quick health check
nullclaw health

# Test provider connection
nullclaw test-provider

# Test channel connections
nullclaw test-channels

# Benchmark performance
nullclaw benchmark
```

Expected output:
```
Startup time:    1.2ms
Memory usage:    847KB
Provider ping:   45ms
Channels:        2/2 connected
```

## 🐛 Troubleshooting

### Binary Not Found
```bash
# Add NullClaw to PATH
export PATH="$HOME/.nullclaw/bin:$PATH"

# Or add to .bashrc/.zshrc
echo 'export PATH="$HOME/.nullclaw/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### SQLite Error
```bash
# Ensure the data directory exists
mkdir -p ~/.nullclaw/data
nullclaw daemon restart
```

---

**Resources:**
- [NullClaw GitHub](https://github.com/nullclaw/nullclaw)
- [NullClaw Documentation](https://nullclaw.dev)
