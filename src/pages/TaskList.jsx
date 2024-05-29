import React from 'react';
import {AddTask} from '../components/AddTask';
import {TaskItemList} from '../components/TaskItemList';
import {TaskItemPlay} from '../components/TaskItemPlay';

export const TaskList = (props) => {
  const { items, onAdd, delTask, curFolder } = props;
  return (
    <main className="task-list-container">

      <span className = "cur-folder"><span style={{color: '#45830a'}}>[salute@flash-cards</span> <span style={{color: '#3465a4'}}>{curFolder.title}</span><span style={{color: '#45830a'}}>]$</span> ls -altr</span>
            { items.filter(({folder}) => folder === curFolder.title).length > 0 ?<TaskItemPlay
        items = { items.filter(({folder}) => folder === curFolder.title) }
      /> : null }
      <AddTask
        onAdd = { onAdd }
      />
      <TaskItemList className="card-play"
        items  = { items.filter(({folder}) => folder === curFolder.title) }
        delTask = { delTask }
      />

    </main>
  )
}
