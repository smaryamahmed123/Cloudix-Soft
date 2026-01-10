import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
} from '../controllers/ContactInfoController.js';
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

router.put('/', verifyAdmin, updateContactInfo);
router.get('/', getContactInfo);

export default router;
