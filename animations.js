// Adds page-loaded class, sets up scroll reveal, and anchor offset scrolling.
document.addEventListener('DOMContentLoaded', function () {
  // small delay to allow CSS transitions for page load
  setTimeout(() => document.body.classList.add('page-loaded'), 50);

  // auto-add reveal class to main sections and common blocks
  const autoRevealSelectors = [
    'header .navbar',
    'section',
    '.hero-details > *',
    '.profile',
    '.projects-card .card-con',
    '.skills-brand',
    '.contact-details'
  ];
  const elems = document.querySelectorAll(autoRevealSelectors.join(','));
  elems.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  // IntersectionObserver for reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Smooth anchor scrolling with header offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector('.navbar');
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 0;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});