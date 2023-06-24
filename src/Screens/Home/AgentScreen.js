import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
const AgentScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Agents'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={styles.innerContainner}>
                <Text style={{ color: 'black', marginTop: 20 }}>
                    {'Want to become one of the most-sought-after real estate agent? Welcome to 92 Agents.'}
                </Text>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Text style={{ color: 'black', marginTop: 20 }}>
                        {'1. We bring sellers and buyers looking for qualified agents on to a single platform. Get offers, help them out and make earning easy.'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'2. Create your profile'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'3. Get notified when sellers and buyers post their requirements'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'4.Impress them with what you’ve got'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'5.Complete the job and make easy money'}
                    </Text>
                    <Text style={{ color: 'black', marginTop: 10 }}>
                        {'6.Get hired'}
                    </Text>
                </View>
                <View style={{
                    width: '100%',
                    alignItems: 'flex-end',
                }}>
                    <Image style={{
                        width: 200,
                        height: 150,
                        marginLeft: '20%',
                        marginTop: 10
                    }} source={Images.HouseKeys} />
                </View>
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: '#74C42B',
                    height: 54,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 11, fontWeight: '500', lineHeight:20 }}>
                        {'Are you not interested to make a head start? Then, what are you waiting for? Create your profile and make your first earning today!'}
                    </Text>
                </View>
                <Text style={{ color: 'black', marginTop: 30 }}>
                    {'Connect with 1000+ agents close to you in   10minutes and that too in five simple steps;'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'Top benefits:'}
                </Text>
                <Text style={{ color: 'black', marginTop: 10 }}>
                    {'Why 92 Agents?'}
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
                        {'Join now'}
                    </Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AgentScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainner: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20
    }
})