import { Router } from "express";
import { save, list, update, remove } from "../controllers/reps.controllers.js";
import { validateSchema } from "../middlewares/validacion.middleware.js";
import { addRepSchema } from "../schemas/rep.schema.js";

const router = Router();

router.get('/listar', list);
router.post('/agregar', validateSchema(addRepSchema), save);
router.put('/actualizar/:id', update);
router.delete('/eliminar/:id', remove);

export default router;
