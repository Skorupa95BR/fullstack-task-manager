const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
}

export async function createTask(title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    return res.json();
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
}

export async function toggleTask(id) {
    await fetch(`${API_URL}/tasks/${id}/toggle`, { method: "PATCH" });
}

export async function updateTask(id, title) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
}
