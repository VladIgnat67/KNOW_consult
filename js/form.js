/* ==========================================================
   ФОРМЫ ЗАЯВКИ: проверка полей и отправка на почту (js/mail.js).
   Используется в блоках .form-slot и в окне «Консультация».
   ========================================================== */

function setupForm(container, subject) {
  const form = container.querySelector('.form');
  const ok = container.querySelector('.success');
  const btn = form.querySelector('[data-send]');
  const status = form.querySelector('.form-status');

  form.querySelectorAll('input, textarea').forEach(i =>
    i.addEventListener('input', () => i.closest('.field, .check')?.classList.remove('err')));

  btn.addEventListener('click', async () => {
    const name = form.querySelector('[name=name]');
    const phone = form.querySelector('[name=phone]');
    const task = form.querySelector('[name=task]');
    const agree = form.querySelector('[name=agree]');
    let valid = true;
    if (name.value.trim().length < 2) { name.closest('.field').classList.add('err'); valid = false; }
    if (phone.value.replace(/\D/g, '').length < 9) { phone.closest('.field').classList.add('err'); valid = false; }
    if (!agree.checked) { agree.closest('.check').classList.add('err'); valid = false; }
    if (!valid) { form.querySelector('.err input, .err textarea')?.focus(); return; }

    btn.disabled = true; btn.textContent = 'Отправляем…'; status.textContent = ''; status.classList.remove('err-text');
    try {
      await sendLead({ 'Имя': name.value.trim(), 'Телефон': phone.value.trim(), 'Задача': task ? (task.value.trim() || '—') : '—' }, subject);
      form.style.display = 'none';
      ok.style.display = 'block';
    } catch (e) {
      status.textContent = e.message;
      status.classList.add('err-text');
    } finally {
      btn.disabled = false; btn.textContent = 'Отправить заявку';
    }
  });
}

document.querySelectorAll('.form-slot').forEach(slot => {
  slot.innerHTML = FORM_HTML;
  setupForm(slot, 'Новая заявка с сайта KNOW consult');
});

/* ---------- Окно «Консультация» ---------- */
const modal = document.createElement('div');
modal.className = 'modal';
modal.hidden = true;
modal.innerHTML = `
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="modal-close" type="button" aria-label="Закрыть">×</button>
    <h2 id="modal-title">Бесплатная консультация</h2>
    <p class="modal-lead">Оставьте имя и телефон — перезвоним в течение рабочего дня.</p>
    ${FORM_HTML}
  </div>`;
document.body.appendChild(modal);
setupForm(modal, 'Запрос консультации с сайта KNOW consult');

let lastFocus = null;
function openModal() {
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('input').focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  lastFocus?.focus();
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-consult]')) { e.preventDefault(); openModal(); }
});
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
