import React, { useReducer, useEffect } from "react";
import "./todo.css";
import TodoList from "./todo-list";
import AddTodo from "./add-todo";
import { todoReducer } from './reducer';
// Initial state for the reducer
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  newTodo: "",
  loading: true,
  error: null,
};



function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, newTodo, loading, error } = state;

  // Fetch todos from the API
  useEffect(() => {
    async function fetchTodos() {
      console.log("here => fetch");
      dispatch({ type: "FETCH_TODOS_REQUEST" });
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        dispatch({ type: "FETCH_TODOS_SUCCESS", payload: data.todos });
      } catch (error) {
        dispatch({ type: "FETCH_TODOS_FAILURE", error: error.message });
      }
    }
    console.log("dfd", todos.length);
    if (!todos.length) {
      // Fetch only if local storage is empty
      fetchTodos();
    } else {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        payload: JSON.parse(localStorage.getItem("todos")) || [],
      });
    }
  }, [todos.length]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoObj = { id: Date.now(), todo: newTodo };
      dispatch({ type: "ADD_TODO", payload: newTodoObj });
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  // Handle change in input field
  const handleChange = (e) => {
    dispatch({ type: "SET_NEW_TODO", payload: e.target.value });
  };

  if (loading) {
    return <div>⭕Loading...</div>;
  }

  if (error) {
    return <div>❌Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={handleChange}
        placeholder="Add a new task"
      />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default TodoApp;
