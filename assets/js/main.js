document.addEventListener('DOMContentLoaded', () => {
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

            // Critical fix: use textContent and trim to avoid including UI elements or hidden characters
            const textToCopy = codeElement.textContent.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                    showSuccess(button);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = textToCopy;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    textArea.style.top = "0";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const successful = document.execCommand('copy');
                    textArea.remove();
                    if (successful) showSuccess(button);
                    else throw new Error('Fallback copy failed');
                }
            } catch (err) {
                console.error('Copy failed:', err);
                showError(button);
            }
        });
    });

    function showSuccess(btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copy';
            btn.classList.remove('copied');
        }, 2000);
    }

    function showError(btn) {
        btn.innerHTML = '<i class="fas fa-times"></i> Error';
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 2000);
    }
});
