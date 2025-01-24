import TodoItem from "./todo-item";
function TodoList({ todos, handleDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} handleDeleteTodo={handleDeleteTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
