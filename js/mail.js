/* ==========================================================
   ОТПРАВКА ЗАЯВОК НА ПОЧТУ через сервис FormSubmit (formsubmit.co).
   Бесплатно, без регистрации и без своего сервера.
   ========================================================== */

async function sendLead(
  fields,
  subject = "Новая заявка с сайта KNOW consult travel",
) {
  if (!CONTACT_EMAIL || CONTACT_EMAIL.includes("ВАШ_EMAIL")) {
    throw new Error(
      "Не указан email для заявок. Откройте js/config.js и впишите свой адрес.",
    );
  }
  const payload = {
    ...fields,
    Страница: document.title,
    Время: new Date().toLocaleString("ru-RU"),
    _subject: subject,
    _template: "table",
    _captcha: "false",
  };
  let res;
  try {
    res = await fetch(
      "https://formsubmit.co/ajax/" + encodeURIComponent(CONTACT_EMAIL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
  } catch (e) {
    // Запрос не дошёл до сервиса: так бывает в предпросмотре Claude или при открытии файла двойным кликом
    throw new Error(
      "Отправка из этого окна заблокирована браузером. Письма заработают, когда сайт будет опубликован на хостинге (например, Netlify) или запущен через Live Server.",
    );
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) === "false") {
    throw new Error(
      data.message ||
        "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
    );
  }
  return data;
}

// ---------- ВРЕМЕННАЯ КНОПКА ДЛЯ ПРОВЕРКИ ----------
// Удалить: поставить SHOW_TEST_BUTTON = false в js/config.js
if (typeof SHOW_TEST_BUTTON !== "undefined" && SHOW_TEST_BUTTON) {
  const t = document.createElement("button");
  t.type = "button";
  t.className = "test-mail";
  t.textContent = "Тест: отправить письмо";
  t.title =
    "Временная кнопка: отправляет тестовую заявку на почту из js/config.js";
  t.addEventListener("click", async () => {
    t.disabled = true;
    t.textContent = "Отправляю…";
    try {
      await sendLead(
        {
          Имя: "Тестовая заявка",
          Телефон: "+996 000 000 000",
          Задача: "Проверка отправки писем с сайта",
        },
        "ТЕСТ: заявка с сайта KNOW consult travel",
      );
      t.textContent = "Письмо отправлено ✓";
      t.classList.add("ok");
    } catch (e) {
      t.textContent = "Ошибка — см. подсказку";
      t.classList.add("bad");
      alert(e.message);
    }
    setTimeout(() => {
      t.disabled = false;
      t.textContent = "Тест: отправить письмо";
      t.classList.remove("ok", "bad");
    }, 5000);
  });
  document.body.appendChild(t);
}
