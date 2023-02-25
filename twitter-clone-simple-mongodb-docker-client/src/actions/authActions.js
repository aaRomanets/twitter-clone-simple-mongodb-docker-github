import axios from 'axios'
import 
{ 
    //вытаскиваем метку ошибок
    GET_ERRORS, 
    //вытаскиваем метку отправления в хранилище store данных об авторизованном пользователе
    SET_CURRENT_USER 
} from "../constants";
import setAuthHeader from '../utils/setAuthHeader';

//функция запроса на авторизацию пользователя
export const loginUser = (userData)  => dispatch => 
{
    //запрос на сервер по авторизации зарегистрированного пользователя
    axios.post('http://localhost:4020/api/users/login',userData).then(res => 
    {
        //в случае успеха вытаскиваем токен авторизации зарегистрированного пользователя
        const {token} = res.data;
        //пишем этот токен в localStorage через запись jwtToken
        localStorage.setItem('jwtToken',token);
        //Формируем state.auth на основании token в store по authReducer 
        setAuthHeader(token);
        //получаем всю информацию об авторизованном пользователе
        dispatch(getCurrentUser());
    })
    //переходим в errorReducer в случае неудачной авторизации
    .catch(err => 
    {
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//функция запроса на регистрацию пользователя
export const registerUser = (userData,history) => dispatch => 
{
    //по axios делаем post запрос на сервер по регистрации пользователя
    axios.post('http://localhost:4020/api/users/register',userData)
    //в случае успеха переходим на страницу авторизации пользователя /login 
    .then(res => history.push('/login'))
    //переходим в errorReducer в случае неудачной регистрации
    .catch(err => dispatch(
    {
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//функция получения с сервера информации об авторизованном пользователе
export const getCurrentUser = () => dispatch => 
{
    //получаем информацию об авторизованном пользователе с сервера и отправляем ее в хранилище store
    axios.get('http://localhost:4020/api/users').then(res => dispatch(setCurrentUser(res.data)))
}

//функция отправления информации об авторизованном пользователе в хранилище store
export const setCurrentUser = (data) => 
{
    return {
        type: SET_CURRENT_USER,
        payload: data
    }
}

//функция отмены регистрации пользователя
export const logoutUser = () => dispatch => 
{
    //отменяем авторизацию пользователя по jwtToken
    localStorage.removeItem('jwtToken')
    //Формируем пустой state.auth по token в store по authReducer 
    setAuthHeader()
    //закачиваем в хранилище пустую информацию о пользователе
    dispatch(setCurrentUser())    
}