import React from "react";
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';

import "../App.css";


export const FolderItem = (props) => {
  const { item, index, toFolder, delFol, curFolder } = props;
  const [sectionProps] = useSection('sectionFoldersList' + item.id);
  const classname = "sn-section-item folder-title" + (curFolder.id == item.id ? " cur-folder-item" : "");
  return (
          <div {...sectionProps}>
    <li className = "folder-item">
      <button
        id={item.id}
        className = {classname}
        onClick = {(event) => toFolder(item)}
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