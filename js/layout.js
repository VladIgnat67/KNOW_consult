/* Общие части MIRA travel */
const MAP_URL = 'https://go.2gis.com/m7VSU';

const LOGO_HTML = `<span class="logo-mark" aria-hidden="true">M</span><span class="logo-type"><b>MIRA</b><span>travel atelier</span></span>`;

const HEADER_HTML = `<header class="site-header">
  <div class="topline"><div class="wrap"><span>Путешествия, в которые хочется возвращаться</span><a href="${MAP_URL}" target="_blank" rel="noopener">Бишкек · ТЦ VESNA, 4 этаж</a></div></div>
  <div class="wrap main-nav">
    <a class="logo" href="index.html" aria-label="MIRA travel — на главную">${LOGO_HTML}</a>
    <nav class="nav" id="nav" aria-label="Основное меню">
      <a href="index.html" data-page="home">Главная</a>
      <a href="services.html" data-page="tours">Туры</a>
      <a href="cases.html" data-page="destinations">Направления</a>
      <a href="about.html" data-page="about">О нас</a>
      <a href="blog.html" data-page="blog">Журнал</a>
      <a href="contacts.html" data-page="contacts">Контакты</a>
    </nav>
    <div class="head-actions">
      <a class="phone" href="tel:+996000000000">+996 (XXX) XX-XX-XX</a>
      <button class="btn btn-primary btn-small" type="button" data-consult>Подобрать тур</button>
      <button class="burger" id="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>`;

const FOOTER_HTML = `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div><a class="logo" href="index.html" aria-label="MIRA travel — на главную">${LOGO_HTML}</a><p class="foot-intro">Авторские маршруты, понятная организация и забота о путешествии от первой идеи до возвращения домой.</p></div>
      <div><h4>Путешествия</h4><ul><li><a href="services.html">Все туры</a></li><li><a href="cases.html">Направления</a></li><li><a href="services.html#formats">Форматы отдыха</a></li><li><a href="blog.html">Журнал</a></li></ul></div>
      <div><h4>О MIRA</h4><ul><li><a href="about.html">О нас</a></li><li><a href="contacts.html">Контакты</a></li><li><a href="contacts.html#request">Оставить заявку</a></li></ul></div>
      <div><h4>Загляните к нам</h4><ul><li>ТЦ VESNA. Улица Калыка Акиева, 66. 4 этаж, B33 офис.</li><li><a class="map-link" href="${MAP_URL}" target="_blank" rel="noopener">Открыть в 2ГИС ↗</a></li><li><a href="tel:+996000000000">+996 (XXX) XX-XX-XX</a></li><li><a href="mailto:info@miratravel.kg">info@miratravel.kg</a></li></ul></div>
    </div>
    <div class="foot-bot"><span>© 2026 MIRA travel atelier</span><span>Путешествуйте в своём ритме</span></div>
  </div>
</footer>`;

const FORM_HTML = `<div>
  <div class="form" role="group" aria-label="Заявка на подбор путешествия">
    <h3 class="form-title">Подберём ваш маршрут</h3>
    <p class="form-caption">Оставьте контакты — менеджер уточнит детали и предложит варианты.</p>
    <div class="field"><label for="lead-name">Ваше имя</label><input id="lead-name" name="name" type="text" placeholder="Как к вам обращаться" autocomplete="name"><span class="help">Укажите имя</span></div>
    <div class="field"><label for="lead-phone">Телефон</label><input id="lead-phone" name="phone" type="tel" placeholder="+996 700 000 000" autocomplete="tel"><span class="help">Введите номер полностью</span></div>
    <div class="field"><label for="lead-task">Куда хотите поехать?</label><textarea id="lead-task" name="task" rows="3" placeholder="Например: Бали в феврале, двое взрослых"></textarea></div>
    <label class="check"><input type="checkbox" name="agree"> <span>Согласен на обработку данных, чтобы получить подборку.</span></label>
    <button class="btn btn-primary" type="button" data-send>Получить варианты <span class="arrow">→</span></button>
    <p class="form-status" role="alert"></p>
  </div>
  <div class="success" role="status"><h3>Заявка уже у нас</h3><p>Скоро свяжемся, чтобы уточнить детали вашего путешествия.</p></div>
</div>`;

document.querySelector('[data-include="header"]').outerHTML = HEADER_HTML;
document.querySelector('[data-include="footer"]').outerHTML = FOOTER_HTML;

const currentPage = document.body.dataset.page;
document.querySelectorAll('.nav a').forEach(a => { if (a.dataset.page === currentPage) { a.classList.add('active'); a.setAttribute('aria-current','page'); } });
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => { const open = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); } });
