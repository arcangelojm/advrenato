/* JavaScript mínimo: menu mobile, mega menu no toque/teclado, aviso de cookies e validação de formulário.
   Todo o conteúdo do site existe no HTML; nada depende deste arquivo para aparecer. */
(function () {
  var header = document.querySelector('.header');
  var btn = document.querySelector('.menu-btn');
  if (header && btn) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.nav__item > button.nav__link').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.parentElement, open = !item.classList.contains('is-open');
      document.querySelectorAll('.nav__item.is-open').forEach(function (i) { i.classList.remove('is-open'); i.firstElementChild.setAttribute('aria-expanded', 'false'); });
      if (open) { item.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.nav__item.is-open').forEach(function (i) { i.classList.remove('is-open'); i.firstElementChild.setAttribute('aria-expanded', 'false'); });
    if (header && header.classList.contains('is-open')) { header.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  });

  /* Aviso de cookies (LGPD). Ferramentas de análise só carregam após o aceite (a ligar na fase de medição). */
  var KEY = 'cookie-consent-v1';
  var box = document.getElementById('cookie');
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  if (box) {
    if (!get()) box.hidden = false;
    box.addEventListener('click', function (e) {
      var v = e.target && e.target.getAttribute('data-consent');
      if (!v) return;
      set(v); box.hidden = true;
      window.dispatchEvent(new CustomEvent('consent', { detail: v }));
    });
  }
  document.querySelectorAll('[data-cookie-prefs]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); if (box) box.hidden = false; });
  });

  /* Formulários: validação nativa; o envio será ligado ao backend (Resend) na fase 7 do método. */
  document.querySelectorAll('form.form').forEach(function (f) {
    var t0 = Date.now();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      if (f.querySelector('.form__hp input') && f.querySelector('.form__hp input').value) return;
      if (Date.now() - t0 < 3000) return;
      var msg = f.querySelector('.form__msg');
      if (msg) { msg.hidden = false; }
    });
  });
})();
