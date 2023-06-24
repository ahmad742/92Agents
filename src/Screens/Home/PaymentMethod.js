import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import Images from "../../assets/Images";
import Header from '../../Components/Header'
const PaymentMethod = ({ navigation }) => {

    const Data = [
        {
            id: 1,
            PaymentImage: Images.MasterCard,
            CardNo: '***  *** ***  5678',
            ExpiryDate: 'Expire 09/25'
        },
        {
            id: 1,
            PaymentImage: Images.Visa,
            CardNo: '***  *** ***  5678',
            ExpiryDate: 'Expire 09/25'
        },
        {
            id: 1,
            PaymentImage: Images.PayPal,
            CardNo: 'Petra_stack@gmail.com',
        },
        {
            id: 1,
            PaymentImage: Images.Cash,
            CardNo: 'Cash Payment ',
            ExpiryDate: 'Default method'
        }
    ]


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
            onPress={()=>navigation.navigate('AddCard')}
            style={{
                width: '90%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 20,
                height: 73,
                padding: 10,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#00000059'
            }}>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image style={{ width: 50, height: 30 }} source={item.PaymentImage} />
                </View>
                <View style={{ width: '75%', justifyContent: 'center', height: '100%' }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
                        {item.CardNo}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 12, fontWeight: '400' }}>
                        {item.ExpiryDate}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <SafeAreaView style={styles.mainContainer}>
            <Header
                heading={'Payment Methods'}
                leftIcon={Images.backIcon}
                leftIconnavigation={() => navigation.goBack()}
            />
            <View style={{
                width: "85%",
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: '500', textAlign: 'center' }}>
                    {'Choose desired vehicle type. We offer cars suitable for most every days needs'}
                </Text>
            </View>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ marginTop: 50 }}
            />

        </SafeAreaView>
    )
}

export default PaymentMethod

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