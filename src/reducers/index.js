import { combineReducers } from "redux"

import Cart from "./Cart"
import PersonalData from "./PersonalData"
import OrderHistory from "./OrderHistory"

export const allReducers = combineReducers({
    Cart: Cart,
    PersonalData:PersonalData,
    OrderHistory:OrderHistory
})