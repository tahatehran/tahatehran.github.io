---
layout: post
title: "How to Install BirdClaw: Local-First Twitter/X Workspace"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-birdclaw/
description: "Step-by-step guide to install BirdClaw for local Twitter/X management with full-text search and analytics."
categories: ['birdclaw', 'openclaw', 'tutorial', 'twitter', 'social-media']
---

BirdClaw gives you local-first control over your Twitter/X data. This guide covers installation, archive import, and setup.

## 📋 Prerequisites

- Linux, macOS, or Windows (WSL2)
- Twitter/X account
- Your Twitter data export (optional but recommended)

## 🚀 Quick Install

### One-Line Install
```bash
curl -fsSL https://birdclaw.sh/install.sh | bash
```

### Verify Installation
```bash
birdclaw --version
```

## 🔧 Build from Source

```bash
git clone https://github.com/birdclaw/birdclaw
cd birdclaw
cargo build --release
cp target/release/birdclaw /usr/local/bin/
```

## ⚙️ Configuration

### Initialize Workspace
```bash
birdclaw init --name my-twitter-workspace
```

### Configure Twitter API
```bash
# Set Twitter API credentials
birdclaw config set twitter.api_key "YOUR_API_KEY"
birdclaw config set twitter.api_secret "YOUR_API_SECRET"
birdclaw config set twitter.access_token "YOUR_ACCESS_TOKEN"
birdclaw config set twitter.access_secret "YOUR_ACCESS_SECRET"
```

### Import Twitter Archive
```bash
# Download your Twitter data from https://twitter.com/settings/download_your_data

# Import the archive
birdclaw import ~/Downloads/twitter-archive.zip

# Verify import
birdclaw stats
```

Expected output:
```
Total tweets:      12,547
Date range:        2019-03-15 to 2024-03-14
Media files:       1,234
Total likes:       45,678
Total retweets:    3,456
Index size:        45MB
```

## 🖥️ Web Interface

### Start Web UI
```bash
birdclaw web --port 3000
```

Open http://localhost:3000 in your browser.

### Web UI Features
- **Dashboard:** Overview of your Twitter activity
- **Search:** Full-text search with filters
- **Composer:** Rich text editor for tweets
- **Analytics:** Charts and engagement metrics
- **Settings:** Account management

## 🖥️ CLI Usage

```bash
# Search tweets
birdclaw search "machine learning" --limit 20

# Search by date
birdclaw search "AI agent" --from 2024-01-01 --to 2024-12-31

# Schedule a tweet
birdclaw schedule "Great article on AI!" --at "2024-03-15 10:00"

# View analytics
birdclaw analytics --period 30d

# Export data
birdclaw export --format csv --output tweets.csv

# Start daemon for scheduled tweets
birdclaw daemon start
```

## ✅ Verification

```bash
# Check workspace status
birdclaw status

# Test search
birdclaw search "test" --limit 1

# Test Twitter API connection
birdclaw test-api

# View database stats
birdclaw stats
```

## 🐛 Troubleshooting

### Archive Import Fails
```bash
# Check archive format
birdclaw import --dry-run ~/Downloads/twitter-archive.zip

# Import specific files
birdclaw import --format tweets.js ~/Downloads/twitter-archive/data/

# Reset and retry
birdclaw reset --confirm
birdclaw import ~/Downloads/twitter-archive.zip
```

### Search Not Working
```bash
# Rebuild index
birdclaw index rebuild

# Check index status
birdclaw index status
```

### API Rate Limit
```bash
# Check rate limit status
birdclaw rate-limit

# Reduce request frequency
birdclaw config set twitter.rate_limit_per_hour 100
```

---

**Resources:**
- [BirdClaw Official](https://birdclaw.sh)
- [BirdClaw GitHub](https://github.com/birdclaw/birdclaw)
