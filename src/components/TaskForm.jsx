function TaskForm({ title, setTitle, onSubmit }) {
    const handleChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ]/g, "");
        setTitle(value);
    };

    return (
        <form className="flex gap-2 mt-4" onSubmit={onSubmit}>
            <input
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={title}
                onChange={handleChange}
                placeholder="Nova tarefa"
            />
            <button
                className={`bg-purple-600 text-white rounded px-4 py-2 font-medium hover:bg-purple-700 transition-colors min-w-[100px] ${
                    title.length < 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={title.length < 3}
            >
                Adicionar
            </button>
        </form>
    );
}

export default TaskForm;
