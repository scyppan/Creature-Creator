const version = 'a25.5.26.001';
const baseurl = 'https://cdn.jsdelivr.net/gh/scyppan/creature-creator';

document.addEventListener('DOMContentLoaded', function () {
  const mainscript = document.createElement('script');
  mainscript.src = `${baseurl}@${version}/main.js`;
  mainscript.defer = true;
  mainscript.onload = () => initapp(baseurl, version);
  document.head.appendChild(mainscript);
});