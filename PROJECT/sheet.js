
    function toggleDarkMode() {
        const body = document.body;
        if (body.classList.contains('dark')) {
          body.classList.remove('dark');
        } else {
          body.classList.add('dark');
        }
      }
      