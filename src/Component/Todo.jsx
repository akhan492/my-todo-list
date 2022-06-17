import React from "react";
import { useState, useEffect,useRef } from "react";
import { motion } from "framer-motion";
// let globalId =new Date().getTime().toString();
// let globalId = 0;
export default function Todo() {
    const inputRef = useRef();
  //local Storage
  let [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

  const [input, setInput] = useState("");
  //   const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const addtodo = () => {
    if (editItem) {
      const updated = todos.map((todo) =>
        todo.id === editItem ? { ...todo, task: input } : todo
      );
      setTodos(updated);
      setIsEdit(true);
      setEditItem(null);
      setInput("");
    } else if (input !== "") {
      setInput("");
      setTodos([
        ...todos,
        { id: new Date().getTime().toString(), task: input },
      ]);
    }
  };
  const removeTodo = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
  };
  const editTodo = (id) => {
    inputRef.current.focus();
    const editTodo = todos.find((todo) => todo.id === id);
    setInput(editTodo.task);
    setIsEdit(false);
    setEditItem(id);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
    <h1 className="todo-heading">Add your todo</h1>
      <div className="todo-list">
        <div className="container">
          <input
            type="text"
            ref={inputRef}
            className="todo-input"
            placeholder="Add your todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="button" onClick={addtodo}>
            {isEdit ? "Add" : "Update"}
          </button>
            </div>
          <ul>
            {todos.map((todo) => {
              return (
                <motion.div key={todo.id} className="list-items" initial={{y:"-100vh"}}
                animate={{y:0}}
                transition={{delay:.5, duration:.5}} 

                >
                <li  className="col-1">
                  {todo.task}
                </li>
                  <div className="button-container col-1">
                      <button
                        className="todo-button"
                        onClick={() => removeTodo(todo.id)}
                      >
                        {" "}
                        Delete
                      </button>
                      <button
                        className="todo-button"
                        onClick={() => editTodo(todo.id)}
                      >
                        {" "}
                        Edit
                      </button>
                  </div>
                  </motion.div>
              );
            })}
          </ul>
      </div>
    </>
  );
}
