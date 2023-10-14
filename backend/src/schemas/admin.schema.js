import { z } from "zod";

export const addAdminSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido',
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(8, {
        message: 'La contraseña debe ser de mas de 8 caracteres'
    })
})