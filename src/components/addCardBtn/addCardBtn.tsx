import React, { Dispatch, SetStateAction, useState } from "react";

import styles from './addCardBtn.module.css'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ICard, ITask, priorityType, sectionType } from "../../types/types";

import Modal from "../modal/modal";
import { addCard } from "../../redux/boards/actions";

interface AddCardBrnProps {
    boardId: number;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCardBtn: React.FC<AddCardBrnProps> = ({ boardId, isModalOpen, setIsModalOpen }) => {

    const [title, setTitle] = useState<string>('')
    const [section, setSection] = useState<sectionType>('Work')
    const [tasks, setTasks] = useState<ITask[]>([])
    const [taskText, setTaskText] = useState<string>('')
    const [deadline, setDeadline] = useState<Date>(new Date)
    const [priority, setPriority] = useState<priorityType>('🟢 Low')

    const dispatch: AppDispatch = useDispatch()

    const saveTask = () => {
        const savedTask: ITask = {
            id: Math.random(),
            text: taskText,
            done: false,
        }
        setTasks((prevTasks) => [...prevTasks, savedTask]) // Добавление задачи
        setTaskText('') // Очищаем поле ввода задачи
    }

    const addTask = () => {
        const testCard: ICard = {
            id: new Date().getTime(),
            title: title,
            section: section,
            tasks: tasks,
            status: 'In Progress',
            deadline: deadline,
            priority: priority,
        }
        if (tasks.length === 0 || !title) {
            return alert('Enter tasks and title')
        }
        dispatch(addCard(boardId, testCard)) // Добавляем карточку в Redux
        setTitle('')
        setTasks([])
        setPriority('🟢 Low')
        setDeadline(new Date)
        setIsModalOpen(false) // Закрываем модалку
    }

    return (
        <>
            <button
                onClick={() => {
                    setIsModalOpen(true) // Открываем модалку
                }}
                className={styles.addButton}
            >
                Add card
            </button>

            {isModalOpen &&
                <Modal setIsModalOpen={setIsModalOpen}>
                    <div className={styles.addModal}>
                        <input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />

                        <div className={styles.selectBox}>
                            <div>
                                <div className={styles.textInfo}>Section</div>
                                <select
                                    onChange={(e) => setSection(e.target.value as sectionType)} name="section"
                                >
                                    <option value="Work">Work</option>
                                    <option value="Study">Study</option>
                                    <option value="Home">Home</option>
                                    <option value="Health">Health</option>
                                    <option value="Creativity">Creativity</option>
                                </select>
                            </div>

                            <div>
                                <div className={styles.textInfo}>Priority</div>
                                <select
                                    onChange={(e) => setPriority(e.target.value as priorityType)}
                                    name="priority"
                                >
                                    <option>🟢 Low</option>
                                    <option>🟡 Medium</option>
                                    <option>🔴 High</option>
                                    <option>🚨 Critacal</option>
                                    <option>💤 Low effort</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className={styles.textInfo}>Task`s text</div>
                            <div className={styles.selectBox}>
                                <input
                                    placeholder="Task"
                                    type="text"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                />
                                <button 
                                    className={styles.saveBtn} 
                                    onClick={saveTask}
                                >
                                    Save Task
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className={styles.textInfo}>Task`s text</div>
                            <input
                                className={styles.dateInput}
                                type="date"
                                value={deadline.toISOString().split('T')[0]}
                                onChange={(e) => setDeadline(new Date(e.target.value))}
                            />
                        </div>
                    </div>

                    <button className={styles.addCardBtn} onClick={addTask}>Add Card</button>
                </Modal>
            }
        </>
    );
}

export default AddCardBtn;
