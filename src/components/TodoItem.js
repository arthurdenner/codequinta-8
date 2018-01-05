import React from 'react';
import './TodoItem.css';

const TodoItem = ({ idx, onDelete, todo }) => (
  <div className="container">
    <button onClick={() => onDelete(todo.id)}>Delete</button>
    <div className="index">#{idx + 1}</div>
    {todo.text}
  </div>
);

export default TodoItem;
