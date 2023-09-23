import { openDB, IDBPDatabase, IDBPTransaction } from 'idb';

interface AnimeDB {
  recentlyWatched: Episode[];
  recentlySearched: Anime[];
}

const DB_NAME = 'animeDB';
const DB_VERSION = 1;

const initDB = async (): Promise<IDBPDatabase<AnimeDB>> => {
  return openDB<AnimeDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('recentlyWatched')) {
        db.createObjectStore('recentlyWatched', { keyPath: 'animeID' });
      }
      if (!db.objectStoreNames.contains('recentlySearched')) {
        db.createObjectStore('recentlySearched', { keyPath: 'id' });
      }
    },
  });
};

export const addRecentlyWatched = async (anime: Episode) => {
  const db = await initDB();
  const tx = db.transaction('recentlyWatched', 'readwrite');
  const store = tx.objectStore('recentlyWatched');
  await store.put(anime);
};

export const getRecentlyWatched = async (): Promise<Episode[]> => {
  const db = await initDB();
  const tx = db.transaction('recentlyWatched', 'readonly');
  const store = tx.objectStore('recentlyWatched');
  const recentlyWatched = await store.getAll();
  return recentlyWatched;
};

export const addRecentlySearched = async (anime: Anime) => {
  const db = await initDB();
  const tx = db.transaction('recentlySearched', 'readwrite');
  const store = tx.objectStore('recentlySearched');
  await store.put(anime);
};

export const getRecentlySearched = async (): Promise<Anime[]> => {
  const db = await initDB();
  const tx = db.transaction('recentlySearched', 'readonly');
  const store = tx.objectStore('recentlySearched');
  const recentlySearched = await store.getAll();
  return recentlySearched;
};
