import { z } from "zod";

export const userSchema = z.object({
    name: z.string()
        .min(2, 'Слишком короткое имя'),
    password: z.string()
        .min(2, 'Слишком короткий пароль')
})