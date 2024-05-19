import React from "react";

import {TaskItem} from './TaskItem';
import "../App.css";


export const TaskItemList = (props) => {
  const { items, onDone, curFolder } = props
  return (
    <ul className="notes">
      {
        items.map((item, index) => (
          <TaskItem
            item   = { item }
            index  = { index }
            onDone = { () => onDone(item) }
          />
        ))
      }
    </ul>
  )
}


