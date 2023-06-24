import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "../../assets/Images";
import AppButton from "../../Components/AppButton";
import { AddNotesAPI, GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";
const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('')
    const [bio, setBio] = useState('')

    const { userData, agentId } = useSelector(state => state.userSession)

    useEffect(() => {
        console.log("SIGN UP DATA ==>>", userData);

    }, [userData])

    useEffect(() => {
        GetPersonalBio()
    }, [])


    const Addnotes = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('notes', note)
            formData.append('sender_id', userData?.user?.id)
            formData.append('sender_role', agentId)
            // formData.append('sender_role', agentId)
            console.log("Form Data ==>>>", JSON.stringify(formData));
            const response = await AddNotesAPI(formData)
            console.log('AddNotesAPI-response ===>>>', JSON.stringify(response?.data))
            if (response.data.status == 100) {
                Toast.show('Your Note is added successfully')
                setNote(null)
            }
        } catch (error) {
            console.log("AddNotesAPI-error===>>>", error?.response?.data);
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
            console.log("FORM DATA HPOME PROFILE API ===>>", formData)
            const response = await GetPersonalBioAPI(formData)
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
    return (

        <SafeAreaView style={styles.mainContainer}>
            {/* <ScrollView style={{ width: '100%' }}> */}
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.innerContainer}>
                    <View style={styles.profileImageView}>
                        <Image source={bio?.photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + bio?.photo } : Images?.profile} style={{ width: 47, height: 47, borderRadius: 10 }} />
                        <View style={styles.profileData}>
                            <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFFFF' }}>
                                {bio?.fname}
                            </Text>
                            {/* <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>
                                {'Agent'}
                            </Text> */}
                        </View>
                    </View>
                    <View style={styles.welcomeView}>
                        <Text style={{ fontSize: 32, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Welcome'}
                        </Text>
                    </View>
                    <View style={styles.profileDetailsTabView}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notes')}
                            style={styles.profileDetailsTab}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Notes')}
                                style={{
                                    backgroundColor: '#59AB02',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10
                                }}>
                                <Image source={Images.send} style={{ width: 14, height: 12 }} />
                            </TouchableOpacity>
                            <Text style={styles.profileDetailsTabtext}>
                                {'Notes'}
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Bookmarks')}
                            style={styles.profileDetailsTab}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Bookmarks')}
                                style={{
                                    backgroundColor: '#59AB02',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10
                                }}>
                                <Image source={Images.creditcard} style={{ width: 14, height: 12 }} />
                            </TouchableOpacity>
                            <Text style={styles.profileDetailsTabtext}>
                                {'Bookmarks'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Tests')}
                            style={styles.profileDetailsTab}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Tests')}
                                style={{
                                    backgroundColor: '#59AB02',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10
                                }}>
                                <Image source={Images.growth} style={{ width: 14, height: 12 }} />
                            </TouchableOpacity>
                            <Text style={styles.profileDetailsTabtext}>
                                {'Tests'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* <ScrollView style={styles.notesConntainer}> */}
                {/* <KeyboardAwareScrollView> */}
                <View style={styles.notesConntainer}>
                    <View style={{
                        width: '85%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                            {'Notes'}
                        </Text>
                    </View>
                    <View style={styles.borderlinne}></View>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your notes"
                        placeholderTextColor={'black'}
                        multiline={true}
                        onChangeText={text => setNote(text)}
                        value={note}
                    />
                    <AppButton
                        label={'Save Notes'}
                        btnStyle={styles.buttonStyle}
                        onPress={() => Addnotes()}
                    />
                </View>
                {/* </ScrollView> */}
                {/* </KeyboardAwareScrollView> */}

            </ScrollView>

            {/* </ScrollView> */}
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
    },
    innerContainer: {
        width: "100%",
        height: 324,
        // backgroundColor: 'red'
        backgroundColor: '#59AB02'
    },
    profileImageView: {
        flexDirection: 'row',
        width: '85%',
        alignSelf: 'center',
        marginTop: 30
    },
    profileData: {
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeView: {
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    profileDetailsTabView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: '20%'
    },
    profileDetailsTab: {
        width: 100,
        height: 114,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    profileDetailsTabtext: {
        fontSize: 13,
        fontWeight: '400',
        color: '#1C1939',
        marginTop: 20
    },
    notesConntainer: {
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        height: 408,
        marginTop: 90,
        borderRadius: 10,
        marginBottom: 100,
    },
    borderlinne: {
        // borderWidth:1,
        borderBottomWidth: 1,
        borderBottomColor: '#D2D1D7',
        width: '85%',
        alignSelf: 'center',
        marginTop: 20
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
        color: 'black',
        maxHeight: 150,
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