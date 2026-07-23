document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // Mobile Menu Logic (single handler)
  // ============================================
  const toggle = document.querySelector(".mobile-menu-toggle");
  const close = document.querySelector(".mobile-menu-close");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const body = document.body;

  function closeMenu() {
    if (overlay) overlay.classList.remove("active");
    if (body) body.classList.remove("menu-open");
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
    body.style.height = "";
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    window.scrollTo(0, window.scrollY);
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      const isOpen = overlay.classList.contains("active");
      if (isOpen) {
        closeMenu();
      } else {
        overlay.classList.add("active");
        body.classList.add("menu-open");
        body.style.overflow = "hidden";
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  if (close) close.addEventListener("click", closeMenu);

  // Close on overlay background click
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMenu();
    });
  }

  // Close menu on link click
  if (overlay) {
    const navLinks = overlay.querySelectorAll("a");
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  }

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.classList.contains("active"))
      closeMenu();
  });
});

// ============================================
// Sticky Header Shadow on Scroll
// ============================================
const header = document.querySelector(".site-header");
if (header) {
  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = currentScroll;
    },
    { passive: true },
  );
}

// ============================================
// Code Copy Logic
// ============================================
const codeBlocks = document.querySelectorAll("pre");
codeBlocks.forEach((block) => {
  if (block.querySelector(".copy-btn")) return;

  const button = document.createElement("button");
  button.className = "copy-btn";
  button.type = "button";
  button.innerHTML = '<i class="far fa-copy"></i> Copy';
  block.appendChild(button);

  button.addEventListener("click", async () => {
    const codeElement = block.querySelector("code");
    if (!codeElement) return;
    const textToCopy = codeElement.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        showStatus(button, true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        textArea.remove();
        showStatus(button, successful);
      }
    } catch (err) {
      showStatus(button, false);
    }
  });
});

function showStatus(btn, success) {
  const original = btn.innerHTML;
  const isRTL = document.documentElement.dir === "rtl";
  if (success) {
    btn.innerHTML = isRTL
      ? '<i class="fas fa-check"></i> کپی شد!'
      : '<i class="fas fa-check"></i> Copied!';
    btn.classList.add("copied");
  } else {
    btn.innerHTML = isRTL
      ? '<i class="fas fa-times"></i> خطا'
      : '<i class="fas fa-times"></i> Error';
  }
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove("copied");
  }, 2000);
}

// ============================================
// Contact Card Copy Functionality
// ============================================
const contactCards = document.querySelectorAll(".contact-card[data-copy]");

contactCards.forEach((card) => {
  card.addEventListener("click", async () => {
    const textToCopy = card.getAttribute("data-copy");

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        textArea.remove();

        if (!successful) {
          throw new Error("Copy failed");
        }
      }

      // Show copied state
      card.classList.add("copied");
      const hint = card.querySelector(".copy-hint");
      if (hint) {
        const originalText = hint.textContent;
        hint.textContent = card.dir === "rtl" ? "کپی شد!" : "Copied!";
        setTimeout(() => {
          hint.textContent = originalText;
          card.classList.remove("copied");
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });
});

// ============================================
// Blog Search (on blog index pages)
// ============================================
const searchInput = document.getElementById("blog-search");
const postsContainer = document.getElementById("blog-posts-container");

if (searchInput && postsContainer) {
  let searchTimeout;

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = this.value.toLowerCase().trim();
      const posts = postsContainer.querySelectorAll(".blog-post-card");
      let visibleCount = 0;

      posts.forEach((post) => {
        const title = (post.getAttribute("data-title") || "").toLowerCase();
        const description = (
          post.getAttribute("data-description") || ""
        ).toLowerCase();
        const categories = (
          post.getAttribute("data-categories") || ""
        ).toLowerCase();

        if (
          !searchTerm ||
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          categories.includes(searchTerm)
        ) {
          post.style.display = "";
          post.style.opacity = "1";
          post.style.transform = "translateY(0)";
          visibleCount++;
        } else {
          post.style.opacity = "0";
          post.style.transform = "translateY(10px)";
          setTimeout(() => {
            if (post.style.opacity === "0") {
              post.style.display = "none";
            }
          }, 200);
        }
      });

      // Update result count if counter exists
      const counter = document.getElementById("results-count");
      if (counter) {
        if (searchTerm) {
          const isRTL = document.documentElement.dir === "rtl";
          counter.textContent = isRTL
            ? `${visibleCount} نتیجه یافت شد`
            : `${visibleCount} results found`;
          counter.style.display = "block";
        } else {
          counter.style.display = "none";
        }
      }
    }, 200);
  });

  // Escape to clear search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
      searchInput.blur();
    }
  });
}

