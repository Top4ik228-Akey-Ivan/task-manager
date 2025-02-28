import React from "react";
import { IBoard } from "../../types/types";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addBoard } from "../../redux/boards/actions";

const HelloPage: React.FC = () => {

    const boards = useSelector((state: RootState) => state.boards.boards)
    const dispatch: AppDispatch = useDispatch()

    const testBoard: IBoard  = {
        id: new Date().getTime(),
        title: 'Check Board',
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

    console.log(boards)

    return (
        <div>
            <div>Welcome to dashboard</div>
            <div>Your`s boards</div>
            <button onClick={() => dispatch(addBoard(testBoard))}>Add board</button>
        </div>
    );
}
 
export default HelloPage;