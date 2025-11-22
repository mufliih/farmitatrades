document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      // Here you can track clicks, or handle any JS logic for footer items
      console.log('Footer icon clicked:', e.target.alt);
    }
  });
});
document.querySelector('.back-btn').addEventListener('click', () => {
  window.history.back();
});
