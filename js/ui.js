// Markdown experience details codes
const mdConverter = new showdown.Converter();

const loadMarkdownFileContent = async (fileName, container) => {
  const markdownText = await fetch('../assets/markdowns/' + fileName).then(
    async result => await result.text()
  );

  if (markdownText) {
    container.innerHTML = mdConverter.makeHtml(markdownText);
  }
};

const companies = document.querySelectorAll('.company');

companies.forEach(company => {
  const data = JSON.parse(company.dataset['company']);
  const responsibilityContainer = company.querySelector('.responsibility');

  if (data.expFile) {
    loadMarkdownFileContent(data.expFile, responsibilityContainer);
  } else if (data.responsibility) {
    responsibilityContainer.innerHTML += data.responsibility;
  }
});
// Ends Markdown experience details codes

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

// Site menu codes
const siteMenu = document.querySelector('.site-menu');
const hamberger = document.querySelector('.hamburger');
const hambergerLink = document.querySelector('.hamburger-link');

if (siteMenu && hambergerLink) {
  hambergerLink.addEventListener('click', () => {
    if (siteMenu.classList.contains('hide')) {
      showSiteMenu();
    } else {
      hideSiteMenu();
    }
  });

  const menuItemLinks = document.querySelectorAll('.menu-item-link');

  menuItemLinks.forEach(menuItemLink => {
    menuItemLink.addEventListener('click', event => {
      const currentMenuItem = event.target;

      if (!currentMenuItem.classList.contains('active')) {
        removeActiveClassFromAllMenuItemLink(menuItemLinks);
        currentMenuItem.classList.add('active');
      }

      hideSiteMenu();
    });
  });
}

const removeActiveClassFromAllMenuItemLink = menuItemLinks => {
  menuItemLinks.forEach(menuItemLink => {
    menuItemLink.classList.remove('active');
  });
};

const showSiteMenu = () => {
  siteMenu.classList.remove('hide');
  siteMenu.classList.add('show');
  hamberger.classList.remove('closed');
};

const hideSiteMenu = () => {
  siteMenu.classList.remove('show');
  siteMenu.classList.add('hide');
  hamberger.classList.add('closed');
};
// Ends site menu codes
