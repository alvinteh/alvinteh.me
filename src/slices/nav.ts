import { createSlice } from '@reduxjs/toolkit';

interface NavState {
  isOpen: boolean;
}

const initialState: NavState = {
  isOpen: false,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    open: (state: NavState) => {
      state.isOpen = true;
    },
    close: (state: NavState) => {
      state.isOpen = false;
    },
    toggle: (state: NavState) => {
      state.isOpen = !state.isOpen;
    },
  }
});

export default navSlice.reducer;
export type { NavState };
export { navSlice };
export const { open, close, toggle } = navSlice.actions;