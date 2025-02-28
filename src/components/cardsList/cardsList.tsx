import styles from "./cardsList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import AddCardBtn from "../addCardBtn/addCardBtn";
import { updateCardsOrder } from "../../redux/cards/actions";
import { ICard } from "../../types/types";

interface CardListProps {
    activeSection: string;
}

const CardsList: React.FC<CardListProps> = ({ activeSection }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [draggedCard, setDraggedCard] = useState<ICard | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.cards.cards);

    const filteredCards =
        activeSection === "All" ? cards : cards.filter((card) => card.section === activeSection);

    const handleDragStart = (card: ICard) => {
        setDraggedCard(card);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCard: ICard) => {
        e.preventDefault();

        if (!draggedCard || draggedCard.id === targetCard.id) return;

        const updatedCards = [...cards];
        const draggedIndex = updatedCards.findIndex((c) => c.id === draggedCard.id);
        const targetIndex = updatedCards.findIndex((c) => c.id === targetCard.id);

        updatedCards.splice(draggedIndex, 1);
        updatedCards.splice(targetIndex, 0, draggedCard);

        dispatch(updateCardsOrder(updatedCards));
        setDraggedCard(null);
    };

    return (
        <>
            <div className={styles.cardsList}>
                <AnimatePresence mode="popLayout">
                    {filteredCards.map((card) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            layout // Включаем анимацию при изменении расположения
                            transition={{ duration: 0.3 }}
                        >
                            <Card
                                card={card}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AddCardBtn isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};

export default CardsList;
