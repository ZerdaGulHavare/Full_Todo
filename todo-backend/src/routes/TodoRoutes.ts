// src/routes/TodoRoutes.ts
import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';

const router = Router();
const todoController = new TodoController();

// Routes
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
