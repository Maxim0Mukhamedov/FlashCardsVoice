import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, delTask } = props;
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
      <input
        className = "del-task-button"
        type      = "button"
        value     = "x"
        onClick  = {(event) => delTask(item) }
      />
    </li>
  )
}


