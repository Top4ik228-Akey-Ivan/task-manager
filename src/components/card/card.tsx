import { useDispatch } from 'react-redux';
import { ICard, ITask } from '../../types/types';
import styles from './card.module.css'

import React, { useState } from "react";
import { AppDispatch } from '../../redux/store';
import { removeCard, toggleTask } from '../../redux/cards/actions';

import pensil from '../../assets/icons/pensil.png'

interface cardProps {
    card: ICard;
}

const Card: React.FC<cardProps> = ({ card }) => {

    const dispatch: AppDispatch = useDispatch();

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

    const btnClick = (task: ITask) => {
        dispatch(toggleTask(card.id, task.id))
    }

    const handelRemoveCard = (card: ICard) => {
        dispatch(removeCard(card))
    }


    return (
        <div className={styles.card}>
            <div
                className={card.status === 'In Progress' ? styles.header : styles.header_done}
            >
                <div className={styles.headerTitle}>{card.title}</div>

                <div className={styles.settingsBox}>
                    <img
                        className={styles.editImg} src={pensil} alt=""
                        onClick={() => setIsSettingsOpen((prev) => !prev)}
                    />

                    {isSettingsOpen && (
                        <div className={styles.fieldsBox}>
                            <div className={styles.settingsField}>Edit</div>
                            <div 
                                onClick={() => handelRemoveCard(card)} 
                                className={styles.settingsField}
                                style={{color: 'red'}}
                            >
                                Delete
                            </div>
                        </div>
                    )}

                </div>

            </div>

            <div className={styles.tasksBox}>
                {card.tasks.map((task) =>
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
                )}
            </div>

            <div className={styles.info}>
                <div className={styles.deadlline}
                >
                    🕒 {card.deadline.toLocaleString(
                        "ru-RU",
                        { day: "2-digit", month: "2-digit", year: "numeric" })
                    }
                </div>
                <div className={styles.priority}>{card.priority}</div>
            </div>
        </div>
    );
}

export default Card;