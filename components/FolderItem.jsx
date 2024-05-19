import React from "react";

import "../App.css";


export const FolderItem = (props) => {
  const { item, index, toTask } = props;
  return (
    <li
      className = "folder-item"
    >
      <span>
        <span
          style = {{ fontWeight: "bold" }}
        >{index + 1}. </span>
        <span
          style = {{ textDecorationLine: item.completed ? "line-through" : "none", }}
        >
          {item.title}
        </span>
      </span>
      <input
        className = "link-i"
        type      = "button"
        value     = "+"
        onClick  = {(event) => toTask(item)}
        //checked   = {item.completed}
        //onChange  = {(event) => onDone(item) }
      />
    </li>
  )
}