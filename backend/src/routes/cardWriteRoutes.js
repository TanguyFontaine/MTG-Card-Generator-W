import express from 'express';
import { ROUTES } from '../../../shared/routes.js';
import { CardWriteController } from '../controllers/cardWriteController.js';

const router = express.Router();

router.post(ROUTES.CARDS_TABLE_URL, CardWriteController.createCard);
router.put(ROUTES.CARD_BY_ID_URL(':id'), CardWriteController.updateCard);
router.delete(ROUTES.CARD_BY_ID_URL(':id'), CardWriteController.deleteCard);

export default router;