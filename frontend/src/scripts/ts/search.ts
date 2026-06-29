const searchbar: HTMLElement | null = document.getElementById("cardsearch");
const cards = document.querySelectorAll(".card");

export function Search(): void {
  if (!searchbar) return;

  searchbar.addEventListener("input", (e: Event) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    
    cards.forEach((cardEl: Element)=> {
      const name = cardEl.getAttribute("data-name")?.toLowerCase() ?? "";
      const isVisible = name.includes(value);

      cardEl.classList.toggle("hidden", !isVisible);
    })
  })
}


