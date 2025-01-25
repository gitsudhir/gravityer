import TodoItem from "./todo-item";
function TodoList({ todos, handleDeleteTodo ,onChange}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} onChange={onChange} />
      ))}
    </ul>
  );
}

export default TodoList;
