import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { books } from '../CONSTANTS/data';
import { addDeadline, addToCart, deleteFromCart } from '../reducers/actions';
import styles from '../styles/Cart.module.css'

export default function Cart() {

    const [period, setPeriod] = React.useState('');
    const [deadline, setDeadline] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [chooseDeadline, setChooseDeadline] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(true)

    const handleChange = (event) => {
        const NOW = new Date()
        setPeriod(Number(event.target.value) || '');
        const newDate = NOW.setDate(NOW.getDate() + Number(event.target.value))
        setDeadline(new Date(newDate))
        setChooseDeadline(true)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const cart = useSelector(state => state.Cart.cart)
    console.log("🚀 ~ Cart ~ cart:", cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const del = (index) => {
        dispatch(deleteFromCart(index))
    }

    const addDeadlineFunc = () => {
        if (chooseDeadline && isChecked) {
            dispatch(addDeadline(deadline))
            navigate('/checkout')
        }
    }

    return (
        <div style={{ minHeight: '80vh' }}>
            {cart.length === 0 ?
                <>
                    <iframe style={{ width: '100vw', height: '70vh' }} title='Empty Cart' src='/Images/Empty.svg'></iframe>
                    <div className='mt-5 text-center text-2xl' style={{ color: 'var(--primary)' }}>No Books Here Yet</div>
                </>
                :
                <div className='p-5'>
                    <div className={`flex justify-between text-2xl p-5 ${styles.header}`} style={{ borderBottom: '1px solid #aaa' }}>
                        <div>Books Cart</div>
                        <div>{cart.length} items</div>
                    </div>

                    <div>
                        <div className={`flex justify-center items-center gap-5 text-lg font-bold my-10 ${styles.headerTable}`}>
                            <div style={{ width: '10%' }}>Picture</div>
                            <div style={{ width: '20%' }}>Title</div>
                            <div style={{ width: '10%' }}>Quantity</div>
                            <div style={{ width: '10%' }}>Pages</div>
                            <div style={{ width: '5%' }}></div>
                        </div>

                        <div className={`flex flex-col gap-5 ${styles.bodyTable}`}>
                            {cart.map((book, index) => {
                                return <div key={index} className='flex justify-center items-center gap-5'>
                                    <div style={{ width: '10%' }}>
                                        <img src={books[book.index].image} alt={books[book.index].name} style={{ height: '100px', borderRadius: '10px' }} />
                                    </div>
                                    <div style={{ width: '20%' }}>{books[book.index].name}</div>
                                    <div className="flex items-center gap-5" style={{ width: '10%' }}>
                                        <svg style={{ cursor: 'pointer' }} onClick={() => { dispatch(addToCart(book.index,-1)) }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#3b82f6" d="M18 16H6c-1.654 0-3-1.346-3-3s1.346-3 3-3h12c1.654 0 3 1.346 3 3s-1.346 3-3 3M6 12c-.551 0-1 .449-1 1s.449 1 1 1h12c.551 0 1-.449 1-1s-.449-1-1-1z" /></svg>
                                        {book.quantity}
                                        <svg style={{ cursor: 'pointer' }} onClick={() => { dispatch(addToCart(book.index,1)) }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill="#3b82f6" d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4zm4 0h-2v5a1 1 0 0 1-1 1H5v2h5a1 1 0 0 1 1 1v5h2v-5a1 1 0 0 1 1-1h5v-2h-5a1 1 0 0 1-1-1z" /></g></svg>
                                    </div>
                                    <div style={{ width: '10%' }}>{books[book.index].pages}</div>
                                    <div style={{ width: '5%', cursor: 'pointer' }} onClick={() => { del(book.index) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#f50a10" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className='flex justify-center my-5'>
                        <div className={`p-2 px-4 ${styles.btn}`} onClick={handleClickOpen}>Continue</div>
                    </div>




                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>Please choose the return period:</DialogTitle>
                        <DialogContent>
                            <Box sx={{ minWidth: 120, marginTop: '20px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Period</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={period}
                                        label="Period"
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiSelect-select': {
                                                color: 'var(--primary)',
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "var(--primary)",
                                            },
                                            color: "white",
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#555',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                color: 'var(--primary)',
                                                borderColor: 'var(--primary)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'var(--primary)',
                                            },
                                        }}
                                    >
                                        <MenuItem value={1}>1 Day</MenuItem>
                                        <MenuItem value={2}>2 Day</MenuItem>
                                        <MenuItem value={3}>3 Day</MenuItem>
                                        <MenuItem value={4}>4 Day</MenuItem>
                                        <MenuItem value={5}>5 Day</MenuItem>
                                        <MenuItem value={6}>6 Day</MenuItem>
                                        <MenuItem value={7}>1 Week</MenuItem>
                                        <MenuItem value={14}>2 Week</MenuItem>
                                        <MenuItem value={21}>3 Week</MenuItem>
                                        <MenuItem value={30}>1 Month</MenuItem>
                                        <MenuItem value={60}>2 Month</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {period !== '' ?
                                <div className='mt-5'>Please return the order before <span style={{ color: 'var(--primary)' }}>{deadline.toDateString()}</span></div>
                                : <></>
                            }
                            <FormGroup sx={{ marginTop: '20px' }}>
                                <FormControlLabel required control={<Checkbox checked={isChecked} onChange={() => { setIsChecked(prev => !prev) }} style={{ color: "var(--primary)", }} />} sx={{ fontSize: '5px' }} label="I agree to the Book Nook’s Terms. " />
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={addDeadlineFunc}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </div>
    )
}