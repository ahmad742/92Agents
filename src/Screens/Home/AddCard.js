import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Keyboard } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
import CustomInput from "../../Components/CustomInput";
import AppButton from "../../Components/AppButton";
import Toast from "react-native-simple-toast";
import { SaveCardAPI } from "../../API/Methods/auth";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
const AddCard = ({ navigation }) => {
    const { userData, agentId } = useSelector(state => state.userSession)
    console.log("user Data ===>>>", userData?.user?.id);

    const [num, setNum] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [expiryYaer, setExpiryYear] = useState('')
    const [cvv, setCvv] = useState('')
    const [loading, setLoading] = useState(false)
    const inputCheck = () => {
        if (name === '') {
            Toast.show('Enter a Name')
        }
        else if (num === '') {
            Toast.show('Enter a Card Number')
        }
        else if (expiry === '') {
            Toast.show('Enter Expiry Month')
        }
        else if (expiryYaer === '') {
            Toast.show('Enter Expiry Year')
        }
        else if (cvv === '') {
            Toast.show('Enter Expiry Date')
        }
        else {
            Register()
        }
    }


    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name_on_card', name)
            formData.append('card_number', num)
            formData.append('cvc', cvv)
            formData.append('card_expiry_month', expiry)
            formData.append('card_expiry_year', expiryYaer)
            formData.append('id', userData?.user?.id)

            console.log("form data ==>>", formData);
            const response = await SaveCardAPI(formData)
            console.log('SaveCardAPI-response ===>>>', response?.data)
            if (response.data.message == response.data.message) {
                Toast.show(response.data.message)
                setName(null)
                setCvv(null)
                setNum(null)
                setExpiry(null)
                setExpiryYear(null)
            }
            setLoading(false)
        } catch (error) {
            console.log("SaveCardAPI-error===>>>", error);
            // setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Add credit card'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 50
            }}>
                <CustomInput
                    label='Name'
                    labelstyle={{ marginTop: 20 }}
                    isLeftIcon={true}
                    placeholder={'Name'}
                    onChangeText={val => setName(val)}
                    value={name}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <CustomInput
                    label='Credit card number'
                    labelstyle={{ marginTop: 20 }}
                    isLeftIcon={true}
                    placeholder={'***  *** ***  5678'}
                    onChangeText={val => setNum(val)}
                    value={num}
                    maxLength={15}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ width: '45%', }}>
                        <CustomInput
                            label='Expiry Month'
                            labelstyle={{ marginTop: 20 }}
                            isLeftIcon={true}
                            placeholder={'01'}
                            onChangeText={val => setExpiry(val)}
                            value={expiry}
                            autoCapitalize={'none'}
                            maxLength={2}
                            returnKeyType={'done'}
                            textinputStyle={{ width: "100%" }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                    <View style={{ width: '45%', }}>
                        <CustomInput
                            label='Expiry Year'
                            labelstyle={{ marginTop: 20 }}
                            isLeftIcon={true}
                            placeholder={'1998'}
                            onChangeText={val => setExpiryYear(val)}
                            value={expiryYaer}
                            maxLength={4}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            textinputStyle={{ width: "100%" }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>

                </View>
                <View style={{ width: '45%' }}>
                    <CustomInput
                        label='CVV'
                        labelstyle={{ marginTop: 20 }}
                        isLeftIcon={true}
                        placeholder={'123'}
                        onChangeText={val => setCvv(val)}
                        value={cvv}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        textinputStyle={{ width: "100%" }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                    />
                </View>
                <AppButton
                    label={'Save'}
                    btnStyle={{ marginTop: 50 }}
                    onPress={() => inputCheck()}
                />
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default AddCard

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainner: {
        width: '90%',
        alignSelf: 'center'
    }
})