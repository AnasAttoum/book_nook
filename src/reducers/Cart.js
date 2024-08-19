import { ADD_DEADLINE, ADD_TO_CART, DELETE_FROM_CART, RESET_CART } from "./actionTypes"

const cartDetails = {
    cart: [],
    deadline: ''
}

export default function Cart(state = cartDetails, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.cart.find(el => { return el === action.payload }) === undefined)
                return { ...state, cart: [...state.cart, action.payload] }
            else
                return state

        case DELETE_FROM_CART:
            return {
                ...state, cart: state.cart.filter(book => {
                    return book !== action.payload
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
