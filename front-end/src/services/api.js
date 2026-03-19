const API_URL = process.env.REACT_APP_API_URL || 'https://task-manager-api-ccfp.onrender.com';

export async function registerUser(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    return res;
}

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders()
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        throw new Error("Erro ao buscar tarefas");
    }
    
    return res.json();
}

export async function createTask(title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ title })
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        throw new Error("Erro ao criar tarefa");
    }
    
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
    
    if (!res.ok && res.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
    }
}

export async function toggleTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        throw new Error("Erro ao alternar tarefa");
    }
}

export async function updateTask(id, title) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ title })
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        throw new Error("Erro ao atualizar tarefa");
    }
}
