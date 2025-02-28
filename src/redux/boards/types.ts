import { IBoard } from "../../types/types";

export interface boardsState {
    boards: IBoard[];
}

export const ADD_BOARD = 'ADD_BOARD'

export interface setBoardsAction {
    type: typeof ADD_BOARD;
    payload: IBoard;
}

export type boardsActionTypes =
    | setBoardsAction