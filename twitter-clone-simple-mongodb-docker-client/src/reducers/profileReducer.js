import {
    //вытаскиваем метку запуска сигнализатора загрузки указанного профиля данных
    LOAD_PROFILE,
    //вытаскиваем метку запроса на получение профиля данных пользователя по его указанному идентификатору userId
    GET_PROFILE  
} from '../constants'

//начальное состояние
const initialState = {
    //флаг загрузки профиля данных указанного пользователя (он false в начальный момент времени)
    loading: false,
    //сам профиль данных указанного пользователя (он пустой в начальный момент времени)
    user: null 
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            return {
                ...state,
                //загружается профиль данных указанного пользователя
                loading: true 
            }
        case GET_PROFILE:
            return {
                ...state,
                //профиль данных указанного пользователя успешно загружен или не загружался
                loading: false, 
                //сам загруженный с сервера профиль данных указанного пользователя в хранилище store 
                user: action.payload 
            }
        default:
            return state
    }
}

export default profileReducer;