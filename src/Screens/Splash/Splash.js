import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native'

// --------------------------------------------
import Images from '../../assets/Images/index'
import { useSelector } from 'react-redux'
import { StackActions, useIsFocused } from '@react-navigation/native'


const Splash = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { token, isUserVerified } = useSelector(state => state.userSession)
    useEffect(() => {
        console.log({ isUserVerified });
        setTimeout(() => {
            if(token){
                navigation.navigate("HomeStack")
            }
                else{
                    navigation.navigate("AuthStack")
                }
        }, 2000);

    }, [isFocused])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.shoutoutimg}>
                <Image
                    style={{
                        width: '90%',
                        height: 60,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                    source={Images.Splash}></Image>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 70
            }}>
                <Text style={{
                    color: '#1C1939CC',
                    fontSizeL: 15,
                    fontWeight: '400'
                }}>
                    {'Best app for real estate'}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    shoutoutimg: {
        width: "90%",
        height: "20%",
        // position:'absolute',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default Splash;






