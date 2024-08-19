import { ADD_DEADLINE, ADD_TO_CART, DELETE_FROM_CART, RESET_CART } from "./actionTypes"

const cartDetails = {
    cart: [],
    deadline: ''
}

export default function Cart(state = cartDetails, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.cart.filter(el => { return el.index === action.payload.index }).length !== 0)
                return {
                    ...state, cart: state.cart.map((book) => {
                        if (book.index === action.payload.index)
                            if (book.quantity === 1 && action.payload.quantity === -1)
                                return { ...book, quantity: book.quantity }
                            else
                                return { ...book, quantity: book.quantity + action.payload.quantity }
                        else
                            return book
                    })
                }
            else
                return {
                    ...state, cart: [...state.cart, {
                        index: action.payload.index,
                        quantity: action.payload.quantity
                    }]
                }

        case DELETE_FROM_CART:
            return {
                ...state, cart: state.cart.filter(book => {
                    return book.index !== action.payload
                })
            }

        case ADD_DEADLINE:
            return {
                ...state, deadline: action.payload
            }

        case RESET_CART:
            return {
                cart: [],
                deadline: ''
            }

        default:
            return state
    }
}
