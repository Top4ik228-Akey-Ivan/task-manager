import { Reducer } from "redux";
import { ICard, ITask } from "../../types/types";
import { cardActionTypes, cardsState, ADD_CARD, TOGGLE_TASK, REMOVE_CARD } from "./types";

export const getCardStatus = (tasks: ITask[]): "Done" | "In Progress" => {
    return tasks.every(task => task.done) ? "Done" : "In Progress";
};

const initialCards: ICard[] = [
    {
        id: new Date(2025, 1, 17).getTime(),
        title: "Cook cake",
        section: 'Home',
        tasks: [
            { id: Math.random(), text: "buy fruits", done: false },
            { id: Math.random(), text: "make dough", done: false },
            { id: Math.random(), text: "wash dishes", done: true },
        ],
        get status() {
            return getCardStatus(this.tasks);
        },
        deadline: new Date(2025, 1, 22),
        priority: '🚨 Critacal',
    },
    {
        id: new Date(2025, 1, 18).getTime(),
        title: "Do homework",
        section: 'Study',
        tasks: [
            { id: Math.random(), text: "do math", done: true },
            { id: Math.random(), text: "do english", done: true },
            { id: Math.random(), text: "do history", done: true },
        ],
        get status() {
            return getCardStatus(this.tasks);
        },
        deadline: new Date(2025, 1, 22),
        priority: "💤 Low effort",
    },
]

const loadCardsFromLocalStorage = (): ICard[] => {
    try {
        const data = localStorage.getItem("cards");
        if (!data) return initialCards;

        const parsedData: ICard[] = JSON.parse(data);

        return parsedData.map(card => ({
            ...card,
            id:  Number(card.id),
            deadline: new Date(card.deadline),
        }));
    } catch (err) {
        console.error('Error loading from LS', err)
        return []
    }
}

const initialState: cardsState = {
    cards: loadCardsFromLocalStorage()
}

export const cardsReducer: Reducer<cardsState, cardActionTypes> = (
    state = initialState, action: cardActionTypes,
) => {
    switch (action.type) {
        case ADD_CARD:
            return { ...state, cards: [...state.cards, action.payload] }

        case REMOVE_CARD:
            return {...state, cards: action.payload}

        case TOGGLE_TASK:
            return {...state, cards: action.payload.cards}

        default:
            return state
    }
}