// Cylindrical navbar mobile toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  if (btn && links) {
    btn.addEventListener("click", () => {
      links.classList.toggle("show");
    });

    // Close menu when a link is clicked (optional UX)
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("show"))
    );
  }
});
document.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});


// Contact Us button scroll
const contactNavBtn = document.getElementById("contactNavBtn");
const contactBtn = document.getElementById("contactBtn");
const contactSection = document.getElementById("contact");

function scrollToContact() {
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}

if (contactNavBtn) contactNavBtn.addEventListener("click", scrollToContact);
if (contactBtn) contactBtn.addEventListener("click", scrollToContact);

// Hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // scrolling down
    nav.style.top = "-70px";
  } else {
    // scrolling up
    nav.style.top = "0";
  }

  lastScroll = currentScroll;
});
// Smooth scroll for Contact Us button
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".hero .btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("[name='name']").value;
    const email = form.querySelector("[name='email']").value;
    const phoneNumber = form.querySelector("[name='phone']").value;
    const message = form.querySelector("[name='message']").value;

    // Replace with your WhatsApp business number (country code, no + sign or spaces)
    const farmitaPhone = "917902914765";

    const waMessage = `Hello, I am ${name}.
Phone: ${phoneNumber}
Email: ${email}
Message: ${message}`;

    const waUrl = `https://wa.me/${farmitaPhone}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, "_blank");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const logoBtn = document.getElementById("logoBtn");

  if (logoBtn) {
    logoBtn.addEventListener("click", (e) => {
      e.preventDefault(); // stop default jump
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
//scroll nav animation
let lastScrollY = window.scrollY;
const navbar = document.querySelector("nav");

// remove shadow if at the very top
if (window.scrollY === 0) {
  navbar.classList.remove("scrolled");
}

lastScrollY = window.scrollY;

// Smooth scroll for older browsers (optional)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => observer.observe(el));
});




