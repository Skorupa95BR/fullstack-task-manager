function TaskForm({ title, setTitle, onSubmit }) {
    return (
        <form className="flex flex-col gap-1 mt-4" onSubmit={onSubmit}>
            <div className="flex gap-2">
                <input
                    className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nova tarefa"
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
        </form>
    );
}

export default TaskForm;
