import { useEffect, useState } from "react";
import { getTasks, createTask } from "./services/api";

import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("all");
    const [toast, setToast] = useState(null);

    function showToast(message, type = "success") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function loadTasks() {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch {
            showToast("Erro ao carregar tarefas.", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    function getFilteredTasks() {
        const sorted = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        if (filter === "pending") return sorted.filter(t => !t.completed);
        if (filter === "completed") return sorted.filter(t => t.completed);
        return sorted;
    }

    const filtered = getFilteredTasks();
    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-slate-900 flex items-start justify-center pt-10 px-4">
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
                    toast.type === "error" ? "bg-red-500" : "bg-green-500"
                }`}>
                    {toast.message}
                </div>
            )}
            <div className="w-full max-w-xl bg-slate-800 shadow-2xl rounded-xl p-6 text-white">
                <h1 className="text-center text-2xl font-bold mb-1 text-purple-300">Task Manager</h1>
                <p className="text-center text-slate-400 text-sm mb-4">
                    {tasks.length === 0
                        ? "Nenhuma tarefa"
                        : `${completedCount} de ${tasks.length} concluída${completedCount !== 1 ? "s" : ""}`}
                </p>

                <div className="flex gap-2 mb-4 justify-center">
                    {["all", "pending", "completed"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                filter === f
                                    ? "bg-purple-600 text-white"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                        >
                            {f === "all" ? "Todas" : f === "pending" ? "Pendentes" : "Concluídas"}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-center text-slate-400 mb-4">Carregando tarefas...</p>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-slate-500 mb-4">
                        {filter === "all" ? "Nenhuma tarefa encontrada." : "Nenhuma tarefa nessa categoria."}
                    </p>
                ) : (
                    filtered.map(task => (
                        <TaskItem key={task.id} task={task} loadTasks={loadTasks} showToast={showToast} />
                    ))
                )}

                <TaskForm
                    title={title}
                    setTitle={setTitle}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            await createTask(title);
                            setTitle("");
                            loadTasks();
                            showToast("Tarefa adicionada!");
                        } catch {
                            showToast("Erro ao adicionar tarefa.", "error");
                        }
                    }}
                />
                {title.length > 0 && title.length < 3 && (
                    <p className="text-red-400 text-sm mt-1">Digite no mínimo 3 caracteres</p>
                )}
            </div>
        </div>
    );
}

export default App;
