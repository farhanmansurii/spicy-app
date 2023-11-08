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
  updateTimeWatched: (episodeId: string, timeWatched: number) => void;
}

const useAnimeStore = create<AnimeStore>((set) => ({
  recentlyWatched: [],
  recentlySearched: [],
  addToRecentlyWatched: async (anime: Episode) => {
    set((state: AnimeStore) => {
      const exists = state.recentlyWatched.some(
        (a) => a.animeID === anime.animeID
      );
      if (!exists) {
        addRecentlyWatched({ ...anime, time: 0 });
        return { recentlyWatched: [anime, ...state.recentlyWatched] };
      } else return state;
    });
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
  updateTimeWatched: (episodeId, timeWatched) => {
    set((state) => {
      const updatedRecentlyWatched = state.recentlyWatched.map((anime) => {
        if (anime.animeID === episodeId) {
          return { ...anime, time: timeWatched };
        }
        return anime;
      });
      return { recentlyWatched: updatedRecentlyWatched };
    });
  },
}));

export default useAnimeStore;
