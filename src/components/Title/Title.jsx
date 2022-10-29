import React from 'react'
import styles from './Title.module.scss'

const Title = ({title}) => {
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

export default Title