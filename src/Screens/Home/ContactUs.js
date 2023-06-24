import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Keyboard, Image, KeyboardAvoidingView } from 'react-native'
import { StackActions } from '@react-navigation/native';
import AppButton from "../../Components/AppButton";
import CustomInput from "../../Components/CustomInput";
import { ContactUsAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { userToken, signUpResponse } from "../../Redux/actions/userSession";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "../../assets/Images";
const ContactUs = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
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
        else if (message === '') {
            Toast.show('Enter any Message')
        }
        else {
            Register()
        }
    }


    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('message', message)

            console.log("form data ==>>", formData);
            const response = await ContactUsAPI(formData)
            console.log('ContactUsAPI-response ===>>>', response?.data)
            if (response.data.status == 200) {
               Toast.show('Thank you! Your message has been sent successfully')
               setName(null)
               setEmail(null)
               setMessage(null)
            }
            setLoading(false)
        } catch (error) {
            console.log("SignUpApi-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: '10%',
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        marginTop: 30,
                        height: 50,
                        alignItems: 'center'
                    }}>
                    <Image source={Images.backIcon} style={{ width: 10, height: 20 }} />
                </TouchableOpacity>
                <View style={[styles.welcomtext, { marginTop: 10 }]}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Contact Us'}
                    </Text>
                </View>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: 100, width: '90%', alignSelf: 'center' }}>
                        <CustomInput
                            label='Name'
                            labelstyle={{ marginTop: 20 }}
                            isLeftIcon={true}
                            placeholder={'Name'}
                            onChangeText={val => setName(val)}
                            value={name}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                        <CustomInput
                            label='Email'
                            isLeftIcon={true}
                            labelstyle={{ marginTop: 20 }}
                            placeholder={'Email Address'}
                            onChangeText={val => setEmail(val)}
                            value={email}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                        <CustomInput
                            label='Your Message'
                            isLeftIcon={true}
                            labelstyle={{ marginTop: 20 }}
                            placeholder={'Your Message'}
                            onChangeText={val => setMessage(val)}
                            value={message}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />

                        <AppButton
                            label={'Send Message'}
                            btnStyle={styles.buttonStyle}
                            onPress={() => inputCheck()}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
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
    }
})