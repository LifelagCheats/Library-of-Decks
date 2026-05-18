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
}
