import React from "react";
import "../App.css";
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';


export const CardItem = (props) => {
  const { item, index, delCard } = props;
  const [sectionPropss] = useSection('sectionTask' + item.id);
  return (
    <div {...sectionPropss} className="question-card">
      <details className="spoiler">
          <summary class="sn-section-item summary-s">
            <span class="summary-title">{item.title}</span>
                  <input
          className = "sn-section-item del-task-button"
          type      = "button"
          value     = "x"
          onClick  = {(event) => delCard(item) }
      />
          </summary>
          <div class="summary-content">
            {item.ans}
          </div>
      </details>

    </div>
  )
}


