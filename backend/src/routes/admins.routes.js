import { Router } from "express";
import { save, list, update, remove } from "../controllers/admins.controller.js";

const router = Router();

router.get('/listar', list);
router.post('/agregar', save);
router.put('/actualizar/:id', update);
router.delete('/eliminar/:id', remove);

export default router;
