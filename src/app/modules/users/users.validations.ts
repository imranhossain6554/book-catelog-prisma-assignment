import { z } from 'zod';
import { role } from '../auth/auth.constants';

const update = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2)
      .max(100)
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .optional(),
    password: z.string().min(6).max(100).optional(),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'Role is required!',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .min(3)
      .max(11)
      .optional(),
    address: z.string().min(2).max(100).optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidations = {
  update,
};
