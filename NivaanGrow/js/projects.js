(() => {
  "use strict";

  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".portfolio-grid [data-category]")];
  const emptyMessage = document.querySelector(".filter-empty");

  if (!buttons.length || !cards.length || !emptyMessage) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      let visibleCount = 0;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      cards.forEach((card) => {
        const visible = category === "all" || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      emptyMessage.hidden = visibleCount > 0;
    });
  });
})();
