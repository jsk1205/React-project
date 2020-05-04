import {createStore,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
//引入开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'
import allReducer from './reducers'

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))