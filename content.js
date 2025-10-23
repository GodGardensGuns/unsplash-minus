// Unsplash Minus
(function () {
  "use strict";

  // Function to hide sponsored items
  function hideSponsoredItems() {
    // Method 1: Hide items with Unsplash+ links
    const plusLinks = document.querySelectorAll('a[href*="/plus"]');
    plusLinks.forEach((link) => {
      // Find the parent figure element and hide it
      const figure = link.closest(
        'figure[data-testid="asset-grid-masonry-figure"]',
      );
      if (figure) {
        figure.style.display = "none";
      }
    });

    // Method 2: Hide items with "For Unsplash+" text
    const elements = document.querySelectorAll("*");
    elements.forEach((element) => {
      if (
        element.textContent &&
        element.textContent.includes("For Unsplash+")
      ) {
        const figure = element.closest(
          'figure[data-testid="asset-grid-masonry-figure"]',
        );
        if (figure) {
          figure.style.display = "none";
        }
      }
    });

    // Method 3: Hide items with premium_photo in the URL
    const premiumImages = document.querySelectorAll(
      'img[src*="premium_photo"]',
    );
    premiumImages.forEach((img) => {
      const figure = img.closest(
        'figure[data-testid="asset-grid-masonry-figure"]',
      );
      if (figure) {
        figure.style.display = "none";
      }
    });

    // Method 4: Hide "Related illustrations" containers
    const relatedContainers = document.querySelectorAll(
      ".promptContainer-ClL6yZ",
    );
    relatedContainers.forEach((container) => {
      container.style.display = "none";
    });

    // Method 5: Hide elements with "Related illustrations" header text
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      if (
        element.textContent &&
        element.textContent.includes("Related illustrations")
      ) {
        const container = element.closest(".promptContainer-ClL6yZ");
        if (container) {
          container.style.display = "none";
        }
      }
    });

    // Method 6: Hide illustration containers specifically
    const illustrationContainers = document.querySelectorAll(
      ".illustrationsContainer-GQIpQz",
    );
    illustrationContainers.forEach((container) => {
      container.style.display = "none";
    });

    // Method 7: Hide premium vector images (illustrations)
    const premiumVectors = document.querySelectorAll(
      'img[src*="premium_vector"]',
    );
    premiumVectors.forEach((img) => {
      const container = img.closest(".promptContainer-ClL6yZ");
      if (container) {
        container.style.display = "none";
      }
    });

    console.log("Unsplash Minus: Removing sponsored content");
  }

  // Function to observe DOM changes for infinite scroll
  function observeChanges() {
    const observer = new MutationObserver(function (mutations) {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      if (shouldCheck) {
        setTimeout(hideSponsoredItems, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initialize when page loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      hideSponsoredItems();
      observeChanges();
    });
  } else {
    hideSponsoredItems();
    observeChanges();
  }

  // Also run when URL changes (for SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(hideSponsoredItems, 500);
    }
  }).observe(document, { subtree: true, childList: true });
})();
