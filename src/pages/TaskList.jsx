import React from 'react';
import {AddTask} from '../components/AddTask';
import {TaskItemList} from '../components/TaskItemList';
import {TaskItemPlay} from '../components/TaskItemPlay';

export const TaskList = (props) => {
  const { items, onAdd, delTask, curFolder } = props;
  return (
    <main className="task-list-container">

      <span className = "cur-folder">Текущая папка: {curFolder.title}</span>
      <AddTask
        onAdd = { onAdd }
      />
            { items.filter(({folder}) => folder === curFolder.title).length > 0 ?<TaskItemPlay
        items = { items.filter(({folder}) => folder === curFolder.title) }
      /> : null }
      <TaskItemList className="card-play"
        items  = { items.filter(({folder}) => folder === curFolder.title) }
        delTask = { delTask }
      />

    </main>
  )
}
