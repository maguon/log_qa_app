import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner } from 'native-base'
import CameraButton from '../../components/share/CameraVideoButton'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as routerDirection from '../../../util/RouterDirection'
import * as applyDamageUploadImageAction from './ApplyDamageUploadImageAction'
import ImageItem from '../../components/share/ImageItem'
// import { file_host } from '../../../config/Host'
// import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index,file_host, uploadImageForApplyDamageWaiting, videoUrl, parent,
        uploadImageForApplyDamage, setIndexForUploadImageForApplyDamage, uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, parent, uploadImageForApplyDamageWaiting, uploadImageForApplyDamage, uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting })
    } else if (item == 'isVideo') {

        return renderVideo({ videoUrl, parent, uploadVideoForApplyDamage })
    } else {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    setIndexForUploadImageForApplyDamage({ index })
                    routerDirection.showImageForApplyDamage(parent)()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, parent, uploadImageForApplyDamageWaiting, uploadImageForApplyDamage,
        uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting } = props
    console.log('uploadVideoForApplyDamageWaiting', uploadVideoForApplyDamageWaiting)
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                parent={parent}
                getImage={param => uploadImageForApplyDamage({ cameraReses: param })}
                getVideo={uploadVideoForApplyDamage}
                _cameraStart={uploadImageForApplyDamageWaiting}
                _videoStart={uploadVideoForApplyDamageWaiting}
            />
        </View>
    )
}

const renderVideo = props => {
    const { videoUrl, parent, uploadVideoForApplyDamage } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => {
                routerDirection.showVideoForApplyDamage(parent)()
            }}>
                <FontAwesomeIcon name='film' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => {
                routerDirection.pictureRecording(parent)({ uploadVideo: uploadVideoForApplyDamage })
            }}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    }
}

const renderListEmpty = props => {
    const { parent, uploadImageForApplyDamageWaiting, uploadImageForApplyDamage, uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting } = props
    // console.log('uploadVideoForApplyDamageWaiting',uploadVideoForApplyDamageWaiting)
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    parent={parent}
                    getImage={param => {
                        uploadImageForApplyDamage({ cameraReses: param })
                    }}
                    getVideo={uploadVideoForApplyDamage}
                    _cameraStart={uploadImageForApplyDamageWaiting}
                    _videoStart={uploadVideoForApplyDamageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆视频或照片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const ApplyDamageUploadImage = props => {
    const { parent, uploadImageForApplyDamageWaiting, uploadImageForApplyDamage, setIndexForUploadImageForApplyDamage, uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting,
        communicationSettingReducer: { data: { file_host } },
        applyDamageUploadImageReducer: { data: { imageList, videoUrl }, uploadImageForApplyDamage: { isResultStatus }, getImageForCreateCar }, applyDamageUploadImageReducer } = props
    if (getImageForCreateCar.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container >
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item, index) => index}
                    data={imageList.length > 0 || videoUrl ? ['isCameraButton', 'isVideo', ...imageList] : imageList}
                    numColumns={2}
                    ListEmptyComponent={() => renderListEmpty({ parent, uploadImageForApplyDamageWaiting, uploadImageForApplyDamage, uploadVideoForApplyDamage, uploadVideoForApplyDamageWaiting })}
                    renderItem={({ item, index }) => renderItem({
                        parent, item, file_host,index, videoUrl, imageList, uploadImageForApplyDamageWaiting, uploadVideoForApplyDamage,
                        uploadVideoForApplyDamageWaiting, uploadImageForApplyDamage, setIndexForUploadImageForApplyDamage
                    })} />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={styles.modalText}>正在上传图片...</Text>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={applyDamageUploadImageReducer.uploadVideoForApplyDamage.isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={applyDamageUploadImageReducer.uploadVideoForApplyDamage.isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={styles.modalText}>正在上传视频...</Text>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        applyDamageUploadImageReducer: state.applyDamageUploadImageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadImageForApplyDamage: (param) => {
        dispatch(applyDamageUploadImageAction.uploadImageForApplyDamage(param))
    },
    uploadImageForApplyDamageWaiting: () => {
        dispatch(applyDamageUploadImageAction.uploadImageForApplyDamageWaiting())
    },
    setIndexForUploadImageForApplyDamage: param => {
        dispatch(applyDamageUploadImageAction.setIndexForUploadImageForApplyDamage(param))
    },
    uploadVideoForApplyDamageWaiting: () => {
        dispatch(applyDamageUploadImageAction.uploadVideoForApplyDamageWaiting())
    },
    uploadVideoForApplyDamage: (param) => {
        dispatch(applyDamageUploadImageAction.uploadVideoForApplyDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyDamageUploadImage)