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
    }

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
