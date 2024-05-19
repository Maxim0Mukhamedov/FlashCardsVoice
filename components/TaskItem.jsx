import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, onDone } = props;
  return (
    <li
      className = "task-item"
    >
      <span>
        <span
          style = {{ fontWeight: "bold" }}
        >{index + 1}. </span>
     <details>
        <summary>{item.title}</summary>
        <p>{item.ans}</p>
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


