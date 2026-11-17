/* ==========================================================
   ОБЩИЕ ЭЛЕМЕНТЫ KNOW CONSULT
   Меню, контакты, футер и единый шаблон формы заявки.
   ========================================================== */

const MAP_URL = "https://go.2gis.com/m7VSU";
const COMPANY_NAME = "ОсОО «Know Consult»";

const LOGO_HTML = `
  <span class="logo-mark" aria-hidden="true"></span>
  <span class="logo-type"><b>KNOW</b><span>consult</span></span>
`;

// Услуги используются в форме и в карточках: один источник названий.
const SERVICE_OPTIONS_HTML = [
  '<option value="general">Общая консультация</option>',
  ...SERVICES.map(
    (service) => `<option value="${service.id}">${service.title}</option>`,
  ),
].join("");

const PHONE_CODE_OPTIONS_HTML = `
  <option value="+996">+996 Кыргызстан</option>
  <option value="+7">+7 Казахстан / Россия</option>
  <option value="+998">+998 Узбекистан</option>
  <option value="+992">+992 Таджикистан</option>
  <option value="+993">+993 Туркменистан</option>
  <option value="+86">+86 Китай</option>
  <option value="+82">+82 Южная Корея</option>
  <option value="+90">+90 Турция</option>
  <option value="+971">+971 ОАЭ</option>
  <option value="+1">+1 США / Канада</option>
  <option value="+44">+44 Великобритания</option>
  <option value="+49">+49 Германия</option>
  <option value="other">+XXX Другой регион</option>
`;

const HEADER_HTML = `
  <header class="site-header">
    <div class="topline">
      <div class="wrap">
        <span>Международное образование · Документы · Бизнес · Обучение</span>
        <a href="${MAP_URL}" target="_blank" rel="noopener">Бишкек · ТЦ VESNA, 4 этаж</a>
      </div>
    </div>
    <div class="wrap main-nav">
      <a class="logo" href="index.html" aria-label="KNOW consult — на главную">${LOGO_HTML}</a>
      <nav class="nav" id="nav" aria-label="Основное меню">
        <a href="index.html" data-page="home">Главная</a>
        <a href="services.html" data-page="services">Услуги</a>
        <a href="cases.html" data-page="education">Образование</a>
        <a href="about.html" data-page="about">О компании</a>
        <a href="blog.html" data-page="blog">Материалы</a>
        <a href="contacts.html" data-page="contacts">Контакты</a>
      </nav>
      <div class="head-actions">
        <a class="phone" href="tel:+996000000000">+996 (XXX) XX-XX-XX</a>
        <button class="btn btn-primary btn-small" type="button" data-consult>Консультация</button>
        <button class="burger" id="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
      </div>
    </div>
  </header>
`;

const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-top">
        <div>
          <a class="logo" href="index.html" aria-label="KNOW consult — на главную">${LOGO_HTML}</a>
          <p class="foot-intro">Многофункциональная консалтинговая компания: образование, документы, бизнес-сопровождение и практическое обучение.</p>
        </div>
        <div>
          <h4>Направления</h4>
          <ul>
            <li><a href="services.html">Все услуги</a></li>
            <li><a href="cases.html">Международное образование</a></li>
            <li><a href="services.html#courses">Курсы</a></li>
            <li><a href="blog.html">Материалы</a></li>
          </ul>
        </div>
        <div>
          <h4>Компания</h4>
          <ul>
            <li><a href="about.html">О компании</a></li>
            <li><a href="contacts.html">Контакты</a></li>
            <li><a href="contacts.html#request">Оставить заявку</a></li>
          </ul>
        </div>
        <div>
          <h4>Загляните к нам</h4>
          <ul>
            <li>ТЦ VESNA. Улица Калыка Акиева, 66. 4 этаж, B33 офис.</li>
            <li><a class="map-link" href="${MAP_URL}" target="_blank" rel="noopener">Открыть в 2ГИС ↗</a></li>
            <li><a href="tel:+996000000000">+996 (XXX) XX-XX-XX</a></li>
            <li><a href="mailto:info@knowconsult.kg">info@knowconsult.kg</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bot"><span>© 2026 ${COMPANY_NAME}. Все права защищены.</span><span>Делаем сложное понятным.</span></div>
    </div>
  </footer>
`;

const FORM_HTML = `
  <div>
    <div class="form" role="group" aria-label="Заявка на консультацию">
      <h3 class="form-title">Получите консультацию</h3>
      <p class="form-caption">Оставьте контакты — уточним задачу и подскажем следующий шаг.</p>
      <div class="field">
        <label for="lead-service">Услуга</label>
        <select id="lead-service" name="service">${SERVICE_OPTIONS_HTML}</select>
        <span class="field-note" data-service-note>Выберите направление, с которым нужна помощь.</span>
      </div>
      <div class="field">
        <label for="lead-name">Ваше имя</label>
        <input id="lead-name" name="name" type="text" placeholder="Как к вам обращаться" autocomplete="name">
        <span class="help">Укажите имя</span>
      </div>
      <div class="field">
        <label for="lead-phone">Телефон</label>
        <div class="phone-field">
          <select id="lead-phone-code" class="phone-code" name="phoneCode" aria-label="Код страны">${PHONE_CODE_OPTIONS_HTML}</select>
          <input class="phone-custom-code" name="customPhoneCode" type="tel" inputmode="numeric" maxlength="4" placeholder="+XXX" aria-label="Другой код страны" hidden>
          <input id="lead-phone" name="phone" type="tel" inputmode="numeric" maxlength="9" placeholder="000 000 000" autocomplete="tel-national" aria-describedby="phone-help">
        </div>
        <span id="phone-help" class="field-note">Выберите код страны и введите оставшиеся 9 цифр номера.</span>
        <span class="help">Введите ровно 9 цифр номера</span>
      </div>
      <div class="field">
        <label for="lead-task">Дополнительная информация</label>
        <textarea id="lead-task" name="task" rows="3" placeholder="Укажите сроки, страну, документы или другие важные детали"></textarea>
      </div>
      <label class="check"><input type="checkbox" name="agree"> <span>Согласен на обработку персональных данных для получения консультации.</span></label>
      <button class="btn btn-primary" type="button" data-send>Отправить заявку <span class="arrow">→</span></button>
      <p class="form-status" role="alert"></p>
    </div>
    <div class="success" role="status"><h3>Заявка уже у нас</h3><p>Свяжемся с вами в течение рабочего дня.</p></div>
  </div>
`;

document.querySelector('[data-include="header"]').outerHTML = HEADER_HTML;
document.querySelector('[data-include="footer"]').outerHTML = FOOTER_HTML;

const currentPage = document.body.dataset.page;
document.querySelectorAll(".nav a").forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

nav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  nav.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
});
