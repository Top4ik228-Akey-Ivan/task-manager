import React, { SetStateAction } from 'react';
import styles from './modal.module.css'
import { Dispatch } from 'react';

interface modalProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    children?: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({setIsModalOpen, children}) => {

    return (
        <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
 
export default Modal;