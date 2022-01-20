import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: ''
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {    
    setError: (state, action) => {        
        state[action.payload.name] = action.payload.value;
    },
    crearAllErrors: (state) =>{
      for (const key in initialState) {
        if (initialState.hasOwnProperty(key)) {
            const element = initialState[key];
            state[key] = element
        }
    }
    }
  },
});

export const {     
  setError,
  crearAllErrors   
} = errorSlice.actions;

export default errorSlice.reducer;