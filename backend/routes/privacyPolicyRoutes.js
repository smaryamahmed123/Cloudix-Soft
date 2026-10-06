// routes/privacyPolicyRoutes.js
import express from 'express';
import { verifyAdmin } from '../middelware/authMiddelware.js';
import { getPolicy, updatePolicy, deletePolicy } from '../controllers/privacyPolicyController.js';

const router = express.Router();

router.get('/', getPolicy);              // GET privacy policy
router.post('/update', verifyAdmin, updatePolicy);    // POST update privacy policy
router.delete('/', verifyAdmin, deletePolicy);       // DELETE privacy policy (optional)

export default router;
