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

export type Card = z.infer<typeof CardSchema>;

/*
 INFO: Example card format:
 "Disposal": {
  "id": 10002 <- important for organizing the cards!
  "cid": "i-hate-you-all-and-the-famiglia-too" <- important for search bar!
  "name": "Disposal" <- will be displayed on UI!
  "rarity": "objet-dart" 
  "light": 5,
  "type": "melee",
  "card_cover": "/cards/something.jpg" <- '/cards/' is the public/cards/ directory.
  "dice": [
    {
      "type": "slash",
      "range": [15, 30]
    },
    {
      "type": "slash",
      "range": [10, 20]
    }
  ],
  "effects": [
    {
      "trigger": "Single-use",
      "description": "Only usable at 20+ Charge. Upon defeating an enemy with this page, add a copy of 'Disposal' to hand and lower its Cost by 1.
If target's HP is at 50% or lower, deal twice as much damage."
       INFO: NO "hook" BECAUSE IT GOES IN THE BEGINNING BEFORE THE DICE
    },
    {
      "trigger": "On clash win",
      "description": "Destroy all of opponent's dice",
      "hook": 1
      INFO: this will latch onto the first die
    },
    {
      "trigger": "On clash lose",
      "description": "Destroy the next die on this page",
      "hook": 1
      INFO: will too latch onto the first die along with the effect above
    },
    {
      "trigger": "none",
      "description": "If target has 'Mark', increase damage and Stagger damage by the natural roll",
      "hook": 2
      INFO: add 'none' when it has no conditionals/triggers to be pointed out.
    }
  ]
 }
 */
