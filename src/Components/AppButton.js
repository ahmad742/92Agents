import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AppButton = (props) => {

    const { btnStyle, onPress, disabled, labelStyle, label, loading, color } = props
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.mainContainer, btnStyle]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={[styles.btnText, labelStyle]}>{
               
                    label
            }</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    mainContainer: {
        height: 60,
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
