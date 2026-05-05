import { placeOnDeck } from "./deck";

export function setupDrag(): void {
  let dragged: HTMLElement | null = null;
  let offsetX: number = 0;
  let offsetY: number = 0;
  let previousX: number = 0;
  const slots = document.querySelectorAll('.cardSlot') as NodeListOf<HTMLElement>; 

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointerdown', (e: Event): void => {
      const pe = e as PointerEvent;
      dragged = card as HTMLElement;
      const rect = dragged.getBoundingClientRect();
      offsetX = pe.clientX - rect.left;
      offsetY = pe.clientY - rect.top;

      dragged.style.position = 'fixed';
      dragged.style.zIndex = '1000';

      dragged.setPointerCapture(pe.pointerId);
      dragged.classList.add('dragging')
    });
  });

  document.addEventListener('pointermove', (e: PointerEvent): void => {
    if (!dragged) return;
    const pe = e as PointerEvent;
    let deltaX: number = pe.clientX - previousX;
    let rotation: number = deltaX * 0.2;
    dragged.style.left = `${e.clientX - offsetX}px`;
    dragged.style.top = `${e.clientY - offsetY}px`;
    dragged.style.transform = `rotate(${rotation}deg)`;
    const cardInfo = dragged.parentElement?.querySelector('.card-info') as HTMLElement;
    if (cardInfo) {
      cardInfo.style.left = `${pe.clientX - offsetX + 205}px`; // card position + offset
      cardInfo.style.top = `${pe.clientY - offsetY + 19.5}px`;
      cardInfo.style.position = 'fixed';
    }
    previousX = pe.clientX

    if (assignedSlot) {
      dragged.style.left = `${x}px`
      dragged.style.top = `${x}px`

      dragged.classList.remove('dragging')
      dragged = null
    }
  });

  document.addEventListener('pointerup', (): void => {
    if (!dragged) return;
    dragged.classList.remove('dragging')
    dragged.releasePointerCapture?.(0);
    dragged = null;
  });
}
