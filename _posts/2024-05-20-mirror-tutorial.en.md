---
layout: post
title: "Getting Started with Mirror Project"
date: 2025-05-20 10:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/mirror-tutorial/
description: "Quick guide to using scripts and running the Mirror project locally. High performance software mirrors."
---

This tutorial is based on the [movtigroup/Mirror](https://github.com/movtigroup/Mirror) repository.

## 1) Introduction
Mirror is a collection of software mirror documentation and tools used for faster and more stable access to services.

## 2) One-click Commands
- Linux (Ubuntu/Debian):
```bash
bash <(curl -sSL https://Linux.ththt.ir)
```
- Install Docker and Mirror:
```bash
bash <(curl -sSL https://install.ththt.ir/docker.sh)
```
- Configure Docker Mirror Only:
```bash
bash <(curl -sSL https://install.ththt.ir/mirror.sh)
```

## 3) Local Execution
To run the project locally:
```bash
docker-compose up -d --build
```
Then open `http://localhost:8080`.

## 4) Important Links
- GitHub Repository: [github.com/movtigroup/Mirror](https://github.com/movtigroup/Mirror)
- Documentation Website: [doc.movtigroup.ir](https://doc.movtigroup.ir)
