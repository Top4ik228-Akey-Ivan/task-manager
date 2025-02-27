import React, { Dispatch, SetStateAction } from "react";

import styles from './navbar.module.css'

interface NavbarProps {
    activeSection: string;
    setActiveSection: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({activeSection, setActiveSection}) => {

    const sections = ['All', 'Work', 'Study', 'Home', 'Health', 'Creativity']

    return (
        <header>
            <ul className={styles.navbar}>
                {sections.map((section) => 
                    <li 
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={section === activeSection ? styles.activeSection : ''}
                    >
                        {section}
                    </li>
                )}
            </ul>
        </header>
    );
}
 
export default Navbar;