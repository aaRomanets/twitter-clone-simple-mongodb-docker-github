import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVert from '@material-ui/icons/MoreVert';

import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/authActions';
import SearchForm from '../Search/SearchForm';

//стили заглавной страницы, они через props переходят в classes
const styles = 
{
    root: 
    {
        flexGrow: 1
    },
    logo: 
    {
        color: '#fff',
        fontSize: 30,
        textTransform: 'uppercase'
    },
    space: 
    {
        justifyContent: 'space-between'
    }
} 

//класс заглавной страницы
class Header extends Component 
{
    constructor (props) 
    {
        super(props);
        this.state = 
        {
            //якорь показа любого контекстного меню
            anchorEl: null 
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    //функция показа любого контекстного меню
    handleMenu = (event) => { this.setState({anchorEl: event.currentTarget})  }
    
    //функция закрытия любого контекстного меню
    handleClose = () => {this.setState({anchorEl: null})}

    //одна и таже функция при отмене авторизации авторизованного пользователя или при регистрации нового пользователя
    handleLogout = () => 
    {
        this.setState({anchorEl: null});
        //устраняем авторизацию авторизированного пользователя если это есть
        this.props.logoutUser(); 
    }

    render () {
        //вытаскиваем из props классы стилей заглавной страницы флаг авторизации 
        //пользователя isAuthenticated или информацию о пользователе user
        const {classes, isAuthenticated, user} = this.props;
        const {anchorEl} = this.state;
        //флаг открытия менюшек
        let open = Boolean(anchorEl); 

        //меню авторизации или регистрации пользователя
        const guestLinks = (
            <div>
                {/*Иконка менюшки*/}
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <MoreVert/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    open={open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                >
                     {/*Открываем вкладку меню авторизации пользователя */}
                    <MenuItem onClick={this.handleClose}>
                        <Link to="/login">Login</Link>
                    </MenuItem>
                    {/*Открываем вкладку меню регистрации пользователя */}
                    <MenuItem onClick={this.handleLogout}>
                        <Link to="/register">Register</Link>
                    </MenuItem>
                </Menu>
            </div>
        )

        //меню авторизованного пользователя
        const authLinks = isAuthenticated && (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <AccountCircle/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    open={open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                >
                    {/*Открываем вкладку меню показа постов авторизованного пользователя */}
                    <MenuItem onClick={this.handleClose}>
                        <Link to={`/profile/${user._id}`}>Profile</Link>
                    </MenuItem>
                    {/*Открываем вкладку меню отмены авторизации авторизованного пользователя */}
                    <MenuItem>
                        <Link to="/#" onClick={this.handleLogout}>Logout</Link>
                    </MenuItem>
                </Menu>
            </div>
        )

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: '#4B0082'}}>
                    <Toolbar className={classes.space}>
                        {/*Ссылка возврата на главную страницу */}
                        <Link to="/" className={classes.logo}>Twit</Link>
                        {/*Окно поиска постов по указанному пользователю, включая неавторизованных */}
                        <SearchForm/>
                        {/*Показываем менюшки. В зависимости от значения флага isAuthenticated либо меню 
                           авторизации и регистрации пользователя либо меню авторизованного пользователя*/}
                        {isAuthenticated ? authLinks : guestLinks}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
 
//закачиваем в props из store через authReducer флаг авторизации пользователя 
//isAuthenticated или информацию о пользователе user
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

//функцию отмены авторизации пользователя logoutUser оборачиваем в props на выходе
//получаем в mapStateToProps isAuthenticated и user

//c помощью withStyles связываем стили с props
export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(Header));