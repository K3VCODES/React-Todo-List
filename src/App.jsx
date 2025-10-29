import { useEffect, useMemo, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "todo.items.v1";

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const remaining = useMemo(
    () => items.filter((t) => !t.completed).length,
    [items]
  );

  const filtered = useMemo(() => {
    let list = items;
    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [items, filter, query]);

  function addItem(title) {
    const newItem = {
      id: crypto.randomUUID?.() || `${Date.now()}_${Math.random()}`,
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
  }

  function toggleItem(id) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  function editItem(id, title) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function clearCompleted() {
    setItems((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="container vstack">
      <div className="header">
        <div>
          <div className="title">To-Do List</div>
          <div className="muted">
            {remaining} item{remaining !== 1 ? "s" : ""} left
          </div>
        </div>
        <div className="hstack">
          <button
            className={`btn-ghost ${filter === "all" ? "badge" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn-ghost ${filter === "active" ? "badge" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn-ghost ${filter === "completed" ? "badge" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button className="btn-danger" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>

      <TodoInput onAdd={addItem} query={query} onQueryChange={setQuery} />

      {filtered.length === 0 ? (
        <div className="empty">No tasks yet. Add one above ✨</div>
      ) : (
        <TodoList
          items={filtered}
          onToggle={toggleItem}
          onDelete={deleteItem}
          onEdit={editItem}
        />
      )}
    </div>
  );
}
