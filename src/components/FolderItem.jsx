import React from "react";

import "../App.css";


export const FolderItem = (props) => {
  const { item, index, toTask, delFol } = props;
  return (
    <li
      className = "folder-item"
    >
      <span>
        <span
          class = "folder-title"
        >
          {item.title}
        </span>
      </span>
      <input
        className = "to-folder-button"
        type      = "button"
        value     = "+"
        onClick  = {(event) => toTask(item)}
        //checked   = {item.completed}
        //onChange  = {(event) => onDone(item) }
      />
      <input
        className = "delete-folder-button"
        type      = "button"
        value     = "x"
        onClick  = {(event) => delFol(item)}
        //checked   = {item.completed}
        //onChange  = {(event) => onDone(item) }
      />
    </li>
  )
}