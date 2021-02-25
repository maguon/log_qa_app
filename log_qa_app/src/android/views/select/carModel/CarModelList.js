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
    const { item: { model_name, id },item, index, onSelect } = props
    // console.log('props',props)
    return (
        <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
                onSelect(item)
                Actions.pop()
            }}>
            <Text style={globalStyles.midText}>{model_name ? `${model_name}` : ''}</Text>
        </TouchableOpacity>
    )
}

const CarModelList = props => {
    const { onSelect,
        carModelListReducer: { data: { carModelList }, getCarModelList } } = props
        // console.log('carModelList',carModelList)
    if (getCarModelList.isResultStatus == 1) {
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
                    data={carModelList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
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
        carModelListReducer: state.carModelListReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarModelList)