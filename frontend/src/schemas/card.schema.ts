import { z } from "zod";

export const DieSchema = z.object({
  type: z.string(),
  range: z.tuple([
    z.number(),
    z.number()
  ])
});


export const EffectSchema = z.object({
  trigger: z.string(),
  description: z.string(),
  hook: z.number().optional()
});


export const CardSchema = z.object({
  id: z.number(),
  cid: z.string(),
  name: z.string(),

  rarity: z.enum([
    "paperback",
    "limited",
    "hardcover",
    "objet-dart"
  ]),

  light: z.number().min(0),

  type: z.enum([
    "melee",
    "ranged",
    "massSumation",
    "massIndividual"
  ]),

  card_cover: z.string(),

  dice: z.array(DieSchema),

  effects: z.array(EffectSchema).optional()
});


export const CardsSchema = z.record(
  z.string(),
  CardSchema);

export type CardData = z.infer<typeof CardSchema>;
export type CardsData = z.infer<typeof CardsSchema>;
