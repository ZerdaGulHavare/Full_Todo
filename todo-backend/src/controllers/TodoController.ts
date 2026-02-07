import { Request, Response } from 'express';
import { TodoService } from '../services/TodoService';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    public getTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getAllTodos();
            res.status(200).json({ success: true, data: todos });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }

    public createTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title } = req.body;
            if (!title) {
                res.status(400).json({ success: false, message: "Title is required" });
                return;
            }
            const newTodo = await this.todoService.createTodo(title);
            res.status(201).json({ success: true, data: newTodo });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }

    // GÜNCELLENEN KISIM
    public updateTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { isCompleted, title } = req.body; // Title'ı da alıyoruz artık
            
            const updatedTodo = await this.todoService.updateTodo(id as string, { isCompleted, title });
            
            if (!updatedTodo) {
                res.status(404).json({ success: false, message: "Todo not found" });
                return;
            }
            res.status(200).json({ success: true, data: updatedTodo });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }

    public deleteTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const isDeleted = await this.todoService.deleteTodo(id as string);
            
            if (!isDeleted) {
                res.status(404).json({ success: false, message: "Todo not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
}
