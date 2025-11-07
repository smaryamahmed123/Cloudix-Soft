// routes/privacyPolicyRoutes.js
import express from 'express';
import { getPolicy, updatePolicy, deletePolicy } from '../controllers/privacyPolicyController.js';

const router = express.Router();

router.get('/', getPolicy);              // GET privacy policy
router.post('/update', updatePolicy);    // POST update privacy policy
router.delete('/', deletePolicy);       // DELETE privacy policy (optional)

export default router;
