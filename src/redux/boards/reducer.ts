import { Reducer } from "redux";
import { ADD_BOARD, ADD_CARD, boardsActionTypes, boardsState, REMOVE_BOARD, REMOVE_CARD, TOGGLE_TASK, UPDATE_CARDS_ORDER } from "./types";
import { IBoard, ITask } from "../../types/types";


export const getCardStatus = (tasks: ITask[]): "Done" | "In Progress" => {
    return tasks.every(task => task.done) ? "Done" : "In Progress";
};

const initialBoards: IBoard[] = [
    {
        id: new Date(2025, 1, 27).getTime(),
        title: 'Test Board',
        cards: [
            {
                id: new Date(2025, 1, 18).getTime(),
                title: "Do homework2",
                section: 'Study',
                tasks: [
                    { id: Math.random(), text: "do math", done: true },
                    { id: Math.random(), text: "do english", done: true },
                    { id: Math.random(), text: "do history", done: true },
                ],
                status: 'In Progress',
                deadline: new Date(2025, 1, 22),
                priority: "💤 Low effort",
            },
            {
                id: new Date(2025, 1, 19).getTime(),
                title: "Do homework",
                section: 'Study',
                tasks: [
                    { id: Math.random(), text: "do math", done: true },
                    { id: Math.random(), text: "do english", done: true },
                    { id: Math.random(), text: "do history", done: true },
                ],
                status: 'In Progress',
                deadline: new Date(2025, 1, 22),
                priority: "🔴 High",
            }
        ]
    },
]

const loadBoardsFromLoacalStorage = (): IBoard[] => {
    try {
        const data = localStorage.getItem('boards')
        if (!data) return initialBoards

        const parsedData: IBoard[] = JSON.parse(data)

        return parsedData.map(board => ({
            ...board,
            cards: board.cards.map(card => ({
                ...card,
                deadline: new Date(card.deadline),
            }))
        }));

    } catch (err) {
        console.error('Error loading from LS', err)
        return []
    }
}

const initialState: boardsState = {
    boards: loadBoardsFromLoacalStorage()
}

export const boardsReducer: Reducer<boardsState, boardsActionTypes> = (
    state = initialState,
    action: boardsActionTypes
) => {
    switch (action.type) {
        case ADD_BOARD:
            return { ...state, boards: [...state.boards, action.payload] }

        case REMOVE_BOARD:
            return { ...state, boards: state.boards.filter((board) => board.id !== action.payload) }

        case ADD_CARD:
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board.id === action.payload.boardId
                        ? { ...board, cards: [...board.cards, action.payload.card] }
                        : board
                ),
            }

        case REMOVE_CARD:
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board.id === action.payload.boardId
                        ? {
                            ...board, cards: board.cards.filter((card) =>
                                card.id !== action.payload.cardId
                            )
                        }
                        : board
                )
            }

        case UPDATE_CARDS_ORDER:
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board.id === action.payload.boardId
                        ? { ...board, cards: action.payload.cards }
                        : board
                )
            }

        case TOGGLE_TASK:
            return {...state, boards: action.payload}

        default:
            return state
    }
}