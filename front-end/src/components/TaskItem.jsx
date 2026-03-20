import { useState } from "react";
import { deleteTask, toggleTask, updateTask } from "../services/api";

function TaskItem({ task, loadTasks, showToast }) {
    const [confirming, setConfirming] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    async function handleToggle() {
        try {
            await toggleTask(task.id);
            loadTasks();
        } catch {
            showToast("Erro ao atualizar tarefa.", "error");
        }
    }

    async function handleDelete() {
        if (!confirming) { setConfirming(true); return; }
        try {
            await deleteTask(task.id);
            loadTasks();
            showToast("Tarefa deletada!");
        } catch {
            showToast("Erro ao deletar tarefa.", "error");
        }
    }

    async function handleEdit() {
        if (editValue.trim().length < 3) return;
        try {
            await updateTask(task.id, editValue.trim());
            setEditing(false);
            loadTasks();
            showToast("Tarefa atualizada!");
        } catch {
            showToast("Erro ao atualizar tarefa.", "error");
        }
    }

    return (
        <div className={`flex items-center justify-between rounded-lg mb-1.5 py-2.5 px-4 transition-all group ${
            task.completed
                ? "bg-slate-800/30 border border-slate-700/30 opacity-55"
                : "bg-slate-800 border border-slate-700/60 border-l-2 border-l-purple-500 shadow-sm hover:shadow-md hover:border-slate-600"
        }`}>
            <input
                type="checkbox"
                checked={task.completed}
                className="mr-3 accent-purple-500 cursor-pointer flex-shrink-0"
                onChange={handleToggle}
            />
            {editing ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:items-center">
                    <input
                        className="flex-1 bg-slate-600 border border-purple-500 rounded px-2 py-1 text-sm text-white focus:outline-none"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") handleEdit();
                            if (e.key === "Escape") { setEditing(false); setEditValue(task.title); }
                        }}
                        autoFocus
                    />
                    <div className="flex gap-1.5">
                        <button 
                            className="flex-1 sm:flex-none px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded transition-colors"
                            onClick={handleEdit}
                        >
                            Salvar
                        </button>
                        <button 
                            className="flex-1 sm:flex-none px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium rounded transition-colors"
                            onClick={() => { setEditing(false); setEditValue(task.title); }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <span
                        className={`flex-1 font-medium text-base ${
                            task.completed ? "line-through text-slate-500" : "text-white sm:cursor-pointer"
                        }`}
                        onDoubleClick={() => { if (!task.completed) setEditing(true); }}
                        title={task.completed ? "" : "Clique duplo para editar"}
                    >
                        {task.title}
                    </span>
                    <div className="flex gap-1.5 sm:gap-2 ml-3">
                        {confirming ? (
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 border border-red-500/40 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                                <span className="hidden sm:inline text-slate-400 text-xs mr-1">Deletar?</span>
                                <button
                                    className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded transition-colors"
                                    onClick={handleDelete}
                                >
                                    Confirmar
                                </button>
                                <button
                                    className="bg-slate-600 hover:bg-slate-500 text-slate-200 text-xs font-medium px-2 sm:px-3 py-1 rounded transition-colors"
                                    onClick={() => setConfirming(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="px-2 sm:px-3 py-1 text-xs font-medium text-slate-400 sm:text-slate-600 hover:text-red-400 border border-transparent hover:border-red-500/30 hover:bg-red-500/10 rounded transition-all sm:opacity-0 sm:group-hover:opacity-100" 
                                onClick={handleDelete}
                            >
                                Deletar
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskItem;
