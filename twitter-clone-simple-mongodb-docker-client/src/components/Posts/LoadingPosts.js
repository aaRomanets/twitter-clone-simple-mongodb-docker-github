import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

//стили модуля страницы, характеризующей сигнализатор загрузки постов
const styles = 
{
    load: 
    {
        textAlign: 'center',
        marginTop: 25,
        width: '100%'
    },
    loadIcon: 
    {
        color: '#8A2BE2'
    }
}

//страница сигнализатора загрузки постов
const LoadingPosts = (
{
    //классы стилей страницы сигнализатора загрузки постов
    classes 
}
) => 
{
    return (
        <div className={classes.load}>
            <CircularProgress className={classes.loadIcon}/>
        </div>
    )
}

//c помощью withStyles связываем стиль с props
export default withStyles(styles)(LoadingPosts)