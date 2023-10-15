import { z } from "zod";

const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;

export const addAlumnoSchema = z.object({
    curp: z.string({
        required_error: 'CURP del alumno requerido',
    })
    .regex(curpRegex, {
        message: 'CURP inválida. La CURP debe seguir el formato correcto.'
    })
    .min(18, 'La CURP debe tener al menos 18 caracteres')
    .max(18, 'La CURP no debe exceder los 18 caracteres'),

    nombre: z.string({
        required_error: 'Nombre del alumno requerido'
    }),

    materno: z.string({
        required_error: 'Apellido paterno del alumno requerido',
    }),
    
    paterno: z.string({
        required_error: 'Apellido materno del alumno requerido',
    }),
});