import { toast } from "react-toastify";
import { IBoard } from "../../types/types";
import { AppDispatch } from "../store";
import { ADD_BOARD } from "./types";


export const addBoard = (payload: IBoard) => {
    return (dispatch: AppDispatch, getState: () => {
        boards: { boards: IBoard[] }
    }) => {
        try {
            const currentBoards = getState().boards.boards
            const updatedBoards = [...currentBoards, payload]

            localStorage.setItem('boards', JSON.stringify(updatedBoards))

            dispatch({
                type: ADD_BOARD,
                payload
            })

            toast.success("Доска успешно добавлена!"); // ✅ Добавляем уведомление
        } catch (err) {
            console.error('Error saving in LS', err)
            toast.error("Ошибка при добавлении доски!"); // ❌ Ошибка
        }
    }
}   