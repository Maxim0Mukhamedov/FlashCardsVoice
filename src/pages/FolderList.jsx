import React from 'react';
import {FolderItemList} from '../components/FolderItemList';
import {AddFolder} from '../components/AddFolder';
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';

export const FolderList = (props) => {
  const { items, onAdd, toTask, delFol } = props;
  useSpatnavInitialization();
  const [sectionProps] = useSection('sectionFolder');
  return (
    <main className="folders-list-container">
    <div {...sectionProps}>
      <AddFolder
        onAdd = { onAdd }
      />
    </div>
     {items.length >= 1 ? <FolderItemList
        items  = { items.filter(({title}) => title !== null) }
        toTask = { toTask }
        delFol = { delFol }
      /> : null} 
    </main>
  )
}