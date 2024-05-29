import React from "react";

import {TaskItem} from './TaskItem';
import "../App.css";


export const TaskItemList = (props) => {
  const { items, delTask} = props
  return (
    <ul className="notes">
      {
        items.map((item, index) => (
          <TaskItem
            item   = { item }
            index  = { index }
            delTask = { () => delTask(item) }
          />
        ))
      }
    </ul>
  )
}


