import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { boardsActionTypes } from "./boards/types";
import { boardsReducer } from "./boards/reducer";


const rootReducer = combineReducers({
    boards: boardsReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, boardsActionTypes>