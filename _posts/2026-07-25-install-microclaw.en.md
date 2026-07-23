---
layout: post
title: "How to Install MicroClaw: Rust Shell-Powered AI Agent"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-microclaw/
description: "Installation guide for MicroClaw with shell integration, persistent memory, and MCP federation."
categories: ['microclaw', 'openclaw', 'tutorial', 'rust', 'shell']
---

MicroClaw combines Rust performance with deep shell integration. This guide covers installation and setup.

## 📋 Prerequisites

- Rust 1.70+ or pre-built binary
- Linux or macOS (Windows via WSL2)
- Shell access (bash, zsh, fish)
- OpenClaw running on localhost

## 🚀 Quick Install

### Pre-built Binary
```bash
# Linux x86_64
curl -fsSL https://microclaw.ai/install.sh | bash

# macOS
brew install microclaw
```

### From Source
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Clone and build
git clone https://github.com/microclaw/microclaw
cd microclaw
cargo build --release

# Install binary
cp target/release/microclaw /usr/local/bin/
```

## ⚙️ Configuration

### Initialize Config
```bash
microclaw init --name my-microclaw
```

### Edit Configuration
```bash
cat > ~/.microclaw/config.toml << 'EOF'
[agent]
name = "my-microclaw"
model = "gpt-4"

[provider]
type = "openai"
api_key = "sk-your-key-here"

[shell]
enabled = true
allowed_commands = ["grep", "awk", "sed", "find", "ls", "cat", "git"]
blocked_commands = ["rm -rf", "sudo", "dd"]
timeout = 30s

[memory]
backend = "sqlite"
path = "~/.microclaw/memory.db"
ttl = "30d"
embeddings = true

[mcp]
federation_enabled = true
shared_tools = ["web-search", "code-analysis"]
trust_level = "verified"

[scheduler]
enabled = true
max_jobs = 10
EOF
```

### Connect to OpenClaw
```bash
microclaw config set openclaw.url http://localhost:18789
```

## 🏃 Run MicroClaw

### As Daemon
```bash
# Start daemon
microclaw daemon start --port 18792

# Check status
microclaw daemon status

# Stop daemon
microclaw daemon stop
```

### Interactive Mode
```bash
# Start chat session
microclaw chat

# Execute a shell command through MicroClaw
microclaw exec "find /var/log -name '*.log' -mtime -1 | head -20"

# Query with natural language
microclaw ask "How many Python files are in this project?"
```

### Systemd Service
```bash
# Install as service
microclaw service install
sudo systemctl enable microclaw
sudo systemctl start microclaw
```

## ✅ Verification

```bash
# Health check
microclaw health

# Test shell integration
microclaw test-shell

# Test MCP federation
microclaw test-mcp

# Test memory
microclaw test-memory
```

## 🔧 Shell Integration Examples

```bash
# Natural language to shell
microclaw ask "Show me the largest files in the current directory"
# Translates to: du -ah . | sort -rh | head -10

# Log analysis
microclaw ask "Any errors in nginx logs today?"
# Translates to: grep -i error /var/log/nginx/*.log | tail -50

# Git operations
microclaw ask "What changed in the last commit?"
# Translates to: git log --oneline -1 && git diff HEAD~1
```

## 🐛 Troubleshooting

### Shell Commands Not Executing
```bash
# Check shell permissions
microclaw config get shell.enabled

# Add commands to allowlist
microclaw config set shell.allowed_commands '["grep", "awk", "sed", "find", "git"]'
microclaw daemon restart
```

### Memory Database Locked
```bash
# Kill stale processes
pkill microclaw

# Reset database
microclaw memory reset
```

---

**Resources:**
- [MicroClaw Documentation](https://microclaw.ai)
- [MCP Protocol](https://modelcontextprotocol.io)
