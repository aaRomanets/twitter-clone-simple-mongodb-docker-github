import axios from "axios"
import 
{
    //вытаскиваем метку запроса на добавление нового поста в хранилище store
    ADD_POST, 
    //вытаскиваем метку запроса на получение всех постов с сервера
    GET_POSTS,
    //вытаскиваем метку запуска сигнализатора загрузки постов
    LOADING_POSTS 
} from '../constants'

//функция запроса на формирование нового поста авторизованного пользователя
export const addPost = postData => dispatch => 
{
    //post запрос на формирование нового поста авторизованного пользоателя
    axios.post('http://localhost:4020/api/posts/add', postData).then(res => dispatch(
    {
        type: ADD_POST,
        //новый пост авторизованного пользователя сформирован, res.data - его данные
        //этот пост отправляем в хранилище store
        payload: res.data
    }))
    .catch(err => console.log(err))
}

//функция запроса на получение всех постов с сервера
export const getPosts = () => dispatch => 
{
    //запускаем сигнализатор загрузки указанных постов с сервера
    dispatch(loadPosts)
    //get запрос на получение всех постов с сервера
    axios.get('http://localhost:4020/api/posts').then(res => dispatch(
    {
        type: GET_POSTS,
        //полученные все посты с сервера, их мы отправляем в хранилище store
        payload: res.data
    }))
    .catch(err => console.log(err))
}

//функция запроса на получения постов идентификаторы пользователей которых
//соответствуют пользовательским идентификаторам массива following модели базы данных авторизованного пользователя на сервере
export const getPostsByFolowingUsers = () => dispatch => 
{
    //запускаем сигнализатор загрузки указанных постов с сервера
    dispatch(loadPosts)
    axios.get('http://localhost:4020/api/posts/following').then(res => dispatch(
    {
        type: GET_POSTS,
        //полученные требуемые посты с сервера, их мы отправляем в хранилище store
        payload: res.data
    }))
    .catch(err => console.log(err))
}

//функция запуска сигнализатора загрузки указанных постов с сервера
export const loadPosts = () => 
{
    return {
        type: LOADING_POSTS
    }
}