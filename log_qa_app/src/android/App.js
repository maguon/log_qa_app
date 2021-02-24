import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'
import { Scene, Router,Lightbox,Modal,Stack} from 'react-native-router-flux'
// import { connect } from 'react-redux'
import Orientation from '@gergof/react-native-orientation'
import Initialization from './views/initialization/Initialization'

import NavBar from './components/share/bar/NavBar'
import SearchBar from './components/share/bar/SearchBar'
import SearchDriverBar from './components/share/bar/SearchDriverBar'
import TabIcon from './components/share/TabIcon'
import LeftButton from './components/share/bar/LeftButton'
import ApplyDamageSubmit from './components/applyDamage/submit/ApplyDamageSubmit'
import ApplyDamageUploadImageLeftButton from './components/share/bar/ApplyDamageUploadImageLeftButton'
import ApplyDamageUploadImageSubmit from './components/applyDamageUploadImage/ApplyDamageUploadImageSubmit'
import PhotoViewNavBar from './components/share/PhotoViewNavBar'
import CheckVehicleAllListToolButton from './components/toolButton/CheckVehicleAllListToolButton'
import CarSortToolButton from './components/toolButton/CarSortToolButton'
import ShowImageForDamage from './views/ShowImageForDamage'
// import NavSearchBar from './components/share/bar/NavSearchBar'


import Login from './views/login/Login'
import RetrievePassword from './views/retrievePassword/RetrievePassword'
import QRCodeScreen from './views/QRCodeScreen'

import Home from './views/Home'
import CarInfo from './views/carInfo/CarInfo'
import SearchCarBar from './components/share/bar/SearchCarBar'
import SearchCar from './views/searchCar/SearchCar'
import SelectDriver from './views/select/driver/SelectDriver'
import SinglePhotoView from './views/SinglePhotoView'
import PictureRecording from '../android/views/PictureRecording'
import CarModelList from '../android/views/select/carModel/CarModelList'
import ShowImageForApplyDamage from './views/ShowImageForApplyDamage'
import ShowVideoForApplyDamage from './views/ShowVideoForApplyDamage'
import ApplyDamage from './views/ApplyDamage'
import ApplyDamageUploadImage from './views/applyDamageUploadImage/ApplyDamageUploadImage'


import Setting from './views/setting/Setting'
import UpdatePassword from './views/updatePassword/UpdatePassword'
import PersonalCenter from './views/personalCenter/PersonalCenter'
import DemageInfo from './views/demageInfo/DemageInfo'
import DemageList from './views/demageList/DemageList'
import ResponsibilityInfo from './views/responsibilityInfo/ResponsibilityInfo'
import ResponsibilityList from './views/responsibilityList/ResponsibilityList'
import CheckVehicleAllList from './views/checkVehicleAllList/CheckVehicleAllList'
import TodayCheck from './views/todayCheck/TodayCheck'
import CarSort from './views/carSort/CarSort'
import ShowVideoForDamage from '../android/views/ShowVideoForDamage'




const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    }
})

// const mapStateToProps = (state) => {
//     return {
//         loginReducer: state.loginReducer
//     }
// }

