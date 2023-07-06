import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface FavoriteCoinsStore {
  favoriteCoins: string[];
  addFavoriteCoin: (coin: string) => void;
  removeFavoriteCoin: (coin: string) => void;
}

export const useFavoriteCoinsStore = create<FavoriteCoinsStore>()(
  persist(
    (set) => ({
      favoriteCoins: [],
      addFavoriteCoin: (coin) =>
        set((state) => ({ favoriteCoins: [...state.favoriteCoins, coin] })),
      removeFavoriteCoin: (coin) =>
        set((state) => ({
          favoriteCoins: state.favoriteCoins.filter((c) => c !== coin),
        })),
    }),
    {
      name: "favoriteCoins",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
