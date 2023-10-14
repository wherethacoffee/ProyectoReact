import { z } from "zod";

export const addAlumnoSchema = z.object({
    curp: z.string({
        required_error: 'Nombre de usuario requerido',
    }),
    nombre: z.string({
        required_error: 'Contraseña requerida'
    }).min(8, {
        message: 'La contraseña debe ser de mas de 8 caracteres'
    }),
    materno: z.string({
        required_error: 'Nombre de usuario requerido',
    }),
    paterno: z.string({
        required_error: 'Nombre de usuario requerido',
    }),
})