import { useParams } from "react-router-dom"

import { books } from "../CONSTANTS/data"
import styles from '../styles/Book.module.css'

export default function Book() {

    const { index } = useParams()
    const { name, image, pages, author, description } = books[index]

    return (
        <>
            <div className={`flex justify-evenly items-center m-5 ${styles.container}`}>
                <img src={image} alt={name} className={styles.img} />
                <div className={`flex flex-col justify-center items-center gap-10 ${styles.titles}`}>
                    <div style={{ fontSize: '35px', color: 'var(--primary)' }}>{name} <span style={{ fontSize: '20px', color: '#333' }}>( {pages} Pages )</span></div>
                    <div>By: {author}</div>

                    <div className={`p-5 ${styles.desc}`}>
                        <div style={{ fontSize: '35px' }}>About This Book:</div>
                        <div className="text-justify">{description}</div>
                    </div>
                </div>
            </div>

        </>
    )
}