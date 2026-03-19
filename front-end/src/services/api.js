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
    return res.json();
}

export async function createTask(title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ title })
    });
    return res.json();
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
}

export async function toggleTask(id) {
    await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });
}

export async function updateTask(id, title) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ title })
    });
}
