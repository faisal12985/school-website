// 1. Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 2. Collapsible Curriculum Sections
const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('active');
  });
});

// 3. Carousel Navigation
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// 4. Optional: Form Submit Alert (can be improved later)
const admissionForm = document.querySelector('.admission-form form');
const contactForm = document.querySelector('.contact-form form');

[admissionForm, contactForm].forEach(form => {
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Form submitted successfully!');
      form.reset();
    });
  }
});

















const upiID = "mdf100114@okicici"; // 🔁 Replace with your actual UPI ID

  document.getElementById('qrForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const upiLink = `upi://pay?pa=${upiID}&pn=New%20Dream%20School&am=${amount}&cu=INR`;

    // Generate QR code
    QRCode.toCanvas(document.getElementById("qrcodeCanvas"), upiLink, function (error) {
      if (error) {
        console.error(error);
        alert("Failed to generate QR");
        return;
      }
      document.getElementById("successMsg").style.display = "none";
      console.log("QR Code generated.");
    });

    // Simulated "Payment Success" message after scan
    setTimeout(() => {
      document.getElementById("successMsg").style.display = "block";
    }, 10000); // Show after 10 seconds (simulate UPI scan)
  });



  
  // Wait until the page is loaded
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      // You can optionally prevent actual submission for testing
      // e.preventDefault();

      alert("✅ Thank you! Your admission form has been submitted.");
    });
  });
