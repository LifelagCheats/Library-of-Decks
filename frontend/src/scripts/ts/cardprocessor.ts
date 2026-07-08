const triggers = {
  "On use": {
    className: "trigger-onuse",
    display: "On Use"
  },

  "On hit": {
    className: "trigger-onhit",
    display: "On Hit"
  },

  "On clash win": {
    className: "trigger-clashwin",
    display: "On Clash Win"
  },

  "none": {
    className: "",
    display: ""
  }
};

type KeywordData = {
    className: string;
    icon: string;
    tooltip: string;
}

export const keywords: Record<string, KeywordData> = {
  Burn: {
    className: "status-burn",
    icon: "/icons/status/burn.png",
    tooltip: "At the end of the Scene, take X damage and subtract 1/3rd of the Burn stack. (Rounds down)."
  },

  Bleed: {
    className: "status-bleed",
    icon: "/icons/status/bleed.png",
    tooltip: "Each time the character uses an Offensive Die, they take damage equal to the number of stacks, then the number of stacks is reduced by 1/3 (rounded up)."
  },

  Fragile: {
    className: "status-fragile",
    icon: "/icons/status/fragile.png",
    tooltip: "Take extra damage from attacks equal to the stack. The damage is added before resistance multipliers are applied."
  },

  Protection: {
    className: "status-protection",
    icon: "/icons/status/protection.png",
    tooltip: "Take X less damage from attacks. The damage is substracted before resistance multipliers are applied."
  },

  Haste: {
    className: "status-haste",
    icon: "/icons/status/haste.png",
    tooltip: "Increase the Speed Dice's result by 1 per stack."
  },

  Charge: {
    className: "status-charge",
    icon: "/icons/status/charge.png",
    tooltip: "Affects the properties of certain Combat Pages. 10 Charges can be stored at once, or 20 if equipped with the Triple-R suit passive."
  },

  Light: {
    className: "status-light",
    icon: "/icons/status/light.png",
    tooltip: "Resource used to play combat pages. 1 Light is restored at the start of each Scene."
  }
};

export function processTrigger(trigger: string): string {
  const keyword = triggers[trigger as keyof typeof triggers];

  if (!keyword) {
    return trigger;
  }

  if (!keyword.className) {
    return "";
  }

  return `<span class="${keyword.className}">${keyword.display}</span>`;
}

export function processDescription(description: string): string {
  let parsed = description;

  for (const [word, keyword] of Object.entries(keywords)) {
    const regex = new RegExp(`\\b${word}\\b`, "g");

    parsed = parsed.replace(
    regex,
    `
    <span class="keyword ${keyword.className}"
          data-keyword="${word}">
      <span class="icon-wrapper">
      <img 
        src="${keyword.icon}" 
        alt="${word}"
        class="status-icon"
      />
      </span>
      ${word}
    </span>
    `
    );
  }

  return parsed;
}
