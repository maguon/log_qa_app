import { Actions } from 'react-native-router-flux'

export const searchCar = (parent) => {
    if (parent === 'settingBlock') return Actions.searchCarAtSettingBlock
    if (parent === 'homeBlock') return Actions.searchCarAtHomeBlock
}

export const carInfo = (parent) => {
    if (parent === 'settingBlock') return Actions.carInfoAtSettingBlock
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
}

export const selectDriver = (parent) => {
    if (parent === 'settingBlock') return Actions.selectDriverAtSettingBlock
    if (parent === 'homeBlock') return Actions.selectDriverAtHomeBlock
}

export const singlePhotoView = (parent) => {
    if (parent === 'settingBlock') return Actions.singlePhotoViewAtSettingBlock
    if (parent === 'homeBlock') return Actions.singlePhotoViewAtHomeBlock
}

export const applyDamage = (parent) => {
    if (parent === 'settingBlock') return Actions.applyDamageAtSettingBlock
    if (parent === 'homeBlock') return Actions.applyDamageAtHomeBlock
}

export const applyDamageUploadImage = (parent) => {
    if (parent === 'settingBlock') return Actions.applyDamageUploadImageAtSettingBlock
    if (parent === 'homeBlock') return Actions.applyDamageUploadImageAtHomeBlock
}


export const pictureRecording = (parent) => {
    if (parent === 'settingBlock') return param => Actions.pictureRecordingAtSettingBlock(param)
    if (parent === 'homeBlock') return param => Actions.pictureRecordingAtHomeBlock(param)
}


export const showImageForApplyDamage = (parent) => {
    if (parent === 'settingBlock') return Actions.showImageForApplyDamageAtSettingBlock
    if (parent === 'homeBlock') return Actions.showImageForApplyDamageAtHomeBlock
}

export const showVideoForApplyDamage = (parent) => {
    if (parent === 'settingBlock') return Actions.showVideoForApplyDamageAtSettingBlock
    if (parent === 'homeBlock') return Actions.showVideoForApplyDamageAtHomeBlock
}


export const carModelList = (parent) => {
    if (parent === 'settingBlock') return Actions.carModelListAtSettingBlock
    if (parent === 'homeBlock') return Actions.carModelListAtHomeBlock
}