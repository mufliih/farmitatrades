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
      if (nextBtn) nextBtn.classList.add('hidden');
      if (prevBtn) prevBtn.classList.add('hidden'); // Hide both arrows when footer is visible
    } else {
      // Prev Arrow
      if (prevBtn) {
        if (currentIndex <= 0) {
          prevBtn.classList.add('hidden');
        } else {
          prevBtn.classList.remove('hidden');
        }
      }

      // Next Arrow
      // Always show next arrow until footer is fully visible
      if (nextBtn) nextBtn.classList.remove('hidden');
    }
  }

  function updateSlides() {
    sections.forEach((section, index) => {
      if (index <= currentIndex) {
        // Visible sections (current and previous ones below it)
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

  // Navigation Logic
  function goNext() {
    if (isFooterVisible) return;

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlides();
    } else {
      // At last slide, show footer
      isFooterVisible = true;
      footer.classList.add('visible');
      updateArrows();
    }
  }

  function goPrev() {
    if (isFooterVisible) {
      // Hide footer
      isFooterVisible = false;
      footer.classList.remove('visible');
      updateArrows();
    } else {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlides();
      }
    }
  }

  // Arrow Click Handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', goNext);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', goPrev);
  }

  // Wheel Event (Desktop)
  window.addEventListener('wheel', (e) => {
    // Only prevent default if we are handling the scroll
    // But since we are hijacking full page scroll, we should probably always prevent default
    // unless we want to allow normal scrolling on some other elements?
    // For this specific design, it seems to be a full-page takeover.
    // However, if the user tries to scroll horizontally or something else, it might be annoying.
    // Sticking to original behavior:
    e.preventDefault();

    const delta = e.deltaY; // Mostly care about vertical scroll

    if (Math.abs(delta) < 20) return; // Threshold

    if (delta > 0) {
      goNext();
    } else {
      goPrev();
    }
  }, { passive: false });

  // Touch Events (Mobile Swipe)
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: false });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchStartY - touchEndY;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped UP (Finger moves up, content moves up -> Next Slide)
        goNext();
      } else {
        // Swiped DOWN (Finger moves down, content moves down -> Prev Slide)
        goPrev();
      }
    }
  }

  // Resize handling not strictly needed for this logic as it's percentage based (translateX 100%)
});

// Back Button Logic
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.history.back();
  });
}
