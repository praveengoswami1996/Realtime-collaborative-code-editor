import { configureStore } from "@reduxjs/toolkit";
import collaboratorReducer from "./features/collaboratorSlice";

export const store = configureStore({
    reducer: {
        collaborators: collaboratorReducer
    }
})

export type AppStore = typeof store;

// RootState is the "blueprint" of all the data in your Redux store.
export type RootState = ReturnType<AppStore['getState']>;

// That line creates a TypeScript type called AppDispatch that exactly matches your Redux store's dispatch function.
export type AppDispatch = AppStore['dispatch'];