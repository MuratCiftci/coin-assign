import { create } from "zustand";

interface FavoriteCoinsStore {
  favoriteCoins: string[];
  addFavoriteCoin: (coin: string) => void;
  removeFavoriteCoin: (coin: string) => void;
}

export const useFavoriteCoinsStore = create<FavoriteCoinsStore>((set) => ({
  favoriteCoins: [],
  addFavoriteCoin: (coin) =>
    set((state) => ({ favoriteCoins: [...state.favoriteCoins, coin] })),
  removeFavoriteCoin: (coin) =>
    set((state) => ({
      favoriteCoins: state.favoriteCoins.filter((c) => c !== coin),
    })),
}));
