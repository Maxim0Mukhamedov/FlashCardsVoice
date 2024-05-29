import React from 'react';
import {FolderItemList} from '../components/FolderItemList';
import {AddFolder} from '../components/AddFolder';

export const FolderList = (props) => {
  const { items, onAdd, toTask, delFol } = props;
  return (
    <main className="folders-list-container">
      <AddFolder
        onAdd = { onAdd }
      />
     {items.length >= 1 ? <FolderItemList
        items  = { items.filter(({title}) => title !== null) }
        toTask = { toTask }
        delFol = { delFol }
      /> : null} 
    </main>
  )
}