import styles from '../styles/ServiceCard.module.css'

export default function ServiceCard({ title, description,icon }) {
    return (
        <div className={`flex flex-col justify-evenly items-center p-5 text-center rounded-lg ${styles.container}`}>
            <div className={styles.icon} style={{ backgroundImage: icon }}></div>
            <div>{title}</div>
            <div>{description}</div>
        </div>
    )
}