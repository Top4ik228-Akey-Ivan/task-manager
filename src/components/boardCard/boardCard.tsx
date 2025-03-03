import React, { useMemo } from "react";

import styles from './boardCard.module.css'
import { motion } from "framer-motion";

import { IBoard } from "../../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { removeBoard } from "../../redux/boards/actions";
import { useNavigate } from "react-router";
import SmallCard from "../smallCard/smallCard";

interface boardCardProps {
    board: IBoard;
}

const BoardCard: React.FC<boardCardProps> = ({ board }) => {

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()


    const activeCards = useMemo(() => {
        return board.cards.filter((card) => card.status === 'In Progress')
    }, [board.cards])

    const deleteBoard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(removeBoard(board.id));
    }

    return (
        <motion.div 
            className={styles.boardCard} 
            onClick={() => navigate(`/boards/${board.id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.headerText}>📌 {board.title}</div>
            <button
                onClick={(e) => deleteBoard(e)}
                className={styles.deleteBtn}
                title='Delete board'
            >
                ❌
            </button>

            <div className={styles.activeTasks}>
                <div className={styles.totalCards}>
                    {activeCards.length ? activeCards.length : 'No'} active cards
                </div>

                <ul className={styles.activeCards}>
                    {activeCards.map((card) =>
                        <SmallCard
                            key={card.id}
                            title={card.title}
                        />
                    )}
                </ul>
            </div>

        </motion.div>
    );
}

export default BoardCard;