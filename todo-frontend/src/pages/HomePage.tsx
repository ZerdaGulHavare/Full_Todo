import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITodo } from '../interfaces/ITodo';
// Yeni ikonları ekledik: FaEdit (Kalem), FaSave (Kaydet), FaTimes (İptal)
import { FaTrash, FaCheck, FaPlus, FaUndo, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const API_URL = "http://localhost:3000/api/todos";

const HomePage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  
  // DÜZENLEME İÇİN YENİ STATE'LER
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.success) setTodos(response.data.data);
    } catch (error) { console.error("Hata:", error); }
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    try {
      const response = await axios.post(API_URL, { title: newTodoTitle });
      if (response.data.success) {
        setTodos([response.data.data, ...todos]);
        setNewTodoTitle("");
      }
    } catch (error) { console.error("Ekleme hatası:", error); }
  };

  // TAMAMLANDI / TAMAMLANMADI GÜNCELLEMESİ
  const handleToggleStatus = async (todo: ITodo) => {
    try {
      const response = await axios.put(`${API_URL}/${todo.id}`, { isCompleted: !todo.isCompleted });
      if (response.data.success) {
        setTodos(todos.map(t => (t.id === todo.id ? response.data.data : t)));
      }
    } catch (error) { console.error("Status hatası:", error); }
  };

  // METİN GÜNCELLEME İŞLEMİ (BAŞLIK DEĞİŞTİRME)
  const startEditing = (todo: ITodo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = async (id: number) => {
    if (!editTitle.trim()) return;
    try {
      const response = await axios.put(`${API_URL}/${id}`, { title: editTitle });
      if (response.data.success) {
        setTodos(todos.map(t => (t.id === id ? response.data.data : t)));
        setEditingId(null);
      }
    } catch (error) { console.error("Edit hatası:", error); }
  };

  const handleDeleteTodo = async (id: number) => {
    if(!confirm("Silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) { console.error("Silme hatası:", error); }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🚀 Todo App</h1>

        {/* Ekleme Formu */}
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Yeni görev ekle..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
            <FaPlus />
          </button>
        </form>

        {/* Liste */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className={`flex justify-between items-center p-4 rounded-lg border ${todo.isCompleted ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}>
              
              {/* DÜZENLEME MODU KONTROLÜ */}
              {editingId === todo.id ? (
                // Düzenleme Modu Görünümü
                <div className="flex flex-1 gap-2">
                    <input 
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 border-b-2 border-blue-500 focus:outline-none px-1"
                        autoFocus
                    />
                    <button onClick={() => saveEdit(todo.id)} className="text-green-600 hover:text-green-800"><FaSave /></button>
                    <button onClick={cancelEditing} className="text-red-500 hover:text-red-700"><FaTimes /></button>
                </div>
              ) : (
                // Normal Görünüm
                <>
                    <div onClick={() => handleToggleStatus(todo)} className="flex items-center gap-3 cursor-pointer flex-1 select-none">
                        <div className={`text-xl ${todo.isCompleted ? "text-green-600" : "text-gray-400"}`}>
                            {todo.isCompleted ? <FaCheck /> : <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>}
                        </div>
                        <span className={`text-lg ${todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                            {todo.title}
                        </span>
                    </div>

                    <div className="flex gap-2 ml-2">
                        {/* Düzenle Butonu */}
                        {!todo.isCompleted && (
                            <button onClick={() => startEditing(todo)} className="text-blue-500 hover:text-blue-700 p-2" title="Düzenle">
                                <FaEdit />
                            </button>
                        )}
                        
                            <button 
                                onClick={() => handleToggleStatus(todo)} 
                                className={`p-2 rounded-full transition-colors ${
                                    todo.isCompleted 
                                        ? "text-orange-500 hover:bg-orange-50" 
                                        : "text-green-500 hover:bg-green-50"
                                }`}
                                title={todo.isCompleted ? "Geri Al" : "Tamamla"}
                            >
                                {todo.isCompleted ? (
                                    <FaUndo className="text-sm" />
                                ) : (
                                    <FaCheck className="text-sm" />
                                )}
                            </button>
                        
                        <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-400 hover:text-red-600 p-2" title="Sil">
                            <FaTrash />
                        </button>
                    </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
