import React, { useReducer, useEffect } from "react";
import "./todo.css";
import TodoList from "./todo-list";
import AddTodo from "./add-todo";
import FilterButton from "./filter-button";
import { todoReducer } from "./reducer";
// Initial state for the reducer
const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  loading: true,
  error: null,
};

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, loading, error } = state;

  // Fetch todos from the API
  useEffect(() => {
    async function fetchTodos() {
      dispatch({ type: "FETCH_TODOS_REQUEST" });
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        dispatch({ type: "FETCH_TODOS_SUCCESS", payload: data.todos });
      } catch (error) {
        dispatch({ type: "FETCH_TODOS_FAILURE", error: error.message });
      }
    }
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
  const handleAddTodo = (newTodo) => {
    if (newTodo.trim()) {
      const newTodoObj = { id: Date.now(), todo: newTodo };
      dispatch({ type: "ADD_TODO", payload: newTodoObj });
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  const handleChange = (id, newCompletedValue) => {
    const updateTodoObj = { id, newCompletedValue };
    dispatch({ type: "UPDATE_TODO", payload: updateTodoObj });
  };
  // Handle filter a todo
  const handleFilter = (isDone) => {
    dispatch({ type: "FILTER_TODO", isDone });
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

      <AddTodo handleAddTodo={handleAddTodo} />
      <hr />
      <FilterButton
        isDone={true}
        isActive={todos.every((v) => v.completed === true)}
        value={"Completed"}
        handleFilter={handleFilter}
      />
      <FilterButton
        isDone={false}
        isActive={todos.every((v) => v.completed === false)}
        value={"Pending"}
        handleFilter={handleFilter}
      />
      <FilterButton
        isDone={null}
        isActive={
          todos.some((v) => v.completed === true) &&
          todos.some((v) => v.completed === false)
        }
        value={"All"}
        handleFilter={handleFilter}
      />
      <hr />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        onChange={handleChange}
      />
    </div>
  );
}

export default TodoApp;
