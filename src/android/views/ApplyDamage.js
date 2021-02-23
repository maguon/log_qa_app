import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon } from 'native-base'
import globalStyles, { textColor } from '../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Select from '../components/share/form/Select'
import * as routerDirection from '../../util/RouterDirection'
import * as selectDriverAction from './select/driver/SelectDriverAction'
import * as carModelListActions from './select/carModel/CarModelListActions'
import * as applyDamageSubmitAction from '../components/applyDamage/submit/ApplyDamageSubmitAction'
import { Actions } from 'react-native-router-flux'

const DamageRemark = props => {
    const { input: { onChange, ...restProps }, meta: { error, touched, valid } } = props
    return (
        <View style={styles.item}>
            <Label style={[styles.label, globalStyles.midText, globalStyles.styleColor]}>质损描述</Label>
            <Input
                multiline={true}
                style={[styles.inputArea, globalStyles.midText]}
                onChangeText={onChange}
                {...restProps} />
            {touched && error && <Text style={[globalStyles.errorText, { marginTop: 10 }]}>* {error}</Text>}
        </View>
    )
}

const SelectDriver = props => {
    const { input: { onChange, value }, meta: { error, touched }, getSelectDriverList, getSelectDriverListWaiting, parent } = props
    // console.log('value',value)
    return (
        <TouchableOpacity
            style={[styles.item, styles.itemSelectContainer]}
            onPress={() => {
                getSelectDriverListWaiting()
                routerDirection.selectDriver(parent)({ onChange })
                InteractionManager.runAfterInteractions(getSelectDriverList)
            }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Label style={globalStyles.midText}>货车司机：</Label>
                <View style={styles.itemSelect}>
                    <Label style={globalStyles.midText}>{value.drive_name ? `${value.drive_name}` : ''}{value.mobile ? `(${value.mobile})` : ''}</Label>
                    <Icon name='md-caret-down-sharp' style={globalStyles.formIcon} />
                </View>
            </View>

            {touched && error && <Text style={[globalStyles.errorText, { marginTop: 10 }]}>* {error}</Text>}
        </TouchableOpacity>
    )
}


const ApplyDamage = props => {
    const { getSelectDriverList, getSelectDriverListWaiting, getCarModelList, getCarModelListWaiting, parent, initParam: {initParam:{make_id}  } } = props
   console.log("props",props)
    return (
        <Container>
            <Content style={globalStyles.marginTop}>
                <Field
                    name='carModel'
                    label='指令编号'
                    component={Select}
                    onPress={({ onChange }) => {
                        getCarModelListWaiting()
                        routerDirection.carModelList(parent)({
                            onSelect: (param) => {
                                const { id, model_name } = param
                                onChange({ id, value: model_name, item: param })
                            }
                        })
                        InteractionManager.runAfterInteractions(() => getCarModelList({ make_id }))
                    }}
                />
                <Field
                    name='damageRemark'
                    component={DamageRemark} />
                <Field
                    name='selectDriver'
                    component={SelectDriver}
                    getSelectDriverList={getSelectDriverList}
                    getSelectDriverListWaiting={getSelectDriverListWaiting}
                    parent={parent} />

            </Content>
        </Container >
    )
}


const styles = StyleSheet.create({
    item: {
        margin: 15
    },
    label: {
        marginVertical: 15
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: 15
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    }
})

const validate = values => {
    const errors = { damageRemark: '', selectDriver: '' }
    if (!values.damageRemark) {
        errors.damageRemark = '必填'
    }

    // if (!values.selectDriver) {
    //     errors.selectDriver = '必选'
    // } else {
    //     if (!values.selectDriver.truck_id) {
    //         errors.selectDriver = '该司机未绑定车头'
    //     }
    // }
    return errors
}

const mapStateToProps = (state) => {
    return {
        applyDamageReducer: state.applyDamageReducer,
        initialValues: { selectDriver: {} }
        // selectDriverValues: getFormValues('applyDamage')(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getSelectDriverList())
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getSelectDriverListWaiting())
    },
    getCarModelList: param => {
        dispatch(carModelListActions.getCarModelList(param))
    },
    getCarModelListWaiting: () => {
        dispatch(carModelListActions.getCarModelListWaiting())
    },
    onSubmit: () => {
        const { parent } = ownProps
        dispatch(applyDamageSubmitAction.createDamage(parent))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'applyDamage',
        validate
    })(ApplyDamage)
)
