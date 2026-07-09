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

  Strength: {
    className: "status-strength",
    icon: "/icons/status/strength.png",
    tooltip: "Offensive dice used by the character gain X power."
  },

  Haste: {
    className: "status-haste",
    icon: "/icons/status/haste.png",
    tooltip: "Increase the Speed Dice's result by 1 per stack."
  },

  Bind: {
    className: "status-bind",
    icon: "/icons/status/bind.png",
    tooltip: "Reduce the Speed Dice's result by 1 per stack. Final result does not go below 1."
  },

  Charge: {
    className: "status-charge",
    icon: "/icons/status/charge.png",
    tooltip: "Affects the properties of certain Combat Pages. 10 Charges can be stored at once, or 20 if equipped with the Triple-R suit passive."
  },

  Paralysis: {
    className: "status-paralysis",
    icon: "/icons/status/paralysis.png",
    tooltip: "When the character plays any Combat Page, up to X random dice on it have their maximum roll value reduced by 3. The final roll can be lower than the Minimum Range, but not lower than 1."
  },

  Light: {
    className: "status-light",
    icon: "/icons/status/light.png",
    tooltip: "Resource used to play combat pages. 1 Light is restored at the start of each Scene."
  }
};
