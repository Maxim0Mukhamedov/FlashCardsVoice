import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';

import './App.css';
import { TaskList } from './pages/TaskList';
import { FolderList } from './pages/FolderList';
import {openDB, deleteDB} from 'https://unpkg.com/idb?module';



// indexedDB.deleteDatabase("userData");

let db = null;

function createDatabase(callback, val1=null, val2=null) {

    const request = window.indexedDB.open('userData', 2);

    request.onerror = (e) => {
        console.error(`IndexedDB error: ${request.errorCode}`);
    };

    request.onsuccess = (e) => {
        console.info('Successful database connection');
        db = request.result;
        callback(db,val1,val2);
    };

    request.onupgradeneeded = (e) => {
        console.info('Database created');
        const db = request.result;
        const foldersStore = db.createObjectStore("folders", { keyPath: "id" });
        const notesStore = db.createObjectStore("notes", { keyPath: "id" });
    };
}


function addItem(db,item,place){
    const transaction = db.transaction(place, 'readwrite');

    transaction.oncomplete = function(event) {
        //...
    };

    transaction.onerror = function(event) {
      //...
    };

    const objectStore = transaction.objectStore(place);

    // Add new student
    const request = objectStore.add(item);

    request.onsuccess = ()=> {
        // request.result contains key of the added object
        console.log(`New student added, email: ${request.result}`);
    }

    request.onerror = (err)=> {
        console.error(`Error to add new student: ${err}`)
    }
}

function delItem(db,item,place){
    const transaction = db.transaction(place, 'readwrite');

    transaction.oncomplete = function(event) {
        //...
    };

    transaction.onerror = function(event) {
      //...
    };

    const objectStore = transaction.objectStore(place);

    // Add new student
    if (place === "folders" || place === "notes") {
      const allItems = objectStore.getAll();
      allItems.onsuccess = (event) =>
      {
        const items = event.target.result;
        for (let i = 0; i < items.length; i++) {
          if (items[i].title === item) {
            objectStore.delete(items[i].id);
            break;
          }
        }
      }
    } else {
    console.log("TRY DEL FOL",item);
    const request = objectStore.delete(item);
    

    request.onsuccess = ()=> {
        // request.result contains key of the added object
        console.log(`New student added, email: ${request.result}`);
    }

    request.onerror = (err)=> {
        console.error(`Error to add new student: ${err}`)
    }
  }
}


function getItems(db, callback, place) {
  const request = db.transaction(place).objectStore(place).getAll();
  request.onsuccess = () => {
    callback(place, request.result);
  }
}

function getNotesIndexes(data,title) {
  const notesIndexes = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].folder === title) {
      notesIndexes.push(data[i].id);
    }
  }
  return notesIndexes;
}




const initializeAssistant = (getState /*: any*/, getRecoveryState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,                                           
      // getRecoveryState: getState,                                           
      nativePanel: {
        defaultText: '',
        screenshotMode: false,
        tabIndex: -1,
    },
    });
  } else {
  return createAssistant({ getState });
  }
};

export class App extends React.Component {

  setItem(place,val) {
    this.setState({[place]: val});
  }

