import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { GetBookmarks } from "../../API/Methods/auth";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Bookmarks = ({ navigation }) => {
    const { userData, agentId } = useSelector(state => state.userSession)
    const [loading, setLoading] = useState(false)
    const [bookMarks, setBookMarks] = useState('')
    useEffect(() => {
        getBookMarksFn()
    }, [])
    const getBookMarksFn = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('bookmark_type', '2')
            formData.append('bookmark_item_id', '2')
            formData.append('bookmark_item_parent_id', '2')
            formData.append('sender_id', userData?.user?.ids)
            formData.append('sender_role', agentId)
            const response = await GetBookmarks(formData)
            console.log('GetBookmarks-response ===>>>', response.data)
            // if (response.data.status == 100) {
            //     setBookMarks(response.data.data)
            // }
            setLoading(false)
        } catch (error) {
            console.log("GetBookmarks-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Bookmarks'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={styles.notesConntainer}>
                <View style={{
                    width: '85%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 40
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#1C1939' }}>
                        {'All Bookmarks'}
                    </Text>
                </View>
                <View style={styles.borderlinne}></View>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Bookmarks

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