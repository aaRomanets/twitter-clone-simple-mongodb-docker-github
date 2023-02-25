import 
{
    //вытаскиваем метку запроса на добавление нового поста в хранилище store
    ADD_POST, 
    //вытаскиваем метку проведения процесса загрузки постов
    LOADING_POSTS, 
    //вытаскиваем метка запроса на получение всех постов с сервера 
    GET_POSTS 
} from '../constants'


const initialState = 
{
    //в начальный момент времени хранилище постов пустое
    list: null,    
    //процесс скачивания постов с сервера в начальный момент времени не выполняется
    loading: false 
}

const postReducer = (state = initialState, action) => 
{
    switch (action.type) 
    {
        //в хранилище добавился новый пост авторизованного пользователя
        case ADD_POST: 
            return {
                ...state,
                //новый пост авторизованного пользователя добавлен в хранилище store
                list: [action.payload, ...state.list] 
            }
        //идет процесс скачивания постов с сервера
        case LOADING_POSTS:
            return {
                ...state,
                //идет процесс скачивания постов с сервера
                loading: true
            }
        //получили все указанные посты и поместили их в хранилище
        case GET_POSTS:
            return {
                ...state,
                //процесс скачивания постов с севера окончился
                loading: false,
                //список всех указанных скаченных постов с сервера
                list: action.payload 
            }     
        default: 
            return state
    }
}

export default postReducer;