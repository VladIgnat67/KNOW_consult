/* ==========================================================
   ФОРМЫ ЗАЯВКИ
   Настройка полей, автоматический выбор услуги и модальное окно.
   ========================================================== */

const SUBMIT_LABEL = 'Отправить заявку <span class="arrow">→</span>';
let formInstance = 0;

function setServiceNote(form) {
  const select = form.querySelector('[name="service"]');
  const note = form.querySelector("[data-service-note]");
  if (!select || !note) return;

  const selectedName = select.options[select.selectedIndex].textContent.trim();
  note.textContent =
    select.value === "general"
      ? "Выберите направление, с которым нужна помощь."
      : `Выбрана услуга: ${selectedName}`;
}

function setCustomCodeVisibility(form) {
  const phoneCode = form.querySelector('[name="phoneCode"]');
  const customCode = form.querySelector('[name="customPhoneCode"]');
  const phoneField = form.querySelector(".phone-field");
  if (!phoneCode || !customCode || !phoneField) return;

  const useCustomCode = phoneCode.value === "other";
  customCode.hidden = !useCustomCode;
  customCode.required = useCustomCode;
  phoneField.classList.toggle("phone-field--custom", useCustomCode);
}

function setFormService(form, serviceId = "general") {
  const serviceSelect = form.querySelector('[name="service"]');
  if (!serviceSelect) return;

  const exists = [...serviceSelect.options].some(
    (option) => option.value === serviceId,
  );
  serviceSelect.value = exists ? serviceId : "general";
  setServiceNote(form);
}

function getFullPhoneNumber(form) {
  const countryCode = form.querySelector('[name="phoneCode"]');
  const customCode = form.querySelector('[name="customPhoneCode"]');
  const phone = form.querySelector('[name="phone"]');
  const code =
    countryCode.value === "other" ? customCode.value.trim() : countryCode.value;
  return `${code} ${phone.value.trim()}`;
}

function setupForm(container, subject) {
  const form = container.querySelector(".form");
  const success = container.querySelector(".success");
  const button = form.querySelector("[data-send]");
  const status = form.querySelector(".form-status");
  const instance = ++formInstance;

  // У каждого экземпляра формы свои id — это важно для формы на странице и в модальном окне.
  form
    .querySelectorAll(".field input, .field textarea, .field select")
    .forEach((field, index) => {
      const id = `lead-${field.name}-${instance}-${index}`;
      field.id = id;
      const label = field.closest(".field")?.querySelector("label");
      if (label) label.htmlFor = id;
    });

  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const phoneCode = form.querySelector('[name="phoneCode"]');
  const customPhoneCode = form.querySelector('[name="customPhoneCode"]');
  const service = form.querySelector('[name="service"]');
  const task = form.querySelector('[name="task"]');
  const agree = form.querySelector('[name="agree"]');

  setServiceNote(form);
  setCustomCodeVisibility(form);

  phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/\D/g, "").slice(0, 9);
  });

  customPhoneCode.addEventListener("input", () => {
    const digits = customPhoneCode.value.replace(/\D/g, "").slice(0, 3);
    customPhoneCode.value = digits ? `+${digits}` : "";
  });

  phoneCode.addEventListener("change", () => {
    setCustomCodeVisibility(form);
    phone.closest(".field")?.classList.remove("err");
  });

  service.addEventListener("change", () => setServiceNote(form));

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".field, .check")?.classList.remove("err");
    });
  });

  button.addEventListener("click", async () => {
    const localPhone = phone.value.replace(/\D/g, "");
    const code =
      phoneCode.value === "other"
        ? customPhoneCode.value.trim()
        : phoneCode.value;
    let valid = true;

    if (name.value.trim().length < 2) {
      name.closest(".field").classList.add("err");
      valid = false;
    }

    if (localPhone.length !== 9) {
      phone.closest(".field").classList.add("err");
      valid = false;
    }

    if (phoneCode.value === "other" && !/^\+\d{1,3}$/.test(code)) {
      phone.closest(".field").classList.add("err");
      valid = false;
    }

    if (!agree.checked) {
      agree.closest(".check").classList.add("err");
      valid = false;
    }

    if (!valid) {
      form.querySelector(".err input, .err textarea, .err select")?.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Отправляем…";
    status.textContent = "Отправляем данные…";
    status.classList.remove("err-text");

    try {
      const serviceName =
        service.options[service.selectedIndex].textContent.trim();
      await sendLead(
        {
          Имя: name.value.trim(),
          Услуга: serviceName,
          Телефон: getFullPhoneNumber(form),
          Дополнительная_информация: task.value.trim() || "—",
        },
        subject,
      );
      form.style.display = "none";
      success.style.display = "block";
    } catch (error) {
      status.textContent = error.message;
      status.classList.add("err-text");
    } finally {
      button.disabled = false;
      button.innerHTML = SUBMIT_LABEL;
    }
  });
}

document.querySelectorAll(".form-slot").forEach((slot) => {
  slot.innerHTML = FORM_HTML;
  setupForm(slot, "Новая заявка с сайта KNOW consult");
});

/* ---------- Окно «Консультация» ---------- */
const modal = document.createElement("div");
modal.className = "modal";
modal.hidden = true;
modal.innerHTML = `
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="modal-close" type="button" aria-label="Закрыть">×</button>
    <h2 id="modal-title">Консультация KNOW consult</h2>
    <p class="modal-lead">Оставьте имя и телефон — уточним вашу задачу и предложим следующий шаг.</p>
    ${FORM_HTML}
  </div>`;
document.body.appendChild(modal);
setupForm(modal, "Запрос консультации с сайта KNOW consult");

function resetModalAfterSuccessfulSubmit() {
  const form = modal.querySelector(".form");
  const success = modal.querySelector(".success");
  if (success.style.display !== "block") return;

  form.reset();
  form.style.display = "";
  success.style.display = "";
  setCustomCodeVisibility(form);
  setServiceNote(form);
}

function openModal(trigger) {
  resetModalAfterSuccessfulSubmit();
  const selectedService = trigger?.dataset.service || "general";
  setFormService(modal, selectedService);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector('[name="name"]').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-consult]");
  if (!trigger) return;
  event.preventDefault();
  openModal(trigger);
});

modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
