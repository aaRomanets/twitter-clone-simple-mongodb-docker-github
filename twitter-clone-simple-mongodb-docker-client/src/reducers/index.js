import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

//формируем полный reducer
export default combineReducers({
    //на выходе из редюсера errorReducer состояние state.errors
    errors: errorReducer,   
    //на выходе из редюсера authReducer состояние state.auth
    auth: authReducer,     
    //на выходе из редюсера postReducer состояние state.post
    post: postReducer,     
    //на выходе из редюсера profileReducer состояние state.profile
    profile: profileReducer 
})

