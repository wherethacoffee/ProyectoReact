import { Router } from "express";
import { save, list, update, remove } from "../controllers/alumnos.controllers.js";
import { validateSchema } from "../middlewares/validacion.middleware.js";
import { addAlumnoSchema } from "../schemas/alumno.schema.js";

const router = Router();

router.get('/listar', list);
router.post('/agregar', validateSchema(addAlumnoSchema), save);
router.put('/actualizar/:id', update);
router.delete('/eliminar/:id', remove);

export default router;
