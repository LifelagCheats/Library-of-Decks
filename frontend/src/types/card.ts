export type DieType = "slash" | "pierce" | "blunt";

export type Die = {
  type: DieType;
  range: [number, number];
};

export type Effect = {
  trigger: string;
  description: string;
  hook?: number;
};

export type DieWithEffects = Die & {
  hookedEffects: Effect[];
};

export type Card = {
  id: string;
  name: string;
  rarity: string;
  light: number;
  type: string;
  card_cover: string;
  dice?: Array<{
    type: "slash" | "pierce" | "blunt";
    range: [number, number];
  }>;
  effects?: Array<{
    trigger: string;
    description: string;
    hook?: number;
  }>;
};
