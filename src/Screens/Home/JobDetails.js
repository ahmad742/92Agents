import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { JobDetailsAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader"
import { WebView } from 'react-native-webview';
const JobDetails = ({ navigation, route }) => {

    useEffect(() => {
        PostDetails()
    }, [])

    const PostData = route?.params?.Item
    // console.log("Post Data ===>>>", PostData);
    const [loading, setLoading] = useState(false)
    const [jobsDetails, setJobsDetails] = useState('')
    const [bio, setBio] = useState('')


    const Data = [
        {
            id: 1,
            agentName: 'James Thomsan',
            AgentImage: Images.Agent,
        },
        {
            id: 2,
            agentName: 'Michal',
            AgentImage: Images.profile,
        },
    ]


    const PostDetails = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('agents_user_id', PostData?.agents_user_id)
            formData.append('agents_users_role_id', PostData?.agents_users_role_id)
            formData.append('post_id', PostData?.post_id)
            console.log("Formdata Job details ===>>>", formData);
            const response = await JobDetailsAPI(formData)
            console.log('JobDetailsAPI-response ===>>>', response.data?.response)
            if (response.data.status == 100) {
                setJobsDetails(response.data.response)
            }
            setLoading(false)
        } catch (error) {
            console.log("JobDetailsAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    // const getBookMarksFn = async () => {

    //     setLoading(true)
    //     try {
    //         const formData = new FormData()
    //         formData.append('agents_users_role_id', '2')
    //         formData.append('agents_user_id', '2')
    //         const response = await MyJobsAPI(formData)
    //         console.log('MyJobsAPI-response ===>>>', response.data?.status)
    //         if (response.data.status == 100) {
    //             setJobs(response.data.posts)
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         console.log("MyJobsAPI-error===>>>", error);
    //         // setLoading(false)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('PaymentMethod')}
                style={styles.borderlinne}>
                <View style={{
                    flexDirection: 'row',
                    width: '40%',
                    alignItems: 'center'
                }}>
                    <Image source={Images.Agent} style={{ width: 50, height: 50 }} />
                    <View>
                        {/* <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1939', marginLeft: 10 }}>{item.agentName}</Text> */}
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1939', marginLeft: 10 }}>{item?.brokers_name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#1C1939', marginLeft: 10 }}>{item?.city_name}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#D2D1D7', marginTop: 10 }}></View>
            </TouchableOpacity>
        )
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                RightIcon={Images.menu}
                heading={'Job Details'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={{
                width: "100%",
                marginBottom: 30
            }}>
                <View style={styles.notesConntainer}>
                    <View style={{
                        width: '85%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                            {'Latest Post'}
                        </Text>
                    </View>
                    <View style={styles.borderlinne}>

                        {/* <WebView
                            // originWhitelist={['*']}
                            source={{ html: jobsDetails?.post?.details }}
                        /> */}

                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#4A4A4A', marginLeft: 10 }}>{jobsDetails?.post?.details}</Text>

                    </View>

                </View>
                <View style={styles.notesConntainer}>
                    <View style={{
                        width: '85%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                            {'Post Overview'}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>

                        <Image style={{ width: 15, height: 10 }} source={Images.Union} />
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#1C1939', marginLeft: 10 }}>{'Want to Buy now.'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>

                        <Image style={{ width: 15, height: 10 }} source={Images.Union} />
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#1C1939', marginLeft: 10 }}>{'Need Cash back and Negotiate Commision'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>

                        <Image style={{ width: 15, height: 10 }} source={Images.Union} />
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#1C1939', marginLeft: 10 }}>{'Price Range 150k to250k.'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>

                        <Image style={{ width: 15, height: 10 }} source={Images.Union} />
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#1C1939', marginLeft: 10 }}>{'Property Type multi family.'}</Text>
                    </View>

                </View>
                <View style={styles.notesConntainer}>
                    <View style={{
                        width: '85%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                            {'All Notes'}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#FAFAFA',
                        width: '85%',
                        alignSelf: 'center',
                        height: 96,
                        borderRadius: 10,
                        marginTop: 30
                    }}>

                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#010604', marginTop: 10, marginLeft: 20 }}>
                            {'My notes will come here'}
                        </Text>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#979797', marginTop: 10, marginLeft: 20 }}>
                            {'Details of this nortes here'}
                        </Text>

                    </View>

                </View>
                <View style={styles.notesConntainer}>
                    <View style={{
                        width: '85%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                            {'Applied Agents'}
                        </Text>
                    </View>
                    <FlatList
                        // data={Data}
                        data={PostData?.applied_agent}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />


                </View>
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default JobDetails

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
    },
    notesConntainer: {
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        height: 308,
        marginTop: 30,
        borderRadius: 10
    },
    borderlinne: {
        // borderWidth:1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 30
    },

})