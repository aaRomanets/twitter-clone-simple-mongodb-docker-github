import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux"

//вытаскиваем функцию запроса на авторизацию зарегистрированного пользователя из "../../actions/authActions"
import {loginUser} from "../../actions/authActions";

//стили страницы авторизации зарегистрированного пользователя, они через props переходят в classes
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

//класс страницы авторизации зарегистрированного пользователя
class Login extends Component 
{
    constructor (props) 
    {
        super(props);
        //состояние данных уже зарегистрированного пользователя, необходимых для проведения его авторизации
        this.state = 
        {
            email: '', 
            password: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () 
    {
        //переходим на исходную страницу если авторизация успешно осуществлена
        if (this.props.auth.isAuthenticated) 
        {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) 
    {
        //авторизация зарегистрированного пользователя провалилась
        if (nextProps.errors) 
        {
            this.setState({errors: nextProps.errors})
        }

        //переходим на исходную страницу если авторизация успешно осуществлена
        if (nextProps.auth.isAuthenticated) 
        {
            nextProps.history.push('/')
        }
    }

    handleChange (e) 
    {
        //собираем данные по авторизации зарегистрированного пользователя
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit (e) 
    {
        e.preventDefault();
        //собираем данные необходимые для авторизации зарегистрированного пользователя
        const userData = 
        {
            email: this.state.email,
            password: this.state.password
        }
        
        //делаем  запрос на авторизацию зарегистрированного пользователя
        this.props.loginUser(userData)
    }

    render () 
    {
        //вытаскиваем из props классы стилей страницы авторизации пользователя
        const {classes} = this.props; 
        const {errors}  = this.state;
        return (
            <Paper style={{padding: 15}}>
                <form onSubmit={this.handleSubmit}>
                    {/*Поле ввода почты зарегистрированного пользователя, которого авторизуем */}
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
                    {/*Поле ввода пароля зарегистрированного пользователя, которого авторизуем */}
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
                    <div className={classes.btnBlock}>
                        {/*Кнопка авторизации зарегистрированного пользователя по его почте и паролю */}
                        <Button variant="outlined" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => 
({
    //состояние авторизации зарегистрированного пользователя
    auth: state.auth,    
    //ошибки которые возникли при авторизации зарегистрированного пользователя появляются из errorReducer
    errors: state.errors,
})

//функцию запроса на авторизацию зарегистрированного пользователя loginUser оборачиваем в props
//на выходе получаем state в mapStateToProps и запрос на регистрацию пользователя this.props.loginUser
//c помощью withStyles связываем стили с props
export default connect(mapStateToProps, {loginUser})(withRouter(withStyles(styles)(Login)));