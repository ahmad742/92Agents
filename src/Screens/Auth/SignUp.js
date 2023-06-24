import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, TouchableOpacity, ScrollView } from 'react-native'

//Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import { CountryPicker } from "react-native-country-codes-picker";

//Files
import Images from "../../assets/Images";

//Components
import CustomInput from '../../Components/CustomInput'
import CheckBox from "../../Components/CheckBox";
import AppButton from "../../Components/AppButton";
import Loader from "../../Components/Loader";

// API
import { SignUpApi } from '../../API/Methods/auth'
import { useDispatch } from "react-redux";
import { signUpResponse } from "../../Redux/actions/userSession";
import { useSelector } from "react-redux";

const SignUp = ({ navigation }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const dispatch = useDispatch()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmpasswordVisible, setConnfirmPasswordVisible] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checkBox, setCheckBox] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (name === '') {
            Toast.show('Enter a Name')
        }
        else if (email === '') {
            Toast.show('Enter a Email')
        }
        else if (reg.test(email) === false) {
            Toast.show("Enter a correct Email")
        }
        else if (phone === '') {
            Toast.show('Enter a Phone No.')
        }
        else if (password === '') {
            Toast.show("Password is required")
        }
        else if (confirmPassword === '') {
            Toast.show("Enter Confirm Password")
        }
        else if (password !== confirmPassword) {
            Toast.show("Confirm Password is not correct")
        }
        else if (password.length < 8) {
            Toast.show("Password must be at least 8 Characters in length")
        }
        else if (checkBox == false) {
            Toast.show("Please select terms and conditions")
        }
        else {
            Register()
        }
    }


    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('fname', name)
            formData.append('step', '1')
            formData.append('phone', countryCode+phone)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('confirm_password', confirmPassword)
            formData.append('terms_and_conditions', checkBox)
            console.log("formdata ====>>", formData);
            const response = await SignUpApi(formData)
            console.log('SignUpApi-response===>>>', response.data)
            if (response.data.status == 100) {
                if(response.data.userExistsDetails == null){
                    dispatch(signUpResponse(response?.data))
                    navigation.navigate("AccountTypes", {
                        SgnUpApiResponse: response.data,
                    })
                }
                else{
                    Toast.show("Phone no. or email already exists")
                }
               
                setLoading(false)
            }
            else if (response?.data?.status == 103) {
                Toast.show(response?.data?.error)
            }
            else if (response?.data?.status == 101) {
                Toast.show(response?.data?.error)
            }
        } catch (error) {
            console.log("SignUpApi-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.welcomtext}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Welcome!'}
                    </Text>
                </View>
                <View style={styles.subHeading}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939' }}>
                        {'Please provide following details for your new account!'}
                    </Text>
                </View>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: 50 }}>
                        <CustomInput
                            isLeftIcon={true}
                            // leftIcon={Images.password}
                            iconStyle={styles.leftIconStyle}
                            placeholder={'Full Name'}
                            onChangeText={val => setName(val)}
                            value={name}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            fieldRef={nameRef}
                            onSubmitEditing={() => {
                                emailRef?.current?.focus()
                            }}
                        />
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
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            justifyContent:"space-between"
                        }}>
                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={{
                                    width: '20%',
                                    height: 50,
                                    backgroundColor: '#F7F7F7',
                                    padding: 10,
                                    marginTop:25,
                                    borderRadius:12,
                                    alignItems:'center',
                                    justifyContent:"center"

                                }}
                            >
                                <Text style={{
                                    color: 'black',
                                    fontSize: 20
                                }}>
                                    {countryCode}
                                </Text>
                            </TouchableOpacity>
                            <CustomInput
                                isLeftIcon={true}
                                textinputStyle={{width:'75%', marginLeft:15}}
                                // leftIcon={Images.password}
                                iconStyle={styles.leftIconStyle}
                                placeholder={'Phone no.'}
                                onChangeText={val => setPhone(val)}
                                value={phone}
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                fieldRef={phoneRef}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }}
                                Keyboard={'numeric'}
                            />
                        </View>
                        <CustomInput
                            isLeftIcon={true}
                            // leftIcon={Images.password}
                            iconStyle={styles.leftIconStyle}
                            placeholder={'Password'}
                            rightIcon={passwordVisible ? Images.eye : Images.hidden}
                            rightIconOnPress={() => setPasswordVisible(!passwordVisible)}
                            onChangeText={val => setPassword(val)}
                            value={password}
                            password={passwordVisible ? false : true}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            // fieldRef={passwordRef}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                        <CustomInput
                            isLeftIcon={true}
                            // leftIcon={Images.password}
                            iconStyle={styles.leftIconStyle}
                            placeholder={'Confirm password'}
                            rightIcon={confirmpasswordVisible ? Images.eye : Images.hidden}
                            password={confirmpasswordVisible ? false : true}
                            rightIconOnPress={() => setConnfirmPasswordVisible(!confirmpasswordVisible)}
                            onChangeText={val => setConfirmPassword(val)}
                            value={confirmPassword}
                            autoCapitalize={'none'}

                            returnKeyType={'done'}
                            // fieldRef={passwordRef
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                    <CheckBox
                        mainContainerStyle={styles.checkContainer}
                        label={"By creating your account you agree with to our Terms and Conditions."}
                        checkBoxText={styles.checkText}
                        onPress={() => { setCheckBox(!checkBox) }}
                        source={Images.check}
                        checkboxStyle={checkBox === true ? styles.active : ""}
                    // onLabelPress={() => navigation.navigate('PrivacyPolicy')}
                    // source={Images.checkIcon}
                    // checkboxStyle={privacy === true ? styles.active : ""}
                    />
                    <AppButton
                        label={'Next'}
                        btnStyle={styles.buttonStyle}
                        onPress={() => inputCheck()}
                    />
                    <View style={styles.subHeading}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                                {' Do you have an account?  '}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                                <Text style={{ fontSize: 15, fontWeight: '700', textAlign: 'center', color: '#1C1939CC' }}>
                                    {'- Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <CountryPicker
                    show={show}
                    style={{
                        backgroundColor:'red',
                        color:'black'
                    }}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                />
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default SignUp

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
        width: "80%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: '#59AB02',
        // width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 10,
        marginTop: 30
    },
    checkContainer: {
        marginTop: 30
    },
    active: {
        backgroundColor: '#59AB02',
        borderWidth: 0,
    },

})