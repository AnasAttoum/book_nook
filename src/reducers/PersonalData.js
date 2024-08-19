import { ADD_LIBRARY_CARD_INFORMATION, ADD_PERSONAL_INFORMATION } from "./actionTypes"

const Data = {
    personalInformation: {
        fName: '',
        lName: '',
        phone: '',
        address: '',
    },
    libraryCardInformation: {
        username: '',
        cardNumber: ''
    }
}

export default function PersonalData(state = Data, action) {
    switch (action.type) {

        case ADD_PERSONAL_INFORMATION:
            return {
                ...state, personalInformation: {
                    fName: action.payload.fName,
                    lName: action.payload.lName,
                    phone: action.payload.phone,
                    address: action.payload.address
                }
            }

        case ADD_LIBRARY_CARD_INFORMATION:
            return {
                ...state, libraryCardInformation: {
                    username: action.payload.userName,
                    cardNumber: action.payload.cardNumber
                }
            }

        default:
            return state
    }
}