  constructor(props) {

    super(props);
    console.log('constructor');

    this.state = {
      notes: [{ id: null, folder: null, title: null, ans: null}],
      folders: [{ id: null, title: null}],
      newNote: {id: null, folder: null, title: null, ans: null},
      // notes: this.dbRequest.getNotes,
      // folders: getFolders(),
      showTaskList: true,
      showFolderList: true,
      curFolder: {id: null, title: null},
      curInd : 0,
    };

    createDatabase(getItems,(place, val) => this.setItem(place,val),"folders");
    createDatabase(getItems,(place, val) => this.setItem(place,val),"notes");

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
        this.handleKeyPress = this.handleKeyPress.bind(this);

    this.assistant.on('data', (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: "${event?.character?.id}"`);
      } else if (event.type === 'insets') {
        console.log(`assistant.on(data): insets`);
      } else {
        const { action } = event;
        this.dispatchAssistantAction(action);
      }
    });

    this.assistant.on('start', (event) => {
      let initialData = this.assistant.getInitialData();

      console.log(`assistant.on(start)`, event, initialData);
    });

    this.assistant.on('command', (event) => {
      console.log(`assistant.on(command)`, event);
    });

    this.assistant.on('error', (event) => {
      console.log(`assistant.on(error)`, event);
    });

    this.assistant.on('tts', (event) => {
      console.log(`assistant.on(tts)`, event);
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant() {
    console.log('getStateForAssistant: this.state:', this.state);
    const state = {
      item_selector: {
        items: this.state.notes.map(({ id, title }, index) => ({
          number: index + 1,
          id,
          title,
        })),
        ignored_words: [
          'создай', // addNote.sc
          'удалить', 'удали',  // deleteNote.sc
          'выполни', 'выполнил', 'сделал' // выполнил|сделал
        ],
      },
    };
    console.log('getStateForAssistant: state:', state);
    return state;
  }

  dispatchAssistantAction(action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_folder':
          return this.add_folder(action);
        case 'delete_folder':
          return this.delete_folder(action);
        case 'to_folder':
          return this.to_task(action);
        case 'add_card_title':
          return this.add_title(action);
        case 'add_card_text':
          return this.add_text(action);
        case 'delete_card':
          return this.delete_note(action);

        default:
          throw new Error();
      }
    }
  }

  add_title(action) {
    this.setState({newNote : {
          id: Math.random().toString(36).substring(7),
          title: action.title,
          ans: null,
          folder: this.state.curFolder.title,
        }
      })
  }

  add_text(action) {
    this.state.newNote.ans = action.text;
    if (this.state.newNote.title !== null) {
      this.add_note({type : "add_note",note : this.state.newNote});
    }
    this.state.newNote.title = null; 
  }

  add_note(action) {
    console.log('add_note', action);
    const newNote = {
          id: Math.random().toString(36).substring(7),
          title: action.note.title,
          ans: action.note.ans,
          folder: this.state.curFolder.title,
        };
    this.setState({
      notes: [
        ...this.state.notes,
        newNote
      ],
    });
    createDatabase(addItem,newNote,"notes");
  }

  done_note(action) {
    console.log('done_note', action);
    this.setState({
      notes: this.state.notes.map((note) =>
        note.id === action.id ? { ...note, completed: !note.completed } : note
      ),
    });
  }

  _send_action_value(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          // значение поля parameters может быть любым, но должно соответствовать серверной логике
          value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
        },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (data) => {
      // функция, вызываемая, если на sendData() был отправлен ответ
      const { type, payload } = data;
      console.log('sendData onData:', type, payload);
      unsubscribe();
    });
  }

  play_done_note(id) {
    const completed = this.state.notes.find(({ id }) => id)?.completed;
    if (!completed) {
      const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
      const idx = (Math.random() * texts.length) | 0;
      this._send_action_value('done', texts[idx]);
    }
  }

  delete_note(action) {
    console.log('delete_note', action);
    this.setState({
      notes: this.state.notes.filter(({ title }) => title !== action.title),
    });
    createDatabase(delItem,action.title,"notes");
  }

  add_folder(action) {
    console.log('add_folder', action);
    const newFolder =         {
          id: Math.random().toString(36).substring(7),
          title: action.folder,
        }
    this.setState({
      folders: [
        ...this.state.folders,
        newFolder
      ],
    });
    createDatabase(addItem,newFolder,"folders");
  }

  to_task(action) {
    console.log("to_task", action.folder);
    this.setState({
      curFolder: action.folder
    });
  }

  delete_folder(action) {
    console.log('delete_note', action);
    if(action.title === this.state.curFolder.title) {
      this.setState({curFolder: {id : null, title : null}});
    }
    const notesIndexes = getNotesIndexes(this.state.notes,action.title);
    this.setState({
      folders: this.state.folders.filter(({ title }) => title !== action.title),
    });
    this.setState({
      notes : this.state.notes.filter(({folder}) => folder !== action.title),
    })
    createDatabase(delItem,action.title,"folders");
    for(let i = 0; i < notesIndexes.length; i++) {
      createDatabase(delItem,notesIndexes[i],"notes");
    }

  }

      handleKeyPress(e) {
    switch (e.key) {
      case "ArrowDown":
        this.state.curInd = (this.state.curInd + 1)%this.state.folders.length
        if (document.getElementById("toFol-"+this.state.curInd)) {
        document.getElementById("toFol-"+this.state.curInd).focus();
        document.getElementById("toFol-"+this.state.curInd).select();
      }
        break;
      case "ArrowUp":
        if (this.state.curInd - 1 >= 0) {
          this.state.curInd -= 1;
        } else {
          if (document.getElementById("addQ")) {
          document.getElementById("addQ").focus();
          document.getElementById("addQ").select();
          this.state.curInd = 1;
          break;
        }
          this.state.curInd = this.state.folders.length - 1;
        }
        if (document.getElementById("toFol-"+this.state.curInd)) {
        document.getElementById("toFol-"+this.state.curInd).focus();
        document.getElementById("toFol-"+this.state.curInd).select();
      }
        break;
      case "ArrowRight":
        if (document.getElementById("right-arrow")) {
        document.getElementById("right-arrow").focus();
        document.getElementById("right-arrow").select();
      } else 
        break;
      case "ArrowLeft":
        if (document.getElementById("left-arrow")) {
        document.getElementById("left-arrow").focus();
        document.getElementById("left-arrow").select();
      } 
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    console.log('render');
    return (
      <>
{        this.state.curFolder.title !== null ? <TaskList
          items={this.state.notes}
          onAdd={(note) => {
            this.add_note({ type: 'add_note', note });
          }}
          delTask={(note) => {
            this.delete_note(note);
          }}
          curFolder = {this.state.curFolder}
        /> : null}
{       (this.state.showFolderList) ? <FolderList
          items={this.state.folders}
          onAdd={(folder) => {
            this.add_folder({ type: 'add_folder', folder});
          }}
          toTask={(folder) => {
            this.to_task({folder})
          }}
          delFol={(folder) => {
            this.delete_folder(folder);
          }}
        /> : null}
      </>
    );
  }
}
