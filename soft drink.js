document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer-container');
  const sections = document.querySelectorAll('.product-section');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  let currentIndex = 0;
  let isFooterVisible = false;
  const maxIndex = sections.length - 1;

  // Initial setup: Ensure first section is visible, others are to the right
  // This is handled by CSS, but we can enforce it here if needed.
  // CSS: first-child translateX(0), others translateX(100%)

  // Initial animation for first section text
  if (sections.length > 0) {
    sections[0].classList.add('in-view');
  }

  function updateArrows() {
    if (isFooterVisible) {
      nextBtn.classList.add('hidden');
      prevBtn.classList.add('hidden'); // Hide both arrows when footer is visible
    } else {
      // Prev Arrow
      if (currentIndex <= 0) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }

      // Next Arrow
      // Always show next arrow until footer is fully visible
      nextBtn.classList.remove('hidden');
    }
  }

  function updateSlides() {
    sections.forEach((section, index) => {
      if (index <= currentIndex) {
        // Visible sections (current and previous ones below it)
        // Actually, for the overlap effect:
        // Index 0 is bottom, Index 1 is above it, etc.
        // If currentIndex is 2:
        // 0: translateX(0)
        // 1: translateX(0)
        // 2: translateX(0) -> This is the top visible one
        // 3: translateX(100%)
        section.style.transform = 'translateX(0)';
      } else {
        // Future sections
        section.style.transform = 'translateX(100%)';
      }

      // Manage 'in-view' class for text animations
      if (index === currentIndex) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
    updateArrows();
  }

  // Initial state
  updateArrows();

  // Arrow Click Handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isFooterVisible) return;

      if (currentIndex < maxIndex) {
        // Go to next slide (slide it IN)
        currentIndex++;
        updateSlides();
      } else {
        // At last slide, show footer
        isFooterVisible = true;
        footer.classList.add('visible');
        updateArrows();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isFooterVisible) {
        // Hide footer
        isFooterVisible = false;
        footer.classList.remove('visible');
        updateArrows();
      } else {
        if (currentIndex > 0) {
          // Go to prev slide (slide current OUT)
          currentIndex--;
          updateSlides();
        }
      }
    });
  }

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY + e.deltaX;

    if (Math.abs(delta) < 20) return; // Higher threshold for step-based scroll

    // Debounce or lock could be added here for smoother step-by-step
    // For now, let's just trigger on threshold

    if (isFooterVisible) {
      if (delta < -20) {
        isFooterVisible = false;
        footer.classList.remove('visible');
        updateArrows();
      }
    } else {
      if (delta > 0) {
        // Next
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateSlides();
          // Add a small timeout to prevent rapid firing?
          // For simple implementation, relying on user control
        } else {
          isFooterVisible = true;
          footer.classList.add('visible');
          updateArrows();
        }
      } else {
        // Prev
        if (currentIndex > 0) {
          currentIndex--;
          updateSlides();
        }
      }
    }
  }, { passive: false });

  // Resize handling not strictly needed for this logic as it's percentage based (translateX 100%)
});

// Back Button Logic
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.history.back();
  });
}
