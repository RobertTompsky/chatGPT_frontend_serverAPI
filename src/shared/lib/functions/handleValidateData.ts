import { z } from "zod"

export const handleValidateData = async <T>(
    data: T,
    schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
    const initialState: { [key: string]: string } = {}
    setErrors(initialState);
    try {
        await schema.parseAsync(data)
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors: { [key: string]: string } = {};
            error.errors.forEach(err => {
                if (err.path) {
                    validationErrors[err.path[0]] = err.message;
                }
            });
            setErrors(validationErrors)
        }
    }
}