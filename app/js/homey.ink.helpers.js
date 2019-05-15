function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
}

function getTexts(locale) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if ( this.status == 404) {
        getTexts('en')
      }
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        texts = JSON.parse(xhttp.responseText)
        return texts
      } 
  };
  xhttp.open("GET", "./locales/" + locale + ".json", true);
  xhttp.send();
}

function loadScript(locale, callback)
{
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/" + locale + ".js";
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

var setLocale = function () {
  moment.locale(locale)
}