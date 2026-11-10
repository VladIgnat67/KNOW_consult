/* ==========================================================
   ВЫВОД ДАННЫХ: карточки услуг и кейсов, фильтры.
   Блоки появляются только на тех страницах, где есть нужный контейнер.
   ========================================================== */

const $ = (s, r = document) => r.querySelector(s);

function fill(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; }

// Главная
fill('home-services', SERVICES.map(s => `<a class="svc" href="services.html"><span class="ico">${ICONS[s.id]}</span><h3>${s.title}</h3><p>${s.short}</p><span class="more">Подробнее</span></a>`).join(''));
fill('home-cases', CASES.slice(0, 3).map(c => `<article class="case"><span class="tag">${c.ind}</span><h3>${c.title}</h3><p>${c.did}</p><div class="res">${c.res}</div><p>${c.resl}</p></article>`).join(''));

// Услуги
const svcRows = fill('svc-rows', SERVICES.map(s => `<article class="svc-row" data-cat="${s.cat}"><div><h2>${s.title}</h2><p>${s.text}</p><ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul><div class="svc-meta"><a class="btn btn-primary" href="contacts.html">Обсудить задачу</a><span>${s.format}</span></div></div><div class="svc-art" aria-hidden="true">${ICONS[s.id].replace('width="26" height="26"', '')}</div></article>`).join(''));

// Кейсы
const caseList = fill('case-list', CASES.map(c => `<article class="case-item" data-cat="${c.cat}"><div><span class="tag">${c.ind}</span><h3>${c.title}</h3></div><div><h4>Задача</h4><p>${c.task}</p></div><div><h4>Что сделали</h4><p>${c.did}</p></div><div class="res">${c.res}<small>${c.resl}</small></div></article>`).join(''));

// Блог
const blogList = fill('blog-list', POSTS.map(p => `<article class="post" data-cat="${p.cat}"><div class="post-cover" aria-hidden="true"><span></span></div><div class="post-body"><span class="tag">${p.cat}</span><h3>${p.title}</h3><p>${p.text}</p><div class="post-meta">${p.date} · ${p.read}</div></div></article>`).join(''));

// Фильтры по категориям
function filters(boxId, list, items) {
  const box = document.getElementById(boxId);
  if (!box || !list) return;
  const cats = ['Все', ...new Set(items.map(i => i.cat))];
  box.innerHTML = cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}">${c}</button>`).join('');
  box.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    box.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    list.querySelectorAll('[data-cat]').forEach(el => el.hidden = !(b.textContent === 'Все' || el.dataset.cat === b.textContent));
  });
}
filters('svc-filters', svcRows, SERVICES);
filters('case-filters', caseList, CASES);
filters('blog-filters', blogList, POSTS);
