const API_ENDPOINT_GITHUB = 'https://api.github.com/users/rizvi322';

const containerDiv = document.querySelector('#container');

const initLSCache = () => {
  const expirationKey = 'lastExpirationDate';
  const expirationDate = lscache.get(expirationKey);
  const currentDate = new Date();

  if (!expirationDate) {
    lscache.set(expirationKey, currentDate);
  } else if (new Date(expirationDate).getDate() !== currentDate.getDate()) {
    lscache.flush();
    lscache.set(expirationKey, currentDate);
  }
};

const renderTemplate = (template, context = {}) => {
  twig({
    id: template,
    href: `templates/${template}.twig`,
    load: twig => {
      containerDiv.innerHTML = twig.render(context);
    },
    namespace: 'templates/'
  });
};

const fetchMyGithubProfileData = async () => {
  const cacheKey = 'githubData';
  let githubData = lscache.get(cacheKey);

  if (githubData) {
    return githubData;
  }

  githubData = await fetch(API_ENDPOINT_GITHUB).then(
    async result => await result.json()
  );
  lscache.set(cacheKey, githubData);
  return githubData;
};

const loadIndexTemplate = () => {
  fetchMyGithubProfileData().then(githubData => {
    const company = githubData.company.split('-');

    renderTemplate('index', {
      name: githubData.name,
      company: {
        name: company[0].trim(),
        url: company[1].trim()
      },
      avatarUrl: githubData.avatar_url,
      aboutMe: githubData.bio
    });
  });
};

initLSCache();
loadIndexTemplate();
