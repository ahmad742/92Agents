import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, Keyboard, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import { GetPersonalBioAPI } from "../../API/Methods/auth";
import { UpdatePersonalBioAPI } from "../../API/Methods/auth";
import Toast from "react-native-simple-toast";
import Loader from '../../Components/Loader'
import { useSelector } from "react-redux";
const AgentProfile = ({ navigation, route }) => {
    const { AgentData } = route?.params || ''
    console.log("Agent Datat ===>>", AgentData);
    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Agent Profile'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={{ marginBottom: 30 }}>
                <View style={styles.profileContainer}>
                    <Image source={AgentData?.photo ? { uri: AgentData?.photo } : Images.profile} style={{ width: 115, height: 108, borderRadius: 30 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1939', marginTop: 15 }}>
                        {AgentData?.name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#9EA6BE', marginTop: 5 }}>
                        {AgentData?.phone}
                    </Text>
                </View>
                <View style={{
                    width: '85%',
                    alignSelf: 'center',
                    alignItems: 'flex-start',
                    marginTop: 50
                }}>
                </View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Address Line 1"}
                    placeholder={AgentData?.address}
                    value={AgentData?.address}
                    editable={false}
                />
                <View style={{ marginTop: 20 }}></View>
                <CustomInput
                    isLeftIcon={true}
                    label={"Address Line 2"}
                    iconStyle={styles.leftIconStyle}
                    placeholder={AgentData?.address2 }
                    value={AgentData?.address2}
                    editable={false}
                />
                <View style={{ marginTop: 20 }}></View>

                <CustomInput
                    isLeftIcon={true}
                    label={"State"}
                    iconStyle={styles.leftIconStyle}
                    placeholder={ AgentData?.state_name }
                    value={AgentData?.state_name }
                    editable={false}
                />
                <View style={{ marginTop: 20 }}></View>

                <CustomInput
                    isLeftIcon={true}
                    label={"city"}
                    placeholder={AgentData?.city_name }
                    value={AgentData?.city_name }
                    editable={false}
                />
                <View style={{ marginTop: 20 }}></View>

                <CustomInput
                    isLeftIcon={true}
                    label={"ZipCode"}
                    placeholder={AgentData?.zip_code}
                    value={AgentData?.zip_code}
                    editable={false}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AgentProfile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    profileContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    profileMenusConntainer: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#59AB02',
        borderRadius: 8,
        height: 60,
        alignItems: 'center',
        marginTop: 10

    },
    imagecontainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
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