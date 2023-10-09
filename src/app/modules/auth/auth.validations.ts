import { z } from 'zod';
import { role } from './auth.constants';

const create = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2)
      .max(100),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string().min(6).max(100),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .min(3)
      .max(11),
    address: z.string().min(2).max(100),
    profileImg: z.string().optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .max(100),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidations = {
  create,
  login,
  refreshToken,
};

// phone number validation
//.refine(value => /^\+880-\d{10}$/.test(value), {
//   message: 'Contact number must be in the format +880-XXXXXXXXXX',
// }
