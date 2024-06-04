import React from "react";
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';

import "../App.css";


export const FolderItem = (props) => {
  const { item, index, toTask, delFol } = props;
  const [sectionProps] = useSection('sectionFoldersList' + item.id);
  return (
          <div {...sectionProps}>
    <li className = "folder-item">
      <button
        class = "sn-section-item folder-title"
        onClick = {(event) => toTask(item)}
      >
        {item.title}
      </button>
      <input
        className = "sn-section-item delete-folder-button"
        type      = "button"
        value     = "x"
        onClick  = {(event) => delFol(item)}
        tabIndex={1 + index}
      />
    </li>
    </div>
  )
}