import os
BASE = os.path.dirname(os.path.abspath(__file__)) + '/..'
os.chdir(BASE)

replacements = {
    'index.html': (
        '<!-- ======================== JAVASCRIPT ======================== -->',
        '<script src="{{ \'/assets/js/home.js\' | relative_url }}"></script>'
    ),
    'en/index.html': (
        '<!-- ============================================\n     JAVASCRIPT: Slider, Counters, Scroll Effects\n     ============================================ -->',
        '<script src="{{ \'/assets/js/home.js\' | relative_url }}"></script>'
    ),
    'blog/index.html': (
        '<!-- JavaScript: Search + Category Filter (AND logic) -->',
        '<script src="{{ \'/assets/js/blog-filter.js\' | relative_url }}"></script>'
    ),
    'en/blog/index.html': (
        '<!-- Inline Styles for Animations & Responsive -->',
        '<script src="{{ \'/assets/js/blog-filter.js\' | relative_url }}"></script>'
    ),
    'blog/search.html': (
        '</div>\n</div>',
        '</div>\n</div>\n\n<script src="{{ \'/assets/js/search.js\' | relative_url }}"></script>'
    ),
    'blog/search.fa.html': (
        '</div>\n</div>',
        '</div>\n</div>\n\n<script src="{{ \'/assets/js/search.js\' | relative_url }}"></script>'
    ),
}

for filepath, (old, new) in replacements.items():
    if not os.path.exists(filepath):
        print(f'SKIP: {filepath} not found')
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        # For search pages, only replace the LAST occurrence
        if 'search' in filepath:
            idx = content.rfind(old)
            content = content[:idx] + new + content[idx+len(old):]
        else:
            content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filepath}')
    else:
        print(f'Pattern not found in: {filepath}')

print('Done!')
