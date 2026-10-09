(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sel = '.glass, .feed-card, .block, .panel, .card';

  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest(sel);
    if (!t) return;
    var r = t.getBoundingClientRect();
    t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  document.addEventListener('pointermove', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--bx', (e.clientX - r.left) + 'px');
    b.style.setProperty('--by', (e.clientY - r.top) + 'px');
    if (!reduce) {
      b.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.08).toFixed(1) + 'px');
      b.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.18).toFixed(1) + 'px');
    }
  }, { passive: true });
  document.addEventListener('pointerout', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty('--tx'); b.style.removeProperty('--ty'); }
  });

  if (reduce || !('IntersectionObserver' in window)) return;
  root.classList.add('fx');
  var items = document.querySelectorAll('.sec > *, .sec .glass, .feed-card, .site-footer');
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el, i) {
    el.classList.add('rv');
    el.style.transitionDelay = ((i % 4) * 70) + 'ms';
    io.observe(el);
  });
  setTimeout(function () {
    document.querySelectorAll('.rv:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight) el.classList.add('in');
    });
  }, 1200);
})();

(function () {
  var bar = document.createElement('div');
  bar.className = 'scroll-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var tick = false;
  function upd() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', h > 0 ? Math.min(1, scrollY / h).toFixed(4) : 0);
    document.documentElement.classList.toggle('is-scrolled', scrollY > 24);
    tick = false;
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
})();
