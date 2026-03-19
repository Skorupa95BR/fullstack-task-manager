import { useState } from "react";

function Login ({ onLogin, onGoToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://task-manager-api-ccfp.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Credenciais inválidas.");
                return;
            }

            localStorage.setItem("token", data.token);
            onLogin();
        } catch {
            setError("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-slate-800 rounded-xl shadow-2xl p-8 text-white">
                <h1 className="text-center text-3xl font-extrabold mb-1 tracking-tight">
                    <span className="text-white">Task </span>
                    <span className="text-purple-400">Manager</span>
                </h1>
                <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-8 font-medium">
                    faça login para continuar
                </p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                            E-mail
                        </label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    <p className="text-center text-slate-500 text-sm mt-1">
                        Não tem uma conta?{" "}
                        <button
                            type="button"
                            onClick={onGoToRegister}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Criar conta
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;