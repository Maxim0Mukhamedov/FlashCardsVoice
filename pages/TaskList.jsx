import React from 'react';
import {AddTask} from '../components/AddTask';
import {TaskItemList} from '../components/TaskItemList';

export const TaskList = (props) => {
  const { items, onAdd, onDone, curFolder } = props;
  return (
    <main className="container">
      <span>{curFolder.title}</span>
      <AddTask
        onAdd = { onAdd }
      />
      <TaskItemList
        items  = { items.filter(({folder}) => folder === curFolder.title) }
        // items = { items }
        onDone = { onDone }
        curFolder = { curFolder }
      />
    </main>
  )
}
