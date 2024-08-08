import { create } from 'zustand';

interface ShowState {
  showMenu: boolean;
  setShowmenu: (value: boolean) => void;
}

const useNavbarShow = create<ShowState>((set) => ({
  showMenu: false,
  setShowmenu: (value) => set({ showMenu: value }),
}));

export default useNavbarShow;
