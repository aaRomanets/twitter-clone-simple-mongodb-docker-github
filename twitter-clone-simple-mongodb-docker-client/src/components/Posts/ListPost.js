import React, {Component} from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

//вытаскиваем страницу добавления поста авторизованного пользователя
import AddPost from './AddPost'

//вытаскиваем компонент поста
import Post from './Post'

import { connect } from 'react-redux'

//вытаскиваем функции получения постов
import 
{ 
    // getPosts функция получения постов со всех пользователей
    getPosts, 
    //getPostsByFolowingUsers функция получения постов идентификаторы пользователей которых
    //соответствуют пользовательским идентификаторам массива following модели базы данных авторизованного пользователя на сервере
    getPostsByFolowingUsers 
} from '../../actions/postActions'

//вытаскиваем сигнализатор загрузки постов
import LoadingPosts from './LoadingPosts'

//класс страницы списка постов
class ListPost extends Component 
{
    constructor (props) 
    {
        super(props)

        this.state = 
        {
            //флаг с каких функций загружать посты с функции getPosts или с функции getPostsByFolowingUsers
            allPosts: true 
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) 
    {
        //определяем флаг с каких функций загружать посты с функции getPosts или с функции getPostsByFolowingUsers
        this.setState({allPosts: event.target.checked})
    }

    componentDidMount() 
    {
        //загружаем все посты в начале
        this.props.getPosts()
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (prevState.allPosts !== this.state.allPosts) 
        {
            //в зависимости от значения логического флага this.state.allPosts определяем по
            //каким функциям запроса будем скачивать посты с сервера 
            this.state.allPosts ? this.props.getPosts() : this.props.getPostsByFolowingUsers()
        }
    }

    render () 
    {
        //вытаскиваем список из props загруженных
        const {list, loading} = this.props;
        //флаг показа постов либо все посты либо посты с меткой follow
        const {allPosts} = this.state;

        //фиксируем все загруженные посты
        const items = list && list.map(el => <Post key={el._id} post={el}/>)

        return (
            <div>
                {/*Страница формирования нового поста авторизованного пользователя */}
                <AddPost />
                {/*Контролируем определенные значения логического флага  this.state.allPosts */}
                <FormControlLabel
                    control = {
                        <Switch checked={allPosts} onChange={this.handleChange}/>
                    }
                    label={allPosts ? 'All posts' : 'From following users'}
                />
                {/*Либо показываем сигнализатор загрузки постов либо сами загруженные посты*/}
                {loading ? <LoadingPosts/> : items}
            </div>
        )
    }
}

const mapStateToProps = (state) => (
{
    //полученный список скачиваемых указанных постов из store
    list: state.post.list,             
    //флаг сигнализатора скачивания указанных постов из store
    loading: state.post.loading        
})

//функции getPosts и getPostsByFolowingUsers запроса на скачивание указанных постов оборачиваем в props

//на выходе list и loading получаем в mapStateToProps и функции запроса на скачивание постов
//this.props.getPosts и this.props.getPostsByFolowingUsers
export default connect(mapStateToProps, {getPosts, getPostsByFolowingUsers}) (ListPost)