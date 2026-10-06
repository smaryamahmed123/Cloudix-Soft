import express from 'express';
import { verifyAdmin } from '../middelware/authMiddelware.js';
import {
    subscribe,
    adminRemoveSubscriber,
    unsubscribeByToken,
    getSubscribers,
} from '../controllers/subscriberController.js';

const router = express.Router();

router.get('/', verifyAdmin, getSubscribers);
router.post('/subscribe', subscribe);
router.post('/unsubscribe', verifyAdmin, adminRemoveSubscriber);
router.post('/unsubscribe-token', unsubscribeByToken);

export default router;