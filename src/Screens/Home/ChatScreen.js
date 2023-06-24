import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { GetAllChatListAPI, Send_Message_API } from "../../API/Methods/auth";
import { useSelector } from "react-redux";
const ChatScreen = ({ navigation, route }) => {
    const { Item } = route?.params || ''
    const { userData, agentId } = useSelector(state => state.userSession)
    const [msg, setMsg] = useState('')
    const [allMessagesList, setAllMessageslist] = useState('')

    // useEffect(() => {
    //     getChatList()
    // }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            getChatList()
        }, 2000);
        console.log("ietm ====>>>", Item);
        return () => clearInterval(interval);
    }, []);
    const getChatList = async () => {
        try {
            const formData = new FormData()
            formData.append('sender_id', userData?.user?.id)
            formData.append('sender_role', agentId)
            formData.append('conversation_id', Item?.conversation_id)
            // console.log("Form Datat getChatList ===>>>", formData);
            const response = await GetAllChatListAPI(formData)
            // console.log("getChatList ===>>>", response.data[0]?.result);
            setAllMessageslist(response.data[0]?.result)
        } catch (error) {
            console.log("GetAllChatListAPI-error===>>>", error);
        }
    }
    const sendMsgFn = async () => {
        try {
            const formData = new FormData()
            formData.append('sender_id', userData?.user?.id)
            formData.append('sender_role', agentId)
            formData.append('conversation_id', Item?.conversation_id)
            formData.append('is_user', Item?.is_user)
            formData.append('message_text', msg)
            formData.append('receiver_id', Item?.sender_id)
            formData.append('receiver_role', Item?.sender_role_id)
            formData.append('post_id', Item?.post_id)
            console.log("Form Datat Snd Msg ===>>>", formData);
            const response = await Send_Message_API(formData)
            console.log('Send_Message_API-response ===+++++++====>>>', response.data?.status)
            if (response.data?.status == 'success') {
                setMsg('')
                getChatList()
            }
        } catch (error) {
            console.log("Send_Message_API-error===>>>", error);
        }
    }
    const messageRenderItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 15 }}>
                {item?.sender_id == userData?.user?.id ?
                    <View style={styles.senderMessegeView}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '400',
                            fontSize: 14
                        }}>{item?.message_text}</Text>
                        <View style={{ width: "30%", justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: '400',
                                fontSize: 14
                            }}>
                                {item?.updated_at}
                            </Text>
                        </View>
                    </View>
                    :
                    <View style={styles.receiverMessegeView}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '400',
                            fontSize: 14
                        }}>{item?.message_text}</Text>
                        <View style={{ width: "30%", justifyContent: 'center', alignSelf: 'flex-end' }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: '400',
                                fontSize: 14
                            }}>
                                {item?.updated_at}
                            </Text>
                        </View>
                    </View>
                }


            </View>
        )
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={Item?.name}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <FlatList
                data={allMessagesList}
                renderItem={messageRenderItem}
                keyExtractor={item => item.id}
                style={[styles.mainContainer, { marginBottom: 10 }]}
                inverted
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
                style={{
                    backgroundColor: '#D9D9D9',
                    width: "100%",
                    bottom: 0,
                }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#D9D9D9',
                    paddingHorizontal: 15
                }}>
                    <View style={{
                        flex: 1,
                        alignSelf: 'center',
                        paddingHorizontal: 10,
                        width: '70%',
                    }}>
                        <TextInput
                            placeholder='Leave your thoughts here...'
                            style={{
                                width: '100%',
                                maxHeight: 250,
                                color: 'black'
                            }}
                            placeholderTextColor={'black'}
                            multiline={true}
                            onChangeText={(text) => setMsg(text)}
                            value={msg}
                        />
                    </View>
                    <View style={{
                        width: '15%',
                        alignItems: 'flex-start',
                        flexDirection: 'column-reverse',
                        paddingBottom: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => sendMsgFn()}
                            disabled={msg.length > 0 ? false : true}
                            style={{
                                backgroundColor: 'grey',
                                width: 52,
                                height: 30,
                                borderRadius: 4,
                                color: 'white',
                                justifyContent: 'center',
                                // marginTop: 10
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                {'Send'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        width: '100%',
        // alignItems: 'center',
        // paddingHorizontal: 15
    },
    senderMessegeView: {
        width: '90%',
        alignSelf: 'flex-end',
        // height: 50,
        backgroundColor: '#74C42B',
        justifyContent: 'center',
        padding: 15,
        marginTop: 10,
        borderRadius: 15
    },
    receiverMessegeView: {
        width: '90%',
        alignSelf: 'flex-start',
        // height: 50,
        backgroundColor: '#00000061',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 15,
        marginTop: 10,
    }
})