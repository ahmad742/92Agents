import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, } from 'react-native'
import Images from "../../assets/Images";
import Header from "../../Components/Header";
import { GetNotesAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
const Notes = ({ navigation }) => {
    const { userData } = useSelector(state => state.userSession)
    const [loading, setLoading] = useState(false)
    const [getNotes, setGetNotes] = useState('')
    useEffect(() => {
        notes()
    }, [])
    const notes = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('limit', '2')
            formData.append('agents_users_role_id', userData?.user?.agents_users_role_id)
            formData.append('id', userData?.user?.id)
            console.log("Form Data ==>>>", formData);
            const response = await GetNotesAPI(formData)
            console.log('GetNotesAPI-response ===>>>', response.data)
            if (response.data.status == 100) {
                setGetNotes(response.data?.notes)
            }
            setLoading(false)
        } catch (error) {
            console.log("GetNotesAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
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
                        {item?.notes}
                    </Text>
                </View>
            </View>
        )
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Notes'}
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
                        {'All Notes'}
                    </Text>
                </View>
                <View style={styles.borderlinne}></View>
                <FlatList
                style={{marginVertical:30}}
                data={getNotes}
                renderItem={notesRenderItem}
                keyExtractor={item => item?.id}
                />

            </View>
            <Loader loading={loading} isShowIndicator={true} />

        </SafeAreaView>
    )
}

export default Notes

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
        height: "60%",
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
    },

})