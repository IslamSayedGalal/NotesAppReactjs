import {createSlice} from '@reduxjs/toolkit';

const initState = {toggleColor:true};

const toggleSlice = createSlice({
    name: 'toggleColor',
    initialState: initState,
    reducers:{
        toggleColor: (state, action)=>{
            state.toggleColor = !state.toggleColor;
        }
    }
})

export default toggleSlice.reducer;
export const {toggleColor} = toggleSlice.actions;
