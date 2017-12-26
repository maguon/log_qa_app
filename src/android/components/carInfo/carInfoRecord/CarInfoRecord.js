import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native'
import { fontSizeCoeff } from '../../../../util/util'
import { connect } from 'react-redux'
import { ListItem } from 'native-base'
import globalStyles from '../../../GlobalStyles'

const renderListItem = props => {
    const { item, index } = props
    return (
        <View key={index} style={styles.listItemContainer}>
            <Text style={globalStyles.midText}>操作记录</Text>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={globalStyles.midText}>暂无记录</Text>
        </View>
    )
}

const renderListHeader = () => {
    return (
        <ListItem>
            <Text style={[globalStyles.midText, globalStyles.styleColor]}>操作记录</Text>
        </ListItem>
    )
}

const renderListFooter = () => {
    return (
        <View style={styles.listFooterContainer} />
    )
}

class CarInfoRecord extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                renderItem={renderListItem}
                ListEmptyComponent={renderListEmpty}
                ListHeaderComponent={renderListHeader}
                ListFooterComponent={renderListFooter}
            />
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        marginLeft: 15,
         marginTop: 5
    },
    listEmptyContainer: {
        margin: 15 
    },
    listFooterContainer: {
        height: 5 
    }
})

const mapStateToProps = (state) => {
    return {
        carInfoRecordReducer: state.carInfoRecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfoRecord)