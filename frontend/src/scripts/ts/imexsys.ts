import { getSlots, assignCardToSlot } from "./drag";

const slotMap = getSlots();
const importbtn: HTMLElement | null = document.getElementById("importdeckbtn");
const exportbtn: HTMLElement | null = document.getElementById("exportdeckbtn");

const GiveJSON = () => {
  return Array.from(slotMap.entries()).map(
    ([slot, card]) => ({
      slot: slot.id,
      card: card?.id ?? null
    })
  );
}

type Slot =  {
  slot: string;
  card: string | null;
};

export function imexLoop(): void {
  if (!importbtn || !exportbtn) return;
  
  importbtn.addEventListener("click", async () => {
    const importcode: string = await navigator.clipboard.readText();
    const data: Slot[] = JSON.parse(importcode);
    data.forEach(el => {
      const slotEl = document.getElementById(el.slot);
      const cardEl = el.card ? document.getElementById(el.card) : null
      if (!cardEl) return
      const wrapper: HTMLElement | null = cardEl.closest(".card-wrapper");


      if (slotEl && wrapper) {
        assignCardToSlot(cardEl, slotEl, wrapper, slotMap);
      }
      console.log(el)
    });
    console.log(slotMap);
    })

  exportbtn.addEventListener("click", () => {
    const existingWindow = document.querySelector(".infowindow");

    if (existingWindow) {
      existingWindow.remove();
      return;
    }

    const infowindow: HTMLElement | null = document.createElement("div");
    infowindow.classList.add("infowindow");

    const copybtn: HTMLElement | null = document.createElement("button");
    copybtn.classList.add("copy");
    copybtn.innerHTML = "<ion-icon name='copy'></ion-icon>";

    const code: HTMLElement | null = document.createElement("code");
    code.textContent = JSON.stringify(GiveJSON(), null, 2);

    const pre: HTMLElement | null = document.createElement("pre");
    pre.appendChild(code);

    infowindow.appendChild(copybtn);
    infowindow.appendChild(pre);

    document.body.appendChild(infowindow);

    copybtn.addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(GiveJSON(), null, 2));
    });
  })
}
