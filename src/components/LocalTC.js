import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';
import { Todo } from './Todo';
import { EditTL } from './EditTL';
import {CurrentTime} from './CurrentTime'; // Import the CurrentTime component

export const LocalTC = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className='TodoCompiler'>
            <h1>Get Things Done!</h1>
            <CurrentTime /> {/* Display the current time */}
            <TodoList addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTL editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo
                        task={todo}
                        key={todo.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    );
};
