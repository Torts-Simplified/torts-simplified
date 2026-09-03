/* Torts Simplified — site behaviour: scroll reveals, sticky nav, parallax, contact form */
(function(){
  // mark the current page in the nav
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.links a[data-page]').forEach(function(a){
    if (a.getAttribute('data-page').toLowerCase() === here) a.classList.add('on');
  });
})();

(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // load-in
  requestAnimationFrame(function(){
    setTimeout(function(){
      var hero = document.getElementById('heroin');
      if (hero) hero.classList.add('lit');
    }, 60);
  });

  // scroll reveals
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.r, .rline').forEach(function(el){ io.observe(el); });

  // sticky header state, progress bar, parallax
  var hdr = document.getElementById('hdr');
  var bar = document.getElementById('bar');
  var heroimg = document.getElementById('heroimg');
  var fimg = document.getElementById('fimg');
  var glow = document.getElementById('glow');
  var ticking = false;

  function frame(){
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    hdr.classList.toggle('stuck', y > 40);
    if (reduce) return;
    if (heroimg) {
      var hp = Math.max(-1, Math.min(1, y / Math.max(1, window.innerHeight)));
      heroimg.style.transform = 'translate3d(0,' + (-hp * 34) + 'px,0)';
    }
    if (fimg) {
      var r = fimg.parentElement.getBoundingClientRect();
      var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      fimg.style.transform = 'translate3d(0,' + (Math.max(-1, Math.min(1, p)) * -26) + 'px,0)';
    }
    if (glow) {
      var g = glow.parentElement.getBoundingClientRect();
      var q = (g.top + g.height / 2 - window.innerHeight / 2) / window.innerHeight;
      glow.style.transform = 'translate(-50%,-50%) translate3d(0,' + (q * -90) + 'px,0)';
    }
  }
  window.addEventListener('scroll', function(){
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  window.addEventListener('resize', frame);
  frame();
})();
