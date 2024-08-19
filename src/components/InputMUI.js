import * as React from 'react';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputMUI({title,helperText,currentRef}) {
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
    return (
        <ThemeProvider theme={theme}>

            <TextField id={title} sx={{width:'50vw',marginTop:'25px'}} inputRef={currentRef} label={title} className='m-5' variant="outlined" color='primary' helperText={helperText} required/>
        </ThemeProvider>
    )
}