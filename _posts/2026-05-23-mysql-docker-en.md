---
layout: post
title: "Configuring MySQL with Docker"
date: 2026-05-23 13:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/mysql-docker/
description: "Step-by-step tutorial on setting up a MySQL database using Docker Compose."
---

Setting up MySQL with Docker is simple and fast. In this tutorial, you'll learn how to create a stable database with Docker Compose.

## 🛠 docker-compose.yml file
Just create a file with the following content:
```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret_password
    ports:
      - "3306:3306"
```

Then run `docker-compose up -d` and your database is ready!
