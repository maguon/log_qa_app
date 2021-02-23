import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as ApplyDamageUploadImageAction from '../../../views/applyDamageUploadImage/ApplyDamageUploadImageAction'

const ApplyDamageUploadImageLeftButton = props => {
    const { cleanUploadDamageImage } = props
    return (
        <Button transparent onPress={() => {
            cleanUploadDamageImage()
            Actions.pop()
        }}>
            <Icon name='arrow-back' />
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanUploadDamageImage: () => {
        dispatch(ApplyDamageUploadImageAction.cleanUploadDamageImage())
    }
})

export default connect(null, mapDispatchToProps)(ApplyDamageUploadImageLeftButton) 