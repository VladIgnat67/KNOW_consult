/* ==========================================================
   ОТПРАВКА ЗАЯВОК НА ПОЧТУ через FormSubmit
   Получатель задаётся в js/config.js: CONTACT_EMAIL.
   ========================================================== */

const REQUEST_TIMEOUT_MS = 8000;

async function sendLead(fields, subject = "Новая заявка с сайта KNOW consult") {
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

  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/" + encodeURIComponent(CONTACT_EMAIL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        keepalive: true,
      },
    );

    const data = await response.json().catch(() => ({}));
    if (!response.ok || String(data.success) === "false") {
      throw new Error(
        data.message || "Не удалось отправить заявку. Попробуйте ещё раз.",
      );
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Сервис не подтвердил отправку за несколько секунд. Проверьте интернет и попробуйте ещё раз.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Не удалось подключиться к сервису отправки. Попробуйте ещё раз или свяжитесь с нами по телефону.",
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

// ---------- ВРЕМЕННАЯ КНОПКА ДЛЯ ПРОВЕРКИ ----------
// После проверки писем поставьте SHOW_TEST_BUTTON = false в js/config.js.
if (typeof SHOW_TEST_BUTTON !== "undefined" && SHOW_TEST_BUTTON) {
  const testButton = document.createElement("button");
  testButton.type = "button";
  testButton.className = "test-mail";
  testButton.textContent = "Тест: отправить письмо";
  testButton.title = "Отправляет тестовую заявку на email из js/config.js";

  testButton.addEventListener("click", async () => {
    testButton.disabled = true;
    testButton.textContent = "Отправляю…";

    try {
      await sendLead(
        {
          Имя: "Тестовая заявка",
          Услуга: "Проверка формы",
          Телефон: "+996 000 000 000",
          Дополнительная_информация: "Проверка отправки писем с сайта",
        },
        "ТЕСТ: заявка с сайта KNOW consult",
      );
      testButton.textContent = "Письмо отправлено ✓";
      testButton.classList.add("ok");
    } catch (error) {
      testButton.textContent = "Ошибка — см. подсказку";
      testButton.classList.add("bad");
      alert(error.message);
    }

    window.setTimeout(() => {
      testButton.disabled = false;
      testButton.textContent = "Тест: отправить письмо";
      testButton.classList.remove("ok", "bad");
    }, 5000);
  });

  document.body.appendChild(testButton);
}
