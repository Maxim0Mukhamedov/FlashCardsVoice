import React, { createContext, useState, useEffect } from 'react';

const IndexedDBContext = createContext();

const IndexedDBProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  // Откройте IndexedDB (синхронно)
  const openIndexedDB = () => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if (!indexedDB) {
      console.error('IndexedDB не поддерживается');
      return;
    }

    const databaseName = 'userData';
    const databaseVersion = 1; // Увеличьте при внесении изменений в структуру базы данных

    try {
      const request = indexedDB.open(databaseName, databaseVersion);

      request.onsuccess = (event) => {
        setDb(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Ошибка открытия IndexedDB:', event.target.error);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const notesStore = db.createObjectStore("notes", { keyPath: "id"});
        const foldersStore = db.createObjectStore("folders", { keyPath: "id" });
      };
    } catch (error) {
      console.error('Ошибка при открытии IndexedDB:', error);
    }
  };

  useEffect(() => {
    openIndexedDB();
  }, []);

  return (
    <IndexedDBContext.Provider value={db}>
      {children}
    </IndexedDBContext.Provider>
  );
};

export { IndexedDBContext, IndexedDBProvider };
