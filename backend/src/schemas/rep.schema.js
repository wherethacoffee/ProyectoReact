import { z } from "zod";

const nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+ [A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/

export const addRepSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre de representante requerido',
    })
    .regex(nameRegex, {
        message: 'Solamente el primer nombre y el primer apellido'
    }),
    celular: z.string({
        required_error: 'Celular requerido'
    })
    .min(10, 'El numero debe tener al menos 10 digitos')
    .max(10, 'El numero debe tener tan solo 10 caracteres'),
    telefono: z.string({
        required_error: 'Telefono requerido'
    })
    .min(10, 'El numero debe tener al menos 10 digitos')
    .max(10, 'El numero debe tener tan solo 10 caracteres'),
    correo: z.string({
        required_error: 'Correo electronico requerido'
    }).email({
        message: 'Correo electronico invalido'
    })
})