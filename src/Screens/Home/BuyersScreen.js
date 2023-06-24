import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
const BuyersScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Buyers'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={styles.innerContainner}>
                <Text style={{ color: 'black' , marginTop:50}}>
                    {'Buying dream home made easy'}
                </Text>

                <View style={{
                    width: '100%',
                    // marginLeft: 15,
                    marginTop: 30
                }}>
                    <Text style={{ color: 'black'}}>
                        {'Owning a home makes you feel proud of yourself but finding an ideal one is not that easy.That’s where you consider hiring agents but again, not every agent is skilful to find you a home of your choice. Sometimes, the commission goes high and sometimes, they just take too long to act. Read more'}
                    </Text>

                    <Image style={{
                        width: 200,
                        height: 150,
                        marginLeft: '20%',
                        marginTop: 10
                    }} source={Images.buyerhouse} />
                </View>
                {/* <TouchableOpacity style={{
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
                        {'Join to get your dream house '}
                    </Text>
                </TouchableOpacity> */}
                <Text style={{ color: 'black', marginTop: 30 }}>
                    {'Connect with 1000+ agents close to you in   10minutes and that too in five simple steps;'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'Top benefits:'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'Why 92 Agents?'}
                </Text>
                <View style={{width:'70%', alignSelf:'center'}}>
                    <Text style={{ color: 'black', marginTop: 20 }}>
                        {'1. Get to see 100+ agents near to you'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'2. Access their bio including qualification, experience and customer reviews'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'3. Do Live chat with them'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'4. Get 24/7 customer support from our side'}
                    </Text>
                </View>
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
                        {'Join now'}
                    </Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default BuyersScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainner: {
        width: '90%',
        alignSelf: 'center',
        marginBottom:20
    }
})