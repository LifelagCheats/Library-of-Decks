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

const keywords = {
  Burn: {
    className: "status-burn",
    icon: "/icons/status/burn.png"
  },

  Bleed: {
    className: "status-bleed",
    icon: "/icons/status/bleed.png"
  },

  Fragile: {
    className: "status-fragile",
    icon: "/icons/status/fragile.png"
  },

  Protection: {
    className: "status-protection",
    icon: "/icons/status/protection.png"
  },

  Haste: {
    className: "status-haste",
    icon: "/icons/status/haste.png"
  },

  Charge: {
    className: "status-charge",
    icon: "/icons/status/charge.png"
  },

  Light: {
    className: "status-light",
    icon: "/icons/status/light.png"
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
    <span class="keyword ${keyword.className}">
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
