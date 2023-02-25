import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';

//вытаскиваем функцию запроса на регистрацию пользователя из "../../actions/authActions"
import { registerUser } from "../../actions/authActions";

//стили страницы регистрации пользователя, они через props переходят в classes
const styles = 
{
    textField: 
    {
        width: '100%',
        marginBottom: 5
    },
    btnBlock: 
    {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    }
}

//класс страницы регистрации пользователя
class Register extends Component 
{
    constructor (props) 
    {
        super(props);
        //состояние данных регистрируемого пользователя
        this.state = 
        {
            email: '',
            login: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.errors) 
        {
            this.setState({errors: nextProps.errors})
        }
    }

    handleChange (e) 
    {
        //формируем один элемент данных с именем e.target.name и значением e.target.value  
        //из полного заданного состояния данных this.state регистрируемого пользователя
        this.setState({[e.target.name]: e.target.value});
    }

    //функция регистрации пользователя по его сформированным данным
    handleSubmit (e) {
        e.preventDefault();
        //собираем все данные о регистрируемом пользователе 
        const userData = {
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password2: this.state.password2
        }
        //отправляем запрос на регистрацию пользователя по всему состоянию его сформированных данных
        this.props.registerUser(userData,this.props.history);
    }

    render () 
    {
        //вытаскиваем из props классы стилей страницы регистрации пользователя
        const {classes} = this.props; 
        const {errors}  = this.state;
        return (
            <Paper style={{padding: 15}}>
                <form onSubmit={this.handleSubmit}>
                    {/*Поле задания электронной почты регистируемого пользователя */}
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className={classes.textField}
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                    />
                    {/*Поле задания логина регистируемого пользователя */}
                    <TextField
                        label="Login"
                        type="text"
                        name="login"
                        value={this.state.login}
                        onChange={this.handleChange}
                        className={classes.textField}
                        helperText={errors.login ? errors.login : ''}
                        error={errors.login ? true : false}
                    />
                    {/*Первое поле задания пароля регистируемого пользователя */}
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className={classes.textField}
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                    />
                    {/*Второе поле задания пароля регистируемого пользователя */}
                    <TextField
                        label="Repeat password"
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        className={classes.textField}
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false}
                    />
                    <div className={classes.btnBlock}>
                        {/*Кнопка регистрации пользователя по его сформированным данным */}
                        <Button variant="outlined" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => (
{
    //ошибки которые возникли при регистрации пользователя появляются из errorReducer
    errors: state.errors 
})

//функцию запроса на регистрацию пользователя registerUser оборачиваем в props
//на выходе получаем mapStateToProps и запрос на регистрацию пользователя this.props.registerUser
//c помощью withStyles связываем стили с props
export default connect(mapStateToProps, {registerUser}) (withRouter(withStyles(styles)(Register)));