import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, onDone } = props;
  return (
    <li
      className = "task-item"
    >
      <span>
     <details className = "card">
        <summary className = "question">{item.title}</summary>
        <p className = "answer">{item.ans}</p>
      </details> 
      </span>
{/*      <input
        className = "done-item"
        type      = "checkbox"
        checked   = {item.completed}
        onChange  = {(event) => onDone(item) }
      />*/}
    </li>
  )
}


