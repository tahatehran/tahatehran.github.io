---
layout: post
title: "How to Install FastClaw: Multi-Agent Go Runtime"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-fastclaw/
description: "Guide to install FastClaw for running multiple AI agents with personalities, memory, and sandbox isolation."
categories: ['fastclaw', 'openclaw', 'tutorial', 'go', 'multi-agent']
---

FastClaw runs multiple AI agents with distinct personalities. This guide covers installation and team configuration.

## 📋 Prerequisites

- Go 1.21+ installed
- Docker (for sandbox isolation)
- Redis (for shared memory, optional)
- OpenClaw running on localhost

## 🚀 Quick Install

### Install Go
```bash
# macOS
brew install go

# Linux
sudo apt install golang-go

# Verify
go version
```

### Install FastClaw
```bash
# Option 1: go install
go install github.com/fastclaw-ai/fastclaw@latest

# Option 2: Pre-built binary
curl -fsSL https://fastclaw.dev/install.sh | bash
```

## ⚙️ Configuration

### Initialize
```bash
fastclaw init --name my-team
```

### Agent Team Config
```yaml
# agents.yaml
team:
  name: "content-team"
  
agents:
  - name: researcher
    personality: "Thorough, analytical, detail-oriented"
    model: gpt-4
    skills:
      - web-search
      - data-analysis
      - source-verification
    sandbox:
      enabled: true
      memory_limit: "256MB"
      
  - name: writer
    personality: "Creative, clear, engaging, professional"
    model: claude-3
    skills:
      - content-writing
      - editing
      - formatting
    sandbox:
      enabled: true
      memory_limit: "256MB"
      
  - name: reviewer
    personality: "Critical, detail-oriented, constructive"
    model: gpt-4
    skills:
      - code-review
      - quality-check
      - fact-checking
    sandbox:
      enabled: true
      memory_limit: "256MB"

memory:
  backend: redis
  url: "redis://localhost:6379"
  namespace: "fastclaw-team"
  ttl: "7d"

openclaw:
  url: "http://localhost:18789"
```

## 🏃 Run FastClaw

```bash
# Start with agent team
fastclaw start --config agents.yaml

# Check team status
fastclaw status

# View agent logs
fastclaw logs --agent researcher
```

## 🐳 Docker Compose

```yaml
version: '3.8'
services:
  fastclaw:
    image: fastclaw/fastclaw:latest
    volumes:
      - ./agents.yaml:/app/agents.yaml
    depends_on:
      - redis
    environment:
      - OPENCLAW_URL=http://openclaw:18789

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

## ✅ Verification

```bash
# Check all agents are running
fastclaw status

# Test inter-agent communication
fastclaw test-comm

# Test sandbox isolation
fastclaw test-sandbox

# View team performance
fastclaw metrics
```

## 🐛 Troubleshooting

### Agent Not Starting
```bash
# Check agent logs
fastclaw logs --agent <name>

# Restart specific agent
fastclaw restart --agent <name>

# Check resource limits
fastclaw resources
```

---

**Resources:**
- [FastClaw GitHub](https://github.com/fastclaw-ai/fastclaw)
- [FastClaw Documentation](https://fastclaw.dev)
