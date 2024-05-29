import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, delTask } = props;
  return (
    <>
    <div className="question-card">
      <details className="spoiler">
          <summary class="summary-s">
            <span class="summary-title">{item.title}</span>
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
    </div>
    </>
  )
}


