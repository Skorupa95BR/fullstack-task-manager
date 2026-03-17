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
        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-700/50 hover:bg-slate-700 transition-colors py-2 px-4 rounded mb-1">
            <input
                type="checkbox"
                checked={task.completed}
                className="mr-3 accent-purple-500 cursor-pointer"
                onChange={handleToggle}
            />
            {editing ? (
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
            ) : (
                <span
                    className={`flex-1 font-medium text-base ${
                        task.completed ? "line-through text-slate-500" : "text-white cursor-pointer"
                    }`}
                    onDoubleClick={() => { if (!task.completed) setEditing(true); }}
                    title={task.completed ? "" : "Clique duplo para editar"}
                >
                    {task.title}
                </span>
            )}
            <div className="flex gap-2 ml-3">
                {editing ? (
                    <>
                        <button className="px-2 py-1 text-green-400 hover:text-green-300 text-sm" onClick={handleEdit}>Salvar</button>
                        <button className="px-2 py-1 text-slate-400 hover:text-slate-300 text-sm" onClick={() => { setEditing(false); setEditValue(task.title); }}>Cancelar</button>
                    </>
                ) : confirming ? (
                    <>
                        <button className="px-2 py-1 text-red-400 hover:text-red-300 text-sm font-medium" onClick={handleDelete}>Confirmar</button>
                        <button className="px-2 py-1 text-slate-400 hover:text-slate-300 text-sm" onClick={() => setConfirming(false)}>Cancelar</button>
                    </>
                ) : (
                    <button className="px-2 py-1 text-red-400 hover:text-red-300 text-sm" onClick={handleDelete}>Deletar</button>
                )}
            </div>
        </div>
    );
}

export default TaskItem;
