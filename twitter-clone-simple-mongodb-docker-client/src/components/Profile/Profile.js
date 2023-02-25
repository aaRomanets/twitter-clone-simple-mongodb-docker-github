import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { connect } from "react-redux"
import 
{
    //вытаскиваем функцию загрузки постов пользователя по его идентификатору this.props.match.params.userId
    getPostsByUserId, 
    //вытаскиваем функцию профиля данных пользователя по его идентификатору this.props.match.params.userId
    getUserProfile,   
    //вытаскиваем функцию заполнения массивов идентификаторов из моделей данных авторизованного пользователя и 
    //пользователя с идентификатором this.props.match.params.userId
    followUser,   
    //вытаскиваем функцию опустошения массивов идентификаторов из моделей данных авторизованного пользователя и 
    //пользователя с идентификатором this.props.match.params.userId
    unfollowUser 
} from '../../actions/profileActions'

//вытаскиваем страницу отдельного поста
import Post from '../Posts/Post'

//вытаскиваем страницу сигнализатора загрузки постов
import LoadingPosts from '../Posts/LoadingPosts'

//стили страницы отображения профиля пользователя с идентификатором this.props.match.params.userId
const styles = 
{
    paper: 
    {
        padding: 10
    },
    email: 
    {
        color: '#888',
        marginBottom: 10
    },
    detailsBlock: 
    {
        display: 'flex'
    },
    detail: 
    {
        marginRight: 5,
        fontWeight: 'bold'
    },
    detailTitle: 
    {
        marginLeft: 1,
        textTransform: 'uppercase',
        fontSize: 10,
        fontWeight: 'normal'
    },
    btnBlock: 
    {
        width: '100%',
        textAlign: 'right'
    },
    btnFollow: 
    {
        backgroundColor: '#9400D3',
        color: 'white',
        '&:hover': 
        {
            color: '#9400D3',
            borderColor: '#9400D3',
            backgroundColor: 'white'
        }
    }
}

//страница отображения профиля пользователя с идентификатором this.props.match.params.userId
class Profile extends Component 
{
    constructor (props) 
    {
        super(props)

        this.handleFollow = this.handleFollow.bind(this)
        this.handleUnfollow = this.handleUnfollow.bind(this)
    }

    componentDidMount() 
    {
        //загружаем посты указанного пользователя
        this.props.getPostsByUserId(this.props.match.params.userId)
        //загружаем профиль данных указанного пользователя
        this.props.getUserProfile(this.props.match.params.userId)
    }

    componentDidUpdate(prevProps) 
    {
        if (this.props.auth.isAuthenticated) 
        {
            if (prevProps.user && prevProps.user.following !== this.props.user.following) 
            {
                this.props.getUserProfile(this.props.match.params.userId)
            } 
        }
    }

    handleFollow () 
    {
        //подключаем функцию followUser
        this.props.followUser(this.props.match.params.userId)
    }

    handleUnfollow () 
    {
        //подключаем функцию unfollowUser
        this.props.unfollowUser(this.props.match.params.userId)
    }

    render () 
    {
        const 
        {
            //классы стилей этой страницы
            classes, 
            //флаг сигнализатора скачивания списка постов с сервера
            loadingPosts, 
            //флаг сигнализатора скачивания профиля данных пользователя с сервера
            loadingProfile, 
            //список скаченных постов пользователя с идентификатором this.props.match.params.userId 
            list,
            //блок авторизации 
            auth,
            //информация о пользователе с идентификатором this.props.match.params.userId 
            user, 
            //профиль данных пользователя с идентификатором this.props.match.params.userId 
            profile 
        } = this.props

        let followBtns;
        //если существует авторизованный пользователь то составляем блог кнопок действий 
        if (auth.isAuthenticated) 
        {
            if (user && user.following && user.following.indexOf(this.props.match.params.userId) === -1) 
            {
                //кнопка подключения функции followUser
                followBtns = (
                    <div className={classes.btnBlock}>
                        <Button 
                            variant="outlined" 
                            className={classes.btnFollow}
                            onClick={this.handleFollow}
                        >
                            Follow
                        </Button>
                    </div>
                )
            } 
            else 
            {
                //кнопка подключения функции unfollowUser
                followBtns = (
                    <div className={classes.btnBlock}>
                        <Button 
                            variant="outlined" 
                            className={classes.btnFollow}
                            onClick={this.handleUnfollow}
                        >
                            Unfollow
                        </Button>
                    </div>
                )
            }
        }

        let items;
        //формируем список указанных постов
        items = list && list.map(el => <Post key={el._id} post={el}/>)

        //формируем информацию о профиле данных указанного пользователя
        let profileInfo;
        if (profile && items) 
        {
            profileInfo = (
                <Paper className={classes.paper}>
                    <h1 className={classes.login}>{profile.login}</h1>
                    <div className={classes.email}>{profile.email}</div>
                    <div className={classes.detailsBlock}>
                        <div className={classes.detail}>
                            {/*Количество постов указанного пользователя*/}
                            {items.length}
                            <span className={classes.detailTitle}>posts</span>
                        </div>

                        <div className={classes.detail}>
                            {/*Количество идентификаторов пользователей в массиве идентификаторов profile.followers */}
                            {profile.followers.length}
                            <span className={classes.detailTitle}>followers</span>
                        </div>
                        <div className={classes.detail}>
                            {/*Количество идентификаторов пользователей в массиве идентификаторов profile.following */}
                            {profile.following.length}
                            <span className={classes.detailTitle}>following</span>
                        </div>

                        {followBtns}                                     
                    </div>
                </Paper>
            )
        }

        return (
            <div>
                {/*Если флаг сигнализатора скачивания профиля данных указанного пользователя активный то показываем 
                   сам сигнализатор иначе показываем соответствующий профиль данных*/}
                {loadingProfile ? <div>Loading</div> : profileInfo}
                {/*Если флаг сигнализатора скачивания указанных постов активный то показываем 
                   сам сигнализатор иначе показываем список загруженных постов*/}
                {loadingPosts ? <LoadingPosts /> :  items}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //флаг сигнализатора скачивания постов пользователя с идентификатором this.props.match.params.userId 
    loadingPosts: state.post.loading,      
    //список постов пользователя с идентификатором this.props.match.params.userId  
    list: state.post.list,                 
    //профиль данных пользователя с идентификатором this.props.match.params.userId 
    profile: state.profile.user,           
    //флаг сигнализатора скачивания профиля данных пользователя с идентификатором this.props.match.params.userId  
    loadingProfile: state.profile.loading, 
    auth: state.auth,                       
    user: state.auth.user                   
})

//функции getPostsByUserId и getUserProfile скачивания постов и профиля данных  пользователя  по его идентификатору
// this.props.match.params.userId wraps in в props

//результаты state.post.loading, state.post.list, state.profile.user и state.profile.loading из store 
//от функций getPostsByUserId и getUserProfile приходят в mapStateToProps

//функции  followUser и unfollowUser оборачиваем в props

//в mapStateToProps приходят результаты из store от этих функций в виде state.auth и state.auth.user 

//c помощью withStyles связываем стили с props
export default connect(mapStateToProps, 
{
    getPostsByUserId, 
    getUserProfile, 
    followUser, 
    unfollowUser
})(withStyles(styles)(Profile));