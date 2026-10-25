(() => {
  "use strict";

  const form = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");
  const submitButton = form && form.querySelector(".submit-button");
  const netlifyHost = window.location.hostname.endsWith(".netlify.app");
  const netlifyFormsEnabled = netlifyHost || document.documentElement.dataset.netlifyForms === "enabled";
  if (!form || !feedback || !submitButton) return;

  const service = new URLSearchParams(window.location.search).get("service");
  const serviceSelect = form.elements.namedItem("interestedServices");
  if (service && serviceSelect instanceof HTMLSelectElement && serviceSelect.multiple) {
    const option = [...serviceSelect.options].find((item) => item.value === service);
    if (option) option.selected = true;
  }
  const packageName = new URLSearchParams(window.location.search).get("package");
  const packageSelect = form.elements.namedItem("package");
  if (packageName && packageSelect instanceof HTMLSelectElement) {
    const option = [...packageSelect.options].find((item) => item.value === packageName);
    if (option) packageSelect.value = packageName;
  }

  const showFeedback = (message, isSuccess) => {
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.classList.toggle("is-success", isSuccess);
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const phone = form.elements.namedItem("phone");
  if (phone instanceof HTMLInputElement) {
    const phoneError = document.querySelector("#phone-error");
    phone.addEventListener("input", () => {
      const digits = phone.value.replace(/\D/g, "");
      const valid = !phone.value.trim() || (digits.length >= 7 && digits.length <= 15);
      const message = valid ? "" : "Enter a phone number with 7 to 15 digits, including country code if needed.";
      phone.setCustomValidity(message);
      if (valid) phone.removeAttribute("aria-invalid");
      else phone.setAttribute("aria-invalid", "true");
      if (phoneError) phoneError.textContent = message;
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (window.location.protocol === "file:" || !netlifyFormsEnabled) {
      showFeedback("This form is not connected yet. Deploy to Netlify and enable Netlify Forms. On a custom domain, mark the contact page with data-netlify-forms=\"enabled\" after verifying the form is active.", false);
      return;
    }

    const label = submitButton.querySelector(".button-label");
    const loading = submitButton.querySelector(".button-loading");
    submitButton.disabled = true;
    if (label) label.hidden = true;
    if (loading) loading.hidden = false;
    feedback.hidden = true;

    try {
      const body = new URLSearchParams();
      for (const [name, value] of new FormData(form)) {
        body.append(name, String(value));
      }
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error(`The form service returned HTTP ${response.status}.`);
      }

      form.reset();
      showFeedback("Thanks for reaching out. Netlify accepted your inquiry. We’ll follow up using the contact details you provided.", true);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      showFeedback("We could not submit your inquiry. Please try again later or use the configured contact details in the page footer.", false);
    } finally {
      submitButton.disabled = false;
      if (label) label.hidden = false;
      if (loading) loading.hidden = true;
    }
  });
})();
