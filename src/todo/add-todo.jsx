import { useState } from "react";

function AddTodo({ handleAddTodo }) {
  const [newTask , setNewTask] = useState('');
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={newTask}
        onChange={handleChange}
        placeholder="Add a new task"
      />
      <button onClick={()=>handleAddTodo(newTask)}>➕Add</button>
    </>
  );
}

export default AddTodo;
