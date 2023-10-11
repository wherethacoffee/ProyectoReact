import { Router } from "express";
import { save, list, remove, update} from "../controllers/tickets.controller.js"

const router = Router();

router.get('/listar', list);
router.get('/add', save);
router.get('/edit/:id', update);
router.get('/delete/:id', remove);