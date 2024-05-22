import React from 'react';
import {FolderItemList} from '../components/FolderItemList';
import {AddFolder} from '../components/AddFolder';

export const FolderList = (props) => {
  const { items, onAdd, toTask } = props;
  return (
    <main className="container">
      <AddFolder
        onAdd = { onAdd }
      />
     {items[0].title !== null ? <FolderItemList
        items  = { items }
        toTask = { toTask }
      /> : null} 
    </main>
  )
}