import { Router } from "express";
import { save, list, remove, update} from "../controllers/tickets.controller.js"

const router = Router();

router.get('/', list)
router.get('/list', list);
router.post('/add', save);
router.put('/edit/:id', update);
router.delete('/delete/:id', remove);

export default router;