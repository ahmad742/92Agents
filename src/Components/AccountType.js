import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'

const AccountType = (props) => {

    const { btnStyle, onPress, disabled, labelStyle, label, loading, color,image } = props
    return (
        <TouchableOpacity
            style={[styles.mainContainer, btnStyle]}>
                <Image source={image} />
            <Text style={[styles.btnText, labelStyle]}>{
               
                    label
            }</Text>
        </TouchableOpacity>
    )
}

export default AccountType

const styles = StyleSheet.create({
    mainContainer: {
        height: 143,
        width: '100%',
        backgroundColor: '#59AB02',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnText: {
        color:'white',
        fontSize: 16,
        fontWeight:'700',
    },
})
