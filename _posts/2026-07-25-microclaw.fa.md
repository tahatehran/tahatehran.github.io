---
layout: post
title: "MicroClaw: عامل هوش مصنوعی Rust برای چت چند کاناله"
date: 2026-07-25 10:30:00 +0330
lang: fa
locale: fa
dir: rtl
author: MovtiGroup
permalink: /blog/microclaw/
description: "چگونه MicroClaw عملکرد Rust را با ابزارهای shell، حافظهای منقطاعی و فدراسیون MCP ترکیب می‌کند."
categories: ['microclaw', 'openclaw', 'rust', 'ai-agents']
---

MicroClaw یک عامل هوش مصنوعی مبتنی بر Rust طراحی شده برای چت چند کاناله با یکپارچگی ابزارهای shell، حافظه پایدار و فدراسیون MCP (Model Context Protocol) است.

## 🐚 MicroClaw چیست؟

MicroClaw یک باینری Rust است که:
- **به‌عمیق با ابزارهای shell** یکپارچه می‌شود (grep، awk، sed، find و...)
- **حافظه پایدار** در جلسات ارائه می‌دهد
- **برنامه‌ریز cron** برای وظایف خودکار دارد
- **از فدراسیون MCP** برای اشتراک‌گذاری ابزار بین عامل‌ها پشتیبانی می‌کند
- **به‌عنوان daemon یا CLI تعاملی** اجرا می‌شود

## 🔑 قابلیت‌های کلیدی

### ۱. قدرت Shell
```bash
# MicroClaw می‌تواند جریان‌های کاری پیچیده shell را اجرا کند
microclaw exec "find /logs -name '*.log' -mtime -7 | grep ERROR | wc -l"

# یا از طریق زبان طبیعی
microclaw ask "چند لاگ خطا در هفته گذشته ایجاد شده؟"
```

### ۲. حافظه پایدار
```yaml
memory:
  backend: sqlite
  path: ~/.microclaw/memory.db
  ttl: 30d
  embeddings: true
  search: semantic
```

### ۳. فدراسیون MCP
```json
{
  "federation": {
    "local_tools": ["shell", "files", "git"],
    "shared_tools": ["web-search", "code-analysis"],
    "trust_level": "verified"
  }
}
```

## 🚀 شروع کار

```bash
# نصب MicroClaw
cargo install microclaw

# یا دانلود باینری
curl -fsSL https://microclaw.ai/install.sh | bash

# اجرا به‌عنوان daemon
microclaw daemon start --port 18792

# حالت تعاملی
microclaw chat
```

## 💡 موارد استفاده

- **DevOps:** تحلیل خودکار لاگ و هشدار
- **مهندسی داده:** مدیریت خطوط لوله ETL
- **مدیریت سیستم:** مانیتورینگ و نگهداری سرور
- **عملیات امنیتی:** همبستگی لاگ و تشخیص تهدید
- **توسعه:** بازبینی کد و یکپارچگی CI/CD

## 🔮 آینده
MicroClaw در حال اضافه کردن اجرای shell توزیع‌شده، پشتیبانی اپراتور Kubernetes و بازار پلاگین است.

---

**منابع:**
- [سایت رسمی MicroClaw](https://microclaw.ai)
- [پروتکل MCP](https://modelcontextprotocol.io)
