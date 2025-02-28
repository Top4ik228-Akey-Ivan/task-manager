import { applyMiddleware, combineReducers, createStore } from "redux";
import { cardsReducer } from "./cards/reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { cardActionTypes } from "./cards/types";
import { boardsActionTypes } from "./boards/types";
import { boardsReducer } from "./boards/reducer";


const rootReducer = combineReducers({
    cards: cardsReducer,
    boards: boardsReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, cardActionTypes | boardsActionTypes>