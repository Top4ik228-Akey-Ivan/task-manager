import React from "react";

import styles from './helloPage.module.css'

import { IBoard } from "../../types/types";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addBoard } from "../../redux/boards/actions";
import BoardCard from "../../components/boardCard/boardCard";
// import ThemeSwitcher from "../../components/themeSwitcher/themeSwitcher";

const HelloPage: React.FC = () => {

    const boards = useSelector((state: RootState) => state.boards.boards)
    const dispatch: AppDispatch = useDispatch()

    const testBoard: IBoard = {
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

    return (
        <div>
            <div className={styles.welcomeText}>Welcome to dashboard</div>
            <div className={styles.headerText}>Your boards</div>

            <div className={styles.boardsList}>
                {boards.map((board) =>
                    <BoardCard
                        key={board.id}
                        board={board}
                    />
                )}
            </div>

            <button onClick={() => dispatch(addBoard(testBoard))}>Add board</button>
            <button></button>
        </div>
    );
}

export default HelloPage;