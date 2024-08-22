import {create} from 'zustand';

interface Avatar {
  public_id: string;
  url: string;
}

export interface User {
  name: string;
  email: string;
  avatar: Avatar;
  cart: string[];
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

interface CurrentUserStore {
  currentUser: any | null;
  setCurrentUser: (user: any) => void;
  clearCurrentUser: () => void;
}

const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useCurrentUserStore;
