import { useCallback, useEffect, useState } from "react";
import { createTask } from "./services/api";

import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import Login from "./components/login";
import Register from "./components/Register";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("all");
    const [toast, setToast] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [screen, setScreen] = useState("login");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            setScreen("login");
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setTasks([]);
    }

    function showToast(message, type = "success") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(Array.isArray(data) ? data : []);
        } catch {
            setTasks([]);
            showToast("Erro ao carregar tarefas.", "error");
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadTasks();
        }
    }, [loadTasks, isAuthenticated]);

    function getFilteredTasks() {
        const sorted = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        if (filter === "pending") return sorted.filter(t => !t.completed);
        if (filter === "completed") return sorted.filter(t => t.completed);
        return sorted;
    }

    const filtered = getFilteredTasks();
    const completedCount = tasks.filter(t => t.completed).length;

    if (!isAuthenticated) {
        if (screen === "register") {
            return <Register onGoToLogin={() => setScreen("login")} />;
        }
        return <Login onLogin={() => setIsAuthenticated(true)} onGoToRegister={() => setScreen("register")} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-slate-900 flex items-start justify-center sm:pt-10 sm:px-4">
            {toast && (
                <div className={`fixed top-0 left-0 right-0 sm:top-4 sm:left-auto sm:right-4 sm:rounded-lg z-50 px-4 py-3 shadow-lg text-white text-sm font-medium transition-all ${
                    toast.type === "error" ? "bg-red-500" : "bg-green-500"
                }`}>
                    {toast.message}
                </div>
            )}
            <div className="w-full max-w-xl bg-slate-800 sm:shadow-2xl sm:rounded-xl p-4 sm:p-6 text-white min-h-screen sm:min-h-0 sm:my-0">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex-1"></div>
                    <h1 className="text-center text-3xl font-extrabold tracking-tight">
                        <span className="text-white">Task </span>
                        <span className="text-purple-400">Manager</span>
                    </h1>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                setIsAuthenticated(false);
                                setScreen("login");
                            }}
                            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
                            title="Sair"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                    {tasks.length === 0
                        ? "nenhuma tarefa"
                        : `${completedCount} de ${tasks.length} concluída${completedCount !== 1 ? "s" : ""}`}
                </p>

                {/* Barra de Progresso */}
                {tasks.length > 0 && (
                    <div className="mb-5">
                        <div className="bg-slate-900/60 rounded-full h-3 overflow-hidden border border-slate-700/50">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-500 ease-out flex items-center justify-end pr-1"
                                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                            >
                                {completedCount > 0 && (
                                    <span className="text-[10px] font-bold text-white drop-shadow">
                                        {Math.round((completedCount / tasks.length) * 100)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-1 mb-6 justify-center bg-slate-900/50 rounded-full p-1 w-fit mx-auto">
                    {["all", "pending", "completed"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                filter === f
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            {f === "all" ? "Todas" : f === "pending" ? "Pendentes" : "Concluídas"}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900/40 rounded-xl p-2 min-h-[56px] mb-4">
                    {loading ? (
                        <p className="text-center text-slate-500 py-4 text-sm">Carregando tarefas...</p>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 gap-2">
                            <span className="text-5xl">😴</span>
                            <p className="text-slate-400 font-medium mt-1">
                                {tasks.length === 0
                                    ? "Nenhuma tarefa ainda"
                                    : filter === "pending"
                                    ? "Nenhuma tarefa pendente"
                                    : "Nenhuma tarefa concluída"}
                            </p>
                            {tasks.length === 0 && (
                                <p className="text-slate-600 text-xs">Adicione sua primeira tarefa abaixo ↓</p>
                            )}
                        </div>
                    ) : (
                        filtered.map(task => (
                            <TaskItem key={task.id} task={task} loadTasks={loadTasks} showToast={showToast} />
                        ))
                    )}
                </div>

                <div className="border-t border-slate-700/60 pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">Nova tarefa</p>
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
        </div>
    );
}

export default App;
