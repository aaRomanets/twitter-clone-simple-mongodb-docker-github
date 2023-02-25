import React from 'react'
import MadeWithLove from 'react-made-with-love'
import {withStyles} from '@material-ui/core/styles'

//стиль модуля страницы ссылки на github,  он через props переходит в classes
const styles = 
{
    root:
    {
        textAlign: 'center',
        marginTop: 20
    }
}

//страница ссылки на github
const Footer = (
{
    //классы стилей страницы ссылки на github
    classes 
}) => 
{
    return (
        <div className={classes.root}>
            {/*Переход на github */}
            <MadeWithLove
                by="Ngo Huong"
                emoji
                link="https://github.com"
            />
        </div>
    )
}

//c помощью withStyles связываем стиль с props
export default withStyles(styles)(Footer);