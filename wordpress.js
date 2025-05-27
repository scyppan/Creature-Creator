const version = 'a25.5.27.002'
const baseUrl = 'https://cdn.jsdelivr.net/gh/scyppan/Creature-Creator';

document.addEventListener('DOMContentLoaded', function () {

  var mainScript = document.createElement('script')
  mainScript.src   = baseUrl + '@' + version + '/main.js'
  mainScript.defer = true
  mainScript.onload = function() {
    initapp(baseUrl, version)
  }
  document.head.appendChild(mainScript)
})