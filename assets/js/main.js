document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Only add button if it's not already there
        if (block.querySelector('.copy-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.innerHTML = '<i class="far fa-copy"></i> Copy';

        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', async () => {
            const codeElement = block.querySelector('code');
            if (!codeElement) return;

            // Filter out the button text itself if it gets included
            let text = codeElement.innerText;

            try {
                // Fallback for older browsers or specific environments
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                } else {
                    // Manual textarea fallback
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    textArea.style.top = "0";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }

                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i> Copy';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                button.innerHTML = '<i class="fas fa-times"></i> Error';
                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i> Copy';
                }, 2000);
            }
        });
    });
});
