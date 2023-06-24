import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Images from "../../assets/Images";
import { AccountTypeAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useDispatch } from "react-redux";
import { agentuserroleID } from "../../Redux/actions/userSession";
const AccountTypes = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    
    const SgnUpApiResponse = route?.params?.SgnUpApiResponse || ''

    const CheckAccountType = async (id) => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('step', SgnUpApiResponse?.step)
            formData.append('id', SgnUpApiResponse?.userDetails?.id)
            formData.append('agents_users_role_id', id)
            console.log("CheckAccountType Form Data ===>>>", formData);
            const response = await AccountTypeAPI(formData)
            console.log('CheckAccountType-response ===>>>', response.data)
            if (response.data.status == 100) {
                dispatch(agentuserroleID(response?.data?.userDetails?.agents_users_role_id))
                navigation.navigate("VerifyAccount",{
                    SgnUpApiResponse:SgnUpApiResponse
                })
            }
            
        } catch (error) {
            console.log("CheckAccountType-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.welcomtext}>
                    <Text style={{ fontSize: 35, fontWeight: '700', color: '#1C1939' }}>
                        {'Accout Type'}
                    </Text>
                </View>
                <View style={styles.subHeading}>
                    <Text style={{ fontSize: 15, fontWeight: '400', textAlign: 'center', color: '#1C1939CC' }}>
                        {'Please select your accout type'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.tpyesConatiner}
                    onPress={() => CheckAccountType(4)}
                // onPress={() => navigation.navigate('VerifyAccount')}
                >
                    <Image style={{ width: 82, height: 85 }} source={Images.Agent} />
                    <Text style={{ fontSize: 36, fontWeight: '700', color: '#1C1939' }}>{'Agent'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tpyesConatiner}
                    onPress={() => CheckAccountType(3)}
                >
                    <Image style={{ width: 82, height: 85 }} source={Images.Seller} />
                    <Text style={{ fontSize: 36, fontWeight: '700', color: '#1C1939' }}>{'Seller'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tpyesConatiner}
                    onPress={() => CheckAccountType(2)}
                >
                    <Image style={{ width: 82, height: 85 }} source={Images.Investor} />
                    <Text style={{ fontSize: 36, fontWeight: '700', color: '#1C1939' }}>{'Buyer'}</Text>
                </TouchableOpacity>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default AccountTypes

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingHorizontal: 15
    },
    innerContainer: {
        width: "90%"
    },
    welcomtext: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    subHeading: {
        width: "80%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    tpyesConatiner: {
        flexDirection: 'row',
        width: '100%',
        height: 143,
        borderWidth: 1,
        borderColor: '#59AB02',
        borderRadius: 24,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 50
    }

})