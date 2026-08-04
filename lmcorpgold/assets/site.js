(function () {
  document.documentElement.classList.add('js');

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var nav = document.querySelector('.nav');
  if (nav) {
    var onNav = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onNav, { passive: true });
    onNav();
  }

  var bar = document.querySelector('.scroll-progress');
  if (bar) {
    var onProgress = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onProgress, { passive: true });
    onProgress();
  }

  var art = document.querySelector('.hero-art');
  if (art) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.3) art.style.marginTop = (y * 0.28) + 'px';
    }, { passive: true });
  }

  var h1 = document.querySelector('.hero h1');
  if (h1) h1.classList.add('grad-text');

  var bling = document.querySelector('.hero-bling');
  if (bling) {
    var colors = ['var(--bling)', 'var(--bling2)'];
    var n = reduced ? 0 : 14;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      var size = (2 + Math.random() * 5).toFixed(1);
      s.style.cssText =
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'background:' + colors[i % 2] + ';' +
        'animation-duration:' + (6 + Math.random() * 8).toFixed(1) + 's;' +
        'animation-delay:' + (Math.random() * 7).toFixed(1) + 's;' +
        'opacity:' + (0.3 + Math.random() * 0.6).toFixed(2);
      bling.appendChild(s);
    }
  }

  var targets = document.querySelectorAll(
    '.hero-content, .section > .container > .tag, .section > .container > h2, .section > .container > .lead, .band > .container, .table-wrap, .checklist, .cta > .container, .reveal'
  );
  var gridCards = [];
  document.querySelectorAll('.grid').forEach(function (grid) {
    var cards = grid.querySelectorAll(':scope > .card');
    cards.forEach(function (card, i) {
      card.classList.add('reveal');
      card.style.transitionDelay = (i * 0.08) + 's';
      gridCards.push(card);
    });
  });

  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
    gridCards.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('visible'); });
    gridCards.forEach(function (el) { el.classList.add('visible'); });
  }
})();
