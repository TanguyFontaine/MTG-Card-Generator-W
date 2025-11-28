import express from 'express';
import { ROUTES } from '../../../shared/routes.js';
import { CardReadController } from '../controllers/cardReadController.js';

const router = express.Router();

router.get(ROUTES.CARDS_TABLE_URL, CardReadController.getAllCards);
router.get(ROUTES.CARD_BY_ID_URL(':id'), CardReadController.getCardById);

export default router;