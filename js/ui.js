(() => {
  // Markdown experience details codes
  const mdConverter = new showdown.Converter();

  const loadMarkdownFileContent = async (fileName, container) => {
    try {
      // Feature detection for fetch API
      if (typeof fetch === 'undefined') {
        console.warn('Fetch API not supported, markdown content will not load');
        return;
      }

      const markdownText = await fetch('assets/markdowns/' + fileName).then(
        async result => await result.text()
      );

      if (markdownText) {
        container.innerHTML = mdConverter.makeHtml(markdownText);
      }
    } catch (error) {
      console.warn('Failed to load markdown content:', error);
      // Fallback: show a simple message if markdown fails to load
      container.innerHTML = '<p>Content loading failed. Please refresh the page.</p>';
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

  // Scroll Magic codes - Disabled to use CSS sticky positioning instead
  // const controller = new ScrollMagic.Controller();

  // new ScrollMagic.Scene({
  //   duration: `${(companies.length - 1) * 100}%`,
  //   triggerElement: '.experience-heading',
  //   triggerHook: 0
  // })
  //   .setPin('.experience-heading')
  //   .addTo(controller);

  // Ends Scroll Magic codes

  // Intersection observer codes with fallback
  // Feature detection for IntersectionObserver
  if (typeof IntersectionObserver !== 'undefined') {
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
  } else {
    // Fallback: immediately show all animations for browsers without IntersectionObserver
    console.warn('IntersectionObserver not supported, showing all animations immediately');
    document.querySelectorAll('.track-child').forEach(child => {
      child.classList.add('animate');
    });
  }
  // Ends Intersection observer codes

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

        // Wait for scroll animation to complete before hiding menu
        let scrollTimeout;
        const hideMenuAfterScroll = () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            hideSiteMenu();
            window.removeEventListener('scroll', hideMenuAfterScroll);
          }, 150); // Small delay after scroll stops
        };

        // Listen for scroll events to detect when scrolling ends
        window.addEventListener('scroll', hideMenuAfterScroll);

        // Fallback timeout in case scroll events don't fire properly
        setTimeout(() => {
          hideSiteMenu();
          window.removeEventListener('scroll', hideMenuAfterScroll);
        }, 1500);
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

  // Close menu when clicking outside of it
  document.addEventListener('click', (event) => {
    // Check if the menu is currently visible
    if (siteMenu && siteMenu.classList.contains('show')) {
      // Check if the click was outside the menu and hamburger button
      const isClickInsideMenu = siteMenu.contains(event.target);
      const isClickOnHamburger = hamberger && hamberger.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger) {
        hideSiteMenu();
      }
    }
  });
  // Ends site menu codes

  // Theme toggle functionality
  const initThemeToggle = () => {
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    const themeToggleLink = document.querySelector('.theme-toggle-link');
    const body = document.body;

    // Check for saved theme preference or default to 'light'
    // Feature detection for localStorage
    let currentTheme = 'light';
    try {
      if (typeof localStorage !== 'undefined') {
        currentTheme = localStorage.getItem('theme') || 'light';
      }
    } catch (error) {
      console.warn('localStorage not available, theme preferences will not persist');
    }

    // Apply the saved theme
    if (currentTheme === 'dark') {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }

    // Add shadow to button
    if (themeToggleButton) {
      themeToggleButton.classList.add('closed');
    }

    // Add event listener for theme toggle
    if (themeToggleLink) {
      themeToggleLink.addEventListener('click', (e) => {
        e.preventDefault();

        const isDarkMode = body.hasAttribute('data-theme') && body.getAttribute('data-theme') === 'dark';

        if (isDarkMode) {
          body.removeAttribute('data-theme');
          // Save to localStorage if available
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('theme', 'light');
            }
          } catch (error) {
            console.warn('Could not save theme preference');
          }
        } else {
          body.setAttribute('data-theme', 'dark');
          // Save to localStorage if available
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('theme', 'dark');
            }
          } catch (error) {
            console.warn('Could not save theme preference');
          }
        }
      });
    }
  };

  // Initialize theme toggle after the page loads
  setTimeout(initThemeToggle, 100);
  // Ends theme toggle functionality
})();
