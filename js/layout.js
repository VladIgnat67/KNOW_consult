/* ==========================================================
   ОБЩИЕ ЧАСТИ: хедер, футер и форма заявки.
   Меняются здесь один раз — и обновляются на всех страницах.
   ========================================================== */

const HEADER_HTML = `<header class="site-header">
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="KNOW consult — на главную">
      <svg class="logo-mark" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="10" fill="#A633BD"/><rect x="17.5" y="9.5" width="9" height="25" fill="none" stroke="#91C01D" stroke-width="3"/></svg>
      <span class="logo-word"><b>KNOW</b><span>consult</span></span>
    </a>
    <nav class="nav" id="nav" aria-label="Основное меню">
      <a href="services.html" data-page="services">Услуги</a>
      <a href="about.html" data-page="about">О компании</a>
      <a href="cases.html" data-page="cases">Кейсы</a>
      <a href="blog.html" data-page="blog">Блог</a>
      <a href="contacts.html" data-page="contacts">Контакты</a>
    </nav>
    <div class="head-actions">
      <a class="phone" href="tel:+996000000000">+996 (XXX) XX-XX-XX</a>
      <button class="btn btn-primary btn-m" type="button" data-consult>Консультация</button>
      <button class="burger" id="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>`;

const FOOTER_HTML = `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <a class="logo" href="index.html" aria-label="KNOW consult — на главную"><svg class="logo-mark" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="10" fill="#A633BD"/><rect x="17.5" y="9.5" width="9" height="25" fill="none" stroke="#91C01D" stroke-width="3"/></svg><span class="logo-word"><b>KNOW</b><span>consult</span></span></a>
        <p>Консалтинг для бизнеса: стратегия, процессы, финансы и команда.</p>
      </div>
      <div><h4>Компания</h4><ul><li><a href="about.html">О нас</a></li><li><a href="cases.html">Кейсы</a></li><li><a href="blog.html">Блог</a></li><li><a href="contacts.html">Контакты</a></li></ul></div>
      <div><h4>Услуги</h4><ul id="foot-services"></ul></div>
      <div><h4>Контакты</h4><ul><li>г. Бишкек, ул. Название, 00</li><li><a href="tel:+996000000000">+996 (XXX) XX-XX-XX</a></li><li><a href="mailto:info@knowconsult.kg">info@knowconsult.kg</a></li></ul></div>
    </div>
    <div class="foot-bot"><span>© 2026 KNOW consult. Все права защищены</span><span>Политика конфиденциальности</span></div>
  </div>
</footer>`;

const FORM_HTML = `<div>
    <div class="form" role="group" aria-label="Заявка на консультацию">
      <div class="field"><label>Имя</label><input name="name" type="text" placeholder="Как к вам обращаться" autocomplete="name"><span class="help">Укажите имя</span></div>
      <div class="field"><label>Телефон</label><input name="phone" type="tel" placeholder="+996" autocomplete="tel"><span class="help">Введите номер полностью, например +996 700 123 456</span></div>
      <div class="field"><label>Задача</label><textarea name="task" rows="4" placeholder="Коротко опишите, с чем нужна помощь"></textarea></div>
      <label class="check"><input type="checkbox" name="agree"> <span>Согласен с политикой конфиденциальности</span></label>
      <button class="btn btn-accent" type="button" data-send>Отправить заявку</button>
      <p class="form-status" role="alert"></p>
    </div>
    <div class="success" role="status"><h3>Заявка отправлена</h3><p>Перезвоним в течение рабочего дня.</p></div>
  </div>`;

document.querySelector('[data-include="header"]').outerHTML = HEADER_HTML;
document.querySelector('[data-include="footer"]').outerHTML = FOOTER_HTML;

// Подсветка активного пункта меню
const currentPage = document.body.dataset.page;
document.querySelectorAll('.nav a').forEach(a => {
  if (a.dataset.page === currentPage) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
});

// Мобильное меню
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Список услуг в футере
const footList = document.getElementById('foot-services');
if (footList) footList.innerHTML = SERVICES.slice(0, 4).map(s => `<li><a href="services.html">${s.title}</a></li>`).join('');
