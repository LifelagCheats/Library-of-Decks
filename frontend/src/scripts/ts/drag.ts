const slotMap = new Map<HTMLElement, HTMLElement | null>();

export function setupDrag(): void {
  let dragged: HTMLElement | null = null;
  let offsetX: number = 0;
  let offsetY: number = 0;
  let previousX: number = 0;
  let pointerId: number;
  const slots = document.querySelectorAll('.cardSlot') as NodeListOf<HTMLElement>;
  slots.forEach(slot => {
    slotMap.set(slot, null);
  })

  const cardgrid: HTMLElement | null = document.getElementById("cardgrid") 
  let assignedSlot: HTMLElement | null = null;
  let wrapper: HTMLElement | null = null;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointerdown', (e: Event): void => {
      const pe = e as PointerEvent;
      dragged = card as HTMLElement;
      const rect = dragged.getBoundingClientRect();
      offsetX = pe.clientX - rect.left;
      offsetY = pe.clientY - rect.top;
      pointerId = pe.pointerId;
      wrapper = dragged.closest("wrapper");

      if (wrapper) {
        wrapper.style.position = 'fixed';
        dragged.style.zIndex = '1000';
      }

      if (assignedSlot) {
        if(slotMap.get(assignedSlot) === dragged) {
          slotMap.set(assignedSlot, null)
        }
      }

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
    if (!wrapper) return;
    if (!cardgrid) return;
    dragged.classList.remove('dragging');
// I think 'dragging' makes itself clear. 
    dragged.releasePointerCapture?.(pointerId);
    if (assignedSlot) {
      assignCardToSlot(dragged, assignedSlot, wrapper, slotMap);
     }
    else {
      cardgrid.appendChild(wrapper);
      wrapper.style.position = '';
      wrapper.style.left = '';
      wrapper.style.top = '';
      wrapper.style.width = '';
      wrapper.style.height = '';
    }
    dragged = null;
    console.warn("Card's dragged state has been voided")
  });
}

export const getSlots = () =>  {
  return slotMap
}

export function elementOverlap(
  card: HTMLElement,
  targets: NodeListOf<HTMLElement>
): HTMLElement | null {

  const cardRect = card.getBoundingClientRect();

  for (const target of targets) {
    const targetRect = target.getBoundingClientRect();

    const overlap = !(
      cardRect.right < targetRect.left ||
      cardRect.left > targetRect.right ||
      cardRect.bottom < targetRect.top ||
      cardRect.top > targetRect.bottom
    );

    if (overlap) return target;
  }

  return null;
};

export function assignCardToSlot(
  card: HTMLElement,
  slot: HTMLElement,
  wrapper: HTMLElement,
  slotMap: Map<HTMLElement, HTMLElement | null>
): void {
  const slotCard = slotMap.get(slot);

  if (card.classList.contains("stored")) return;
  if (slotCard) return;

  const wrapperRect = wrapper.getBoundingClientRect();

  wrapper.style.width = `${wrapperRect.width}px`;
  wrapper.style.height = `${wrapperRect.height}px`;
  wrapper.style.position = "fixed";

  const slotRect = slot.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  wrapper.style.left = `${slotRect.left + slotRect.width / 2 - cardRect.width / 2}px`;
  wrapper.style.top = `${slotRect.top + slotRect.height / 2 - cardRect.height / 2}px`;

  card.classList.add("stored");
  slotMap.set(slot, card);

  console.debug("card assigned to slot");
}
