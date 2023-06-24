import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
const SellerScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Seller'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={styles.innerContainner}>
                <Text style={{ color: 'black' , marginTop:50}}>
                    {'Why homes don’t sell?'}
                </Text>
                <View style={{
                    width: '70%',
                    alignSelf: 'center',
                    backgroundColor: '#74C42B',
                    borderRadius: 25,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
                        {'Sale your house at 1% commisions'}
                    </Text>
                </View>

                <View style={{
                    width: '70%',
                    // marginLeft: 15,
                    marginTop: 30
                }}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>
                        {'Market your home in front of potential buyers in these Four simple steps'}
                    </Text>

                    <Image style={{
                        width: 200,
                        height: 150,
                        marginLeft: '40%',
                        marginTop: 10
                    }} source={Images.sellerhouse} />
                </View>

                <Text style={{ color: 'black', marginTop: 30 }}>
                    {'What you lose if you move out of 92 Agents?'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'Why 92 Agents?'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'You save upto $10,000 when you choose 92Agents!'}
                </Text>
                {/* <TouchableOpacity style={{
                    width: '70%',
                    alignSelf: 'center',
                    backgroundColor: '#74C42B',
                    borderRadius: 25,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50
                }}>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
                        {'Join to save your 1000$'}
                    </Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={{
                    width: '70%',
                    alignSelf: 'center',
                    backgroundColor: '#74C42B',
                    borderRadius: 25,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50
                }}
                onPress={()=>}
                >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
                        {'Buyers Screen'}
                    </Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}

export default SellerScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainner: {
        width: '90%',
        alignSelf: 'center'
    }
})