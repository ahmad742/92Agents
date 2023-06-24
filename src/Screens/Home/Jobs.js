import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { MyJobsAPI, GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader"
import { useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/native";
const Jobs = ({ navigation }) => {
    const { userData, agentId } = useSelector(state => state.userSession)
    const isFocused = useIsFocused()
    // const { signupresponse } = useSelector(state => state.)
    // const {signUpResponse} = useSelector(state => state.signUpResponse) 
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState('')
    const [bio, setBio] = useState('')
    useEffect(() => {
        jobsAPI()
        GetPersonalBio()
    }, [isFocused])

    const GetPersonalBio = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('id', userData?.user?.id)
            const response = await GetPersonalBioAPI(formData)
            console.log('GetPersonalBioAPI-response ===>>>', response.data?.data?.photo)
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
    const jobsAPI = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('agents_users_role_id', agentId)
            formData.append('agents_user_id', userData?.user?.id)
            console.log(" MyJobsAPI Form Data ===>>>", formData);
            const response = await MyJobsAPI(formData)
            // console.log('MyJobsAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                setJobs(response.data.posts)
            }
            setLoading(false)
        } catch (error) {
            console.log("MyJobsAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const DummyJob = [
        {
            id:1,
            address:'heellllooo'
        }
    ]

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('JobDetails', { Item: item })}
                style={{
                    width: '100%',
                    padding: 20,
                    marginTop: 20,
                }}>
                {/* <Text style={styles.text}>
                    {item?.name}
                </Text> */}
                <Text style={styles.text}>
                    {item?.address1}
                </Text>
                <Text style={styles.text}>
                    {
                        (item?.state_name + " " + item?.zip) == null ?
                            "No Location Provided Yet !"
                            :
                            item?.state_name + " " + item?.zip
                    }
                </Text>
                <Text style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: '400'
                }}>
                    {item?.description}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    {/* <Text style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '400'
                    }}>
                        {item.address}
                    </Text> */}
                    <Text style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '400'
                    }}>
                        {(item?.applied_agent).length + "  " + "Agents Applied"}
                    </Text>
                    <Text style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '400'
                    }}>
                        {"Closing Date" + " : " + (item?.closing_date == null ? 'Not Updated Yet' : item?.closing_date)}
                    </Text>
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#D2D1D7', marginTop: 10 }}></View>
            </TouchableOpacity>
        )
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'My Jobs'}
                RightIcon={Images.menu}
                profileicon={bio?.photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + bio?.photo } : Images.profile}
            />
            <FlatList
                // data={DummyJob}
                data={jobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ width: '100%', marginBottom: 75 }}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Jobs

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
        // paddingHorizontal: 15,
        width: '100%',
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
    }

})