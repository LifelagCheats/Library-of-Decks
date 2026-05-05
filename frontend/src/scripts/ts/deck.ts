export function placeOnDeck(card: HTMLElement, targets: NodeListOf<HTMLElement>): HTMLElement | null {
  for (const target of targets) {
    const rect = card.getBoundingClientRect();
    const points = [
      [rect.left + rect.width / 2, rect.top + rect.height / 2],
      [rect.left, rect.top],
      [rect.right, rect.top],
      [rect.left, rect.bottom],
      [rect.right, rect.bottom],
    ];

    if (points.some(([x, y]) => document.elementsFromPoint(x, y).includes(target))) {
      return target; 
    }
  }
  return null;
}
