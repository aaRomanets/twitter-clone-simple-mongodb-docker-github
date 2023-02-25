import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Footer from './Footer';

//центральная страница
const Main = ({children}) => {
    return (
        <div>
            {/*Заголовочный модуль*/}
            <Header/>
            {/*Рабочие модули*/}
            <Grid container justify="center">
                <Grid item xs={12} sm={6} style={{marginTop: 30}}>
                    {children}
                </Grid>
            </Grid>
            {/*Ссылка на github */}
            <Footer/>
        </div>
    )
}

export default Main;