import { handleActions } from 'redux-actions'
import * as settingActionTypes from './SettingActionTypes'

const initialState = {

}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    
}, initialState)