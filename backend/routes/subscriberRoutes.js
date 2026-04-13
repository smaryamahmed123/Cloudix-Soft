import express from 'express';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/subscriberController.js';

const router = express.Router();

router.get('/', getSubscribers);
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

export default router;
