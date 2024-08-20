import * as React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from '../styles/BooksCard.module.css'
import BooksCard from "../components/BooksCard";
import { books } from "../CONSTANTS/data";

export default function Main() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#197278',
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "red",
            marginTop: '5px'
          }
        }
      }
    }
  });

  const [viewBook, setViewBook] = React.useState(books)

  const search = (value) => {
    setViewBook(books.filter((book) => { return book.name.toLowerCase().includes(value.toLowerCase()) }))
  }
  return (
    <>
      <div className='flex justify-center m-5'>
        <ThemeProvider theme={theme}>
          <TextField id='search' sx={{ width: '50vw', marginTop: '25px' }} fullWidth label='Search' className='m-5' variant="outlined" color='primary' onChange={(e) => search(e.target.value)} />
        </ThemeProvider>
      </div>
      <div className={`flex justify-center flex-wrap gap-10 gap-y-20 m-5 my-16 p-5 ${styles.main}`} style={{minHeight:'45vh'}}>
        {viewBook.length === 0 ?
          <>
            <iframe style={{ width: '100vw', height: '40vh' }} title='Empty Cart' src='/Images/Empty.svg'></iframe>
            <div className='mt-5 text-center text-2xl' style={{ color: 'var(--primary)' }}>No Book Match Your Search</div>
          </>
          :
          <>
            {viewBook.map((book, index) => {
              return <BooksCard key={index} book={book} index={index} />
            })}
          </>}
      </div>
    </>
  )
}