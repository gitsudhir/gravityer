function TodoItem({ todo, handleDeleteTodo, onChange }) {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onChange(todo.id, !todo.completed)}
      />
      {todo.todo}
      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
