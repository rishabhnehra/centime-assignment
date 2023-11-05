import { z } from "zod";

export const DataSchema = z.object({
  id: z.number().min(1).optional(),
  source: z.string().min(1),
  target: z.string().min(1),
  value: z.number().min(1),
});

export type Data = z.infer<typeof DataSchema>;
