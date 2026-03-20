import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function handleEmailChange(e) {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError("E-mail inválido");
        } else {
            setEmailError("");
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        
        if (!validateEmail(email)) {
            setEmailError("Por favor, insira um e-mail válido");
            return;
        }
        
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
            navigate("/tasks");
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
            navigate("/tasks");
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

                {/* Botão Demo em destaque */}
                <button
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full mb-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {loading ? "Entrando..." : "Demonstração"}
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
                            onChange={handleEmailChange}
                            onBlur={() => email && !validateEmail(email) && setEmailError("E-mail inválido")}
                            required
                            className={`bg-slate-900/60 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                                emailError ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-purple-500"
                            }`}
                        />
                        {emailError && (
                            <p className="text-red-400 text-xs mt-1">{emailError}</p>
                        )}
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
                            onClick={() => navigate("/register")}
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