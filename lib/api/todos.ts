import api from "../axios";

export async function getTodos() {
  const res = await api.get("/todos");
  return res.data;
}

export async function getTodoById(id: string) {
  const res = await api.get(`/todos/${id}`);
  return res.data;
}

export async function createTodo(todo: { title: string; completed: boolean }) {
  const res = await api.post("/todos", todo);
  return res.data;
}

export async function updateTodo(id: string, todo: Partial<{ title: string; completed: boolean }>) {
  const res = await api.put(`/todos/${id}`, todo);
  return res.data;
}

export async function deleteTodo(id: string) {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
}

export async function deleteAllTodos() {
  const res = await api.delete("/todos");
  return res.data;
}
