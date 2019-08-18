const mdConverter = new showdown.Converter();

const loadMarkdownFileContent = async (fileName, container) => {
  const markdownText = await fetch('../assets/markdowns/' + fileName).then(
    async result => await result.text()
  );

  if(markdownText) {
    container.innerHTML =  mdConverter.makeHtml(markdownText);
  }
};

const companies = document.querySelectorAll('.company');

companies.forEach(company => {
  const data = JSON.parse(company.dataset['company']);
  const responsibilityContainer = company.querySelector('.responsibility');

  if(data.expFile) {
    loadMarkdownFileContent(data.expFile, responsibilityContainer);
  }
  else if(data.responsibility) {
    responsibilityContainer.innerHTML += data.responsibility;
  }
});
// Ends Markdown experience details


// Scroll Magic codes
const controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
  duration: `${(companies.length - 1) * 100}%`,
  triggerElement: '.experience-heading',
  triggerHook: 0
})
.setPin('.experience-heading')
.addTo(controller);

// Ends Scroll Magic codes

// Intersection objservver codes

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

document
  .querySelectorAll('.track')
  .forEach(element => observer.observe(element));

// Ends Intersection objservver codes