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

    async function handleDemoLogin() {
        setEmail("demo@test.com");
        setPassword("demo123");
        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://task-manager-api-ccfp.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "demo@test.com", password: "demo123" })
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
                {/* Banner Demo */}
                <div className="mb-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-semibold text-purple-300 mb-1">Conta Demo</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                <span className="font-mono bg-slate-900/50 px-1.5 py-0.5 rounded">demo@test.com</span>
                                {" • "}
                                <span className="font-mono bg-slate-900/50 px-1.5 py-0.5 rounded">demo123</span>
                            </p>
                        </div>
                    </div>
                </div>

                <h1 className="text-center text-3xl font-extrabold mb-1 tracking-tight">
                    <span className="text-white">Task </span>
                    <span className="text-purple-400">Manager</span>
                </h1>
                <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-8 font-medium">
                    faça login para continuar
                </p>

                {/* Botão Demo em destaque */}
                <button
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full mb-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {loading ? "Entrando..." : "Entrar como Demo"}
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-slate-800 text-slate-500 uppercase tracking-wider">ou entre manualmente</span>
                    </div>
                </div>

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