---
layout: post
title: "How to Install Docker on Ubuntu 24.04 LTS: Step-by-Step Guide"
date: 2026-07-23 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/2026-07-23-how-to-install-docker-on-ubuntu-24-04/
description: "How to Install Docker on Ubuntu 24.04 LTS: Step-by-Step Guide"
categories: [docker, devops, tutorial]
---

Docker is the de facto standard for containerizing applications, and Ubuntu 24.04 LTS is one of the most common host operating systems for development and production. This guide shows how to install Docker Engine from Docker's official repository, configure it to run without sudo, and verify that the installation works.

## Prerequisites

- A machine running Ubuntu 24.04 LTS.
- A user account with sudo privileges.
- Internet access to download packages.

## Step 1: Update Package Index

Start by updating the local package index so you install the latest available versions:

```bash
sudo apt update
sudo apt upgrade -y
```

Reboot if the kernel was updated.

## Step 2: Install Dependencies

Install packages that allow apt to fetch packages over HTTPS:

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
```

## Step 3: Add Docker's Official GPG Key

Create the keyring directory and add Docker's official GPG key:

```bash
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

## Step 4: Add the Docker Repository

Add the stable Docker repository to your system:

```bash
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Step 5: Install Docker Engine

Update the package index again and install Docker Engine, CLI, and related plugins:

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Step 6: Verify the Installation

Run the hello-world container to confirm Docker works:

```bash
sudo docker run hello-world
```

You should see a message confirming that Docker can pull and run containers.

## Step 7: Run Docker Without Sudo (Optional)

If you want to run Docker commands without typing sudo every time, add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Log out and back in, or run:

```bash
newgrp docker
```

## Step 8: Enable Docker to Start on Boot

```bash
sudo systemctl enable --now docker
```

## Quick Test

Run a simple Nginx container to make sure networking and port mapping work:

```bash
docker run -d -p 8080:80 --name test-nginx nginx:alpine
```

Visit `http://localhost:8080` in your browser or use curl:

```bash
curl http://localhost:8080
```

Stop and remove the test container when done:

```bash
docker rm -f test-nginx
```

## What to Do Next

- Install Docker Compose if you need multi-container applications.
- Configure a private registry if you want to store images internally.
- Set up logging and monitoring with tools like cAdvisor, Prometheus, and Grafana.
- Review Docker's official documentation for production hardening.

