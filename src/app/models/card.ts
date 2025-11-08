 import { z } from 'zod';

export const card_schema = z.object({
  id: z.number().int().nonnegative(),
  card_title: z.string().min(1, 'Card title is required.'),
  card_description: z.string().min(1, 'Card description is required.')
});

export type Card = z.infer<typeof card_schema>;

export const cards_schema = z.array(card_schema);

export const card_update_schema = z.object({
  card_id: z.number().int().nonnegative(),
  updated_description: z.string().min(1, 'Description cannot be empty.')
});