import express from 'express';
const router = express.Router();
import {
	getAllUsers,
	createUser,
	getUserById,
} from '../controllers/users_controller.js';

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.post('/', createUser);
export default router;
