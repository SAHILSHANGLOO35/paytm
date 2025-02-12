import { optional, z } from "zod";

export const SignupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().
        email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
});

export const SignInSchema = SignupSchema.pick({ email: true, password: true });

export const updateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.union([
        z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character")
            .regex(/[A-Z]/, "Password must include at least one uppercase letter")
            .regex(/[a-z]/, "Password must include at least one lowercase letter"),
        z.undefined()  // Allows password to be optional without validation errors
    ])
});

