//合并多个reducer
import {combineReducers} from 'redux'
import loginReducer from "./login"
import titleReducer from './title'
import categoryReducer  from "./category";
//combineReducers传入的那个对象，就是redux帮我们所保存的总状态
export default combineReducers({
	userInfo: loginReducer,
	title:titleReducer,
	categoryList:categoryReducer
})