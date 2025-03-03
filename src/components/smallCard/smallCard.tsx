import React from "react";

import styles from './smallCard.module.css'

interface smallCardProps {
    title: string;
}

const SmallCard: React.FC<smallCardProps> = ({title}) => {
    return (
        <div className={styles.smallCard}>
            <div className={styles.cardTitle}>{title}</div>
        </div>
    );
}
 
export default SmallCard;