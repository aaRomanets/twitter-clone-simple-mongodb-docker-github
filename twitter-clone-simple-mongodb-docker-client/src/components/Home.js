import React, {Component} from "react";
import {connect} from "react-redux";

import ListPost from './Posts/ListPost';
import Login from './Auth/Login';

class Home extends Component {
    render () {
        //выясняем есть ли авторизованный пользователь или нет
        const  { isAuthenticated }  = this.props;
        
        return (
            <div>
                {/*Если авторизованный пользователь есть то переходим на страницу списка постов
                   ListPost, который в ключает в себя посты авторизованного пользователя,
                   иначи переходим на страницу Login - авторизации пользователя */}
                {isAuthenticated ? <ListPost/> : <Login/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //получаем из store флаг, говорящий о том что есть авторизованный пользователь
    //we receiving from store флаг, indicating that there is authorized user 
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home);