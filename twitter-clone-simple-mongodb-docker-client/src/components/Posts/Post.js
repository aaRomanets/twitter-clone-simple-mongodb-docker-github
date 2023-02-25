import React , { Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

//стили страницы показа поста, они через props переходят в classes
const styles = 
{
    paper: 
    {
        padding: 10,
        display: 'flex',
        marginTop: 10,
    },
    avatar: 
    {
        minWidth: 10,
        margin: '4px 10px 4px 4px'
    },
    login: 
    {
        marginBottom: 5
    },
    time: 
    {
        marginLeft: 10,
        color: '#bbb',
        fontSize: 14
    }
}

//класс страницы показа поста
class Post extends Component 
{
    render () 
    {
        //вытаскиваем классы стилей страницы показа поста и сам пост из props
        const { classes, post } = this.props;
        return (
            <Paper className={classes.paper}>
                {/*Аватарка поста*/}
                <div
                    className={classes.avatar}
                    style=
                    {{
                        backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`
                    }}
                />
                <div>
                    <h3 className={classes.login}>
                        {/*Переход на профиль постов пользователя с идентификатором post.user.id*/}
                        <Link to={`/profile/${post.user.id}`}>{post.user.login}</Link>
                        {/*Время создания поста*/}                         
                        <span className={classes.time}>{(new Date(post.createdAt)).toLocaleString()}</span>
                    </h3>
                    {/*Текст поста*/}
                    {post.text}
                </div>
            </Paper>
        )
    }
}

//c помощью withStyles связываем стили с props
export default withStyles(styles)(Post)