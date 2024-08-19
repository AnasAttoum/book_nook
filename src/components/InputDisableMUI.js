import * as React from 'react';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputDisableMUI({title,text}) {
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

            <TextField id={title} sx={{width:'50vw',marginTop:'25px'}} value={text} label={title} className='m-5' variant="outlined" color='primary' disabled/>
        </ThemeProvider>
    )
}