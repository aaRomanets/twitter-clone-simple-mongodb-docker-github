import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'; 
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button'; 
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//вытаскиваем функцию добавления нового поста
import { addPost } from '../../actions/postActions'

//стили страницы добавления нового поста, они через props переходят в classes
const styles = 
{
    paper: 
    {
        padding: 8
    },
    textField: 
    {
        width: '100%'
    },
    button: 
    {
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#800080',
        color: "#fff",
        '&:hover': 
        {
            color: '#800080'
        }
    }
}

//класс страницы добавления нового поста
class AddPost extends Component 
{
    constructor (props) 
    {
        super(props)
        this.state = 
        {
            //текст нового поста авторизованного пользователя
            text: '' 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) 
    {
        //формируем текст нового поста
        this.setState({text: e.target.value})
    }

    handleSubmit (e) 
    {
        e.preventDefault();

        //формируем данные нового поста авторизованного пользователя
        const postData = 
        {
            text: this.state.text
        }

        //формируем новый пост авторизованного пользователя по сформированным данным postData
        this.props.addPost(postData);

        //текст нового поста авторизованного пользователя очищаем
        this.setState({text: ''})
    }

    render () 
    {
        //вытаскиваем из props классы стилей страницы добавления нового поста
        const {classes} = this.props; 
        return (
            <Paper className={classes.paper}>
                {/*Поле ввода текста нового поста авторизованного пользователя */}
                <TextField
                    multiline
                    rowsMax="4"
                    label="What's is new?"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={this.state.text}
                />
                {/*Кнопка формирования нового поста авторизованного пользователя*/}
                <Button 
                    variant="outlined" 
                    className={classes.button}
                    onClick={this.handleSubmit}
                >
                    Send
                </Button>
            </Paper>
        )
    }
}

//функцию запроса на формирование нового поста авторизованного пользователя addPost оборачиваем в props

//c помощью withStyles связываем стили с props
export default connect(null, {addPost})(withStyles(styles)(AddPost));