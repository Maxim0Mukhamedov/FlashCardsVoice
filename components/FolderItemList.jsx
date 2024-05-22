import React from "react";

import {FolderItem} from './FolderItem';
import "../App.css";


export const FolderItemList = (props) => {
  const { items, toTask } = props
  return (
    <ul className="folder-list">
      {
        items.map((item, index) => (
          <FolderItem
            item   = { item }
            index  = { index }
            toTask = {() => toTask(item)} 
          />
        ))
      }
    </ul>
  )
}
