import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import * as ApplyDamageSubmitAction from '../applyDamage/submit/ApplyDamageSubmitAction'
import * as ApplyDamageUploadImageAction from '../../views/applyDamageUploadImage/ApplyDamageUploadImageAction'

const ApplyDamageUploadImageSubmit = props => {
    const { parent, cleanCreateDamage, cleanUploadDamageImage } = props
    return (
        <Button transparent onPress={() => {
            cleanCreateDamage()
            cleanUploadDamageImage()
            if (parent === 'settingBlock') return Actions.popTo('carInfoAtSettingBlock')
            if (parent === 'homeBlock') return Actions.popTo('carInfoAtHomeBlock')
        }}>
            <Text style={styles.text}>完成</Text>
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanCreateDamage: () => {
        dispatch(ApplyDamageSubmitAction.cleanCreateDamage())
    },
    cleanUploadDamageImage: () => {
        dispatch(ApplyDamageUploadImageAction.cleanUploadDamageImage())
    }
})

export default connect(null, mapDispatchToProps)(ApplyDamageUploadImageSubmit)

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
