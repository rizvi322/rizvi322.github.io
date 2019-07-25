const API_ENDPOINT_GITHUB = 'https://api.github.com/users/rizvi322';

const containerDiv = document.querySelector('#container');
const localCache = {};

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
  if (localCache['githubData']) {
    return localCache['githubData'];
  }

  const githubData = await fetch(API_ENDPOINT_GITHUB).then(async result => await result.json());
  localCache['githubData'] = githubData;
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

loadIndexTemplate();
