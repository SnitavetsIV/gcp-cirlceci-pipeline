import { z } from 'zod';

export const getProfileValidationSchema = z.object({
  query: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('Not a valid email'),
  }),
});
