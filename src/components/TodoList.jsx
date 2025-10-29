import TodoItem from "./TodoItem";

export default function TodoList({ items, onToggle, onDelete, onEdit }) {
  return (
    <div className="list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
          onEdit={(title) => onEdit(item.id, title)}
        />
      ))}
    </div>
  );
}
