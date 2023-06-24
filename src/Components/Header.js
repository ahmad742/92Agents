import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Images from '../assets/Images';

export default Header = (props) => {

    return (
        <View style={[styles.container, props.containerStyle]} >
            <View style={[styles.HeaderContainer, props.HeaderContainer]}>
                {props.leftIcon &&
                    <TouchableOpacity
                        onPress={
                            props.leftIconnavigation
                        }
                        style={{
                            width: '10%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position:'absolute',
                            left:10,
                            
                        }}
                    >
                        <Image
                            style={{

                                height: 20,
                                width: 10,
                                tintColor:'#000000',
                            }}
                            source={props.leftIcon} />
                    </TouchableOpacity>
                }
                {props.profileicon &&
                <TouchableOpacity
                    onPress={props.GoBackArrow}
                    style={{
                        width: '15%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position:'absolute',
                        // backgroundColor:'green',
                        left:10,
                    }}
                >
                    <Image
                        style={[styles.leftIconStyle, props.leftButtonIconStyle]}
                        source={props.profileicon}
                    />
                </TouchableOpacity>
}                
                <View style={{
                    width: '100%',
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 24, fontWeight: '700',color:'#1C1939' }}>
                        {props.heading}
                    </Text>
                </View>
                {props.RightIcon &&
                    <TouchableOpacity
                        style={{
                            width: '15%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position:'absolute',
                            right:0,
                            // backgroundColor:'green'
                        }}
                        onPress={
                            props.navigation
                        }
                    >
                        <Image
                            style={{

                                height: 25.5,
                                width: 6,
                                tintColor: '#1C1939',
                                position:'absolute'
                            }}
                            source={props.RightIcon} />
                    </TouchableOpacity>
                }
            </View>

        </ View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 65,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    HeaderContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'red'

    },
    leftIconStyle: {
        width: 47,
        height: 47,
        borderRadius:10
    },
    ShoutOutStyle: {
        width: 100,
        height: '100%',
        resizeMode: 'contain',
    },
})
