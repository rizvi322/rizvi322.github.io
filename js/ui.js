const intersectionOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.0
};

const intersectionCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.track-child').forEach(child => {
        child.classList.add('animate');
      });
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions
);

document.querySelectorAll('.track').forEach(element => observer.observe(element));
