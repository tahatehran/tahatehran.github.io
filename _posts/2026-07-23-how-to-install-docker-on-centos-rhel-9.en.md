---
layout: post
title: "How to Install Docker on CentOS / RHEL 9: Step-by-Step Guide"
date: 2026-07-23 12:00:00 +0330
lang: en
locale: en
dir: ltr
author: MovtiGroup
permalink: /en/blog/2026-07-23-how-to-install-docker-on-centos-rhel-9/
description: "How to Install Docker on CentOS / RHEL 9: Step-by-Step Guide"
---

Docker Engine runs well on Red Hat Enterprise Linux 9 and its downstream siblings, CentOS Stream and Rocky Linux. The official installation path uses Docker's own repository, which keeps packages up to date and avoids the older `docker` package shipped by the base operating system.

## Prerequisites

- A machine running RHEL 9, CentOS Stream 9, or Rocky Linux 9.
- A user account with sudo privileges.
- Internet access to download packages.

## Step 1: Update the System

```bash
sudo dnf update -y
```

Reboot if the kernel or glibc was updated:

```bash
sudo reboot
```

## Step 2: Install Dependencies

Install packages required to manage external repositories:

```bash
sudo dnf install -y dnf-utils device-mapper-persistent-data lvm2
```

## Step 3: Add Docker's Official Repository

Add Docker's stable repository to your system:

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

On RHEL, the same repo works because Docker provides CentOS-compatible packages that are compatible with RHEL and its derivatives.

## Step 4: Install Docker Engine

Install Docker Engine, CLI, and related plugins:

```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Step 5: Start and Enable Docker

Start the Docker daemon and enable it to run at boot:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## Step 6: Verify the Installation

Run the hello-world container:

```bash
sudo docker run hello-world
```

If Docker is working, you will see a confirmation message.

## Step 7: Run Docker Without Sudo (Optional)

To avoid typing sudo for every Docker command, add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Log out and back in, or run:

```bash
newgrp docker
```

## Step 8: Test a Real Container

Run Nginx to verify networking:

```bash
docker run -d -p 8080:80 --name test-nginx nginx:alpine
```

Test it:

```bash
curl http://localhost:8080
```

Stop and remove the test container:

```bash
docker rm -f test-nginx
```

## Firewall Notes

If you use `firewalld`, you may need to allow ports or stop the firewall for testing:

```bash
sudo systemctl stop firewalld
```

For production, configure firewalld rules to allow only the ports you need instead of disabling it entirely.

## SELinux Considerations

RHEL-based systems ship with SELinux enforcing by default. Docker works under SELinux, but some volumes and bind mounts may need the `:z` or `:Z` suffix. If you run into permission errors with mounted directories, add `:z` to the mount path in your `docker run` or Compose file.

## What to Do Next

- Install Docker Compose if you plan to use multi-container setups.
- Configure logging drivers to send Docker logs to a central system.
- Set up a private registry if you want to store images inside your infrastructure.
- Review Red Hat's container documentation for production hardening on RHEL.

