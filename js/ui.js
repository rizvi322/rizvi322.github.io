// Markdown experience details
const mdConverter = new showdown.Converter();
const expCardsDiv = document.querySelector('.expCards');
const expDetailsDiv = document.querySelector('.expDetails');
const expSummaryDiv = expDetailsDiv.querySelector('.expSummary');
const compRespDiv = expSummaryDiv.querySelector('.responsibility');

const loadMarkdownFileContent = async (fileName, element) => {
  const markdownText = await fetch('../assets/markdowns/' + fileName).then(
    async result => await result.text()
  );

  if(markdownText) {
    element.innerHTML =  mdConverter.makeHtml(markdownText);
  }
};

const toggleAllExpCardsVisibility = () => {
  if(expCardsDiv.classList.contains('hide')) {
    expCardsDiv.classList.remove('hide');
    expCardsDiv.classList.add('show');
  } else {
    expCardsDiv.classList.remove('show');
    expCardsDiv.classList.add('hide');
  }
};

const loadExpDetails = (companyExpString) => {
  const companyExp = JSON.parse(companyExpString);

  expDetailsDiv.querySelector('.company').innerHTML = companyExp.name;
  expSummaryDiv.querySelector('.designation').innerHTML = companyExp.designation;
  expSummaryDiv.querySelector('.since').innerHTML = companyExp.since;

  if(companyExp.expFile) {
    loadMarkdownFileContent(companyExp.expFile, compRespDiv);
  }
  else {
    compRespDiv.innerHTML = companyExp.responsibility;
  }

  toggleAllExpCardsVisibility();

  expDetailsDiv.classList.remove('hide');
  expDetailsDiv.classList.add('show', 'animate');

  expSummaryDiv.classList.remove('hide');
  expSummaryDiv.classList.add('animate');
};

const hideExpDetails = () => {
  expDetailsDiv.classList.remove('show', 'animate');
  expDetailsDiv.classList.add('hide');

  expSummaryDiv.classList.remove('animate');
  expSummaryDiv.classList.add('hide');

  toggleAllExpCardsVisibility();
};

document.querySelectorAll('.expDetailsBtn').forEach(button => {
  button.addEventListener('click', event => {
    loadExpDetails(event.target.dataset['company']);
  });
});

document.querySelectorAll('.expDetailsCloseBtn').forEach(button => {
  button.addEventListener('click', event => {
    hideExpDetails();
  });
});

// Ends Markdown experience details

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
