import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { ChangePasswordAPI ,GetPersonalBioAPI} from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
const ChangePassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bio, setBio] = useState('')
    const { userData } = useSelector(state => state.userSession)

    useEffect(() => {
        GetPersonalBio()
    }, [])

    const inputCheck = () => {
        if (oldPassword === '') {
            Toast.show("Password is required")
        }
        else if (newPassword === '') {
            Toast.show("New Password is Required")
        }
        else if (confirmPassword === '') {
            Toast.show("Confirm Password is Required")
        }
        else if (newPassword.length < 8) {
            Toast.show("New Password must required 8 Characters")
        }
        else if (confirmPassword.length < 8) {
            Toast.show("Confirm Password must required 8 Characters")
        }
        else if (newPassword !== confirmPassword) {
            Toast.show("Password is not Correct")
        }
        else {
            Register()
        }
    }
    const GetPersonalBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('id',  userData?.user?.id)
            const response = await GetPersonalBioAPI(formData)
            // console.log('GetPersonalBioAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                setBio(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            console.log("GetPersonalBio-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('oldpassword', oldPassword)
            formData.append('password', newPassword)
            formData.append('password_confirmation', confirmPassword)
            console.log(" CHnage Password Form Data -====-->>>", formData);
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
            Toast.show("Old Password is not Correct")
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'My Profile'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={styles.profileContainer}>
                <Image source={{uri:'https://dev.92agents.com/assets/img/profile/'+bio?.photo}} style={{ width: 115, height: 108, borderRadius:30 }} />
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                    {bio?.fname}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                {bio?.phone}
                </Text>
            </View>
            <KeyboardAwareScrollView>
            <View style={{
                width: '85%',
                alignSelf: 'center',
                alignItems: 'flex-start',

            }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939', marginTop: 70 }}>
                    {'Change Password'}
                </Text>
            </View>
           
                <CustomInput
                    isLeftIcon={true}
                    iconStyle={styles.leftIconStyle}
                    placeholder={'Old Password'}
                    onChangeText={val => setOldPassword(val)}
                    value={oldPassword}
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
                // onPress={() => navigation.navigate('AccountTypes')}]
                onPress={()=>inputCheck()}
            />
            </KeyboardAwareScrollView>
                <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ChangePassword

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
        marginTop: 30,
        marginBottom:30,
    },

})