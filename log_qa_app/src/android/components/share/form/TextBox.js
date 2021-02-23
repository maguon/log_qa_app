import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { fontSizeCoeff } from '../../../../util/util'
import { Item, Input } from 'native-base'
import globalStyles from '../../../GlobalStyles'

const TextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        meta: { error, touched } } = props
    const errorComponent = error ? error.map((item, i) => <Text key={i} style={[globalStyles.smallText, styles.errText]}>{`*${item}`}</Text>) : undefined
    return <Item inlineLabel last={last} style={styles.body}>
        <Item style={styles.item}>
            <Text style={globalStyles.midText} >{isRequired && <Text style={styles.errText}>*</Text>}{label}</Text>
            <Input
                secureTextEntry={secureTextEntry}
                style={globalStyles.midText}
                onChangeText={onChange}
                {...restProps}
            />
        </Item>
        {touched && (error && <View style={styles.errView}>
            {errorComponent}
        </View>)}
    </Item>
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    item: {
        borderBottomWidth: 0
    },
    errView: {
        marginBottom: 10
    }
})


export default TextBox