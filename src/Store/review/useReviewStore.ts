import {create} from 'zustand';

interface ReviewState {
  isShown: boolean;
  toggleIsShown: () => void;
}

const useReviewStore = create<ReviewState>((set) => ({
  isShown: false,
  toggleIsShown: () => set((state) => ({ isShown: !state.isShown })),
}));

export default useReviewStore;
