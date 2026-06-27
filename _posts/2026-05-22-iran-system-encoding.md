---
layout: post
title: "معرفی پروژه Iran System Encoding"
date: 2026-05-22 15:00:00 +0330
lang: fa
dir: rtl
author: MovtiGroup
permalink: /blog/iran-system-encoding/
description: "کتابخانه پایتون حرفه‌ای و با کارایی بالا برای کدگذاری قدیمی ایران سیستم. Iran System Encoding Library."
---

پروژه **Iran System Encoding** یک کتابخانه قدرتمند پایتون برای کار با کدگذاری متنی قدیمی ایران سیستم است. این پکیج امکان تبدیل دوطرفه، تشخیص خودکار زبان و مدیریت هوشمند اعداد را فراهم می‌کند.

## 🚀 ویژگی‌های کلیدی
- **تبدیل دوطرفه:** تبدیل بی‌نقص بین یونیکد و ایران سیستم.
- **هسته پایتون خالص:** بدون وابستگی خارجی برای پایداری بیشتر.
- **پشتیبانی از افزونه C:** دارای کد منبع C برای حداکثر سرعت.
- **تشخیص هوشمند زبان:** تشخیص خودکار فارسی یا انگلیسی بودن متن.
- **مرتب‌سازی بصری دقیق:** اجرای دقیق الگوریتم‌های Reshaping و Layout بصری.

## 📦 نصب
```bash
pip install iran-encoding
```

## 🛠 مثال استفاده
```python
import iran_encoding

# Unicode -> Iran System
text = "سلام دنیا 123"
encoded = iran_encoding.encode(text)
print(encoded.hex())

# Iran System -> Unicode
decoded = iran_encoding.decode(encoded)
print(decoded) # خروجی: "سلام دنیا ۱۲۳"
```

این کتابخانه با دقت ۱۰۰٪ با سیستم‌های قدیمی و دیتابیس‌های میراثی سازگار است.
