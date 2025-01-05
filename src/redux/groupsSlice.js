import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
  },
});

export const { setGroups, addGroup, deleteGroup } = groupsSlice.actions;
export default groupsSlice.reducer;


