---
layout: post
title: "Introduction to Iran System Encoding Project"
date: 2024-05-22 15:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/iran-system-encoding/
description: "A high-performance, professional Python library for the legacy Iran System character encoding. Secure and fast."
---

The **Iran System Encoding** project is a high-performance Python library for handling the legacy Iran System character encoding. It provides symmetrical encoding/decoding with automatic locale detection and smart number handling.

## 🚀 Key Features
- **Bidirectional Conversion:** Seamlessly convert between Unicode and Iran System encoding.
- **Pure Python Core:** Zero external dependencies for maximum stability.
- **C Extension Support:** High-performance C source for maximum speed.
- **Intelligent Locale Detection:** Automatically detects if the text is Persian (fa) or English (en).
- **Precise Visual Ordering:** Exact rule-based reshaping and visual layout logic.

## 📦 Installation
```bash
  pip install iran-encoding
```

## 🛠 Usage Example
```python
import iran_encoding

# Unicode -> Iran System
text = "Hello World 123"
encoded = iran_encoding.encode(text)
print(encoded.hex())

# Iran System -> Unicode
decoded = iran_encoding.decode(encoded)
print(decoded)
```

Ensures 100% compatibility with legacy databases and hardware terminals.
