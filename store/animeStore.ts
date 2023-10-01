import {
  addRecentlySearched,
  addRecentlyWatched,
  getRecentlySearched,
  getRecentlyWatched,
} from "@/lib/indexedDB";
import { create } from "zustand";

interface AnimeStore {
  recentlyWatched: Episode[];
  recentlySearched: Anime[];
  addToRecentlyWatched: (anime: Episode) => void;
  addToRecentlySearched: (anime: Anime) => void;
  loadRecentlyWatched: () => void;
  loadRecentlySearched: () => void;
}

const useAnimeStore = create<AnimeStore>((set) => ({
recentlyWatched: [],
  recentlySearched: [],
  addToRecentlyWatched: async (anime) => {
    await addRecentlyWatched(anime);
    set((state) => ({ recentlyWatched: [anime, ...state.recentlyWatched] }));
  },
  addToRecentlySearched: async (anime) => {
    await addRecentlySearched(anime);
    set((state) => ({ recentlySearched: [anime, ...state.recentlySearched] }));
  },
  loadRecentlyWatched: async () => {
    const recentlyWatched = await getRecentlyWatched();
    set({ recentlyWatched });
  },
  loadRecentlySearched: async () => {
    const recentlySearched = await getRecentlySearched();
    set({ recentlySearched });
  },
}));

export default useAnimeStore;
