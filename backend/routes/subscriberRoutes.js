import express from 'express';
import { verifyAdmin } from '../middelware/authMiddelware.js';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/subscriberController.js';

const router = express.Router();

router.get('/', verifyAdmin, getSubscribers);
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

export default router;
