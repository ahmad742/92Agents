import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { ForgotPasswordAPI, GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ForgotPassword = ({ navigation }) => {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

  const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '') {
            Toast.show('Enter a Email')
        }
        else if (reg.test(email) === false) {
            Toast.show("Enter a correct Email")
        }
        else {
            ForgotPassword()
        }
    }
    const ForgotPassword = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            const response = await ForgotPasswordAPI(formData)
            console.log('ForgotPassword-response ===>>>', response.data)
            if (response.data.status == 100) {
                Toast.show(response.data.response)
            }
           else if (response.data.status == 101) {
                Toast.show(response.data.error)
            }
        } catch (error) {
            console.log("ForgotPassword-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Forgot Password'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView>
                <View style={{
                    width: '95%',
                    alignSelf: 'center',
                    alignItems: 'flex-start',

                }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#1C1939', marginTop: 70 }}>
                        {'If you want to reset password, So Enter your email here'}
                    </Text>
                </View>

                <CustomInput
                    isLeftIcon={true}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={'Email Address'}
                    onChangeText={val => setEmail(val)}
                    value={email}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    fieldRef={emailRef}
                    keyBoardType={'email-address'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <AppButton
                    label={'Next'}
                    btnStyle={styles.buttonStyle}
                    onPress={() => inputCheck()}
                    // onPress={() => navigation.navigate('ResetPassword')}
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    buttonStyle: {
        backgroundColor: '#59AB02',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 10,
        marginTop: '100%',
        marginBottom: 30,
    },

})