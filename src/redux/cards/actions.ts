import { ICard } from "../../types/types";
import { AppDispatch } from "../store";
import { getCardStatus } from "./reducer";
import { REMOVE_CARD, TOGGLE_TASK } from "./types";
import { ADD_CARD } from "./types";

//card

export const addCard = (payload: ICard) => {
    return (dispatch: AppDispatch, getState: () => { cards: { cards: ICard[] } }) => {
        try {
            const currentCards = getState().cards.cards;
            const updatedCards = [...currentCards, payload];

            localStorage.setItem("cards", JSON.stringify(updatedCards));

            dispatch({
                type: ADD_CARD,
                payload
            });
        } catch (err) {
            console.error("Error saving in LS", err);
        }
    };
};

export const removeCard = (payload: ICard) => {
    return (dispatch: AppDispatch, getState: () => { cards: { cards: ICard[] } }) => {
        try {
            const currentCards = getState().cards.cards
            const filteredCards = currentCards.filter((card) => card.id !== payload.id)
            localStorage.setItem('cards', JSON.stringify(filteredCards))

            dispatch({
                type: REMOVE_CARD,
                payload: filteredCards
            })
        } catch (err) {
            console.error('Cant save to LS', err)
        }
    }
}

//Task

export const toggleTask = (cardId: number, taskId: number) => {
    return (dispatch: AppDispatch, getState: () => { cards: { cards: ICard[] } }) => {
        try {
            const currentCards = getState().cards.cards.map((card) => {
                if (card.id === cardId) {

                    const updatedTasks = card.tasks.map((task) =>
                        task.id === taskId ? { ...task, done: !task.done } : task
                    );

                    const updatedCard = {
                        ...card,
                        tasks: updatedTasks,
                        status: getCardStatus(updatedTasks),
                    };

                    return updatedCard;
                }
                return card;
            });

            localStorage.setItem('cards', JSON.stringify(currentCards));

            dispatch({
                type: TOGGLE_TASK,
                payload: { cards: currentCards }
            });

        } catch (err) {
            console.error("Error updating task", err);
        }
    };
};