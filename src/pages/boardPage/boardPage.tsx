import React, { useState } from "react";
import CardsList from "../../components/cardsList/cardsList";
import Navbar from "../../components/navbar/navbar";
import { sectionType } from "../../types/types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BoardPage: React.FC = () => {

    const [activeSection, setActiveSection] = useState<sectionType>('All')
    const { id } = useParams()

    const boards = useSelector((state: RootState) => state.boards.boards)
    const currentBoard = boards.find((board) => board.id === Number(id))

    if (!currentBoard) {
        return <div>Доска не найдена</div>;
    }

    return (
        <>
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <CardsList activeSection={activeSection} board={currentBoard}/>
        </>
    );
}

export default BoardPage;