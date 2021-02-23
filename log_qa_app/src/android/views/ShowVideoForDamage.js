import React from 'react'
import VideoView from './VideoView'


const ShowVideoForDamage = props => {
    const {videoUrl}=props
    // const { applyDamageUploadImageReducer: { data: { videoUrl } }, loginReducer: { data: { user: { uid } } } } = props
    return (
        <VideoView initParam={{ videoUrl}} />
    )
}

// const mapStateToProps = (state) => ({
//     applyDamageUploadImageReducer: state.applyDamageUploadImageReducer,
//     loginReducer: state.loginReducer
// })


export default ShowVideoForDamage