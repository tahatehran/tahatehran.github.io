document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Prevent duplicate buttons
        if (block.querySelector('.copy-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.innerHTML = '<i class="far fa-copy"></i> Copy';

        // Ensure block has relative positioning
        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', async () => {
            // Find the code element inside the pre block
            const codeElement = block.querySelector('code');
            if (!codeElement) return;

            // Get text content while excluding the button itself
            // Clone the node to safely manipulate it
            const clone = codeElement.cloneNode(true);
            const textToCopy = clone.innerText.trim();

            try {
                // Main Clipboard API
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                    showSuccess(button);
                } else {
                    // Fallback
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
                    else throw new Error('execCommand failed');
                }
            } catch (err) {
                console.error('Failed to copy: ', err);
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
        btn.style.borderColor = '#ff7b72';
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copy';
            btn.style.borderColor = '';
        }, 2000);
    }
});