const getSceneStyle = (/* NavigationSceneRendererProps */ props, backAndroidHandler) => {

    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    // if (computedProps.isActive) {
    //     style.marginTop = computedProps.hideNavBar ? 0 : 56
    //     style.marginBottom = computedProps.hideTabBar ? 0 : 50
    // }
    return style
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle}>
            <Modal hideNavBar>
             <Lightbox >
                <Scene key="root"  >
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    {/* <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    > */}
                        <Stack key="loginBlock" hideNavBar hideTabBar>
                            <Scene key="login" initial={true} component={Login} />
                            <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} LeftButton={LeftButton} navBar={NavBar} />
                            <Scene key="qrCodeScreen" title='扫一扫' component={QRCodeScreen} hideNavBar={false} hideTabBar navBar={NavBar} />
                        </Stack>
                        <Stack
                            key="main"
                            tabs={true}
                            tabBarStyle={styles.tabBarStyle}   
                            showLabel={false}
                            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} hideNavBar  >
                            <Scene key="homeBlock" icon={TabIcon} initial={true} online='ios-home' outline='ios-home-outline' parent='homeBlock' size={25} >
                                <Scene key="home" component={Home} initial={true} title='首页' hideNavBar={false} navBar={SearchBar} />
                                <Scene key="carInfoAtHomeBlock" component={CarInfo} LeftButton={LeftButton} title='车辆信息' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="searchCarAtHomeBlock" component={SearchCar} hideNavBar={false} hideTabBar navBar={SearchCarBar} />
                                <Scene key="selectDriverAtHomeBlock" component={SelectDriver} hideNavBar={false} hideTabBar navBar={SearchDriverBar} />
                                <Scene key="singlePhotoViewAtHomeBlock" component={SinglePhotoView} hideNavBar hideTabBar />
                                <Scene key='pictureRecordingAtHomeBlock'
                                    title='录像'
                                    component={PictureRecording}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />

                                <Scene key='carModelListAtHomeBlock'
                                    title='车型列表'
                                    component={CarModelList}
                                    navBar={NavBar}
                                    hideNavBar={false}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showImageForApplyDamageAtHomeBlock'
                                    title='照片'
                                    component={ShowImageForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showVideoForApplyDamageAtHomeBlock'
                                    title='播放'
                                    component={ShowVideoForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="applyDamageAtHomeBlock" component={ApplyDamage} LeftButton={LeftButton} RightButton={ApplyDamageSubmit}
                                    title='质损申请' hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="applyDamageUploadImageAtHomeBlock" component={ApplyDamageUploadImage} LeftButton={ApplyDamageUploadImageLeftButton} RightButton={ApplyDamageUploadImageSubmit}
                                    title='质损申请' hideTabBar hideNavBar={false} navBar={NavBar} />
                            </Scene>


                            
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' size={25} >

                                <Scene key="setting" component={Setting} title='设置' hideNavBar={false} navBar={SearchBar} />
                                <Scene key='pictureRecordingAtSettingBlock'
                                    title='录像'
                                    component={PictureRecording}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='carModelListAtSettingBlock'
                                    title='车型列表'
                                    component={CarModelList}
                                    navBar={NavBar}
                                    hideNavBar={false}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showImageForApplyDamageAtSettingBlock'
                                    title='照片'
                                    component={ShowImageForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showImageForDamage'
                                    title='照片'
                                    component={ShowImageForDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showVideoForDamage'
                                    title='播放'
                                    component={ShowVideoForDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='showVideoForApplyDamageAtSettingBlock'
                                    title='播放'
                                    component={ShowVideoForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="carInfoAtSettingBlock" component={CarInfo} LeftButton={LeftButton} title='车辆信息' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="searchCarAtSettingBlock" component={SearchCar} hideNavBar={false} hideTabBar navBar={SearchCarBar} />
                                <Scene key="selectDriverAtSettingBlock" component={SelectDriver} hideNavBar={false} hideTabBar navBar={SearchDriverBar} />
                                <Scene key="singlePhotoViewAtSettingBlock" component={SinglePhotoView} hideNavBar hideTabBar />
                                <Scene key="applyDamageAtSettingBlock" component={ApplyDamage} LeftButton={LeftButton} RightButton={ApplyDamageSubmit}
                                    title='质损申请' hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="applyDamageUploadImageAtSettingBlock" component={ApplyDamageUploadImage} LeftButton={ApplyDamageUploadImageLeftButton} RightButton={ApplyDamageUploadImageSubmit}
                                    title='质损申请' hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="updatePassword" LeftButton={LeftButton} component={UpdatePassword} title='修改密码'
                                    hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="demageInfo" LeftButton={LeftButton} component={DemageInfo} title='质损详情' hideTabBar
                                    hideNavBar={false} navBar={NavBar} />
                                <Scene key="checkVehicleAllList" LeftButton={LeftButton} component={CheckVehicleAllList} title='检车记录' hideTabBar
                                    hideNavBar={false} navBar={NavBar} RightButton={CheckVehicleAllListToolButton}/>

                                <Scene key="todayCheck" LeftButton={LeftButton} component={TodayCheck} title='今日检车' hideTabBar
                                       hideNavBar={false} navBar={NavBar} />


                                <Scene key="carSort" LeftButton={LeftButton} component={CarSort} title='分拣记录' hideTabBar
                                    hideNavBar={false} navBar={NavBar} RightButton={CarSortToolButton}/>
                                <Scene key="demageList" LeftButton={LeftButton} component={DemageList} title='我的质损' hideTabBar
                                    hideNavBar={false} navBar={NavBar} />
                                <Scene key="responsibilityInfo" LeftButton={LeftButton} component={ResponsibilityInfo} title='责任详情'
                                    hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="responsibilityList" LeftButton={LeftButton} component={ResponsibilityList} title='我的责任'
                                    hideTabBar hideNavBar={false} navBar={NavBar} />
                                <Scene key="personalCenter" LeftButton={LeftButton} component={PersonalCenter} title='个人中心'
                                    hideTabBar hideNavBar={false} navBar={NavBar} />
                            </Scene>
                        </Stack>
                    {/* </Scene> */}
                    
                </Scene>
                </Lightbox>
                </Modal>
            </Router>
        )
    }
}
