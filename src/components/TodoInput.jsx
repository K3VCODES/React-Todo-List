import { useState } from "react";

export default function TodoInput({ onAdd, query, onQueryChange }) {
  const [title, setTitle] = useState("");

  function submit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t);
    setTitle("");
  }

  return (
    <div className="vstack" style={{ gap: 8 }}>
      <form onSubmit={submit} className="hstack">
        <input
          type="text"
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Task title"
        />
        <button className="btn-primary" type="submit">
          Add
        </button>
      </form>

      <div className="hstack">
        <input
          type="search"
          placeholder="Search tasks…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search"
        />
        <button
          className="btn-ghost"
          type="button"
          onClick={() => onQueryChange("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
