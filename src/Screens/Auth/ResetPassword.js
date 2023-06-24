import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { ChangePasswordAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ResetPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const inputCheck = () => {
        if (newPassword === '') {
            Toast.show("New Password is required")
        }
        else if (confirmPassword === '') {
            Toast.show("Confirm Password is required")
        }
        else if (newPassword !== confirmPassword) {
            Toast.show("Password does not match")
        }
        else {
            Register()
        }
    }
    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('oldpassword', oldPassword)
            formData.append('password', newPassword)
            formData.append('password_confirmation', confirmPassword)
            const response = await ChangePasswordAPI(formData)
            console.log('ChangePasswordAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                Toast.show(response.data.response)
                setOldPassword(null)
                setNewPassword(null)
                setConfirmPassword(null)
            }
            setLoading(false)
        } catch (error) {
            console.log("ChangePasswordAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Reset Password'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView>
                <View style={{
                    width: '85%',
                    alignSelf: 'center',
                    alignItems: 'flex-start',

                }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939', marginTop: 70 }}>
                        {'Enter Your New Password Here'}
                    </Text>
                </View>
                <CustomInput
                    isLeftIcon={true}
                    iconStyle={styles.leftIconStyle}
                    placeholder={'New Password'}
                    onChangeText={val => setNewPassword(val)}
                    value={newPassword}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <CustomInput
                    isLeftIcon={true}
                    iconStyle={styles.leftIconStyle}
                    placeholder={'Confirm Password'}
                    onChangeText={val => setConfirmPassword(val)}
                    value={confirmPassword}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />

                <AppButton
                    label={'Save'}
                    btnStyle={styles.buttonStyle}
                    // onPress={() => navigation.goBack()}
                    onPress={() => inputCheck()}
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    profileContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    profileMenusConntainer: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#59AB02',
        borderRadius: 8,
        height: 60,
        alignItems: 'center',
        marginTop: 10

    },
    imagecontainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    buttonStyle: {
        backgroundColor: '#59AB02',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 10,
        marginTop: '30%',
        marginBottom: 30,
    },

})