import { Reducer } from "redux";
import { ADD_BOARD, boardsActionTypes, boardsState } from "./types";
import { IBoard } from "../../types/types";


const initialBoards: IBoard[] = [
        {
            id: new Date().getTime(),
            title: 'Test Board',
            cards: [
                {
                    id: new Date(2025, 1, 18).getTime(),
                    title: "Do homework",
                    section: 'Study',
                    tasks: [
                        { id: Math.random(), text: "do math", done: true },
                        { id: Math.random(), text: "do english", done: true },
                        { id: Math.random(), text: "do history", done: true },
                    ],
                    status: 'In Progress',
                    deadline: new Date(2025, 1, 22),
                    priority: "💤 Low effort",
                }
            ]
        }
    ]

const loadBoardsFromLoacalStorage = (): IBoard[] => {
    try {
        const data = localStorage.getItem('boards')
        if (!data) return initialBoards

        const parsedData: IBoard[] = JSON.parse(data)
        return parsedData
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
            return { ...state, boards: [...state.boards, action.payload]}

        default:
            return state
    }
}