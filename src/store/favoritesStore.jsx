import { create } from "zustand";

export const useFavoritesStore = create((set, get, store) => ({
    favorites: [],

    addFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.includes(jobId)
              ? state.favorites
              : [...state.favorites, jobId]
        }))
    },

    removeFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== jobId)
        }))
    },

    toggleFavorite: (jobId) => {
        const { favorites, addFavorite, removeFavorite } = get()
        const isFav = favorites.includes(jobId)
        isFav ? removeFavorite(jobId) : addFavorite(jobId)
    },

    isFavorite: (jobId) => {
        return get().favorites.includes(jobId)
    },

    countFavorites: () => get().favorites.length,

    clearFavorites: () => {
        set(store.getInitialState())
    }
}))