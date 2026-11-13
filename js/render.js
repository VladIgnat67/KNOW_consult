/* Рендер карточек и фильтры */
const $ = (selector, root = document) => root.querySelector(selector);
function fill(id, html) {
  const node = document.getElementById(id);
  if (node) node.innerHTML = html;
  return node;
}

function tourCard(tour) {
  return `<a class="tour-card" href="contacts.html#request" data-cat="${tour.cat}">
    <div class="tour-card__photo"><img src="${tour.image}" alt="${tour.title}" loading="lazy"><span class="tour-card__badge">${tour.badge}</span></div>
    <div class="tour-card__body"><span class="tour-card__country">${tour.country}</span><h3>${tour.title}</h3><p class="tour-card__meta">${tour.meta}</p><div class="tour-card__bottom"><div class="price"><span>стоимость на человека</span><b>${tour.price}</b></div><span class="card-link">Подробнее →</span></div></div>
  </a>`;
}

fill("home-tours", TOURS.slice(0, 3).map(tourCard).join(""));
const tourList = fill("tour-list", TOURS.map(tourCard).join(""));
fill(
  "destination-list",
  DESTINATIONS.map(
    (d) =>
      `<article class="destination"><img src="${d.image}" alt="${d.title}" loading="lazy"><div class="destination__body"><span>${d.country}</span><h3>${d.title}</h3><p>${d.caption}</p></div></article>`,
  ).join(""),
);

const blogList = fill(
  "blog-list",
  POSTS.map(
    (p) =>
      `<article class="post" data-cat="${p.cat}"><div class="post__image"><img src="${p.image}" alt="${p.title}" loading="lazy"></div><div class="post__body"><span class="post__cat">${p.cat}</span><h3>${p.title}</h3><p>${p.text}</p><div class="post__meta">${p.date} · ${p.read}</div></div></article>`,
  ).join(""),
);

function filters(boxId, list, items) {
  const box = document.getElementById(boxId);
  if (!box || !list) return;
  const categories = ["Все", ...new Set(items.map((item) => item.cat))];
  box.innerHTML = categories
    .map(
      (category, index) =>
        `<button type="button" aria-pressed="${index === 0}">${category}</button>`,
    )
    .join("");
  box.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    box
      .querySelectorAll("button")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    list.querySelectorAll("[data-cat]").forEach((card) => {
      card.hidden = !(
        button.textContent === "Все" || card.dataset.cat === button.textContent
      );
    });
  });
}
filters("tour-filters", tourList, TOURS);
filters("blog-filters", blogList, POSTS);
