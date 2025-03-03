import { toast } from "react-toastify";
import { IBoard, ICard } from "../../types/types";
import { AppDispatch } from "../store";
import { ADD_BOARD, ADD_CARD, REMOVE_BOARD, REMOVE_CARD, TOGGLE_TASK, UPDATE_CARDS_ORDER } from "./types";
import { getCardStatus } from "./reducer";

// Добавить доску
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

// Удалить доску
export const removeBoard = (payload: number) => {
    return (dispatch: AppDispatch, getState: () => {
        boards: { boards: IBoard[] }
    }) => {
        try {
            const currentBoards = getState().boards.boards
            const updatedBoards = currentBoards.filter((board) => board.id !== payload)

            localStorage.setItem('boards', JSON.stringify(updatedBoards))

            dispatch({
                type: REMOVE_BOARD,
                payload
            })
            toast.success("Доска успешно удалена!"); // ✅ Добавляем уведомление
        } catch (err) {
            console.error('Error saving in LS', err)
            toast.error("Ошибка при удалении доски!"); // ❌ Ошибка
        }
    }
}

// Добавить карточку
export const addCard = (boardId: number, card: ICard) => {
    return (dispatch: AppDispatch, getState: () => { boards: { boards: IBoard[] } }) => {
        try {
            const updatedBoards = getState().boards.boards.map((board) =>
                board.id === boardId ? { ...board, cards: [...board.cards, card] } : board);

            localStorage.setItem("boards", JSON.stringify(updatedBoards));

            dispatch({
                type: ADD_CARD,
                payload: { boardId, card }
            });
            toast.success("Карточка успешно добавлена!"); // ✅ Добавляем уведомление

        } catch (err) {
            console.error("Error saving in LS", err);
            toast.error("Ошибка при добавлении карточки!"); // ❌ Ошибка
        }
    }
}

// Удалить карточку
export const removeCard = (boardId: number, cardId: number) => {
    return (dispatch: AppDispatch, getState: () => { boards: { boards: IBoard[] } }) => {
        try {
            const updatedBoards = getState().boards.boards.map((board) =>
                board.id === boardId
                    ? { ...board, cards: board.cards.filter((card) => card.id !== cardId) }
                    : board
            );

            localStorage.setItem("boards", JSON.stringify(updatedBoards));

            dispatch({
                type: REMOVE_CARD,
                payload: { boardId, cardId }
            });
            toast.success("Карточка успешно удалена!"); // ✅ Добавляем уведомление

        } catch (err) {
            console.error("Error saving in LS", err);
            toast.error("Ошибка при удалении карточки!"); // ❌ Ошибка
        }
    }
}

// Поменять карточки местами
export const updateCardsOrder = (boardId: number, cards: ICard[]) => {
    return (dispatch: AppDispatch, getState: () => { boards: { boards: IBoard[] } }) => {
        try {
            const updatedBoards = getState().boards.boards.map((board) =>
                board.id === boardId
                    ? { ...board, cards: cards }
                    : board
            )

            localStorage.setItem('boards', JSON.stringify(updatedBoards))

            dispatch({
                type: UPDATE_CARDS_ORDER,
                payload: { boardId, cards }
            })

        } catch (err) {
            console.error('Error saving in LS', err)
        }
    }
}

// Отметь таску выполненной
export const toggleTask = (boardId: number, cardId: number, taskId: number) => {
    return (dispatch: AppDispatch, getState: () => { boards: { boards: IBoard[] } }) => {
        try {
            const updatedBoards = getState().boards.boards.map((board) => {
                if (board.id === boardId) {
                    return {
                        ...board,
                        cards: board.cards.map((card) => {
                            if (card.id === cardId) {
                                const updatedTasks = card.tasks.map((task) =>
                                    task.id === taskId ? { ...task, done: !task.done } : task
                                );

                                return {
                                    ...card,
                                    tasks: updatedTasks,
                                    status: getCardStatus(updatedTasks), // ✅ Обновляем статус карточки
                                };
                            }
                            return card;
                        }),
                    };
                }
                return board;
            });

            localStorage.setItem("boards", JSON.stringify(updatedBoards));

            dispatch({
                type: TOGGLE_TASK,
                payload: updatedBoards
            });

            toast.success("Задача обновлена!"); // ✅ Уведомление

        } catch (err) {
            console.error('Error saving in LS', err)
            toast.error("Ошибка при обновлении задачи!"); // ❌ Ошибка
        }
    }
}