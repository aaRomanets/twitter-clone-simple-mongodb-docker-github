import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
//вытаскиваем общий редюсер rootReducer
//we finding general reducer rootReducer
import rootReducer from './reducers';

//отправляем общий редюсер rootReducer в хранилище store
//we sending general reducer rootReducer into storage store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store