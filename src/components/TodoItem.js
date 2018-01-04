import React from 'react';
import './TodoItem.css';

const TodoItem = ({ idx, todo }) => (
  <div className="container">
    <div className="index">#{idx + 1}</div>
    {todo.text}
  </div>
);

export default TodoItem;
