// Blog page category filtering

// === From blog/index.html (Persian) ===
(function () {
  // Only run on Persian (RTL) blog pages
  if (document.documentElement.dir !== "rtl") return;

  var searchInput = document.getElementById("blog-search");
  var filterBtns = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".blog-post-card");
  var noResults = document.getElementById("no-results");
  var resultCount = document.getElementById("search-result-count");
  var activeCategory = "all";

  function normalizeText(text) {
    return (text || "").toLowerCase().trim();
  }

  function applyFilters() {
    if (!searchInput) return;
    var query = normalizeText(searchInput.value);
    var visibleCount = 0;

    cards.forEach(function (card) {
      var title = normalizeText(card.dataset.title);
      var description = normalizeText(card.dataset.description);
      var categories = normalizeText(card.dataset.categories);

      var matchesSearch = true;
      if (query) {
        matchesSearch =
          title.includes(query) ||
          description.includes(query) ||
          categories.includes(query);
      }

      var matchesCategory = true;
      if (activeCategory !== "all") {
        matchesCategory = categories.includes(activeCategory);
      }

      if (matchesSearch && matchesCategory) {
        card.style.display = "";
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        requestAnimationFrame(function () {
          card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults)
      noResults.style.display = visibleCount === 0 ? "block" : "none";

    if (resultCount) {
      if (query || activeCategory !== "all") {
        resultCount.textContent = visibleCount + " مقاله یافت شد";
        resultCount.style.opacity = "1";
      } else {
        resultCount.textContent = "";
        resultCount.style.opacity = "0";
      }
    }
  }

  // Search input handler (with debounce)
  var searchTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 200);
    });
  }

  // Category filter buttons
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
        b.style.background = "transparent";
        b.style.color = "var(--muted, #9ca3af)";
      });
      this.classList.add("active");
      this.style.background = "rgba(99,102,241,0.15)";
      this.style.color = "#a5b4fc";

      activeCategory = this.dataset.filter;
      applyFilters();
    });
  });

  // Make card hover effects work
  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "0 8px 30px rgba(99,102,241,0.15)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });
})();

