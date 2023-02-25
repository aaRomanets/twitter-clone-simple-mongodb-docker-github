import { 
    //вытаскиваем метку ошибок
    GET_ERRORS 
} from "../constants"

const initialState = {}

//редюсер ошибок
const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        default:
            return state
    }
}

export default errorReducer;