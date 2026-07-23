// Blog page category filtering

// === From blog/index.html ===
(function () {
    (function () {
        const searchInput = document.getElementById("blog-search");
        const filterBtns = document.querySelectorAll(".filter-btn");
        const cards = document.querySelectorAll(".blog-post-card");
        const noResults = document.getElementById("no-results");
        const resultCount = document.getElementById("search-result-count");
        let activeCategory = "all";

        function normalizeText(text) {
            return (text || "").toLowerCase().trim();
        }

        function applyFilters() {
            if (!searchInput) return;
            const query = normalizeText(searchInput.value);
            let visibleCount = 0;

            cards.forEach(function (card) {
                const title = normalizeText(card.dataset.title);
                const description = normalizeText(card.dataset.description);
                const categories = normalizeText(card.dataset.categories);

                // Search filter: matches title OR description OR categories
                let matchesSearch = true;
                if (query) {
                    matchesSearch =
                        title.includes(query) ||
                        description.includes(query) ||
                        categories.includes(query);
                }

                // Category filter
                let matchesCategory = true;
                if (activeCategory !== "all") {
                    matchesCategory = categories.includes(activeCategory);
                }

                // AND logic: both must match
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

            // Show/hide no results
            if (noResults)
                noResults.style.display = visibleCount === 0 ? "block" : "none";

            // Update result count
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
        let searchTimeout;
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
})();

// === From en/blog/index.html ===
(function () {
    (function () {
        "use strict";

        // --- Configuration ---
        const POSTS_PER_PAGE = 9;
        const DEBOUNCE_DELAY = 250;

        // --- State ---
        let currentPage = 1;
        let activeCategory = "all";
        let searchQuery = "";
        let allCards = [];
        let filteredCards = [];

        // --- Initialization ---
        document.addEventListener("DOMContentLoaded", function () {
            // Only run on English blog page
            var blogContainer = document.getElementById("blog-posts-container");
            if (!blogContainer) return;

            allCards = Array.from(
                document.querySelectorAll("#blog-posts-container .blog-post-card"),
            );
            filteredCards = [...allCards];

            // Setup search with debounce
            var searchInput = document.getElementById("blog-search");
            var clearBtn = document.getElementById("search-clear");

            if (searchInput) {
                var debounceTimer;
                searchInput.addEventListener("input", function () {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(function () {
                        searchQuery = searchInput.value.trim().toLowerCase();
                        if (clearBtn) clearBtn.style.display = searchQuery.length > 0 ? "block" : "none";
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

                // Keyboard shortcut: Escape to clear search
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
        });

        // --- Category Filter (global) ---
        window.filterByCategory = function (category, btnElement) {
            activeCategory = category;

            // Update active state on buttons
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
                // Search match
                if (searchQuery) {
                    var title = (card.getAttribute("data-title") || "").toLowerCase();
                    var desc = (
                        card.getAttribute("data-description") || ""
                    ).toLowerCase();
                    var cats = (card.getAttribute("data-categories") || "").toLowerCase();
                    var matchSearch =
                        title.indexOf(searchQuery) !== -1 ||
                        desc.indexOf(searchQuery) !== -1 ||
                        cats.indexOf(searchQuery) !== -1;
                    if (!matchSearch) return false;
                }

                // Category match
                if (activeCategory !== "all") {
                    var cardCats = (card.getAttribute("data-categories") || "").split(
                        " ",
                    );
                    if (cardCats.indexOf(activeCategory) === -1) return false;
                }

                return true;
            });

            currentPage = 1;
            renderCards(false);
        }

        // --- Render Cards with Pagination ---
        function renderCards(appendMode) {
            var container = document.getElementById("blog-posts-container");
            var noResults = document.getElementById("no-results");
            var loadMoreContainer = document.getElementById("load-more-container");
            var resultsCount = document.getElementById("search-results-count");
            var totalVisible = currentPage * POSTS_PER_PAGE;

            // If not appending, hide all cards first
            if (!appendMode) {
                allCards.forEach(function (card) {
                    card.style.display = "none";
                    card.classList.remove("fade-in", "fade-out");
                });
            }

            // Determine which cards to show
            var cardsToShow = filteredCards.slice(0, totalVisible);
            var hasMore = filteredCards.length > totalVisible;

            // Show relevant cards with staggered fade-in
            if (!appendMode) {
                cardsToShow.forEach(function (card, index) {
                    card.style.display = "flex";
                    card.classList.remove("fade-out");
                    card.classList.add("fade-in");
                    card.style.transitionDelay = Math.min(index, 15) * 40 + "ms";
                    // Reset delay after animation
                    setTimeout(function () {
                        card.style.transitionDelay = "0ms";
                    }, 800);
                });
            } else {
                // For append mode, show only the new cards
                var startIndex = (currentPage - 1) * POSTS_PER_PAGE;
                filteredCards
                    .slice(startIndex, totalVisible)
                    .forEach(function (card, index) {
                        card.style.display = "flex";
                        card.classList.remove("fade-out");
                        card.classList.add("fade-in");
                        card.style.transitionDelay = index * 50 + "ms";
                        setTimeout(function () {
                            card.style.transitionDelay = "0ms";
                        }, 800);
                    });
            }

            // No results
            if (filteredCards.length === 0) {
                if (noResults) noResults.style.display = "block";
                if (loadMoreContainer) loadMoreContainer.style.display = "none";
            } else {
                if (noResults) noResults.style.display = "none";
                if (loadMoreContainer) loadMoreContainer.style.display = "block";
            }

            // Load more button
            var loadMoreBtn = document.getElementById("load-more-btn");
            var loadMoreInfo = document.getElementById("load-more-info");
            if (hasMore) {
                if (loadMoreBtn) loadMoreBtn.style.display = "inline-flex";
                var remaining = filteredCards.length - totalVisible;
                if (loadMoreInfo) loadMoreInfo.textContent =
                    "Showing " +
                    cardsToShow.length +
                    " of " +
                    filteredCards.length +
                    " articles (" +
                    remaining +
                    " remaining)";
            } else {
                if (loadMoreBtn) loadMoreBtn.style.display = "none";
                if (loadMoreInfo) loadMoreInfo.textContent =
                    filteredCards.length > 0
                        ? "Showing all " + filteredCards.length + " articles"
                        : "";

                // Results count
                if (searchQuery || activeCategory !== "all") {
                    var filterLabel = "";
                    if (searchQuery) filterLabel += '"' + searchQuery + '"';
                    if (activeCategory !== "all") {
                        filterLabel += (filterLabel ? " in " : "") + activeCategory;
                    }
                    if (resultsCount) resultsCount.textContent =
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
        })();
