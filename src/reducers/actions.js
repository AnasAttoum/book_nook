import { ADD_DEADLINE, ADD_LIBRARY_CARD_INFORMATION, ADD_ORDER_TO_HISTORY, ADD_PERSONAL_INFORMATION, ADD_TO_CART, DELETE_FROM_CART, RESET_CART, RETURN_BOOKS } from "./actionTypes";


// Cart Actions
export const addToCart = (index, quantity) => ({
    type: ADD_TO_CART,
    payload: {
        index: index,
        quantity: quantity
    },
});

export const deleteFromCart = (index) => ({
    type: DELETE_FROM_CART,
    payload: index,
});


export const addDeadline = (deadline) => ({
    type: ADD_DEADLINE,
    payload: deadline,
});

export const resetCart = () => ({
    type: RESET_CART
});


// Personal Data Actions
export const addPersonalInformation = (data) => ({
    type: ADD_PERSONAL_INFORMATION,
    payload: data,
});

export const addLibraryCardInformation = (data) => ({
    type: ADD_LIBRARY_CARD_INFORMATION,
    payload: data,
});


// Order History
export const addOrderToHistory = (libraryCardInformation, cart, deadline) => ({
    type: ADD_ORDER_TO_HISTORY,
    payload: {
        libraryCardInformation: libraryCardInformation,
        cart: cart,
        date: new Date(),
        deadline: deadline
    },
});


export const returnBooks = (index) => ({
    type: RETURN_BOOKS,
    payload: index,
});