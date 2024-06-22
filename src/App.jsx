import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import { useSpatnavInitialization, useSection, spatnavInstance } from '@salutejs/spatial';

import './App.css';
import { CardList } from './pages/CardList';
import { FolderList } from './pages/FolderList';



// indexedDB.deleteDatabase("userData");

let db = null;

function createDatabase(callback, val1=null, val2=null) {

    const request = window.indexedDB.open('userData', 1);

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
        const cardsStore = db.createObjectStore("cards", { keyPath: "id" });
        foldersStore.add({id:1, title: "Инструкция к приложению"});
        cardsStore.add({ id: 1, folder:"Инструкция к приложению", title: "Добавление папки", ans: "Чтобы добавить папку под названием <ИмяПапки>, заполните поле ввода названия папки в нижней части экрана и нажмите Enter."})
        cardsStore.add({ id: 2, folder:"Инструкция к приложению", title: "Удаление папки", ans: "Чтобы удалить папку, нажмите на крест рядом с её названием."})
        cardsStore.add({ id: 3, folder:"Инструкция к приложению", title: "Добавление карточки", ans: "Чтобы добавить карточку под названием <ИмяКарточки>, заполните поля ввода названия карточки и её содержимого и нажмите на кнопку \"Сохранить\"."})
        cardsStore.add({ id: 4, folder:"Инструкция к приложению", title: "Удаление карточки", ans: "Чтобы удалить карточку, нажмите на крест рядом с её названием."})
        cardsStore.add({ id: 5, folder:"Инструкция к приложению", title: "Работа с ассистентом", ans: "Для вызова ассистента воспользуйтесь голосовой командой \"запусти флеш-карточки\""})
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

    if (place === "folders" || place === "cards") {
      const allItems = objectStore.getAll();
      allItems.onsuccess = (event) =>
      {
        const items = event.target.result;
        for (let i = 0; i < items.length; i++) {
          if (items[i].title.toLowerCase() === item.toLowerCase()) {
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

function getcardsIndexes(data,title) {
  const cardsIndexes = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].folder === title) {
      cardsIndexes.push(data[i].title);
    }
  }
  return cardsIndexes;
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
      cards: [{ id: null, folder: null, title: null, ans: null}],
      folders: [{ id: null, title: null}],
      newNote: {id: null, folder: null, title: null, ans: null},
      // cards: this.dbRequest.getcards,
      // folders: getFolders(),
      showTaskList: true,
      showFolderList: true,
      curFolder: {id: null, title: null},
      curInd : 0,
    };

    createDatabase(getItems,(place, val) => this.setItem(place,val),"folders");
    createDatabase(getItems,(place, val) => this.setItem(place,val),"cards");

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    // this.handleKeyPress = this.handleKeyPress.bind(this);

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
        items: this.state.cards.map(({ id, title }, index) => ({
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

  checkFunction(action,place) {
    if (place === "folders") {
    if (this.state.folders.filter(({ title }) => title.toLowerCase() === action.title.toLowerCase()).length === 0) {
      this.assistant.cancelTts();
      this.assistant.sendData({ action: { action_id: 'not_existing_folder', parameters: { param: 'some' } } });
    }
  } else if (place === "cards") { 
  if ((this.state.cards.filter(({ title }) => title.toLowerCase() === action.title.toLowerCase()).length === 0) || this.state.curFolder.title === null) {
    this.assistant.cancelTts()
    this.assistant.sendData({ action: { action_id: 'not_existing_card', parameters: { param: 'some' } } });
  } } else if (place === "add_card") {
    if (this.state.curFolder.title === null) {
      this.assistant.cancelTts()
      this.assistant.sendData({ action: { action_id: 'not_in_folder', parameters: { param: 'some' } } });
    }
  }
  }

  dispatchAssistantAction(action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_folder':
          return this.add_folder(action);
        case 'delete_folder':
          this.checkFunction(action,"folders");
          return this.delete_folder(action);
        case 'to_folder':
          this.checkFunction(action,"folders");
          return this.to_folder(action);
        case 'add_card_title':
          this.checkFunction(action,"add_card");
          return this.add_title(action);
        case 'add_card_text':
          return this.add_text(action);
        case 'delete_card':
          this.checkFunction(action,"cards");
          return this.delete_card(action);
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
      this.add_card({type : "add_card",note : this.state.newNote});
    }
    this.state.newNote.title = null; 
  }

  add_card(action) {
    console.log('add_card', action);
    const newNote = {
          id: Math.random().toString(36).substring(7),
          title: action.note.title,
          ans: action.note.ans,
          folder: this.state.curFolder.title,
        };
    this.setState({
      cards: [
        ...this.state.cards,
        newNote
      ],
    });
    createDatabase(addItem,newNote,"cards");
  }

  delete_card(action) {
    console.log('delete_card', action);
    this.setState({
      cards: this.state.cards.filter(({ title }) => title.toLowerCase() !== action.title.toLowerCase()),
    });
    createDatabase(delItem,action.title,"cards");
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

  to_folder(action) {

    console.log("to_folder", action.folder);

    this.setState({
      curFolder: action.folder
    });
  }

  delete_folder(action) {
    console.log('delete_folder', action);
    if(action.title === this.state.curFolder.title) {
      this.setState({curFolder: {id : null, title : null}});
    }
    const cardsIndexes = getcardsIndexes(this.state.cards,action.title.toLowerCase());
    this.setState({
      folders: this.state.folders.filter(({ title }) => title.toLowerCase() !== action.title.toLowerCase()),
    });
    this.setState({
      cards : this.state.cards.filter(({folder}) => folder.toLowerCase() !== action.title.toLowerCase()),
    })
    createDatabase(delItem,action.title,"folders");
    for(let i = 0; i < cardsIndexes.length; i++) {
      createDatabase(delItem,cardsIndexes[i],"cards");
    }

  }

  render() {
    console.log('render');
    return (
      <div class = "main-body">
{        this.state.curFolder.title !== null ? <CardList
          items={this.state.cards}
          onAdd={(note) => {
            this.add_card({ type: 'add_card', note });
          }}
          delCard={(note) => {
            this.delete_card(note);
          }}
          curFolder = {this.state.curFolder}
        /> : null}
{       (this.state.showFolderList) ? <FolderList
          items={this.state.folders}
          onAdd={(folder) => {
            this.add_folder({ type: 'add_folder', folder});
          }}
          toFolder={(folder) => {
            this.to_folder({folder})
          }}
          delFol={(folder) => {
            this.delete_folder(folder);
          }}
          curFolder = {this.state.curFolder}
        /> : null}
      </div>
    );
  }
}
