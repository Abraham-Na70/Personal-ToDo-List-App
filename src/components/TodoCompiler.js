import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { EditTL } from "./EditTL";
import { CurrentTime } from "./CurrentTime";

export const TodoCompiler = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { 
        id: uuidv4(), 
        task: todo, 
        completed: false, 
        isEditing: false,
        timestamp: CurrentTime() 
      },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoCompiler">
      <h1>Heads Up!</h1>
      <TodoList addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTL editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo.task}
            timestamp={todo.timestamp}  
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
