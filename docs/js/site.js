// Torts Simplified — nav state + scroll reveal.

(function () {
  // 1. Dim the nav links that are not the page you are on.
  var here = location.pathname.split('/').pop();
  if (!here) here = 'index.html';
  var links = document.querySelectorAll('header .links a[data-page]');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('data-page') !== here) links[i].classList.add('dim');
  }

  // 2. Scroll reveal. Phones and reduced-motion users get everything
  //    at rest, so nothing below this line runs for them.
  var still = window.matchMedia('(max-width:760px)').matches ||
              window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (still) return;

  var sel = '.hero-copy > *, .head-rule > *, .card, .promise, .group, ' +
            '.bgrow, .deep .inner > *, .founder > *, .contacthero > *, ' +
            '.modular .head-rule > *, .pagehead > *, .pagetop > .wrap > .eyebrow';

  var pending = [].slice.call(document.querySelectorAll(sel));
  if (!pending.length) return;

  // Stagger siblings so a row of cards arrives in sequence, not as a block.
  var seen = [], counts = [];
  pending.forEach(function (el) {
    var k = seen.indexOf(el.parentNode);
    if (k < 0) { seen.push(el.parentNode); counts.push(0); k = seen.length - 1; }
    var n = counts[k]++;
    el.classList.add('rv');
    if (n) el.style.transitionDelay = Math.min(n * 70, 350) + 'ms';
  });

  // A plain scroll check rather than IntersectionObserver. IO only fires
  // when intersection CHANGES, so an element that jumps from below the
  // viewport to above it in one scroll never reports and stays invisible.
  // Comparing positions has no such gap: anything at or above the trigger
  // line reveals, including everything already scrolled past.
  var queued = false;
  function sweep() {
    queued = false;
    var line = window.innerHeight * 0.92;
    for (var j = pending.length - 1; j >= 0; j--) {
      if (pending[j].getBoundingClientRect().top < line) {
        pending[j].classList.add('in');
        pending.splice(j, 1);
      }
    }
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }
  function onScroll() {
    if (!queued) { queued = true; requestAnimationFrame(sweep); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  sweep();                      // whatever is on screen at load
  window.addEventListener('load', sweep);  // again once images settle
})();
