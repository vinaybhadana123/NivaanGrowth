(() => {
  "use strict";

  const dialog = document.querySelector(".portfolio-dialog");
  if (!(dialog instanceof HTMLDialogElement)) return;
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector("p");
  if (!(image instanceof HTMLImageElement) || !caption) return;

  document.querySelectorAll(".portfolio-preview").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.fullImage || "";
      image.alt = button.dataset.imageAlt || "";
      caption.textContent = button.closest(".project-card")?.querySelector("h3")?.textContent || "Sample concept";
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });
})();
