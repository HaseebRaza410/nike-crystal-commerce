import { create } from 'zustand';
import { Product } from './cartStore';

interface UIStore {
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  searchQuery: string;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,
  searchQuery: '',

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  openQuickView: (product) => set({ isQuickViewOpen: true, quickViewProduct: product }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),
}));
