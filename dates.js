// Back button
document.querySelector(".back-btn").addEventListener("click", () => {
  window.history.back();
});

// All Contact buttons
document.querySelectorAll(".contact-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "mailto:info@example.com";
  });
});

// All Call buttons
document.querySelectorAll(".call-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "tel:+919562571370";
  });
});
