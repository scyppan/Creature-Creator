let creatures;

const cssfiles = ['searchbox.css'];
const jsfiles  = ['api.js', 'searchbox.js'];

function loadassets() {
  return new Promise((resolve, reject) => {
    const head = document.head;
    const total = cssfiles.length + jsfiles.length;
    let loaded = 0;

    function checkdone() {
      if (++loaded === total) resolve();
    }

    cssfiles.forEach(file => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `css/${file}`;
      link.onload = checkdone;
      link.onerror = reject;
      head.appendChild(link);
    });

    jsfiles.forEach(file => {
      const script = document.createElement('script');
      script.src = `js/${file}`;
      script.defer = true;
      script.onload = checkdone;
      script.onerror = reject;
      head.appendChild(script);
    });
  });
}

async function initapp() {
  await loadassets();
  creatures = await fetchfresh(48); 
  document.getElementById('creature-count')?.remove();
  initsearchbox(); // from searchbox.js
}

document.addEventListener('DOMContentLoaded', initapp);
