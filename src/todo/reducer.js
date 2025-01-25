// Reducer function
export function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TODOS_SUCCESS":
      localStorage.setItem("todos", JSON.stringify(action.payload)); // Persist to localStorage
      return { ...state, todos: action.payload, loading: false };
    case "FETCH_TODOS_FAILURE":
      return { ...state, error: action.error, loading: false };
    case "ADD_TODO":
      const updatedTodosAdd = [...state.todos, action.payload];
      localStorage.setItem("todos", JSON.stringify(updatedTodosAdd)); // Persist to localStorage
      return { ...state, todos: updatedTodosAdd, newTodo: "" };

    case "DELETE_TODO":
      const updatedTodosDelete = state.todos.filter(
        (todo) => todo.id !== action.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodosDelete)); // Persist to localStorage
      return { ...state, todos: updatedTodosDelete };

    case "UPDATE_TODO":
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.newCompletedValue }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Persist to localStorage
      return { ...state, todos: updatedTodos };

    case "FILTER_TODO":
      if (action.isDone === null) {
        // null for all
        const updatedTodosDelete = state.todos.filter(
          (todo) => "completed" in todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosDelete)); // Persist to localStorage
        return { ...state, todos: updatedTodosDelete };
      } else {
        const updatedTodosDelete = state.todos.filter(
          (todo) => todo.completed === action.isDone
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodosDelete)); // Persist to localStorage
        return { ...state, todos: updatedTodosDelete };
      }

    case "SET_NEW_TODO":
      return { ...state, newTodo: action.payload };

    default:
      return state;
  }
}
