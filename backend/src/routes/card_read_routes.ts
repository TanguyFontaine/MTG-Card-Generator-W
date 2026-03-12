import express, { Router } from 'express';
import { ROUTES } from '../../../shared/routes.js';
import { CardReadController } from '../controllers/card_read_controller.js';

const router: Router = express.Router();

router.get(ROUTES.CARDS_TABLE_URL, CardReadController.getAllCards);
router.get(ROUTES.CARD_BY_ID_URL(':id'), CardReadController.getCardById);

export default router;
