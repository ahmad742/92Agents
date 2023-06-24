import React from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native'

const CheckBox = (props) => {
    return (
        <View style={[styles.mainContainer, props.mainContainerStyle]}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.container, props.checkboxStyle]}
                onPress={props.onPress}
            >
                <Image
                    source={props.source}
                    style={{ height: "60%", width: '60%', resizeMode: "contain" }}
                />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={props.onLabelPress}
            activeOpacity={0.6}>
            <Text style={[styles.text, props.checkBoxText]}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: colors.background,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    container: {
        backgroundColor:'white',
        height: 26,
        width: 26,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: "center",
        borderColor:'#59AB02'
    },
    text: {
        marginLeft: 10,
        color: '#1C1939CC',
        width:'60%'
        // fontFamily: Fonts.Regular,
    },
})
