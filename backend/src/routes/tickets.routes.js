import { Router } from "express";
import { save, list, remove, update} from "../controllers/tickets.controller.js"

const router = Router();

router.get('/', list)
router.get('/list', list);
router.post('/add', save);
router.get('/edit/:id', update);
router.get('/delete/:id', remove);

export default router;