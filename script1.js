document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optioneel: één keer animeren en dan uit observer halen
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2  // 20% in beeld
  });

  sections.forEach(sec => observer.observe(sec));
});
