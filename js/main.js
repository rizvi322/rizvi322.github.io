(() => {
  const API_ENDPOINT_GITHUB = 'https://api.github.com/users/rizvi322';

  const containerDiv = document.querySelector('#container');
  let uiScriptLoaded = false;

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

        if (!uiScriptLoaded) {
          uiScript = document.createElement('script');
          uiScript.src = 'js/ui.js';

          document.body.appendChild(uiScript);
          uiScriptLoaded = true;
        }
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

  fetchAllRequiredData = async () => {
    const data = {};

    await fetch('../assets/data.json')
      .then(async result => await result.json())
      .then(json => {
        data['local'] = json;
      });

    await fetchMyGithubProfileData().then(githubData => {
      data['github'] = githubData;
    });

    return data;
  };

  const loadIndexTemplate = () => {
    fetchAllRequiredData().then(data => {
      const githubData = data.github;
      const localData = data.local;

      renderTemplate('index', {
        name: githubData.name,
        avatarUrl: githubData.avatar_url,
        company: {
          name: localData.experience[0].name,
          designation: localData.experience[0].designation,
          url: localData.experience[0].url
        },
        bio: githubData.bio,
        education: localData.education,
        experience: localData.experience,
        aboutMe: localData.aboutMe
      });
    });
  };

  initLSCache();
  loadIndexTemplate();
})();
