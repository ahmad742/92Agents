import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
const TermsAndConsitions = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Terms & Conditions'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <ScrollView style={{marginBottom:40}}>
                <View style={styles.textMainConatiner}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                        {'1.Terms of service contract'}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#000000', lineHeight: 20, marginTop: 10 }}>
                        {'All uses of 92 Agents services are imperiled to the terms of this legal contract between you 92 Agent. It is noticeable that 92 Agent offers services to you the ‘user’ acclimatized on your commitment to observe the ensuing terms and conditions deprived of mofication of any kind. Your recordkeeping with 92 Agents coupled with the use of 92 Agents services encompasses your contract to these ter and conditions. It is crucial to note that these terms are entitled  change at any given time, even without any scheduled earlier notice. Therefore you are responsible for rereading these terms of service on a regular basis.'}
                    </Text>
                </View>
                <View style={styles.textMainConatiner}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                        {'2.Google Analytics'}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#000000', lineHeight: 20, marginTop: 10 }}>
                        {'Our site makes good use of Google analytics which is merely a web analytics package delivered by Google. On the other hand, google analytics customs'}
                    </Text>
                </View>
                <View style={styles.textMainConatiner}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                        {'3.Links'}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#000000', lineHeight: 20, marginTop: 10 }}>
                        {'Links allowed in 92 Agents website are only provided for the efits of the user. The links may be channeled to the third party gratified as well as other sites. With all these information it is presented 92 Agents possess no authority beside or any other control over the places.'}
                    </Text>
                </View>
                <View style={styles.textMainConatiner}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                        {'4.92 Agents rights'}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#000000', lineHeight: 20, marginTop: 10 }}>
                        {'Undoubtedly, the volume of materials posted at a time in 92 agents website large and with that the latter agent does not follow all the articles you or a third party post or transmit. You explicitly accept that 92 Agents shall not be accountable for:'}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsAndConsitions

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    textMainConatiner: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 40
    }
})