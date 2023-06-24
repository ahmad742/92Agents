import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import AppButton from "../../Components/AppButton";
import OTPInput from "../../Components/OTPInput";
import Images from "../../assets/Images";
const AccountCreated = ({ navigation, route }) => {

    const SgnUpApiResponse = route?.params?.SgnUpApiResponse || ''
    return (

        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.innerContainer}>
                <View style={styles.thumbsConntainer}>
                    <Image source={Images.ThumbsUp} style={{ width: 258, height: 233 }} />
                </View>
                <View style={[styles.welcomtext, { marginTop: 50 }]}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Account Created!'}
                    </Text>
                </View>
                <View style={[styles.welcomtext, { marginTop: 20 }]}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC', lineHeight: 24 }}>
                        {'Your account has been created successfully. Press continue to start using app.'}
                    </Text>
                </View>
                <AppButton
                    label={'Continue'}
                    btnStyle={styles.buttonStyle}
                    onPress={() => navigation.navigate('Welcome', { SgnUpApiResponse: SgnUpApiResponse })}
                />
                <View style={styles.subHeading}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                            {' By clicking start, you agree to our  '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                            <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#59AB02', textDecorationLine: 'underline' }}>
                                {'Privacy Policy'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                            {'our '}
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('TermsAndConsitions')}>
                            <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#59AB02', textDecorationLine: 'underline' }}>
                                {'Teams and Conditions'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AccountCreated

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    innerContainer: {
        width: "90%",
        marginBottom:10
    },
    welcomtext: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    thumbsConntainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    subHeading: {
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 10,
        marginTop: '60%'
    },
})