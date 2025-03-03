import styles from "./cardsList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useMemo, useState } from "react";
import Card from "../card/card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import AddCardBtn from "../addCardBtn/addCardBtn";
import { IBoard, ICard } from "../../types/types";
import { updateCardsOrder } from "../../redux/boards/actions";

interface CardListProps {
    activeSection: string;
    board: IBoard;
}

const CardsList: React.FC<CardListProps> = ({ activeSection, board }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [draggedCard, setDraggedCard] = useState<ICard | null>(null);
    const [filteredText, setFilteredText] = useState<string>('')

    const dispatch: AppDispatch = useDispatch();
    const cards = board?.cards

    const sortedCards = useMemo(() => {
        return activeSection === "All" 
            ? cards ?? [] 
            : (cards ?? []).filter((card) => card.section === activeSection);
    }, [cards, activeSection])

    const sortedAndFilteredCards = useMemo(() => {
        return sortedCards.filter((card) => card.title.includes(filteredText))
    }, [sortedCards, filteredText])

    const handleDragStart = (card: ICard) => {
        setDraggedCard(card);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCard: ICard) => {
        e.preventDefault();

        if (!draggedCard || draggedCard.id === targetCard.id) return;

        const updatedCards = [...(cards ?? [])];

        const draggedIndex = updatedCards.findIndex((c) => c.id === draggedCard.id);
        const targetIndex = updatedCards.findIndex((c) => c.id === targetCard.id);

        updatedCards.splice(draggedIndex, 1);
        updatedCards.splice(targetIndex, 0, draggedCard);

        dispatch(updateCardsOrder(board.id, updatedCards));
        setDraggedCard(null);
    };

    return (
        <>
            <input 
                type="text" placeholder="Search" 
                value={filteredText}
                onChange={(e) => setFilteredText(e.target.value)}
            />

            <div className={styles.cardsList}>
                <AnimatePresence mode="popLayout">
                    {sortedAndFilteredCards?.map((card) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            layout // Включаем анимацию при изменении расположения
                            transition={{ duration: 0.3 }}
                        >
                            <Card
                                board={board}
                                card={card}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AddCardBtn 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
                boardId={board.id}
            />
        </>
    );
};

export default CardsList;
