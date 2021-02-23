import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../../share/ImageItem'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  imageListForDemageAction from './ImageListForDemageAction'
import * as routerDirection from '../../../../util/RouterDirection'
import CameraButton from '../../../components/share/CameraVideoButton'
import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { parent, item, index, file_host, uploadDamageImageWaiting, setIndexForUploadImageForDamage, uploadDamageImage,
        damageId, uploadVideoForDamage, uploadVideoForDamageWaiting, videoUrl } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, parent, uploadDamageImageWaiting, damageId, uploadDamageImage, uploadVideoForDamage, uploadVideoForDamageWaiting })
    } else if (item == 'isVideo') {
        return renderVideo({ videoUrl, file_host, parent, uploadVideoForDamage, uploadVideoForDamageWaiting, uploadDamageImageWaiting, uploadDamageImage, damageId })
    } else {
        let imageIndex = index - 1
        if (videoUrl) {
            imageIndex = imageIndex - 1
        }
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    setIndexForUploadImageForDamage({ index: imageIndex })
                    Actions.showImageForDamage()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, parent, uploadDamageImageWaiting, uploadDamageImage,
        uploadVideoForDamage, uploadVideoForDamageWaiting, damageId } = props
    return (
        <View key={index} style={[styles.itemCameraButton, { margin: 5 }]}>
            <CameraButton
                parent={parent}
                getImage={param => uploadDamageImage({ cameraReses: param, damageId })}
                getVideo={param => uploadVideoForDamage({ ...param, damageId })}
                _cameraStart={uploadDamageImageWaiting}
                _videoStart={uploadVideoForDamageWaiting}
            />
        </View>
    )
}

const renderVideo = props => {
    const { videoUrl, file_host, parent, uploadVideoForDamage, damageId } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={[styles.itemCameraButton]} onPress={() => {
                Actions.showVideoForDamage({ videoUrl: `${file_host}/file/${videoUrl}/video.mp4` })
            }}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    }
}

const renderListEmpty = props => {
    const { parent, uploadDamageImageWaiting, uploadDamageImage, uploadVideoForDamage, uploadVideoForDamageWaiting, damageId } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    parent={parent}
                    getImage={param => {
                        uploadDamageImage({ cameraReses: param, damageId })
                    }}
                    getVideo={param => uploadVideoForDamage({ ...param, damageId })}
                    _cameraStart={uploadDamageImageWaiting}
                    _videoStart={uploadVideoForDamageWaiting} />
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


const ImageEditorForDemage = props => {
    const { parent,
        uploadDamageImageWaiting,
        uploadDamageImage,
        uploadVideoForDamage,
        uploadVideoForDamageWaiting,
        setIndexForUploadImageForDamage,
        imageListForDemageReducer: { data: { demageImageList, videoUrl }, uploadDamageImage: { isResultStatus } },
        initParam: { id } } = props
    const { communicationSettingReducer: { data: { base_host, file_host, record_host } } } = props


    //demageImageList.length > 0 && videoUrl ? ['isCameraButton', 'isVideo', ...demageImageList] : demageImageList
    let dataList = []
    if (demageImageList.length > 0) {
        if (videoUrl) {
            dataList = ['isCameraButton', 'isVideo', ...demageImageList]
        } else {
            dataList = ['isCameraButton', ...demageImageList]
        }
    } else {
        if (videoUrl) {
            dataList = ['isCameraButton', 'isVideo', ...demageImageList]
        }
    }

    return (
        <Container >
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => `${index}`}
                data={demageImageList.length > 0 || videoUrl ? dataList : []}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ parent, uploadDamageImageWaiting, uploadVideoForDamage, uploadVideoForDamageWaiting, uploadDamageImage, damageId: id })}
                renderItem={({ item, index }) => renderItem({
                    parent, item, index, file_host, demageImageList, uploadDamageImageWaiting, uploadDamageImage,
                    uploadVideoForDamage, setIndexForUploadImageForDamage, uploadVideoForDamageWaiting, damageId: id, videoUrl
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
        </Container>
    )
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
        width: containerWidth - 15,
        height: containerHeight - 10
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
        imageListForDemageReducer: state.imageListForDemageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadDamageImageWaiting: () => {
        dispatch(imageListForDemageAction.uploadDamageImageWaiting())
    },
    uploadDamageImage: (param) => {
        dispatch(imageListForDemageAction.uploadDamageImage(param))
    },
    setIndexForUploadImageForDamage: param => {
        dispatch(imageListForDemageAction.setIndexForUploadImageForDamage(param))
    },
    uploadVideoForDamageWaiting: () => {
        dispatch(imageListForDemageAction.uploadVideoForDamageWaiting())
    },
    uploadVideoForDamage: (param) => {
        dispatch(imageListForDemageAction.uploadVideoForDamage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorForDemage)