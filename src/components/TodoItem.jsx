import { useState } from "react";

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.title);

  function save() {
    const t = draft.trim();
    if (!t) return;
    onEdit(t);
    setIsEditing(false);
  }

  return (
    <div className="item">
      <input
        className="checkbox"
        type="checkbox"
        checked={item.completed}
        onChange={onToggle}
        aria-label={item.completed ? "Mark as active" : "Mark as completed"}
      />

      {isEditing ? (
        <input
          className="inline-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setDraft(item.title);
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <div className={`item-title ${item.completed ? "done" : ""}`}>
          {item.title}
        </div>
      )}

      <div className="item-actions">
        {isEditing ? (
          <>
            <button className="btn-success" onClick={save}>
              Save
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                setDraft(item.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-danger" onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
