import { Todo } from "../models/Todo";

export class TodoService {

    public async getAllTodos() {
        return await Todo.findAll({
            order: [['createdAt', 'DESC']]
        });
    }

    public async createTodo(title: string) {
        return await Todo.create({ title });
    }

    // GÜNCELLENEN KISIM: Hem başlık hem durum güncellenebilir
    public async updateTodo(id: string, updates: { title?: string, isCompleted?: boolean }) {
        const todo = await Todo.findByPk(parseInt(id));
        
        if (!todo) return null;

        if (updates.isCompleted !== undefined) todo.isCompleted = updates.isCompleted;
        if (updates.title !== undefined) todo.title = updates.title;
        
        return await todo.save();
    }

    public async deleteTodo(id: string) {
        const result = await Todo.destroy({
            where: { id: parseInt(id) }
        });
        return result > 0;
    }
}