// === From en/blog/index.html (English) ===
(function () {
  "use strict";

  // Only run on English (LTR) blog pages
  if (document.documentElement.dir !== "ltr") return;

  // --- Configuration ---
  var POSTS_PER_PAGE = 9;
  var DEBOUNCE_DELAY = 250;

  // --- State ---
  var currentPage = 1;
  var activeCategory = "all";
  var searchQuery = "";
  var allCards = [];
  var filteredCards = [];

  // --- Initialization ---
  // Only run on English blog page
  var blogContainer = document.getElementById("blog-posts-container");
  if (!blogContainer) return;

  allCards = Array.from(
    document.querySelectorAll("#blog-posts-container .blog-post-card"),
  );
  filteredCards = allCards.slice();

  // Setup search with debounce
  var searchInput = document.getElementById("blog-search");
  var clearBtn = document.getElementById("search-clear");

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        if (clearBtn)
          clearBtn.style.display = searchQuery.length > 0 ? "block" : "none";
        applyFilters();
      }, DEBOUNCE_DELAY);
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        searchQuery = "";
        clearBtn.style.display = "none";
        applyFilters();
        searchInput.focus();
      });
    }

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchInput.value = "";
        searchQuery = "";
        if (clearBtn) clearBtn.style.display = "none";
        applyFilters();
      }
    });
  }

  // Initial render
  applyFilters();

  // --- Category Filter (global) ---
  window.filterByCategory = function (category, btnElement) {
    activeCategory = category;

    document
      .querySelectorAll("#blog-filters .filter-btn")
      .forEach(function (btn) {
        btn.classList.remove("active");
      });
    btnElement.classList.add("active");

    currentPage = 1;
    applyFilters();
  };

  // --- Reset Filters (global) ---
  window.resetFilters = function () {
    activeCategory = "all";
    searchQuery = "";
    currentPage = 1;
    var resetSearchInput = document.getElementById("blog-search");
    var resetClearBtn = document.getElementById("search-clear");
    if (resetSearchInput) resetSearchInput.value = "";
    if (resetClearBtn) resetClearBtn.style.display = "none";
    document
      .querySelectorAll("#blog-filters .filter-btn")
      .forEach(function (btn) {
        btn.classList.remove("active");
        if (btn.getAttribute("data-category") === "all") {
          btn.classList.add("active");
        }
      });
    applyFilters();
  };

  // --- Load More (global) ---
  window.loadMorePosts = function () {
    currentPage++;
    renderCards(true);
  };

  // --- Core Filter Logic ---
  function applyFilters() {
    filteredCards = allCards.filter(function (card) {
      if (searchQuery) {
        var title = (card.getAttribute("data-title") || "").toLowerCase();
        var desc = (card.getAttribute("data-description") || "").toLowerCase();
        var cats = (card.getAttribute("data-categories") || "").toLowerCase();
        var matchSearch =
          title.indexOf(searchQuery) !== -1 ||
          desc.indexOf(searchQuery) !== -1 ||
          cats.indexOf(searchQuery) !== -1;
        if (!matchSearch) return false;
      }

      if (activeCategory !== "all") {
        var cardCats = (card.getAttribute("data-categories") || "").split(" ");
        if (cardCats.indexOf(activeCategory) === -1) return false;
      }

      return true;
    });

    currentPage = 1;
    renderCards(false);
  }

  // --- Render Cards with Pagination ---
  function renderCards(appendMode) {
    var noResults = document.getElementById("no-results");
    var loadMoreContainer = document.getElementById("load-more-container");
    var resultsCount = document.getElementById("search-results-count");
    var totalVisible = currentPage * POSTS_PER_PAGE;

    if (!appendMode) {
      allCards.forEach(function (card) {
        card.style.display = "none";
        card.classList.remove("fade-in", "fade-out");
      });
    }

    var cardsToShow = filteredCards.slice(0, totalVisible);
    var hasMore = filteredCards.length > totalVisible;

    if (!appendMode) {
      cardsToShow.forEach(function (card, index) {
        if (!card) return;
        card.style.display = "flex";
        card.classList.remove("fade-out");
        card.classList.add("fade-in");
        card.style.transitionDelay = Math.min(index, 15) * 40 + "ms";
        setTimeout(function () {
          if (card) card.style.transitionDelay = "0ms";
        }, 800);
      });
    } else {
      var startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      filteredCards
        .slice(startIndex, totalVisible)
        .forEach(function (card, index) {
          if (!card) return;
          card.style.display = "flex";
          card.classList.remove("fade-out");
          card.classList.add("fade-in");
          card.style.transitionDelay = index * 50 + "ms";
          setTimeout(function () {
            if (card) card.style.transitionDelay = "0ms";
          }, 800);
        });
    }

    if (filteredCards.length === 0) {
      if (noResults) noResults.style.display = "block";
      if (loadMoreContainer) loadMoreContainer.style.display = "none";
    } else {
      if (noResults) noResults.style.display = "none";
      if (loadMoreContainer) loadMoreContainer.style.display = "block";
    }

    var loadMoreBtn = document.getElementById("load-more-btn");
    var loadMoreInfo = document.getElementById("load-more-info");
    if (hasMore) {
      if (loadMoreBtn) loadMoreBtn.style.display = "inline-flex";
      var remaining = filteredCards.length - totalVisible;
      if (loadMoreInfo)
        loadMoreInfo.textContent =
          "Showing " +
          cardsToShow.length +
          " of " +
          filteredCards.length +
          " articles (" +
          remaining +
          " remaining)";
    } else {
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      if (loadMoreInfo)
        loadMoreInfo.textContent =
          filteredCards.length > 0
            ? "Showing all " + filteredCards.length + " articles"
            : "";

      if (searchQuery || activeCategory !== "all") {
        var filterLabel = "";
        if (searchQuery) filterLabel += '"' + searchQuery + '"';
        if (activeCategory !== "all") {
          filterLabel += (filterLabel ? " in " : "") + activeCategory;
        }
        if (resultsCount)
          resultsCount.textContent =
            filteredCards.length +
            " article" +
            (filteredCards.length !== 1 ? "s" : "") +
            " found" +
            (filterLabel ? " for " + filterLabel : "");
        if (resultsCount) resultsCount.style.opacity = "1";
      } else {
        if (resultsCount) resultsCount.textContent = "";
        if (resultsCount) resultsCount.style.opacity = "0";
      }
    }
  }
})();
