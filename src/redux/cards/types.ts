import { ICard } from "../../types/types";

//Card

export interface cardsState {
    cards: ICard[]
}

export const ADD_CARD = 'ADD_CARD'

export interface setCardsAction {
    type: typeof ADD_CARD,
    payload: ICard
}

export const REMOVE_CARD = 'REMOVE_CARD'

export interface removeCardAction {
    type: typeof REMOVE_CARD;
    payload: ICard[];
}

//Task

export const TOGGLE_TASK = 'TOGGLE_TASK'

export interface toggleTaskAction {
    type: typeof TOGGLE_TASK;
    payload: {cards: ICard[]}
}

export type cardActionTypes = 
    | setCardsAction
    | toggleTaskAction
    | removeCardAction