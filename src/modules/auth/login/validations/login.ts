import { z } from 'zod';

const loginValidation = z.object({
  email: z.string().email("Invalid email").min(5, "Email must contain at least 5 character(5)"),
  password: z.string().min(6, "Password must contain at least 6 character(s)"),
});

export default loginValidation;