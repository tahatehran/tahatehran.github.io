---
layout: post
title: "How to Install Docker on macOS: Step-by-Step Guide"
date: 2026-07-23 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/2026-07-23-how-to-install-docker-on-macintosh/
description: "How to Install Docker on macOS: Step-by-Step Guide"
---

Docker Desktop is the easiest way to run Docker on a Mac. It bundles the Docker Engine, CLI, BuildKit, Kubernetes, and a graphical dashboard into one application. This guide covers installation on both Apple Silicon and Intel Macs, basic configuration, and how to verify that Docker is working.

## Prerequisites

- A Mac running macOS 13 Ventura or later.
- Administrator access on the machine.
- Sufficient disk space: at least 2 GB free for the application and base images.

## Step 1: Check Your Mac Architecture

Open Terminal and run:

```bash
uname -m
```

If the output is `arm64`, you have Apple Silicon. If it is `x86_64`, you have an Intel Mac. Docker Desktop automatically downloads the correct installer, but it is useful to know which architecture you are on for troubleshooting.

## Step 2: Download Docker Desktop

Go to the official Docker website and download Docker Desktop for Mac. There is a single installer that handles both Apple Silicon and Intel architectures.

Alternatively, you can install it via Homebrew:

```bash
brew install --cask docker
```

Homebrew downloads the same package and places it in your Applications folder.

## Step 3: Install and Launch Docker Desktop

Double-click the downloaded file to mount the Docker disk image, then drag the Docker icon to your Applications folder. After copying, open Docker Desktop from Applications or Spotlight.

Docker Desktop starts automatically after installation. You should see the Docker whale icon in your menu bar.

## Step 4: Sign In (Optional)

If you have a Docker ID, sign in to access Docker Hub, sync settings across devices, and pull private images. You can skip sign-in if you only need local development.

## Step 5: Verify the Installation

Open Terminal and run:

```bash
docker --version
docker compose version
```

You should see version numbers for both the Docker CLI and Docker Compose plugin.

Run the hello-world container to confirm everything works:

```bash
docker run hello-world
```

Docker Desktop downloads the image, runs a container, and prints a confirmation message.

## Step 6: Configure Resources

Docker Desktop runs inside a lightweight Linux VM. You can control how much RAM, CPU, and disk it uses.

1. Click the Docker whale icon in the menu bar.
2. Choose **Settings**.
3. Go to **Resources**.
4. Adjust sliders for CPUs, Memory, and Disk image size.

For web development, 4 GB of RAM and a 60 GB disk are usually sufficient. For heavier workloads such as database containers or local Kubernetes clusters, increase the memory allocation.

## Step 7: Enable Docker CLI in Your Shell

Docker Desktop adds symbolic links so the `docker` and `docker compose` commands work from any terminal window. If you installed via Homebrew, the symlinks are already in place.

Test it again:

```bash
docker info
```

## Step 8: Run a Test Container

Run Nginx and map port 8080 on your Mac to port 80 in the container:

```bash
docker run -d -p 8080:80 --name test-nginx nginx:alpine
```

Open a browser and visit:

```
http://localhost:8080
```

You should see the Nginx welcome page.

When you are done, stop and remove the test container:

```bash
docker rm -f test-nginx
```

## Command Line vs GUI

Docker Desktop includes both a graphical dashboard and a full command-line interface. Most developers use the CLI for daily work and open the GUI to inspect containers, images, volumes, and logs. You can also access the dashboard in a browser at:

```
http://localhost:8080
```

if you have enabled it in settings.

## Common Issues and Fixes

- **Docker Desktop says "Docker is not running"**: Make sure the app is launched and the whale icon is active in the menu bar. Restart Docker Desktop if necessary.
- **Out of disk space**: Go to Settings > Resources > Disk and increase the size, or prune unused images and containers with `docker system prune`.
- **Slow file sharing**: Placing your code inside the home directory or a folder excluded from Finder indexing improves Docker performance on macOS. Avoid network-mounted directories when possible.

## What to Do Next

- Install Docker Compose if you plan to use multi-container applications.
- Enable Kubernetes in Settings > Kubernetes if you need a local cluster.
- Read through Docker's official documentation for production workflows on macOS.

