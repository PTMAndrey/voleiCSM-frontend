import React from 'react'
import styles from './Titlu.module.scss'

const Titlu = ({title}) => {
    return (
        <div className={styles.title}>
            <span className={styles.linie1} />
            <span>
                <h3>{title}</h3>
            </span>
            <span className={styles.linie2} />
        </div>
    )
}

export default Titlu