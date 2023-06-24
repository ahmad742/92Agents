import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Keyboard, Image } from 'react-native'
import { StackActions } from '@react-navigation/native';
import AppButton from "../../Components/AppButton";
import CustomInput from "../../Components/CustomInput";
import Images from "../../assets/Images";
import { LoginApi } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { useDispatch } from "react-redux"
import { userToken, signUpResponse, agentuserroleID } from "../../Redux/actions/userSession";
import { useSelector } from "react-redux";
import CheckBox from '../../Components/CheckBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Welcome = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const SgnUpApiResponse = route?.params?.SgnUpApiResponse || ''

    const { userData, agentId } = useSelector(state => state.userSession)

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [AgentcheckBox, setAgentCheckBox] = useState(false)
    const [SellercheckBox, setSellerCheckBox] = useState(false)
    const [BuyercheckBox, setBuyerCheckBox] = useState(false)
    useEffect(() => {
        console.log("AGENT ROLE ID ==>>", agentId);
    }, [agentId])

    const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '') {
            Toast.show('Enter a Email')
        }
        else if (reg.test(email) === false) {
            Toast.show("Enter a correct Email")
        }
        else if (password === '') {
            Toast.show("Password is required")
        }
        else if (password.length < 6) {
            Toast.show("Password more then 6 Characters")
        }
        else {
            Register()
        }
    }


    const Register = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            formData.append('agents_users_role_id', id)

            console.log("form data ==>>", formData);
            const response = await LoginApi(formData)
            console.log('LoginApi-response ===>>>', response?.data)
            if (response.data.status == 100) {
                dispatch(userToken(response?.data?.access_token))
                dispatch(signUpResponse(response?.data))
                dispatch(agentuserroleID(response?.data?.user?.agents_users_role_id))
                // dispatch(signUpResponse(SgnUpApiResponse))
                navigation.dispatch(
                    StackActions.replace('HomeStack')
                )
            }
            else if (response.data.status == 101) {
                Toast.show(response.data.error)
            }
        } catch (error) {
            console.log("LoginApi-error===>>>", error)?.response?.data;
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={[styles.welcomtext, { marginTop: 50 }]}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Welcome Back!'}
                    </Text>
                </View>
                <View style={[styles.welcomtext, { marginTop: 20 }]}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                        {'Sign in to continue '}
                    </Text>
                </View>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: 100 }}>
                        <CustomInput
                            isLeftIcon={true}
                            // leftIcon={Images.password}
                            iconStyle={styles.leftIconStyle}
                            placeholder={'Email Address'}
                            onChangeText={val => setEmail(val)}
                            value={email}
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
                            placeholder={'Password'}
                            rightIcon={passwordVisible ? Images.eye : Images.hidden}
                            rightIconOnPress={() => setPasswordVisible(!passwordVisible)}
                            onChangeText={val => setPassword(val)}
                            password={passwordVisible ? false : true}
                            value={password}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            // fieldRef={passwordRef}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                        style={styles.forgotView}>
                        <Text style={{ color: '#1C1939CC', fontWeight: '400', fontSize: 12 }}>
                            {'Forgot Password?'}
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        width: '80%',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 30
                    }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '700' }}>
                            {'Please Press your Type to Login'}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity style={styles.tpyesConatiner}
                            onPress={() => Register(4)}
                        >
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939' }}>{'Agent'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tpyesConatiner}
                            onPress={() => Register(3)}
                        >
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939' }}>{'Seller'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tpyesConatiner}
                            onPress={() => Register(2)}
                        >
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939' }}>{'Buyer'}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <AppButton
                        label={'Sign in'}
                        btnStyle={styles.buttonStyle}
                        onPress={() => inputCheck()}
                    /> */}
                    <View style={styles.subHeading}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                                {' Don’t have an account?  '}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={{ fontSize: 15, fontWeight: '700', textAlign: 'center', color: '#1C1939CC' }}>
                                    {'- Sign Up'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Welcome

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
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

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
        marginTop: '20%'
    },
    forgotView: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 20
    },
    checkContainer: {
        marginTop: 30,
    },
    checkText: {
        width: 100
    },
    active: {
        backgroundColor: '#59AB02',
        borderWidth: 0,
    },
    tpyesConatiner: {
        flexDirection: 'row',
        width: '30%',
        height: 100,
        borderWidth: 1,
        borderColor: '#59AB02',
        borderRadius: 24,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    }
})