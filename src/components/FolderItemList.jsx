import React from "react";

import {FolderItem} from './FolderItem';
import "../App.css";


export const FolderItemList = (props) => {
  const { items, toFolder, delFol, curFolder } = props
  return (
    <ul className="folder-list">
      {
        items.map((item, index) => (
          <FolderItem
            item   = { item }
            index  = { index }
            toFolder = {() => toFolder(item)} 
            delFol = {() => delFol(item)}
            curFolder = { curFolder }
          />
        ))
      }
    </ul>
  )
}
