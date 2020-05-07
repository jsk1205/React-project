import {  SAVE_CATEGORY } from "../action_types"
import { reqCategoryList } from "@/api"
import {message} from 'antd'

export const saveCategory = (categoryArr)=> (
  {type:SAVE_CATEGORY,data:categoryArr})

export const catrgoryAsync=()=>{
  return async(dispatch)=>{
    let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0){
			dispatch(saveCategory(data))
		}else{
			message.error(msg)
		}
	}
}