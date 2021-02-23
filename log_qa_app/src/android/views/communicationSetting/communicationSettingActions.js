import * as communicationSettingActionTypes from './communicationSettingActionTypes'
import localStorageKey from '../../../util/LocalStorageKey'
import {setItemObject} from '../../../util/LocalStorage'
// import { ToastAndroid } from 'react-native'



export const saveCommunicationSetting = param =>  async (dispatch, getState) => {
    const { url } = param
  
   const data = {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
    }
//     console.log('data',data)
  await setItemObject(localStorageKey.SERVERADDRESS,data)

    dispatch({ type: communicationSettingActionTypes.save_communicationSetting_success, payload: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
    }})
    // ToastAndroid.show('保存成功！', 10)
}



