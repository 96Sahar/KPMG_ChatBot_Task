import express from 'express';
const router = express.Router();
import usersController from '../controllers/users_controller';

router.get('/', usersController.getAll);
router.get('/:id', usersController.getItemById);
router.post('/', usersController.createItem);
router.delete('/:id', usersController.deleteItem);

export default router;
