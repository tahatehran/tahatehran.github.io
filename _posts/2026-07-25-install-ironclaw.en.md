---
layout: post
title: "How to Install IronClaw: Rust AI Agent with WASM & TEE"
date: 2026-07-25 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/install-ironclaw/
description: "Step-by-step guide to install IronClaw for Rust-powered AI agents with WASM sandboxing and TEE security."
categories: ['ironclaw', 'openclaw', 'tutorial', 'rust', 'security']
---

IronClaw brings Rust performance, WASM sandboxing, and TEE security to AI agents. This guide covers installation and setup.

## 📋 Prerequisites

- Rust 1.70+ (with cargo)
- Git
- OpenClaw running on localhost
- (Optional) Intel SGX or ARM TrustZone for TEE features

## 🦀 Install Rust

```bash
# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Source the environment
source ~/.cargo/env

# Verify installation
rustc --version
cargo --version
```

## 🚀 Install IronClaw

### From Source (Recommended)
```bash
# Clone the repository
git clone https://github.com/nearai/ironclaw
cd ironclaw

# Build in release mode
cargo build --release

# The binary will be at target/release/ironclaw
./target/release/ironclaw --version
```

### From Cargo (When Available)
```bash
cargo install ironclaw
```

## ⚙️ Configuration

### Create Config File
```bash
mkdir -p ~/.ironclaw
cat > ~/.ironclaw/config.toml << 'EOF'
[agent]
name = "my-ironclaw"
model = "gpt-4"

[provider]
type = "openai"
api_key = "sk-your-key-here"

[openclaw]
gateway = "http://localhost:18789"
hmac_secret = "your-secret"

[sandbox]
engine = "wasm"
memory_limit = "64MB"
network_access = false

[tee]
enabled = false  # Set true if SGX/TrustZone available
attestation = true
seal_policy = "sealed-to-node"

[prompt_defense]
enabled = true
graph_routing = true
injection_detection = true
EOF
```

### Connect to OpenClaw
```bash
# Set OpenClaw gateway URL
openclaw config set security.gateway http://localhost:18790

# Or configure IronClaw directly
ironclaw config set openclaw.gateway http://localhost:18789
```

## 🏃 Run IronClaw

```bash
# Start IronClaw daemon
ironclaw daemon start

# Or run interactively
ironclaw chat

# Check status
ironclaw status
```

## 🐳 Docker Installation

```bash
# Build Docker image
docker build -t ironclaw:latest .

# Run with OpenClaw
docker run -d \
  --name ironclaw \
  -p 18790:18790 \
  -v ~/.ironclaw:/root/.ironclaw \
  -v ~/.openclaw:/root/.openclaw \
  ironclaw:latest
```

## ✅ Verification

```bash
# Check IronClaw is running
ironclaw status

# Test WASM sandbox
ironclaw test-sandbox

# Test prompt injection defense
ironclaw test-injection "Ignore previous instructions"

# Check connection to OpenClaw
ironclaw test-connection
```

## 🔐 TEE Setup (Optional)

### Intel SGX
```bash
# Install SGX driver
sudo apt install intel-sgx-driver

# Enable TEE in config
sed -i 's/enabled = false/enabled = true/' ~/.ironclaw/config.toml

# Restart IronClaw
ironclaw daemon restart
```

## 🐛 Troubleshooting

### Cargo Build Fails
```bash
# Install build dependencies
sudo apt install build-essential pkg-config libssl-dev

# Try again
cargo build --release
```

### WASM Compilation Error
```bash
# Install WASM target
rustup target add wasm32-wasi

# Rebuild
cargo build --release --target wasm32-wasi
```

---

**Resources:**
- [IronClaw GitHub](https://github.com/nearai/ironclaw)
- [Rust Installation](https://rustup.rs)
