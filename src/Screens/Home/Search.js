import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, FlatList } from 'react-native'
import Images from "../../assets/Images";
import { SearchAgentsAPI, GetPersonalBioAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
const Search = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchData, setSearchData] = useState('')
    const [bio, setBio] = useState('')

    const { userData, agentId } = useSelector(state => state.userSession)

    useEffect(() => {
        GetPersonalBio()
    }, [])

    const search = async () => {
        try {
            const formData = new FormData()
            formData.append('searchinputtype', "name")
            formData.append('keyword', searchName)
            const response = await SearchAgentsAPI(formData)
            console.log('SearchAgentsAPI-response ===>>>', response.data.response)
            if (response.data.status == 100) {
                setSearchData(response.data.response)
            }
            setLoading(false)
        } catch (error) {
            console.log("SearchAgentsAPI-error===>>>", error);
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
    const SearchModal = ({ item }) => {
        return (
            <View
                style={styles.searchModalBg}
            >
                <TouchableOpacity onPress={() => navigation.navigate('AgentProfile', { AgentData: item })} style={styles.searchModalBg}>
                    <View style={styles.borderlinne}>
                        <View style={{
                            flexDirection: 'row',
                            width: '40%',
                            alignItems: 'center'
                        }}>
                            <Image source={item?.photo ? {uri : item?.photo} : Images.profile} style={{ width: 50, height: 50, borderRadius:10 }} />
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#1C1939', marginLeft: 10 }}>{item?.name}</Text>
                        </View>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#D2D1D7', marginTop: 10 }}></View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Find Agent'}
                RightIcon={Images.menu}
                profileicon={{ uri: 'https://dev.92agents.com/assets/img/profile/' + bio?.photo }}
            />
            <TextInput
                placeholder="Search by Name"
                style={styles.textinput}
                placeholderTextColor='#2C2948'
                onChangeText={(val) => { setSearchName(val), search() }}
                value={searchName}
            />
            {
                searchName.length > 0 ?
                    <FlatList
                        data={searchData}
                        renderItem={SearchModal}
                        keyExtractor={item => item.id}
                        style={{ width: '100%', alignSelf: 'center', paddingTop: 20, }}
                    />
                    : null
            }

            <Loader loading={loading} isShowIndicator={true} />

        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    textinput: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 25,
        paddingHorizontal: 20,
        color: 'black',
    },
    searchModalBg: {
        width: '100%',
        height: 'auto'
    },
    searchTextView: {
        width: '100%',
        // height: 'auto'

    },
    borderlinne: {
        // borderWidth:1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },

})