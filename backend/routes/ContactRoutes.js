import express from 'express';
import {
  createMessage,
  getMessages,
  deleteMessage,
  updateMessageStatus,
} from '../controllers/ContactControlers.js';
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', verifyAdmin, getMessages);
router.delete('/:id', verifyAdmin, deleteMessage);
router.patch("/:id/status", updateMessageStatus);
export default router;
