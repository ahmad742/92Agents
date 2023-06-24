import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, FlatList, Keyboard } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { GetSecurityQuesAPI, SecurityQuesAnsAPI, GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";
const SecurityQuestion = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState('')
    const [ques, setQues] = useState('')
    const [ans, setAns] = useState('')
    const [bio, setBio] = useState('')
    const { userData } = useSelector(state => state.userSession)
    // useEffect(() => {
    //     console.log("Profile Screen ==>>", userData);

    // }, [userData])
    useEffect(() => {
        getQuesAPI()
        GetPersonalBio()
    }, [])
    const GetPersonalBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('id', userData?.user?.id)
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

    const getQuesAPI = async () => {

        try {
            const response = await GetSecurityQuesAPI()
            // console.log('GetSecurityQuesAPI   ===>>>', response.data?.securityquestions);
            if (response.status == 200) {
                setQuestion(response.data?.securityquestions?.securty_questio)
            }
            setLoading(false)
        } catch (error) {
            console.log("error===>>>", error);
            setLoading(false)
        }
    }
    const QuesAns = async (data) => {
        // console.log("question ==>>",data[0]?.question);
        // return false

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('question1', data[0]?.question)
            formData.append('answer1', ans)
            formData.append('id', userData?.user?.id)
            console.log('SecurityQuesAnsAPI-formData ===>>>', formData)
            const response = await SecurityQuesAnsAPI(formData)
            console.log('SecurityQuesAnsAPI-response ===>>>', response?.data)
            if (response.data.status == 100) {
                Toast.show(response.data.response)
            }
        } catch (error) {
            console.log("SecurityQuesAnsAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: '95%',
                alignSelf: 'center',
                marginTop: 30
            }}>
                <CustomInput
                    label={'Question'}
                    value={item?.question}
                    editable={false}
                    multiline={true}
                />
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    label={'Answer'}
                    iconStyle={styles.leftIconStyle}
                    placeholder={'My answer here'}
                    onChangeText={val => setAns(val)}
                    value={ans}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    // fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#D8D8D8', marginTop: 20 }}>
                </View>
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Security Questions'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={{ marginBottom:50}}>
                <View style={styles.profileContainer}>
                    <Image source={bio?.photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + bio?.photo } : Images.profile} style={{ width: 115, height: 108 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                        {bio?.name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                        {bio?.phone}
                    </Text>
                </View>

                <FlatList
                    // data={Data}
                    data={question}
                    renderItem={renderItem}
                    style={{ marginBottom: 40, marginTop: 50 }}
                />
                <AppButton
                    label={'Save'}
                    btnStyle={styles.buttonStyle}
                    onPress={() => QuesAns(question)}
                />
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default SecurityQuestion

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