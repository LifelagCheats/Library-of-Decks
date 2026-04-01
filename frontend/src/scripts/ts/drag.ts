export function setupDrag() {
  let dragged: HTMLElement | null = null;
  let offsetX: number = 0;
  let offsetY: number = 0;
  let previousX: number = 0;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointerdown', (e) => {
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

  document.addEventListener('pointermove', (e) => {
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
  });

  document.addEventListener('pointerup', () => {
    if (!dragged) return;
    dragged.classList.remove('dragging')
    dragged.releasePointerCapture?.(0);
    dragged = null;
  });
}
