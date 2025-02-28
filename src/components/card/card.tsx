import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ICard, ITask } from "../../types/types";
import styles from "./card.module.css";
import React, { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { removeCard, toggleTask } from "../../redux/cards/actions";

import pensil from "../../assets/icons/pensil.png";

interface CardProps {
    card: ICard;
    onDragStart: (card: ICard) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
}

const Card: React.FC<CardProps> = ({ card, onDragStart, onDragOver, onDrop }) => {
    const dispatch: AppDispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const btnClick = (task: ITask) => {
        dispatch(toggleTask(card.id, task.id));
    };

    const handleRemoveCard = () => {
        dispatch(removeCard(card));
    };

    return (
        <motion.div
            className={styles.card}
            draggable
            onDragStart={() => onDragStart(card)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, card)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <div className={card.status === "In Progress" ? styles.header : styles.header_done}>
                <div className={styles.headerTitle}>{card.title}</div>

                <div className={styles.settingsBox}>
                    <img
                        className={styles.editImg}
                        src={pensil}
                        alt="Edit"
                        onClick={() => setIsSettingsOpen((prev) => !prev)}
                    />

                    {isSettingsOpen && (
                        <div className={styles.fieldsBox}>
                            <div className={styles.settingsField}>Edit</div>
                            <div
                                onClick={handleRemoveCard}
                                className={styles.settingsField}
                                style={{ color: "red" }}
                            >
                                Delete
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.tasksBox}>
                {card.tasks.map((task) => (
                    <div key={task.id} className={styles.task}>
                        <div className={styles.taskText}>{task.text}</div>
                        {card.status === 'Done'
                            ?
                            <button
                                className={styles.cardButtonDone}
                                onClick={() => btnClick(task)}
                            />
                            :
                            <button
                                className={task.done ? styles.taskButtonDone : styles.taskButton}
                                onClick={() => btnClick(task)}
                            />
                        }
                    </div>
                ))}
            </div>

            <div className={styles.info}>
                <div className={card.deadline < new Date() ? styles.deadline : ''}>
                    🕒{" "}
                    {card.deadline.toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </div>
                <div className={styles.priority}>{card.priority}</div>
            </div>
        </motion.div>
    );
};

export default Card;
