---
layout: post
title: "Smart Car Ad Monitoring and Notification System on Divar"
date: 2025-07-02 10:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/divar-car-monitoring-bot/
description: "An intelligent bot for monitoring and notifying car ads on Divar using advanced web scraping and Bale messenger"
---

## Project Introduction

**Smart Car Ad Monitoring and Notification System on Divar** is an intelligent bot on Bale messenger that automatically monitors car ads on Divar website and notifies users of new ads in real-time.

🔗 **Bale Bot:** [@Divar_iranbot](https://ble.ir/Divar_iranbot)

---

## 🔍 Key Features

### Smart Web Scraper

- **Two-stage processing:** Extracting ad lists and then detailed information for each ad
- **Comprehensive data extraction:**
  - 📝 Full title and description
  - 💰 Price (with negotiated price filter)
  - 📏 Exact mileage
  - 🎨 Car color
  - 📅 Year of manufacture/model
  - 📍 Exact location of the ad
  - 🖼️ Car image
- **Concurrency control:** Limiting simultaneous requests
- **Rate Limiting:** Respecting Divar website limitations

### 💬 Intelligent Bale Bot

- **Secure authentication:** Login system with username and password
- **Real-time notifications:** Sending new ads with images
- **User settings panel:**
  - ⏰ Set notification interval
  - 🔔 Enable/disable notifications
  - 🏙️ Select desired cities
  - 📊 View recent ads
- **Subscription system:** Managing user validity period
- **Admin panel:** Full control for administrators

### 🔐 Secure and Powerful API

- **API Key authentication:** Protecting endpoints
- **Auto documentation:** Swagger UI and ReDoc
- **Pagination support:** Managing high volume of data
- **Standard responses:** JSON Response with appropriate codes

### ⚡ High Performance

- **Smart scheduling:** APScheduler for periodic tasks
- **Async/Await:** Non-blocking processing with httpx
- **Notification queue:** Optimized message delivery
- **Data caching:** Database performance optimization
- **Automatic maintenance:** Weekly cleanup of old ads

---

## 📖 User Guide

### Using the Bale Bot

#### 🔐 Login

1. Find the bot in Bale
2. Send the `/start` command
3. Enter your username and password

#### 👤 User Commands

| Command                   | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `/settings`               | Show settings panel and help                         |
| `/toggle_notifications`   | Enable/disable notifications                         |
| `/set_interval <minutes>` | Set notification interval (e.g., `/set_interval 15`) |
| `/get_latest`             | Get 5 latest ads                                     |
| `/list_car_models`        | View monitored car models                            |
| `/list_cities`            | View available cities                                |
| `/my_cities`              | View your selected cities                            |
| `/add_city <city>`        | Add a city (e.g., `/add_city tehran`)                |
| `/remove_city <city>`     | Remove a city from the list                          |
| `/feedback <message>`     | Send feedback to admin                               |
| `/logout`                 | Logout from account                                  |

---

## 🛠️ Technologies

- **Programming Language:** Python
- **Async Processing:** httpx + Async/Await
- **Task Scheduling:** APScheduler
- **Messenger:** Bale API
- **Database:** SQLite / PostgreSQL
- **API Documentation:** Swagger UI + ReDoc

---

## 🎯 Conclusion

This system combines intelligent web scraping with the Bale messenger bot to provide users with an unparalleled experience of automatic Divar ad monitoring. With a simple user interface and customizable settings, every user can receive their desired ads in real-time.
