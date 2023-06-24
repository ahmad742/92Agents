import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import { GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useDispatch } from "react-redux"
import { logoutUser } from "../../Redux/actions/userSession";
import { useSelector } from "react-redux";
const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const [bio, setBio] = useState('')
    const [loading, setLoading] = useState(false)

    const { userData, agentId } = useSelector(state => state.userSession)
    useEffect(() => {
        console.log("Profile Screen ==>>", userData?.user?.agents_users_role_id);
        console.log("agentId ==>>", agentId);

    }, [userData])
    useEffect(() => {
        GetPersonalBio()
    }, [])
    const GetPersonalBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('id', userData?.user?.id)
            console.log("ID --==-->>>", formData);
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

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'My Profile'}
            />
            <ScrollView style={{ width: '100%', marginBottom: 80 }}>
                <View style={styles.profileContainer}>
                    <Image source={bio?.photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + bio?.photo } : Images.profile} style={{ width: 115, height: 108, borderRadius: 30 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                        {bio?.fname}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                        {bio?.phone}
                    </Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => {
                            if ((userData?.user?.agents_users_role_id || agentId) == 2) {
                                navigation.navigate('BuyersScreen')
                                console.log("userData?.user?.agents_users_role_id ===>>>", userData?.user?.agents_users_role_id);
                            }
                            else if ((userData?.user?.agents_users_role_id || agentId) == 3) {
                                navigation.navigate('SellerScreen')
                                console.log("userData?.user?.agents_users_role_id ===>>>", userData?.user?.agents_users_role_id);
                            }
                            else if ((userData?.user?.agents_users_role_id || agentId) == 4) {
                                navigation.navigate('AgentScreen'),
                                    console.log("userData?.user?.agents_users_role_id ===>>>", userData?.user?.agents_users_role_id);
                            }
                        }
                        }
                        style={[styles.profileMenusConntainer, { marginTop: 20 }]}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.ProfileTab} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'My Profile  '}
                        </Text>
                    </TouchableOpacity>
                    {/* {
                        userData?.user?.agents_users_role_id || agentId === 4 ?
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('AgentScreen')
                                }
                                style={[styles.profileMenusConntainer, { marginTop: 20 }]}>
                                <View style={styles.imagecontainer}>
                                    <Image source={Images.ProfileTab} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                                </View>
                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                                    {'My Profile  '}
                                </Text>
                            </TouchableOpacity>
                            :
                            <></>
                    }
                    {
                        userData?.user?.agents_users_role_id || agentId === 3 ?
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('SellerScreen')
                                }
                                style={[styles.profileMenusConntainer, { marginTop: 20 }]}>
                                <View style={styles.imagecontainer}>
                                    <Image source={Images.ProfileTab} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                                </View>
                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                                    {'My Profile  '}
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        userData?.user?.agents_users_role_id || agentId === 2 ?
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('BuyersScreen')
                                }
                                style={[styles.profileMenusConntainer, { marginTop: 20 }]}>
                                <View style={styles.imagecontainer}>
                                    <Image source={Images.ProfileTab} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                                </View>
                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                                    {'My Profile  '}
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    } */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('PofileSetting')}
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.setting} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Settings'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PersonalBio')}
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.Job} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Personal Bio'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SecurityQuestion')}
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.lock} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Security'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ContactUs')}
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.key} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Contact Us'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangePassword')}
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.key} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Change Password '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(logoutUser())
                            navigation.replace('AuthStack')
                        }
                        }
                        style={styles.profileMenusConntainer}>
                        <View style={styles.imagecontainer}>
                            <Image source={Images.key} style={{ width: 16, height: 16, tintColor: '#FFFFFF' }} />
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
                            {'Log Out'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    profileContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        alignSelf: 'center'
    },
    profileMenusConntainer: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#59AB02',
        borderRadius: 8,
        height: 60,
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center'

    },
    imagecontainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }

})