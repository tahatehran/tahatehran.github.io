#!/usr/bin/env python3
"""Extract inline CSS and JS from HTML files into external files."""
import os, re, glob

BASE = os.path.dirname(os.path.abspath(__file__)) + '/..'
os.chdir(BASE)

# Step 1: Extract CSS from all HTML files and save to assets/css/pages.css
# Step 2: Extract JS from homepage files to assets/js/home.js
# Step 3: Extract JS from blog files to assets/js/blog-search.js
# Step 4: Remove inline tags and add proper references

css_blocks = []
js_blocks = {}

html_files = [
    'index.html', 'en/index.html',
    'blog/search.html', 'blog/search.fa.html',
    'blog/index.html', 'en/blog/index.html',
    'projects/index.html', 'en/projects/index.html',
    'teams/index.html', 'en/teams/index.html',
]

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract <style> content
    styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    for style in styles:
        clean = style.strip()
        if clean and len(clean) > 10:
            css_blocks.append(f'\n/* === From {filepath} === */\n{clean}')
            print(f'CSS: {filepath} ({len(clean)} chars)')
    
    # Extract <script> content (inline, not src)
    scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    for script in scripts:
        clean = script.strip()
        if clean and len(clean) > 20:
            if filepath not in js_blocks:
                js_blocks[filepath] = []
            js_blocks[filepath].append(clean)
            print(f'JS: {filepath} ({len(clean)} chars)')

# Write CSS to pages.css
if css_blocks:
    with open('assets/css/pages.css', 'w', encoding='utf-8') as f:
        f.write('/* ============================================\n')
        f.write('   Page-Specific Styles\n')
        f.write('   Extracted from inline <style> tags\n')
        f.write('   ============================================ */\n')
        f.write('\n'.join(css_blocks))
    print(f'\nWrote {len(css_blocks)} CSS blocks to assets/css/pages.css')

# Write JS to separate files
# Homepage JS
home_js = []
for f in ['index.html', 'en/index.html']:
    if f in js_blocks:
        for block in js_blocks[f]:
            home_js.append(f'// === From {f} ===\n(function() {{\n{block}\n}})();')

if home_js:
    with open('assets/js/home.js', 'w', encoding='utf-8') as f:
        f.write('// Homepage slider, animations, and counters\n\n')
        f.write('\n\n'.join(home_js))
    print(f'Wrote home.js ({len(home_js)} blocks)')

# Blog filter JS
blog_js = []
for f in ['blog/index.html', 'en/blog/index.html']:
    if f in js_blocks:
        for block in js_blocks[f]:
            blog_js.append(f'// === From {f} ===\n(function() {{\n{block}\n}})();')

if blog_js:
    with open('assets/js/blog-filter.js', 'w', encoding='utf-8') as f:
        f.write('// Blog page category filtering\n\n')
        f.write('\n\n'.join(blog_js))
    print(f'Wrote blog-filter.js ({len(blog_js)} blocks)')

# Search JS
search_js = []
for f in ['blog/search.html', 'blog/search.fa.html']:
    if f in js_blocks:
        for block in js_blocks[f]:
            search_js.append(f'// === From {f} ===\n(function() {{\n{block}\n}})();')

if search_js:
    with open('assets/js/search.js', 'w', encoding='utf-8') as f:
        f.write('// Blog search functionality\n\n')
        f.write('\n\n'.join(search_js))
    print(f'Wrote search.js ({len(search_js)} blocks)')

# Step 2: Remove inline <style> and <script> from HTML files and add references
for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove inline <style> blocks
    content = re.sub(r'\n?\s*<style[^>]*>.*?</style>\s*', '\n', content, flags=re.DOTALL)
    
    # Remove inline <script> blocks (keep <script src="...">)
    content = re.sub(r'\n?\s*<script>(.*?)</script>\s*', '\n', content, flags=re.DOTALL)
    
    # Add CSS reference after </head> or before </head>
    if filepath in ['index.html', 'en/index.html']:
        if 'pages.css' not in content:
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="{{ \'/assets/css/pages.css\' | relative_url }}">\n</head>'
            )
        if 'home.js' not in content:
            content = content.replace(
                '</body>',
                '    <script src="{{ \'/assets/js/home.js\' | relative_url }}"></script>\n</body>'
            )
    elif filepath in ['blog/search.html', 'blog/search.fa.html']:
        if 'pages.css' not in content:
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="{{ \'/assets/css/pages.css\' | relative_url }}">\n</head>'
            )
        if 'search.js' not in content:
            content = content.replace(
                '</body>',
                '    <script src="{{ \'/assets/js/search.js\' | relative_url }}"></script>\n</body>'
            )
    elif filepath in ['blog/index.html', 'en/blog/index.html']:
        if 'pages.css' not in content:
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="{{ \'/assets/css/pages.css\' | relative_url }}">\n</head>'
            )
        if 'blog-filter.js' not in content and filepath in ['blog/index.html', 'en/blog/index.html']:
            content = content.replace(
                '</body>',
                '    <script src="{{ \'/assets/js/blog-filter.js\' | relative_url }}"></script>\n</body>'
            )
    elif filepath in ['projects/index.html', 'en/projects/index.html',
                       'teams/index.html', 'en/teams/index.html']:
        if 'pages.css' not in content:
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="{{ \'/assets/css/pages.css\' | relative_url }}">\n</head>'
            )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Cleaned: {filepath}')

print('\nDone!')
