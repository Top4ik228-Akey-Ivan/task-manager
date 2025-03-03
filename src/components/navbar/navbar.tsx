import React, { Dispatch, SetStateAction } from "react";

import styles from './navbar.module.css'
import { sectionType } from "../../types/types";

interface NavbarProps {
    activeSection: sectionType;
    setActiveSection: Dispatch<SetStateAction<sectionType>>;
}

const Navbar: React.FC<NavbarProps> = ({activeSection, setActiveSection}) => {

    const sections: sectionType[] = ['All', 'Work', 'Study', 'Home', 'Health', 'Creativity']

    return (
        <header>
            <ul className={styles.navbar}>
                {sections.map((section) => 
                    <li
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={section === activeSection 
                            ? [styles.section, styles.activeSection].join(' ') 
                            : styles.section
                        }
                    >
                        {section}
                    </li>
                )}
            </ul>
        </header>
    );
}
 
export default Navbar;