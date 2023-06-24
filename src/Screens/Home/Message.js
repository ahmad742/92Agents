import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import Header from "../../Components/Header";
import Images from "../../assets/Images";
import { GetAllMessagesAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
const Message = ({ navigation }) => {
    const { userData, agentId } = useSelector(state => state.userSession)
    const isFocused = useIsFocused()
    useEffect(() => {
        GetAllMessages()
    }, [isFocused])
    const [loading, setLoading] = useState(false)
    const [allMessagesList, setAllMessageslidst] = useState('')
    const GetAllMessages = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('sender_id', userData?.user?.id)
            formData.append('sender_role', agentId)
            const response = await GetAllMessagesAPI(formData)
            // console.log('GetAllMessagesAPI-response ===+++++++====>>>', response.data.response.llimit)
            if (response.data.response.llimit > 0) {
                setAllMessageslidst(response.data?.response?.result)
            }
            setLoading(false)
        } catch (error) {
            console.log("GetAllMessagesAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    const renderMessage = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ChatScreen', { Item: item })}
                style={styles.FlatListmainContainer}>
                <View style={styles.userImageContainer}>

                    <Image
                        // source={Images?.profile}
                        source={item?.photo ? { uri: 'https://dev.92agents.com/assets/img/profile/' + item?.photo } : Images?.profile}
                        style={{ height: 48, width: 48, borderRadius: 48 }}
                    />
                </View>
                <View style={styles.userNameContainer}>

                    <Text style={styles.nameStyle}>{item?.name}</Text>
                    <Text numberOfLines={1} style={styles.userMessageStyle}>{item?.snippet}</Text>
                </View>

                <View style={{ width: "20%", height: 50, justifyContent: 'center' }}>
                    <Text style={styles.textStyle}>
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'All Messages'}
            />
            {/* <TextInput
                placeholder="Search by Name"
                style={styles.textinput}
                placeholderTextColor='#2C2948'
            /> */}
            <FlatList
                data={allMessagesList}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Message

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    FlatListmainContainer: {
        backgroundColor: 'White',
        height: 80,
        width: '100%',
        alignItems: "center",
        flexDirection: "row",
        padding: 10

    },
    textinput: {
        borderWidth: 1,
        borderColor: 'black',
        // height:30,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 30,
        marginTop: 25,
        paddingHorizontal: 20,
        color: 'black'
    },
    userImageContainer: {
        backgroundColor: 'white',
        height: 48,
        width: 48,
        borderRadius: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    userNameContainer: {
        width: '65%',
        height: "100%",
        marginLeft: 10,
        justifyContent: 'center',
        // alignItems:'center'
    },
    nameStyle: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
    },
    userMessageStyle: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black',
        // marginTop:2

    },
    timerContainer: {
        height: "100%",
        width: "35%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 20
    },
    stopWatchView: {
        height: 25,
        width: 55,
        backgroundColor: 'black',
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
    },

})