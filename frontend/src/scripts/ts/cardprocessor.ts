export function processDie(trigger: string): string {
  let parsed: string = trigger;

  parsed = parsed.replace(/On use/g,
    '<span class="trigger-onuse"> On Use </span>')

  parsed = parsed.replace(/On hit/g,
    '<span class="trigger-onhit"> On Hit </span>')

  parsed = parsed.replace(/On clash win/g, '<span class="trigger-clashwin">On Clash Win</span>')

  parsed = parsed.replace(/none/g, '')
  return parsed;
}
