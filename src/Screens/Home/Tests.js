import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from 'axios';
const Tests = ({ navigation }) => {
    const { userData, agentId } = useSelector(state => state.userSession)
    const [loading, setLoading] = useState(false)
    const [skills, setSkills] = useState('')
    useEffect(() => {
        getUserSkills()
    }, [])
    const getUserSkills = async () => {
        setLoading(true)
        axios.post('https://dev.92agents.com/api/profile/getUserSkills', {
            id: userData?.user?.id,
          })
          .then(function (response) {
            setLoading(false)
            console.log('Skills TEST Reesponse ==>>>',response?.data?.response?.agentAllskills);
            setSkills(response?.data?.response?.agentAllskills)
          })
          .catch(function (error) {
            setLoading(false)
            console.log(error);
          });

        // setLoading(true)
        // try {
        //     const formData = new FormData()
        //     formData.append('id', userData?.user?.id)
        //     console.log("BookMarkl Form Data ==>>>", formData);
        //     const response = axios.post('https://dev.92agents.com/api/profile/'(formData)
        //     console.log('GetBookmarks-response ===>>>', response.data)
        //     // if (response.data.status == 100) {
        //     //     setBookMarks(response.data.data)
        //     // }
        //     setLoading(false)
        // } catch (error) {
        //     console.log("GetBookmarks-error===>>>", error);
        //     // setLoading(false)
        // }
        // finally {
        //     setLoading(false)
        // }
    }
    const notesRenderItem = ({item}) =>{
        return(
            <View style={{
                width:'90%',
                alignSelf:'center',
                borderRadius:10,
                // height:70,
                padding:20,
                backgroundColor:'#F9F9FB',
                marginTop:10
            }}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#1C1939' }}>
                        {item?.skill}
                    </Text>
                </View>
            </View>
        )
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Skill Tests'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '400', color: '#979797', textAlign: 'center', lineHeight: 15.62 }}>
                    {'Prove your skills and impress potential Agent and Seller by taking a 92Agents tests! The more relevant tests you pass, the more professional you look. Read the test policies & rules before starting any tests.'}
                </Text>
            </View>
            <View style={styles.notesConntainer}>
                <View style={{
                    width: '85%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 40
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                        {'Test Questions'}
                    </Text>
                </View>
                <View style={styles.borderlinne}></View>
                <FlatList
                style={{marginVertical:30}}
                data={skills}
                renderItem={notesRenderItem}
                keyExtractor={item => item?.id}
                />
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Tests

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
        // paddingHorizontal: 15
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
        marginLeft: 20
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
        marginTop: 30,
        borderRadius: 10
    },
    borderlinne: {
        // borderWidth:1,
        borderBottomWidth: 1,
        borderBottomColor: '#D2D1D7',
        width: '85%',
        alignSelf: 'center',
        marginTop: 20
    }
})