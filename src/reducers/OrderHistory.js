import { ADD_ORDER_TO_HISTORY, RETURN_BOOKS } from "./actionTypes"

const order = []

export default function OrderHistory(state = order, action) {
    switch (action.type) {
        case ADD_ORDER_TO_HISTORY:
            return [...state, {
                libraryCardInformation: { ...action.payload.libraryCardInformation },
                cart: [...action.payload.cart],
                date: action.payload.date,
                deadline: action.payload.deadline,
                returned: false
            }]

        case RETURN_BOOKS:
            return state.map((order, index) => {
                if (index === action.payload)
                    return { ...order, returned: true }
                else
                    return order
            })

        default:
            return state
    }
}
