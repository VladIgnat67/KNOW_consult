/* ==========================================================
   РЕНДЕР КАРТОЧЕК И БЛОКОВ
   Разметка формируется из данных в js/data.js.
   ========================================================== */

function fill(id, html) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = html;
  return element;
}

function serviceCard(service, compact = false) {
  const items = compact
    ? ""
    : `<ul>${service.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  return `
    <article class="service-card ${compact ? "service-card--compact" : ""}" id="${service.id}">
      <div class="service-card__top">
        <span class="service-card__number">${service.number}</span>
        <span class="service-card__tag">${service.tag}</span>
      </div>
      <h3>${service.title}</h3>
      <p>${service.lead}</p>
      ${items}
      <button class="text-link" type="button" data-consult>Обсудить задачу <span>→</span></button>
    </article>
  `;
}

function courseCard(course) {
  return `
    <article class="course-card">
      <span class="course-card__code">${course.code}</span>
      <h3>${course.title}</h3>
      <p>${course.text}</p>
    </article>
  `;
}

function educationFormat(format) {
  return `
    <article class="format-card">
      <span class="format-card__number">${format.number}</span>
      <h3>${format.title}</h3>
      <p>${format.text}</p>
    </article>
  `;
}

function articleCard(article) {
  return `
    <article class="post" data-category="${article.category}">
      <div class="post__visual post__visual--${article.accent}">
        <span>${article.category}</span>
      </div>
      <div class="post__body">
        <span class="post__cat">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.text}</p>
        <div class="post__meta">${article.date} · ${article.read}</div>
      </div>
    </article>
  `;
}

fill(
  "home-services",
  SERVICES.map((service) => serviceCard(service, true)).join(""),
);
fill("services-list", SERVICES.map((service) => serviceCard(service)).join(""));
fill("course-list", COURSE_BLOCKS.map(courseCard).join(""));
fill("education-formats", EDUCATION_FORMATS.map(educationFormat).join(""));

// Карточки услуг создаются JavaScript-ом, поэтому прокрутку к ссылке
// вида services.html#visa выполняем после их появления в DOM.
if (window.location.hash) {
  requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView();
  });
}

const blogList = fill("blog-list", ARTICLES.map(articleCard).join(""));
const filterBox = document.getElementById("blog-filters");

if (filterBox && blogList) {
  const categories = [
    "Все",
    ...new Set(ARTICLES.map((article) => article.category)),
  ];
  filterBox.innerHTML = categories
    .map(
      (category, index) =>
        `<button type="button" aria-pressed="${index === 0}">${category}</button>`,
    )
    .join("");

  filterBox.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    filterBox.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    blogList.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = !(
        button.textContent === "Все" ||
        card.dataset.category === button.textContent
      );
    });
  });
}
