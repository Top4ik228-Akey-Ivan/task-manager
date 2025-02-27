import styles from './cardsList.module.css'

import React, { useState } from "react";

import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddCardBtn from '../addCardBtn/addCardBtn';

interface CardListProps {
    activeSection: string;
}

const CardsList: React.FC<CardListProps> = ({ activeSection }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const cards = useSelector((state: RootState) => state.cards.cards)

    const filteredCards = activeSection === 'All'
        ? cards
        : cards.filter((card) => card.section === activeSection)

    return (
        <>
            <div className={styles.cardsList}>
                {filteredCards.map((card) =>
                    <Card
                        key={card.id}
                        card={card}
                    />
                )}
            </div>

            <AddCardBtn
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

        </>
    );
}

export default CardsList;