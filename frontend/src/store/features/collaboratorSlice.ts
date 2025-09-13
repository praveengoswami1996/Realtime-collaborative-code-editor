import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface collaboratorState {
    onlineUsers: string[];
}

const initialState: collaboratorState = {
    onlineUsers: [],
}

const collaboratorSlice = createSlice({
  name: "collaborators",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
        state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = collaboratorSlice.actions;
export default collaboratorSlice.reducer;