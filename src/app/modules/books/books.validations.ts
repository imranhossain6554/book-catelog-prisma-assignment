import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(4, {
        message: 'Title must be at least 4 characters long',
      })
      .max(100, {
        message: 'Title must be at most 100 characters long',
      }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    publicationDate: z
      .string({
        required_error: 'Publication Date is required',
      })
      .refine(
        value => {
          const date = new Date(value);
          return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}$/);
        },
        {
          message: 'Invalid date format. Date must be in format "YYYY-MM-DD"',
        }
      ),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(4, {
        message: 'Title must be at least 4 characters long',
      })
      .max(100, {
        message: 'Title must be at most 100 characters long',
      })
      .optional(),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .optional(),
    genre: z
      .string({
        required_error: 'Genre is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    publicationDate: z
      .string({
        required_error: 'Publication Date is required',
      })
      .refine(
        value => {
          const date = new Date(value);
          return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}$/);
        },
        {
          message: 'Invalid date format. Date must be in format "YYYY-MM-DD"',
        }
      )
      .optional(),
    categoryId: z
      .string({
        required_error: 'Category Id is required',
      })
      .optional(),
  }),
});

export const BookValidations = {
  create,
  update,
};
