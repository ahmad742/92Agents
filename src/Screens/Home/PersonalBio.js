import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { GetPersonalBioAPI } from "../../API/Methods/auth";
import { UpdatePersonalBioAPI } from "../../API/Methods/auth";
import Toast from "react-native-simple-toast";
import Loader from '../../Components/Loader'
import { useSelector } from "react-redux";
const PersonalBio = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [bio, setBio] = useState('')
    const [code, setCode] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const { userData } = useSelector(state => state.userSession)
    useEffect(() => {
        console.log("Profile Screen ==>>", userData);

    }, [userData])
    useEffect(() => {
        GetPersonalBio()
    }, [])

    const inputCheck = () => {
        if (address1 === '') {
            Toast.show('Enter a address line 1')
        }
        else if (address2 === '') {
            Toast.show('Enter a address line 2')
        }

        else if (state === '') {
            Toast.show("Statw is required")
        }
        else if (city === '') {
            Toast.show("City is Required")
        }
        else {
            updateBio()
        }
    }


    const updateBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('address', address1)
            formData.append('address2', address2)
            formData.append('city_id', city)
            formData.append('id', userData?.user?.id)
            formData.append('state_id', state)
            // formData.append('zip_code', code)
            console.log(' Form data Update Personal BioAPI-response ::":":":":"===>>>', formData)
            const response = await UpdatePersonalBioAPI(formData)
            console.log('UpdatePersonalBioAPI-response ===>>>', response.data.status)
            if (response.data.status == 100) {
                Toast.show(response.data.message)
                setAddress1(null)
                setAddress2(null)
                setState(null)
                setCity(null)
                setCode(null)
                GetPersonalBio()
            }
            setLoading(false)
        } catch (error) {
            console.log("UpdatePersonalBioAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const GetPersonalBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('id', userData?.user?.id)
            const response = await GetPersonalBioAPI(formData)
            console.log('GetPersonalBioAPI-response ===>>>', response?.data?.data)
            if (response.data.status == 100) {
                setAddress1(response?.data?.data?.address)
                setAddress2(response?.data?.data?.address2)
                setState(response?.data?.data?.state_id)
                setCode(response?.data?.data?.zip_code)
                setCity(response?.data?.data?.city_id)
                setPhoto(response?.data?.data?.photo)
                setName(response?.data?.data?.name)
                setPhone(response?.data?.data?.phone)
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

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Personal Bio'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={{ marginBottom: 30 }}>
                <View style={styles.profileContainer}>
                    <Image source={photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + photo } : Images?.profile} style={{ width: 115, height: 108, borderRadius: 30 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                        {name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                        {phone}
                    </Text>
                </View>
                <View style={{
                    width: '85%',
                    alignSelf: 'center',
                    alignItems: 'flex-start',
                    marginTop: 50
                }}>
                </View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Address Line 1"}
                    // leftIcon={Images.password}

                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.address : 'my address line 1  here'}
                    onChangeText={val => setAddress1(val)}
                    value={address1}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Address Line 2"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.address2 : 'my address line2 here'}
                    onChangeText={val => setAddress2(val)}
                    value={address2}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20 }}></View>

                <CustomInput
                    isLeftIcon={true}
                    label={"State"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.state : 'Rajashan'}
                    onChangeText={val => setState(val)}
                    value={state}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20 }}></View>

                <CustomInput
                    isLeftIcon={true}
                    label={"city"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.city : 'Delhi'}
                    onChangeText={val => setCity(val)}
                    value={city}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20 }}></View>

                {/* <CustomInput
                    isLeftIcon={true}
                    label={"ZipCode"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.zip_code : 'zip_code'}
                    onChangeText={val => setCode(val)}
                    value={code}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                /> */}

            </ScrollView>
            <AppButton
                label={'Save'}
                btnStyle={styles.buttonStyle}
                onPress={() => inputCheck()}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default PersonalBio

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    profileContainer: {
        width: '100%',
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
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 10,
        marginTop: 'auto',
        marginBottom: 30
    },

})