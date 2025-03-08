import React, {  useState } from "react";
import { IBoard } from "../../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addBoard } from "../../redux/boards/actions";
import Modal from "../modal/modal";

import styles from './addBoardBtn.module.css'

const AddBoardBtn: React.FC = () => {

    const [boardTitle, setBoardTitle] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const dispatch: AppDispatch = useDispatch()

    const handleAddBoard = () => {
        const newBoard: IBoard = {
            id: new Date().getTime(),
            title: boardTitle,
            cards: []
        }
        dispatch(addBoard(newBoard))
        setBoardTitle('')
        setIsModalOpen(false)
    }

    return (
        <div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className={styles.addButton}
            >
                Add board
            </button>

            {isModalOpen &&
                <Modal
                    setIsModalOpen={setIsModalOpen}
                >
                    <input
                        type="text"
                        placeholder="Board title"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                    />
                    <button 
                        onClick={() => handleAddBoard()}
                        className={styles.addBoardBtn}
                    >
                        Add board
                    </button>
                </Modal>
            }

        </div>
    );
}

export default AddBoardBtn;