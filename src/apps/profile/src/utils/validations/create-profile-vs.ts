import { z } from 'zod';

export const createProfileValidationSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
  }),
});
