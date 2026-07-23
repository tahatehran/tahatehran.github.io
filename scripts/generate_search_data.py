import os, re, json

posts = []
posts_dir = '_posts'
for f in sorted(os.listdir(posts_dir)):
    if not f.endswith('.md'):
        continue
    path = os.path.join(posts_dir, f)
    with open(path, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    fm_match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not fm_match:
        continue
    
    fm_text = fm_match.group(1)
    body = fm_match.group(2)
    
    def extract(key, default=''):
        m = re.search(r'^' + key + r':\s*["\']?(.*?)["\']?\s*$', fm_text, re.MULTILINE)
        return m.group(1).strip() if m else default
    
    def extract_list(key):
        m = re.search(r'^' + key + r':\s*\[(.*?)\]', fm_text, re.MULTILINE)
        if m:
            return [x.strip().strip('"') for x in m.group(1).split(',') if x.strip()]
        return []
    
    title = extract('title', '').strip('"')
    url = extract('permalink', '')
    description = extract('description', '').strip('"')
    lang = extract('lang', 'fa')
    categories = extract_list('categories')
    date = extract('date', '')
    
    body_clean = re.sub(r'```.*?```', '', body, flags=re.DOTALL)
    body_clean = re.sub(r'[#*`\[\]()>_~|-]', '', body_clean)
    body_clean = re.sub(r'\n+', ' ', body_clean).strip()
    excerpt = body_clean[:200]
    
    posts.append({
        'title': title,
        'url': url,
        'description': description or excerpt,
        'lang': lang,
        'categories': categories,
        'date': date,
        'excerpt': excerpt
    })

posts.sort(key=lambda x: (0 if x['lang'] == 'fa' else 1, x.get('date', ''), x.get('title', '')))

with open('blog/search-data.json', 'w', encoding='utf-8') as f:
    json.dump({'posts': posts}, f, ensure_ascii=False, indent=2)

fa_count = sum(1 for p in posts if p['lang'] == 'fa')
en_count = sum(1 for p in posts if p['lang'] == 'en')
print(f'Generated: {len(posts)} posts ({fa_count} FA, {en_count} EN)')
