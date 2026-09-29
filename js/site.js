// Dim the nav links that are not the page you are on.
(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  if (here === '') here = 'index.html';
  var links = document.querySelectorAll('header .links a[data-page]');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('data-page') !== here) links[i].classList.add('dim');
  }
})();
