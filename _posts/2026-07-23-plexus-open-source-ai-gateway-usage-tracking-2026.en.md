---
layout: post
title: "Plexus: Open-Source AI Gateway With Protocol Translation, Routing, and Quota Tracking"
date: 2026-07-23 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/2026-07-23-plexus-open-source-ai-gateway-usage-tracking-2026/
description: "Plexus: Open-Source AI Gateway With Protocol Translation, Routing, and Quota Tracking"
---

Plexus is an open-source AI gateway and proxy built for teams that need to route requests across multiple AI providers, enforce quota limits, and track usage without relying on external services. If your project calls OpenAI, Anthropic Claude, Google Gemini, or other compatible APIs through a single endpoint, Plexus handles protocol translation, provider selection, and real-time usage accounting.

## What Plexus Does

Most AI applications are tied to one provider's SDK and endpoint format. Plexus sits between your application and the upstream providers so your code keeps using one protocol while Plexus translates, routes, and meters every request. It is especially useful if you want to switch models or providers without changing client code, or if you need to enforce user-level quotas and measure token usage accurately.

## Key Features

- **Protocol Translation**: Maps incoming requests such as OpenAI `/v1/chat/completions` to upstream formats used by Anthropic Messages and Google Gemini. Your application does not need to know which provider is handling a given request.
- **Intelligent Routing**: Uses model aliases and selectors such as `random`, `in_order`, `cost`, and `performance` to distribute traffic across providers. You can change routing behavior without redeploying clients.
- **Resiliency**: Automatic provider failover with exponential cooldowns and stall detection for stuck streams. A failure on one provider does not break the request pipeline.
- **Quota Enforcement**: The `QuotaEnforcer` middleware validates requests against user-defined limits for tokens, requests, or cost over rolling windows.
- **Usage Tracking**: The `UsageStorageService` records request-level usage in SQLite or PostgreSQL, which gives you observability into spend, throughput, and errors.
- **Config-Driven Management**: Administrative operations are exposed through the Management API and a React frontend, so you can manage routes, keys, and quotas through a UI instead of config files alone.

## Architecture

Plexus is organized as a Bun monorepo with three major parts:

1. **Backend**: A Fastify server that receives inference requests, applies quotas, dispatches to the correct transformer and provider, and logs usage.
2. **Frontend**: A React dashboard for managing providers, models, users, quotas, and logs.
3. **Shared Library**: Common domain logic used by both backend and frontend.

A typical request flows through the Fastify server into a `Dispatcher`, which selects a `Transformer` based on the target provider, applies quota checks, forwards the request, and records the result.

## Deployment Options

- **Docker**: The recommended path. A multi-arch image bundles the backend and frontend into a minimal Debian-based container. It supports both amd64 and arm64, which makes it suitable for servers and ARM devices.
- **Standalone Binary**: Self-contained executables for macOS, Linux, and Windows. These include the Bun runtime, compiled code, SQL migrations, and embedded frontend assets. You can run them with a single command.
- **Source**: Run directly with Bun for local development. The repo includes dev scripts that automatically assign isolated ports and initialize a local database.

## When to Choose Plexus

Plexus is a good fit when your team already uses multiple AI providers and wants a single control plane for routing, quotas, and usage tracking. It works well for internal AI platforms, multi-tenant applications, and teams that want open-source infrastructure they can inspect and extend.

If you need advanced compression, agent-native tooling, or a free-tier marketplace, other gateways may have more features. Plexus focuses on clean protocol translation, reliable routing, and honest metering.

