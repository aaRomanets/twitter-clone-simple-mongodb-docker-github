import axios from 'axios'
import 
{
    //вытаскиваем метку запроса на получение профиля данных пользователя по его указанному идентификатору userId 
    GET_PROFILE, 
    //вытаскиваем метку запуска сигнализатора загрузки указанного профиля данных
    LOAD_PROFILE,
    //вытаскиваем метку запроса на получение всех постов с сервера 
    GET_POSTS,   
    //вытаскиваем метку запуска сигнализатора загрузки постов
    LOADING_POSTS, 
    FOLLOW, 
    UNFOLLOW
} 
from '../constants'

//функция запроса на получение профиля данных пользователя по его указанному идентификатору userId
export const getUserProfile = (userId) => dispatch => 
{
    //запускаем сигнализатор получения профиля указанного пользователя с сервера
    dispatch(loadProfile())
    //выполняем get запрос на получение профиля указанного пользователя с сервера
    axios.get(`http://localhost:4020/api/users/${userId}`).then(res => dispatch(
    {
        type: GET_PROFILE,
        //требуемый профиль данных получен и он загружается в store
        payload: res.data 
    }))
    .catch(err => console.log(err))
}

//функция запроса на загрузку постов пользователя с идентификатором userId с сервера
export const getPostsByUserId = (userId) => dispatch => 
{
    //запускаем сигнализатор загрузки указанных постов с сервера
    dispatch(loadPosts())
    //выполняем get запрос на загрузку постов пользователя с идентификатором userId с сервера 
    axios.get(`http://localhost:4020/api/posts/${userId}`).then(res => dispatch(
    {
        type: GET_POSTS,
        //загружены требуемые посты с сервера, они передаются в хранилище
        payload: res.data 
    }))
}

//функция заполнения массивов идентификаторов из моделей данных авторизованного пользователя и 
//пользователя с идентификатором userId
export const followUser = (userId) => dispatch => 
{
    //запрос на добавление пользовательских идентификаторов userId и авторизированного пользователя
    //в массивы моделей соответствующих пользователей
    axios.post('http://localhost:4020/api/users/follow', {userId}).then(res => 
    //процесс прошел успешно
    dispatch(
    {
        type: FOLLOW,
        //пользовательский идентификатор, который загрузим в хранилище store  
        payload: res.data.userId 
    }))
    .catch(err => console.log(err))
}

//функция опустошения массивов идентификаторов из моделей данных авторизованного пользователя и 
//пользователя с идентификатором userId
export const unfollowUser = (userId) => dispatch => 
{
    //запрос на удаление пользовательских идентификаторов userId и авторизированного пользователя
    //из массивов моделей соответствующих пользователей
    axios.post('http://localhost:4020/api/users/unfollow', {userId}).then(res => 
    //процесс прошел успешно
    dispatch(
    {
        type: UNFOLLOW,
        //пользовательский идентификатор, который выгрузим из хранилища store  
        payload: res.data.userId 
    }))
    .catch(err => console.log(err))
}

//функция поиска профиля данных пользователя (включая его посты) по его указанному логину
export const searchUser = (searchData, history) => dispatch => 
{
    //делаем post запрос на поиск профиля данных пользователя (включая его посты) по его указанному логину
    axios.post('http://localhost:4020/api/users/search', searchData).then(res => 
    {
        //профиль данных пользователя (включая его посты) по его указанному логину найден
        //переходим на страницу отображения профиля данных пользователя (включая его посты) по 
        //его определенному идентификатору res.data.userId
        history.push(`/profile/${res.data.userId}`)
    })
    //не получился post запрос на поиск профиля данных пользователя (включая его посты) по его указанному логину
    .catch(err => history.push('/search'))
}

//функция запуска сигнализатора получения профиля указанного пользователя с сервера
export const loadProfile = () => 
{
    return {
        type: LOAD_PROFILE
    }
}

//функция запуска сигнализатора загрузки указанных постов с сервера
export const loadPosts = () => 
{
    return {
        type: LOADING_POSTS
    }
}