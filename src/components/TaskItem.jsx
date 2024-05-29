import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, delTask } = props;
  return (
    <>
    <details>
        <summary class="summary-s">
          <span class="summary-title">{item.title}</span>
          <div class="summary-chevron-up">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </summary>
        <div class="summary-content">
          {item.ans}
        </div>
    </details>
    <input
        className = "del-task-button"
        type      = "button"
        value     = "x"
        onClick  = {(event) => delTask(item) }
    />
    </>
  )
}


