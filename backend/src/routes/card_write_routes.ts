import express, { Router } from 'express';
import { ROUTES } from '../../../shared/routes.js';
import { CardWriteController } from '../controllers/card_write_controller.js';

const router: Router = express.Router();

router.post(ROUTES.CARDS_TABLE_URL, CardWriteController.insertCard);
router.put(ROUTES.CARD_BY_ID_URL(':id'), CardWriteController.updateCard);
router.delete(ROUTES.CARD_BY_ID_URL(':id'), CardWriteController.deleteCard);

export default router;
