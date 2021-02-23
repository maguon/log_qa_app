import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { file_host } from '../../config/Host'
import SharePhotoView from '../components/share/SharePhotoView'
import * as applyDamageUploadImageAction from './applyDamageUploadImage/ApplyDamageUploadImageAction'

const ShowImageForApplyDamage = props => {
    const { applyDamageUploadImageReducer: { data: { imageList, index } }, setIndexForUploadImageForApplyDamage,
    communicationSettingReducer: { data: { file_host } }  } = props
    
    return (
        <SharePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setIndexForUploadImageForApplyDamage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    applyDamageUploadImageReducer: state.applyDamageUploadImageReducer,
    communicationSettingReducer:state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForUploadImageForApplyDamage: param => {
        dispatch(applyDamageUploadImageAction.setIndexForUploadImageForApplyDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowImageForApplyDamage)