import React from "react";

import styles from './helloPage.module.css'

import { useSelector } from "react-redux";
import {  RootState } from "../../redux/store";

import BoardCard from "../../components/boardCard/boardCard";
import AddBoardBtn from "../../components/addBoardBtn/addBoardBtn";

const HelloPage: React.FC = () => {

    const boards = useSelector((state: RootState) => state.boards.boards)

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

            <AddBoardBtn/>
        </div>
    );
}

export default HelloPage;