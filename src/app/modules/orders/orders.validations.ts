import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'Book Id is required',
        }),
        quantity: z
          .number({
            required_error: 'Quantity must be at least 1',
          })
          .min(1),
      })
    ),
  }),
});

// const create = z.object({
//   body: z.object({
//     title: z
//       .string({
//         required_error: 'Title is required',
//       })
//       .min(4)
//       .max(100),
//   }),
// });

// const update = z.object({
//   body: z.object({
//     title: z
//       .string({
//         required_error: 'Title is required',
//       })
//       .min(4)
//       .max(100)
//       .optional(),
//   }),
// });

export const OrderValidations = {
  create,
};
