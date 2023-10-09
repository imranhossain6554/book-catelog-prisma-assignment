import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(4)
      .max(100),
  }),
});

const update = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(4)
      .max(100)
      .optional(),
  }),
});

export const CategoryValidations = {
  create,
  update,
};
