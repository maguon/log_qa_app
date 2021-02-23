import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'

const renderListItem = props => {
    const { item: { drive_name, mobile, id, truck_id, truck_num }, index, onChange } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
                onChange({ drive_name, mobile, id, truck_id, truck_num })
                Actions.pop()
            }}>
            <Text style={globalStyles.midText}>{drive_name ? `${drive_name}` : ''}</Text>
            <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
        </TouchableOpacity>
    )
}

const SelectDriver = props => {
    const { onChange,
        searchDriverValues,
        selectDriverReducer: { data: { driverList }, getSelectDriverList } } = props
    if (getSelectDriverList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={searchDriverValues ? driverList.filter(item => item.drive_name.indexOf(searchDriverValues.keyword) >= 0 || (item.mobile && item.mobile.indexOf(searchDriverValues.keyword) >= 0)) : driverList}
                    renderItem={(param) => renderListItem({ onChange, ...param })} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        selectDriverReducer: state.selectDriverReducer,
        searchDriverValues: getFormValues('SearchDriver')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SelectDriver)