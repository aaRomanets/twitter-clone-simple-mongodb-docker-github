import {
    //вытаскиваем метку отправления в хранилище store данных об авторизованном пользователе
    SET_CURRENT_USER,
    //метка добавления пользовательских идентификаторов
    FOLLOW,          
    //метка удаления пользовательских идентификаторов
    UNFOLLOW          
} from '../constants'

const initialState = 
{
    //флаг авторизации пользователя в хранилище store
    isAuthenticated: false,
    //информация об авторизованном пользователе в хранилище store
    user: null             
}

const authReducer = (state = initialState, action) => 
{
    switch (action.type) 
    {
        case SET_CURRENT_USER:
            return {
                ...state,
                // флаг авторизации пользователя
                isAuthenticated: action.payload ? (Object.keys(action.payload).length !== 0) : false, 
                // информация об авторизованном пользователе, если ее нет то это означает, что либо пользователь 
                //не авторизован либо нет зарегистрированного пользователя
                user: action.payload
            }
        case FOLLOW: 
            return {
                ...state,
                user: {
                    ...state.user,
                    //массив идентификаторов пользователей state.user.following дополняем пользовательским идентификатором action.payload
                    following: [...state.user.following, action.payload] 
                }
            }
        case UNFOLLOW: 
            return {
                ...state,
                user: {
                    ...state.user,
                    //из массива идентификаторов пользователей state.user.following удаляем пользовательский идентификатор action.payload
                    following: state.user.following.filter(item => item !== action.payload)
                }
            }
        default:
            return state;
    }
}

export default authReducer;