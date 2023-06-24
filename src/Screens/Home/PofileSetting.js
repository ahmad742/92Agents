import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView, TouchableOpacity } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { GetPersonalBioAPI } from "../../API/Methods/auth";
import { EditProfileAPI, ProfilePictureAPI } from "../../API/Methods/auth";
import Toast from "react-native-simple-toast";
import Loader from '../../Components/Loader'
import { useSelector } from "react-redux";
import { canUseCamera } from "../../Components/Camera";
const PofileSetting = ({ navigation }) => {
    const { userData } = useSelector(state => state.userSession)
    // console.log("user Datat --==>>", userData); 
    const [loading, setLoading] = useState(false)
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [pic, setPic] = useState('')
    const [code, setCode] = useState('')
    const [photo, setPhoto] = useState('')
    const [phone, setPhone] = useState('')
    useEffect(() => {
        GetPersonalBio()
    }, [])
    const options = {
        opacity: 0.3, 
        mediaType: 'image',
        quality: 0.1,

    }
    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        // console.log('im here')
        launchImageLibrary(options, callback)

    }

    const callback = async response => {
        console.log('my response=====>', response)
        if (response.didCancel) {
            // console.log("User Cancelled Image Picker")
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            setProfileImage(source)
        }
    }
    const updateBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('address', address1)
            formData.append('address2', address2)
            formData.append('city_id', '3')
            // formData.append('city_id', bio?.city_id)
            formData.append('id', userData?.user?.id)
            formData.append('state_id', '6')
            // formData.append('state_id', bio?.state_id)
            formData.append('email', userData?.user?.email)
            formData.append('fname', fullName)
            console.log("formData ===>>>", formData);
            const response = await EditProfileAPI(formData)
            console.log('EditProfileAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                Toast.show(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            console.log("EditProfileAPI-error===>>>", error);
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
            console.log("GetPersonalBio-error===>>>", response?.data?.data);
            if (response.data.status == 100) {
                setBio(response.data.data)
                setAddress1(response?.data?.data?.address)
                setAddress2(response?.data?.data?.address2)
                setState(response?.data?.data?.state)
                setCode(response?.data?.data?.zip_code)
                setCity(response?.data?.data?.city)
                setPhoto(response?.data?.data?.photo)
                setName(response?.data?.data?.name)
                setPhone(response?.data?.data?.phone)
            }
            setLoading(false)
        } catch (error) {
            console.log("GetPersonalBio-error===>>>", error?.response);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const DpAPI = async () => {
        try {
            const formData = new FormData()
            formData.append('id', userData?.user?.id)
            formData.append('image', profileImage)
            const response = await ProfilePictureAPI(formData)
            if (response.data.status == 100) {
                setPic(response?.data?.response)
            }
        } catch (error) {
            console.log("ProfilePictureAPI-error===>>>", error);
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Profile Setting'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />

            <View style={styles.profileContainer}>
                <View style={{
                    width:'50%',
                 justifyContent:'center',
                 alignItems:'center',
                 }}>
                    <Image source={profileImage ? profileImage: { uri: 'https://dev.92agents.com/assets/img/profile/' + photo } } style={{ width: 115, height: 108, borderRadius:30 }} />
                    <TouchableOpacity 
                    onPress={()=> showLibrary()}
                    style={{
                        position:'absolute',
                        right:15,
                        bottom:0,
                        width:50,
                        height:50,
                        justifyContent:'flex-end',
                        alignItems:'flex-end'
                    }}
                    >
                        <Image source={Images.Edit} style={{ width: 25, height: 28, }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                    {fullName}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                    {phone}
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 30, marginTop: 30 }}>
                <View style={{ width: '100%', alignSelf: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#979797' }}>
                        {'Account'}
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Email"}
                    // leftIcon={Images.password}

                    iconStyle={styles.leftIconStyle}
                    placeholder={'Enter Email'}
                    onChangeText={val => setEmail(val)}
                    value={userData?.user?.email}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    editable={false}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Full Name"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={bio ? bio?.fname : 'Enter FullName'}
                    onChangeText={val => setName(val)}
                    value={fullName}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ marginTop: 20, borderBottomColor: '#D2D1D7', borderBottomWidth: 1 }}></View>
                <View style={{ width: '100%', alignSelf: 'center', alignItems: 'flex-start', marginTop: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#979797' }}>
                        {'Location'}
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Address line 1"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={address1 ? address1 : 'Enter Your Street Address'}
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
                    label={"Address line 2"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={address2 ? address2 : 'Enter Your City'}
                    onChangeText={val => setAddress2(val)}
                    value={address2}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <CustomInput
                    isLeftIcon={true}
                    label={"State"}
                    // leftIcon={Images.password}
                    iconStyle={styles.leftIconStyle}
                    placeholder={state ? state : 'Dehli'}
                    onChangeText={val => setState(val)}
                    value={state}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />

            </ScrollView>
            <AppButton
                label={'Save'}
                btnStyle={styles.buttonStyle}
                onPress={() => {
                    DpAPI()
                updateBio()

                }}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default PofileSetting

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