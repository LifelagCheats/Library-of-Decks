import { keywords } from "./cardprocessor";

const tooltip = document.createElement("div");

tooltip.className = "tooltip";
tooltip.hidden = true;

document.body.appendChild(tooltip);

document.querySelectorAll<HTMLElement>(".keyword").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const keywordName = element.dataset.keyword;

    if (!keywordName) return;

    const data = keywords[keywordName as keyof typeof keywords];

    if (!data) return;

    tooltip.innerHTML = `
      <div class="tooltip-header">
        <img
          src="${data.icon}"
          alt="${keywordName}"
          class="tooltip-icon"
        />
        <span>${keywordName}</span>
      </div>

      <div class="tooltip-body">
        ${data.tooltip}
      </div>
    `;

    tooltip.hidden = false;
  });

  element.addEventListener("mousemove", (event) => {
    tooltip.style.left = `${event.clientX + 16}px`;
    tooltip.style.top = `${event.clientY + 20}px`;
  });

  element.addEventListener("mouseleave", () => {
    tooltip.hidden = true;
  });
});
