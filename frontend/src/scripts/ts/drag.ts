import { elementOverlap } from "./deck";

export function setupDrag(): void {
  let dragged: HTMLElement | null = null;
  let offsetX: number = 0;
  let offsetY: number = 0;
  let previousX: number = 0;
  let pointerId: number;
  const slots = document.querySelectorAll('.cardSlot') as NodeListOf<HTMLElement>;
  let assignedSlot: HTMLElement | null = null;
  let wrapper: HTMLElement;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointerdown', (e: Event): void => {
      const pe = e as PointerEvent;
      dragged = card as HTMLElement;
      const rect = dragged.getBoundingClientRect();
      offsetX = pe.clientX - rect.left;
      offsetY = pe.clientY - rect.top;
      pointerId = pe.pointerId;

      wrapper.style.position = 'fixed';
      dragged.style.zIndex = '1000';

      dragged.setPointerCapture(pointerId);
      dragged.classList.add('dragging')
    });
  });

  document.addEventListener('pointermove', (e: PointerEvent): void => {
    if (!dragged) return;
    wrapper = dragged.closest('.card-wrapper') as HTMLElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    const pe = e as PointerEvent; 
    let deltaX: number = pe.clientX - previousX;
    let rotation: number = deltaX * 0.2;
    wrapper.style.width = `${wrapperRect.width}px`;
    wrapper.style.height = `${wrapperRect.height}px`;
    wrapper.style.position = `fixed`
    wrapper.style.left = `${e.clientX - offsetX}px`;
    wrapper.style.top = `${e.clientY - offsetY}px`;
    dragged.style.transform = `rotate(${rotation}deg)`;
    if (dragged.classList.contains('stored')) {
      assignedSlot = null;
      dragged.classList.remove('stored');
    }

    assignedSlot = elementOverlap(dragged, slots);

    previousX = pe.clientX;

  });

  document.addEventListener('pointerup', (): void => {
    if (!dragged) return;
    dragged.classList.remove('dragging');
// I think 'dragging' makes itself clear. 
    dragged.releasePointerCapture?.(pointerId);
    if (assignedSlot) {
      const rect = assignedSlot.getBoundingClientRect();
      const draggedRect = dragged.getBoundingClientRect();

      if (!dragged.classList.contains('stored')) {
        console.debug("a slot has been assigned")
        wrapper.style.left = `${rect.left + rect.width / 2 - draggedRect.width / 2}px`;
        wrapper.style.top = `${rect.top + rect.height / 2 - draggedRect.height / 2}px`;

        dragged.classList.add('stored');
      }
    }
    dragged = null;
    console.warn("Card's dragged state has been voided")
  });
}
