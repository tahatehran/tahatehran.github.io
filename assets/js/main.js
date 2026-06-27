document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Create copy button
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.innerText = 'Copy';

        // Add button to block
        block.appendChild(button);

        button.addEventListener('click', async () => {
            const code = block.querySelector('code').innerText;
            try {
                await navigator.clipboard.writeText(code);
                button.innerText = 'Copied!';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerText = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                button.innerText = 'Error';
            }
        });
    });
});
