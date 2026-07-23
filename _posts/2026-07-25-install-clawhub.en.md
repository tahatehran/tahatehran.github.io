---
layout: post
title: "How to Install ClawHub: The Skill Marketplace for OpenClaw"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-clawhub/
description: "Step-by-step guide to install ClawHub CLI and set up the official skill marketplace for your OpenClaw assistant."
categories: [clawhub, openclaw, tutorial, marketplace, skills]
---

ClawHub is the official skill marketplace for OpenClaw. This guide covers installing the CLI, finding skills, and publishing your own.

## 📋 Prerequisites

- Node.js 18+ installed
- OpenClaw running (optional, for skill testing)
- npm or yarn package manager

## 🚀 Quick Install

### Install ClawHub CLI
```bash
npm install -g clawhub-cli
```

### Verify Installation
```bash
clawhub --version
# Expected: clawhub-cli v1.0.0
```

## ⚙️ Setup

### Login to ClawHub
```bash
clawhub login
# Opens browser for authentication
# Or use token-based login:
clawhub login --token YOUR_TOKEN
```

### Initialize Project
```bash
mkdir my-skills && cd my-skills
clawhub init
# Creates .clawhubrc and package.json
```

## 🔍 Discover Skills

### Search for Skills
```bash
# Search by keyword
clawhub search "data analysis"

# Search by category
clawhub search --category office

# Search by runtime
clawhub search --runtime docker

# Sort by popularity or rating
clawhub search "report" --sort popularity
clawhub search "report" --sort rating
```

### Browse Categories
```bash
clawhub browse
clawhub browse --category ai-agents
clawhub browse --category security
```

### Install a Skill
```bash
# Install latest version
clawhub install office-excel

# Install specific version
clawhub install office-excel@2.3.1

# Install to custom directory
clawhub install office-excel --dir ./skills

# Install all dependencies
clawhub install office-excel --recursive
```

## 📦 Create Your Own Skill

### Skill Structure
```
my-skill/
├── manifest.json
├── index.js
├── README.md
├── LICENSE
└── tests/
    └── test.js
```

### manifest.json
```json
{
  "name": "my-custom-skill",
  "version": "1.0.0",
  "description": "A custom skill for data processing",
  "author": "your-username",
  "runtime": "node",
  "permissions": [
    "files:read",
    "files:write"
  ],
  "dependencies": {
    "xlsx": "^0.18.0"
  },
  "config": {
    "maxMemory": "256MB",
    "timeout": 30000
  }
}
```

### index.js
```javascript
const { Skill } = require('clawhub-sdk');

module.exports = class MySkill extends Skill {
  name = 'my-custom-skill';
  
  async execute(context) {
    const { input } = context;
    
    // Your skill logic here
    const result = await this.process(input);
    
    return {
      output: result,
      metadata: {
        processed: true,
        timestamp: new Date().toISOString()
      }
    };
  }
};
```

### Publish Your Skill
```bash
# Test locally first
clawhub test

# Publish to registry
clawhub publish

# Publish with specific version
clawhub publish --version 1.0.0

# Publish as private
clawhub publish --private
```

## 🔧 Advanced Configuration

### .clawhubrc
```json
{
  "registry": "https://registry.clawhub.ai",
  "auth": {
    "token": "YOUR_TOKEN"
  },
  "cache": {
    "enabled": true,
    "ttl": 3600
  },
  "publish": {
    "access": "public",
    "tags": ["ai", "productivity"]
  }
}
```

### Private Registry (Enterprise)
```bash
# Set custom registry
clawhub config set registry https://your-registry.company.com

# Login to private registry
clawhub login --registry https://your-registry.company.com

# Install from private registry
clawhub install internal-skill --registry private
```

## 📊 Skill Management

```bash
# List installed skills
clawhub list

# Update all skills
clawhub update --all

# Update specific skill
clawhub update office-excel

# Remove a skill
clawhub remove office-excel

# Rollback to previous version
clawhub rollback office-excel --to 2.2.0

# View skill info
clawhub info office-excel

# Check for vulnerabilities
clawhub audit
```

## ✅ Verification

```bash
# Test skill installation
clawhub install office-excel
clawhub test office-excel

# Verify CLI connectivity
clawhub ping

# Check registry status
clawhub status
```

## 🐛 Troubleshooting

### Authentication Failed
```bash
# Re-login
clawhub logout
clawhub login

# Or set token directly
clawhub config set auth.token YOUR_TOKEN
```

### Skill Not Found
```bash
# Search for similar skills
clawhub search "excel" --fuzzy

# Check exact name
clawhub search "office-excel" --exact
```

### Install Timeout
```bash
# Increase timeout
clawhub config set timeout 60000

# Retry with verbose output
clawhub install office-excel --verbose
```

---

**Resources:**
- [ClawHub Official](https://clawhub.ai)
- [ClawHub CLI Docs](https://docs.clawhub.ai/cli)
- [Skill Development Guide](https://docs.clawhub.ai/develop)
