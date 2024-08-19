import styles from '../styles/BooksCard.module.css'
import BooksCard from "../components/BooksCard";
import { books } from "../CONSTANTS/data";

export default function Main() {
  return (
    <div className={`flex justify-center flex-wrap gap-10 gap-y-20 m-5 my-16 p-5 ${styles.main}`}>
      {books.map((book,index) => {
        return <BooksCard key={index} book={book} index={index}/>
      	})}
    </div>
  )
}