// ============================================
// Category Filter Buttons (skip on blog pages - handled by blog-filter.js)
// ============================================
const filterBtns = document.querySelectorAll(".filter-btn");
const isBlogPage =
  document.getElementById("blog-posts-container") ||
  document.getElementById("blog-search");
if (filterBtns.length > 0 && !isBlogPage) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter || this.dataset.category || "";
      const container = this.closest(".blog-filters");
      const postsSection = container ? container.nextElementSibling : null;
      const posts = postsSection
        ? postsSection.querySelectorAll(".blog-post-card")
        : document.querySelectorAll(".blog-post-card");

      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      let visibleCount = 0;
      posts.forEach((post) => {
        if (filter === "all") {
          post.style.display = "";
          post.style.opacity = "1";
          post.style.transform = "translateY(0)";
          visibleCount++;
        } else {
          const cats = (post.dataset.categories || "").toLowerCase();
          if (cats.includes(String(filter).toLowerCase())) {
            post.style.display = "";
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
            visibleCount++;
          } else {
            post.style.opacity = "0";
            post.style.transform = "translateY(10px)";
            setTimeout(() => {
              if (post.style.opacity === "0") {
                post.style.display = "none";
              }
            }, 200);
          }
        }
      });

      // Update result count
      const counter = document.getElementById("results-count");
      if (counter) {
        const isRTL = document.documentElement.dir === "rtl";
        counter.textContent = isRTL
          ? `${visibleCount} مقاله`
          : `${visibleCount} posts`;
        counter.style.display = "block";
      }
    });
  });
}

// ============================================
// Smooth Scroll to Top Button
// ============================================
const scrollToTop = document.createElement("button");
scrollToTop.className = "scroll-to-top";
scrollToTop.innerHTML = "↑";
scrollToTop.setAttribute("aria-label", "Scroll to top");
scrollToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--primary);
        color: #fff;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px var(--primary-glow);
    `;

// RTL: position on left
if (document.documentElement.dir === "rtl") {
  scrollToTop.style.right = "auto";
  scrollToTop.style.left = "2rem";
}

document.body.appendChild(scrollToTop);

window.addEventListener(
  "scroll",
  () => {
    if (window.pageYOffset > 400) {
      scrollToTop.style.opacity = "1";
      scrollToTop.style.visibility = "visible";
    } else {
      scrollToTop.style.opacity = "0";
      scrollToTop.style.visibility = "hidden";
    }
  },
  { passive: true },
);

scrollToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Touch device: hide on touch start
scrollToTop.addEventListener(
  "touchstart",
  () => {
    scrollToTop.style.transform = "scale(0.9)";
  },
  { passive: true },
);

scrollToTop.addEventListener(
  "touchend",
  () => {
    scrollToTop.style.transform = "scale(1)";
  },
  { passive: true },
);

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
if ("IntersectionObserver" in window) {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-scale",
  );
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }
}

// ============================================
// Lazy Loading for Images
// ============================================
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

// ============================================
// Performance: Passive Event Listeners
// ============================================
// Ensure scroll and touch events are passive for better mobile performance
// (Already handled by { passive: true } in scroll listeners above)
