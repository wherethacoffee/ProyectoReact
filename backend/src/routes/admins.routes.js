import { Router } from "express";
import { save, list, update, remove } from "../controllers/admins.controller.js";
import { validateSchema } from "../middlewares/validacion.middleware.js";
import { addAdminSchema } from "../schemas/admin.schema.js";

const router = Router();

router.get('/listar', list);
router.post('/agregar', validateSchema(addAdminSchema), save);
router.put('/actualizar/:id', update);
router.delete('/eliminar/:id', remove);

export default router;
