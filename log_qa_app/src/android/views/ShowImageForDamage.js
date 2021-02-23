import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { file_host } from '../../config/Host'
import SharePhotoView from '../components/share/SharePhotoView'
import * as imageEditorForDemageAction from '../components/demageInfo/imageListForDemage/ImageListForDemageAction'

const ShowImageForApplyDamage = props => {
    const { imageListForDemageReducer: { data: { demageImageList, index } }, setIndexForUploadImageForDamage,
    communicationSettingReducer: { data: { file_host } } } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: demageImageList.map(item =>`${file_host}/image/${item.url}`), index }}
            onIndexChanged={(index) => setIndexForUploadImageForDamage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    imageListForDemageReducer: state.imageListForDemageReducer,
    communicationSettingReducer:state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForUploadImageForDamage: param => {
        dispatch(imageEditorForDemageAction.setIndexForUploadImageForDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowImageForApplyDamage)