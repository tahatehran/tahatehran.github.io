// Blog search functionality

// === From blog/search.html ===
(function() {
(function() {
  const searchInput = document.getElementById('blog-search');
  const clearBtn = document.getElementById('search-clear');
  const resultsContainer = document.getElementById('search-results');
  const loadingEl = document.getElementById('search-loading');
  let allPosts = [];
  let debounceTimer = null;

  // Normalize Persian/Arabic numbers to ASCII for cross-number matching
  function normalizeNumbers(str) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return str.replace(/[۰-۹]/g, function(d) {
      return persianDigits.indexOf(d).toString();
    });
  }

  function normalizeText(text) {
    if (!text) return '';
    return normalizeNumbers(text.toLowerCase().trim());
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightText(text, query) {
    if (!text || !query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const normalizedText = normalizeText(text);
    const words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 1; });
    if (words.length === 0) return escaped;
    const regex = new RegExp('(' + words.map(function(w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|') + ')', 'gi');
    // We highlight on the original text to preserve Unicode, but use a normalized version for matching
    let result = '';
    let lastIndex = 0;
    const lowerText = text.toLowerCase();
    for (let i = 0; i < words.length; i++) {
      // This approach won't work well for multi-word. Let's use a simpler approach.
    }
    // Simple highlight: use the regex on the escaped text directly
    return escaped.replace(regex, '<span class="search-highlight">$1</span>');
  }

  // Fuzzy match: split query into words, match ANY word
  function fuzzyMatch(text, query) {
    if (!text || !query) return false;
    const normalized = normalizeText(text);
    const words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
    if (words.length === 0) return false;
    return words.some(function(word) {
      return normalized.indexOf(word) !== -1;
    });
  }

  function filterPosts(query) {
    if (!query) return allPosts;
    return allPosts.filter(function(post) {
      const title = normalizeText(post.title || '');
      const desc = normalizeText(post.description || '');
      const cats = normalizeText((post.categories || []).join(' '));
      const combined = title + ' ' + desc + ' ' + cats;
      const words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
      return words.some(function(word) {
        return combined.indexOf(word) !== -1;
      });
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dateStr;
    }
  }

  function renderResults(postsToShow, query) {
    if (postsToShow.length === 0 && query) {
      resultsContainer.innerHTML = 
        '<div class="search-no-results">' +
          '<h3>No results found</h3>' +
          '<p>No articles match "<strong>' + escapeHtml(query) + '</strong>". Try different keywords or check your spelling.</p>' +
        '</div>';
      return;
    }

    let html = '';
    if (query) {
      html += '<div class="search-result-count">Found <strong>' + postsToShow.length + '</strong> article' + (postsToShow.length !== 1 ? 's' : '') + '</div>';
    }

    html += postsToShow.map(function(post) {
      const title = post.title || 'Untitled';
      const desc = post.description || '';
      const displayTitle = query ? highlightText(title, query) : escapeHtml(title);
      const displayDesc = query ? highlightText(desc, query) : escapeHtml(desc);
      const cats = (post.categories || []).map(function(c) {
        return '<span class="category-tag">' + escapeHtml(c) + '</span>';
      }).join(' ');
      const dateHtml = post.date ? '<span class="post-card-date">📅 ' + formatDate(post.date) + '</span>' : '';
      
      return '<article class="blog-post-card search-result-card">' +
        '<div class="post-card-content">' +
          '<h2 class="post-card-title"><a href="' + escapeHtml(post.url) + '">' + displayTitle + '</a></h2>' +
          '<p class="post-card-excerpt">' + displayDesc + '</p>' +
          '<div class="post-card-meta">' + cats + dateHtml + '</div>' +
          '<div class="post-card-link"><a href="' + escapeHtml(post.url) + '" class="btn btn-primary btn-small">Read more →</a></div>' +
        '</div>' +
      '</article>';
    }).join('');

    resultsContainer.innerHTML = html;
  }

  function showLoading() {
    resultsContainer.innerHTML = 
      '<div class="search-loading">' +
        '<div class="spinner"></div>' +
        '<div>Loading posts...</div>' +
      '</div>';
  }

  function showInitial() {
    resultsContainer.innerHTML = 
      '<div class="search-info" style="text-align:center; padding: 2rem 1rem; color: var(--muted);">' +
        'Type to search through all English blog posts...' +
      '</div>';
  }

  // Fetch and initialize
  fetch('/blog/search-data.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      // Filter to English posts only
      allPosts = (data.posts || []).filter(function(post) {
        return post.lang === 'en';
      });
      showInitial();
    })
    .catch(function() {
      resultsContainer.innerHTML = 
        '<div class="search-no-results">' +
          '<h3>⚠️ Could not load search index</h3>' +
          '<p>Please try refreshing the page.</p>' +
        '</div>';
    });

  // Search input handler with debounce
  searchInput.addEventListener('input', function() {
    var query = this.value.trim();
    
    // Show/hide clear button
    clearBtn.style.display = query ? 'block' : 'none';

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      if (!query) {
        showInitial();
        return;
      }
      var filtered = filterPosts(query);
      renderResults(filtered, query);
    }, 300);
  });

  // Clear button
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.focus();
    clearBtn.style.display = 'none';
    showInitial();
  });

  // Keyboard navigation: Escape to clear
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      showInitial();
    }
  });

  // Focus search input on page load
  searchInput.focus();
})();
})();

