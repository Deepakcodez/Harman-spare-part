import {create} from 'zustand';

interface ShippingAddressState {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phoneNo: string;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  setPinCode: (pinCode: string) => void;
  setPhoneNo: (phoneNo: string) => void;
  setShippingAddress: (shippingAddress: Omit<ShippingAddressState, 'setAddress' | 'setCity' | 'setState' | 'setCountry' | 'setPinCode' | 'setPhoneNo' | 'setShippingAddress'>) => void;
  getShippingAddress: () => Omit<ShippingAddressState, 'setAddress' | 'setCity' | 'setState' | 'setCountry' | 'setPinCode' | 'setPhoneNo' | 'setShippingAddress' | 'getShippingAddress'>;

}

const useShippingAddressStore = create<ShippingAddressState>((set, get) => ({
  address: '',
  city: '',
  state: '',
  country: '',
  pinCode: '',
  phoneNo: '',
  setAddress: (address) => set({ address }),
  setCity: (city) => set({ city }),
  setState: (state) => set({ state }),
  setCountry: (country) => set({ country }),
  setPinCode: (pinCode) => set({ pinCode }),
  setPhoneNo: (phoneNo) => set({ phoneNo }),
  setShippingAddress: ({ address, city, state, country, pinCode, phoneNo }) =>
    set({ address, city, state, country, pinCode, phoneNo }),
  getShippingAddress: () => {
    const { address, city, state, country, pinCode, phoneNo } = get();
    return { address, city, state, country, pinCode, phoneNo };
  },
}));

export default useShippingAddressStore;
