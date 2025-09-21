// backend/src/routes/auth.ts
import { Router } from 'express';
import { register, login, verifyToken } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted', user: (req as any).user });
});

export default router;