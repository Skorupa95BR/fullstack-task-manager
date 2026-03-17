import { useState, useRef } from "react";

function TaskForm({ title, setTitle, onSubmit }) {
    const [warning, setWarning] = useState(false);
    const warningTimer = useRef(null);

    const handleChange = (e) => {
        const raw = e.target.value;
        if (/[0-9]/.test(raw)) {
            clearTimeout(warningTimer.current);
            setWarning(true);
            warningTimer.current = setTimeout(() => setWarning(false), 2500);
        }
        const value = raw.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        setTitle(value);
    };

    return (
        <form className="flex flex-col gap-1 mt-4" onSubmit={onSubmit}>
            <div className="flex gap-2">
                <input
                    className={`flex-1 bg-slate-900/60 border rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        warning
                            ? "border-yellow-400 focus:ring-yellow-400"
                            : "border-slate-700 focus:ring-purple-500 focus:border-purple-500/50"
                    }`}
                    value={title}
                    onChange={handleChange}
                    placeholder="Nova tarefa (somente letras)"
                />
                <button
                    className={`bg-purple-600 text-white rounded-lg px-4 sm:px-5 py-2 font-semibold transition-all min-w-[90px] sm:min-w-[110px] ${
                        title.length < 3
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-purple-500 shadow-md shadow-purple-900/50 hover:shadow-lg hover:shadow-purple-900/60'
                    }`}
                    type="submit"
                    disabled={title.length < 3}
                >
                    Adicionar
                </button>
            </div>
            {warning && (
                <p className="text-yellow-400 text-sm animate-pulse">
                    ⚠️ Apenas letras são permitidas. Números não são aceitos.
                </p>
            )}
        </form>
    );
}

export default TaskForm;
