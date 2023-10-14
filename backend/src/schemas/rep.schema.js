import { z } from "zod";

export const addAdminSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre de usuario requerido',
    }),
    celular: z.number({
        required_error: 'Celular requerido'
    }),
    telefono: z.number({
        required_error: 'Telefono requerido'
    }),
    correo: z.string({
        required_error: 'Correo electronico requerido'
    }).email({
        message: 'Correo electronico invalido'
    })
})