// === From blog/search.fa.html ===
(function() {
(function() {
  var searchInput = document.getElementById('blog-search');
  var clearBtn = document.getElementById('search-clear');
  var resultsContainer = document.getElementById('search-results');
  var allPosts = [];
  var debounceTimer = null;

  // Persian/Arabic number mapping
  var persianDigits = '\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9';
  var arabicDigits = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';

  function normalizeNumbers(str) {
    // Convert Persian digits (۰-۹) and Arabic digits (٠-٩) to ASCII
    var result = str;
    for (var i = 0; i < 10; i++) {
      result = result.split(persianDigits[i]).join(String(i));
      result = result.split(arabicDigits[i]).join(String(i));
    }
    return result;
  }

  function normalizeText(text) {
    if (!text) return '';
    return normalizeNumbers(text.toLowerCase().trim());
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightText(text, query) {
    if (!text || !query) return escapeHtml(text);
    var escaped = escapeHtml(text);
    var words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 1; });
    if (words.length === 0) return escaped;
    var pattern = words.map(function(w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|');
    var regex = new RegExp('(' + pattern + ')', 'gi');
    return escaped.replace(regex, '<span class="search-highlight">$1</span>');
  }

  function filterPosts(query) {
    if (!query) return allPosts;
    var words = query.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
    if (words.length === 0) return allPosts;

    return allPosts.filter(function(post) {
      var title = normalizeText(post.title || '');
      var desc = normalizeText(post.description || '');
      var cats = normalizeText((post.categories || []).join(' '));
      var combined = title + ' ' + desc + ' ' + cats;
      return words.some(function(word) {
        return combined.indexOf(word) !== -1;
      });
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      var d = new Date(dateStr);
      return d.toLocaleDateString('fa-IR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dateStr;
    }
  }

  function renderResults(postsToShow, query) {
    if (postsToShow.length === 0 && query) {
      resultsContainer.innerHTML = 
        '<div class="search-no-results">' +
          '<h3>نتیجه‌ای یافت نشد</h3>' +
          '<p>مقاله‌ای با عبارت «<strong>' + escapeHtml(query) + '</strong>» یافت نشد. کلمات کلیدی دیگری امتحان کنید.</p>' +
        '</div>';
      return;
    }

    var html = '';
    if (query) {
      html += '<div class="search-result-count"><strong>' + postsToShow.length + '</strong> مقاله یافت شد</div>';
    }

    html += postsToShow.map(function(post) {
      var title = post.title || 'بدون عنوان';
      var desc = post.description || '';
      var displayTitle = query ? highlightText(title, query) : escapeHtml(title);
      var displayDesc = query ? highlightText(desc, query) : escapeHtml(desc);
      var cats = (post.categories || []).map(function(c) {
        return '<span class="category-tag">' + escapeHtml(c) + '</span>';
      }).join(' ');
      var dateHtml = post.date ? '<span class="post-card-date">📅 ' + formatDate(post.date) + '</span>' : '';
      
      return '<article class="blog-post-card search-result-card">' +
        '<div class="post-card-content">' +
          '<h2 class="post-card-title"><a href="' + escapeHtml(post.url) + '">' + displayTitle + '</a></h2>' +
          '<p class="post-card-excerpt">' + displayDesc + '</p>' +
          '<div class="post-card-meta">' + cats + dateHtml + '</div>' +
          '<div class="post-card-link"><a href="' + escapeHtml(post.url) + '" class="btn btn-primary btn-small">بیشتر بخوانید ←</a></div>' +
        '</div>' +
      '</article>';
    }).join('');

    resultsContainer.innerHTML = html;
  }

  function showInitial() {
    resultsContainer.innerHTML = 
      '<div class="search-info" style="text-align:center; padding: 2rem 1rem; color: var(--muted);">' +
        'برای جستجو در مقالات فارسی بلاگ تایپ کنید...' +
      '</div>';
  }

  // Fetch and initialize
  fetch('/blog/search-data.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      // Filter to Persian posts only
      allPosts = (data.posts || []).filter(function(post) {
        return post.lang === 'fa';
      });
      showInitial();
    })
    .catch(function() {
      resultsContainer.innerHTML = 
        '<div class="search-no-results">' +
          '<h3>⚠️ بارگذاری فهرست جستجو ممکن نبود</h3>' +
          '<p>لطفاً صفحه را مجدداً بارگذاری کنید.</p>' +
        '</div>';
    });

  // Search input handler with debounce
  searchInput.addEventListener('input', function() {
    var query = this.value.trim();
    
    clearBtn.style.display = query ? 'block' : 'none';

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      if (!query) {
        showInitial();
        return;
      }
      var filtered = filterPosts(query);
      renderResults(filtered, query);
    }, 300);
  });

  // Clear button
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.focus();
    clearBtn.style.display = 'none';
    showInitial();
  });

  // Keyboard navigation: Escape to clear
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      showInitial();
    }
  });

  // Focus search input on page load
  searchInput.focus();
})();
})();