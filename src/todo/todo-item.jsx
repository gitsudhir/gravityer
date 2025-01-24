function TodoItem({ todo, handleDeleteTodo }) {
  return (
    <li key={todo.id}>
      {todo.todo}
      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
