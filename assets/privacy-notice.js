(function () {
  var KEY = 'dac-privacy-notice';
  try {
    if (localStorage.getItem(KEY) === 'accepted' || sessionStorage.getItem(KEY) === 'ignored') return;
  } catch (e) {}
  if (/privacy\.html$/i.test(location.pathname)) return;

  var T = {
    en: {
      title: 'Your privacy',
      text: 'This site stores only essential data in your browser (such as your language choice) and loads fonts from Google Fonts. Read our',
      link: 'Privacy Policy',
      accept: 'Accept',
      ignore: 'Ignore'
    },
    ro: {
      title: 'Confidențialitatea ta',
      text: 'Acest site stochează în browser doar date esențiale (precum alegerea limbii) și încarcă fonturi de la Google Fonts. Citește',
      link: 'Politica de confidențialitate',
      accept: 'Accept',
      ignore: 'Ignoră'
    }
  };

  var css = '#dac-pn{position:fixed;left:50%;bottom:20px;transform:translate(-50%,24px);z-index:9999;width:min(720px,calc(100% - 32px));opacity:0;transition:opacity .5s,transform .5s cubic-bezier(.2,.8,.2,1);font-family:inherit}' +
    '#dac-pn.show{opacity:1;transform:translate(-50%,0)}' +
    '#dac-pn .pn{display:flex;align-items:center;gap:18px;padding:16px 18px 16px 22px;border-radius:22px;border:1px solid transparent;color:#e8f4ed;' +
    'background:linear-gradient(rgba(8,16,13,.92),rgba(8,16,13,.92)) padding-box,linear-gradient(110deg,rgba(20,241,149,.7),rgba(153,69,255,.7)) border-box;' +
    'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 24px 60px -20px rgba(0,0,0,.8),0 0 40px -18px rgba(20,241,149,.5)}' +
    '#dac-pn strong{display:block;margin-bottom:3px;font-size:.95rem;color:#fff;letter-spacing:.01em}' +
    '#dac-pn p{margin:0;font-size:.86rem;line-height:1.5;color:#c4d6cb}' +
    '#dac-pn a{color:#5ee7ff;text-decoration:underline;text-underline-offset:3px}' +
    '#dac-pn a:hover{color:#14f195}' +
    '#dac-pn .acts{display:flex;gap:10px;flex:none}' +
    '#dac-pn button{cursor:pointer;min-height:42px;padding:0 20px;border-radius:999px;font:600 .85rem inherit;font-family:inherit;transition:transform .25s,box-shadow .25s,border-color .25s,color .15s}' +
    '#dac-pn .ok{border:0;color:#04120c;background:linear-gradient(135deg,#c7f36c,#14f195 55%,#5ee7ff);box-shadow:0 10px 26px -10px rgba(20,241,149,.7)}' +
    '#dac-pn .ok:hover{transform:translateY(-2px);box-shadow:0 14px 32px -8px rgba(20,241,149,.85)}' +
    '#dac-pn .no{color:#e8f4ed;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.3)}' +
    '#dac-pn .no:hover{color:#fff;border-color:#14f195;transform:translateY(-2px)}' +
    '#dac-pn button:focus-visible,#dac-pn a:focus-visible{outline:2px solid #14f195;outline-offset:3px}' +
    '@media(max-width:600px){#dac-pn{bottom:12px}#dac-pn .pn{flex-direction:column;align-items:stretch;gap:12px;padding:16px}#dac-pn .acts button{flex:1}}' +
    '@media(prefers-reduced-motion:reduce){#dac-pn{transition:opacity .2s;transform:translate(-50%,0)}}';

  function lang() {
    var l = (document.documentElement.lang || '').toLowerCase();
    if (l.indexOf('ro') === 0) return 'ro';
    if (l.indexOf('en') === 0) return 'en';
    try {
      var s = localStorage.getItem('dac-lang') || localStorage.getItem('dac_wp_lang');
      if (s === 'ro') return 'ro';
    } catch (e) {}
    return 'en';
  }

  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var box = document.createElement('div');
    box.id = 'dac-pn';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Privacy notice');
    box.innerHTML = '<div class="pn"><div><strong></strong><p><span class="t"></span> <a href="privacy.html"></a>.</p></div>' +
      '<div class="acts"><button type="button" class="no"></button><button type="button" class="ok"></button></div></div>';
    document.body.appendChild(box);

    function render() {
      var t = T[lang()];
      box.querySelector('strong').textContent = t.title;
      box.querySelector('.t').textContent = t.text;
      box.querySelector('a').textContent = t.link;
      box.querySelector('.ok').textContent = t.accept;
      box.querySelector('.no').textContent = t.ignore;
    }
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-lang],.lang button')) setTimeout(render, 60);
    });

    function close(mode) {
      try { (mode === 'accepted' ? localStorage : sessionStorage).setItem(KEY, mode); } catch (e) {}
      box.classList.remove('show');
      setTimeout(function () { box.remove(); }, 500);
    }
    box.querySelector('.ok').addEventListener('click', function () { close('accepted'); });
    box.querySelector('.no').addEventListener('click', function () { close('ignored'); });
    setTimeout(function () { box.classList.add('show'); }, 900);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
