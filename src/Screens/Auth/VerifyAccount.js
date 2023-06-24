import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import AppButton from "../../Components/AppButton";
import OTPInput from "../../Components/OTPInput";
import { VerifyAccountAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";
const VerifyAccount = ({ navigation, route }) => {

    const SgnUpApiResponse = route?.params?.SgnUpApiResponse || ''
    const { agentId } = useSelector(state => state.userSession)
    console.log("agentId === == = ===== == = >>>", agentId);
    const [otp, setOTP] = useState('')
    const [loading, setLoading] = useState(false)

    const inputCheck = () => {
        if (otp === '') {
            Toast.show('Enter a OTP')
        }
        else if (otp.length < 4) {
            Toast.show('Enter a correct OTP')
        }

        else {
            verifyOtp()
        }
    }
    const verifyOtp = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('step', "3")
            formData.append('id', SgnUpApiResponse?.userDetails?.id)
            formData.append('agents_users_role_id', agentId)
            formData.append('verification_code', otp)
            console.log("formData ===>>>", formData);
            const response = await VerifyAccountAPI(formData)
            console.log('VerifyAccountAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                navigation.navigate("AccountCreated", {
                    SgnUpApiResponse: SgnUpApiResponse
                })
            }
            setLoading(false)
        } catch (error) {
            console.log("VerifyAccountAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.innerContainer}>
                <View style={styles.welcomtext}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Verify Account!'}
                    </Text>
                </View>
                <View style={styles.subHeading}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC', }}>
                        {'Enter 4-digit Code code we have sent to at'}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#7165E3',
                        marginTop: 10,
                        textDecorationLine: 'underline'
                    }}>
                        {SgnUpApiResponse?.userDetails?.phone}
                    </Text>
                </View>
                <OTPInput
                    onComplete={(code) => {
                        setOTP(code)
                    }}
                />
                <View style={styles.subHeading}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                        {'Didn’t n received the code?'}
                    </Text>
                </View>
                <View style={styles.subHeading}>
                    <Text style={{ fontSize: 15, fontWeight: '700', textAlign: 'center', color: '#59AB02', textDecorationLine: 'underline' }}>
                        {'Resend Code'}
                    </Text>
                </View>
                <AppButton
                    label={'Proceed'}
                    btnStyle={styles.buttonStyle}
                    // onPress={() => navigation.navigate('AccountCreated')}
                    onPress={() => inputCheck()}
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TermsAndConsitions')}
                        >
                            <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#59AB02', textDecorationLine: 'underline' }}>
                                {'Teams and Conditions'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default VerifyAccount

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    innerContainer: {
        width: "90%"
    },
    welcomtext: {
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
        marginTop: '90%'
    },
})