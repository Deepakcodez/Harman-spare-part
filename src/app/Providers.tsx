'use client'
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { createStore, AppStore } from '@/lib/store/store';
import { add } from '@/lib/features/cart/cartslice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = createStore();

    // storeRef.current.dispatch(add("prod"))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}