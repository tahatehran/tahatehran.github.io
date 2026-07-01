document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const toggle = document.querySelector('.mobile-menu-toggle');
    const close = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (toggle && overlay) {
        toggle.addEventListener('click', () => {
            overlay.classList.add('active');
            body.classList.add('menu-open');
        });

        const closeMenu = () => {
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        };

        if (close) close.addEventListener('click', closeMenu);

        // Close menu on link click
        const navLinks = overlay.querySelectorAll('a');
        navLinks.forEach(link => link.addEventListener('click', closeMenu));

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // Code Copy Logic
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
        if (block.querySelector('.copy-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.innerHTML = '<i class="far fa-copy"></i> Copy';
        block.appendChild(button);

        button.addEventListener('click', async () => {
            const codeElement = block.querySelector('code');
            if (!codeElement) return;
            const textToCopy = codeElement.textContent.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                    showStatus(button, true);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = textToCopy;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const successful = document.execCommand('copy');
                    textArea.remove();
                    showStatus(button, successful);
                }
            } catch (err) {
                showStatus(button, false);
            }
        });
    });

    function showStatus(btn, success) {
        const original = btn.innerHTML;
        if (success) {
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.classList.add('copied');
        } else {
            btn.innerHTML = '<i class="fas fa-times"></i> Error';
        }
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
        }, 2000);
    }

    // Contact Card Copy Functionality
    const contactCards = document.querySelectorAll('.contact-card[data-copy]');

    contactCards.forEach(card => {
        card.addEventListener('click', async () => {
            const textToCopy = card.getAttribute('data-copy');

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = textToCopy;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const successful = document.execCommand('copy');
                    textArea.remove();

                    if (!successful) {
                        throw new Error('Copy failed');
                    }
                }

                // Show copied state
                card.classList.add('copied');
                const hint = card.querySelector('.copy-hint');
                if (hint) {
                    const originalText = hint.textContent;
                    hint.textContent = card.dir === 'rtl' ? 'کپی شد!' : 'Copied!';
                    setTimeout(() => {
                        hint.textContent = originalText;
                        card.classList.remove('copied');
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });

    // Blog Search Functionality
    const searchInput = document.getElementById('blog-search');
    const postsContainer = document.getElementById('blog-posts-container');

    if (searchInput && postsContainer) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const posts = postsContainer.querySelectorAll('.blog-post-card');

            posts.forEach(post => {
                const title = post.getAttribute('data-title').toLowerCase();
                const description = post.getAttribute('data-description').toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
});

    // ============================================
    // Scroll Reveal Animations
    // ============================================
    const revealElements = document.querySelectorAll('.card, .brand-card, .blog-post-card, section > h2, section > h3, .member-card, .contact-card');
    
    // Add reveal classes to elements
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(index % 6) * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // Smooth Scroll for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // Parallax effect for hero section
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < 600) {
                hero.style.transform = `translateY(${scrolled * 0.15}px)`;
                hero.style.opacity = 1 - (scrolled * 0.002);
            }
        }, { passive: true });
    }

    // ============================================
    // Staggered card animation on page load
    // ============================================
    const cards = document.querySelectorAll('.card-grid .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-in-up');
    });

    // ============================================
    // Header scroll effect
    // ============================================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(11, 14, 20, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(13, 17, 23, 0.95)';
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ============================================
    // Brand card hover tilt effect
    // ============================================
    const brandCards = document.querySelectorAll('.brand-card');
    brandCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // Typing effect for hero text
    // ============================================
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroH1.style.borderRight = '2px solid var(--primary)';
        setTimeout(() => {
            heroH1.style.borderRight = 'none';
        }, 2000);
    }
