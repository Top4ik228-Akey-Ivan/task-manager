import { IBoard, ICard } from "../../types/types";

export interface boardsState {
    boards: IBoard[];
}
// Доски
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'

// Карточки
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const UPDATE_CARDS_ORDER = 'UPDATE_CARDS_ORDER'

// Таски
export const TOGGLE_TASK = 'TOGGLE_TASK'

// Доски
export interface setBoardsAction {
    type: typeof ADD_BOARD;
    payload: IBoard;
}

export interface removeBoardsAction {
    type: typeof REMOVE_BOARD;
    payload: number; //boardId
}

// Карточки
export interface addCardAction{
    type: typeof ADD_CARD;
    payload: {boardId: number, card: ICard}
}

export interface removeCardAction{
    type: typeof REMOVE_CARD;
    payload: { boardId: number, cardId: number}
}

export interface updateCardsOrderAction {
    type: typeof UPDATE_CARDS_ORDER;
    payload: {boardId: number, cards: ICard[]}
}

// Таски
export interface toogleTaskAction{
    type: typeof TOGGLE_TASK;
    payload: IBoard[]

}

export type boardsActionTypes =
    | setBoardsAction
    | removeBoardsAction
    | addCardAction
    | removeCardAction
    | updateCardsOrderAction
    | toogleTaskAction