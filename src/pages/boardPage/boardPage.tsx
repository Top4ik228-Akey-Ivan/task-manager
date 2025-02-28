import React, { useState } from "react";
import CardsList from "../../components/cardsList/cardsList";
import Navbar from "../../components/navbar/navbar";
import { sectionType } from "../../types/types";

const BoardPage: React.FC = () => {

    const [activeSection, setActiveSection] = useState<sectionType>('All')

    return (
        <>
            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <CardsList activeSection={activeSection} />
        </>
    );
}

export default BoardPage;