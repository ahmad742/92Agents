import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
} from 'react-native';

import FloatingInputField from './FloatingInputField'

const inputAccessoryViewID = 'OTPInput'

export default class OTPInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeDigOne: '',
            codeDigOneFocus: false,
            codeDigTwo: '',
            codeDigTwoFocus: false,
            codeDigThree: '',
            codeDigThreeFocus: false,
            codeDigFour: '',
            codeDigFourFocus: false,
        }
    }

    componentDidMount() {
        if (this.fieldCodeDigOne) {
            this.fieldCodeDigOne.focus()
        }

    }

    getCode = () => {
        const { codeDigOne, codeDigTwo, codeDigThree, codeDigFour } = this.state
        return codeDigOne + codeDigTwo + codeDigThree + codeDigFour
    }

    render() {
        const { codeDigOne, codeDigTwo, codeDigThree, codeDigFour } = this.state
        const { onComplete } = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 20, width: '100%' }}>
                <FloatingInputField
                    fieldRef={ref => this.fieldCodeDigOne = ref}
                    hideLabel={true}
                    onParentPress={() => { if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus() }}
                    value={codeDigOne}
                    inputContainer={{
                        width: '20%',
                        height: 50,
                        paddingHorizontal: 0,
                        backgroundColor:'white',
                        borderRadius: 8,
                        elevation: 2,
                        shadowOpacity: 0.5,
                        shadowColor: '#000',
                        shadowOffset: { width: 2, height: 0 },

                    }}
                    inputStyle={{ fontSize: 24, textAlign: 'center' }}
                    autoCapitalize={'none'}
                    placeholder={''}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length <= 1) this.setState({ codeDigOne: text }, () => {
                            if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        })
                    }}
                    onFocus={(event) => {
                        this.setState({ codeDigOne: '', codeDigTwo: '', codeDigThree: '', codeDigFour: '', codeDigOneFocus: true })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigOne: '' })
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingInputField
                    fieldRef={ref => this.fieldCodeDigTwo = ref}
                    onParentPress={() => { if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus() }}
                    value={codeDigTwo}
                    hideLabel={true}
                    inputContainer={{
                        width: '20%',
                        height: 50,
                        paddingHorizontal: 0,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        elevation: 2,
                        shadowOpacity: 0.5,
                        shadowColor: '#000',
                        shadowOffset: { width: 2, height: 0 },

                    }} inputStyle={{ fontSize: 24, textAlign: 'center' }}
                    autoCapitalize={'none'}
                    placeholder={''}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigTwo: text }, () => {
                            // if(onComplete && typeof onComplete == 'function') onComplete(this.getCode())
                            if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigOne == '') if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus()
                        this.setState({ codeDigTwo: '', codeDigThree: '', codeDigFour: '', })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigTwo: '' })
                            if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingInputField
                    fieldRef={ref => this.fieldCodeDigThree = ref}
                    onParentPress={() => { if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus() }}
                    value={codeDigThree}
                    hideLabel={true}
                    inputContainer={{
                        width: '20%',
                        height: 50,
                        paddingHorizontal: 0,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        elevation: 2,
                        shadowOpacity: 0.5,
                        shadowColor: '#000',
                        shadowOffset: { width: 2, height: 0 },

                    }}
                    inputStyle={{ fontSize: 24, textAlign: 'center' }}
                    autoCapitalize={'none'}
                    placeholder={''}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigThree: text }, () => {
                            if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigTwo == '') if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        this.setState({ codeDigThree: '', codeDigFour: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigThree: '' })
                            if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingInputField
                    fieldRef={ref => this.fieldCodeDigFour = ref}
                    onParentPress={() => { if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus() }}
                    value={codeDigFour}
                    hideLabel={true}
                    inputContainer={{
                        width: '20%',
                        height: 50,
                        paddingHorizontal: 0,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        elevation: 2,
                        shadowOpacity: 0.5,
                        shadowColor: '#000',
                        shadowOffset: { width: 2, height: 0 },

                    }}
                    inputStyle={{ fontSize: 24, textAlign: 'center' }}
                    autoCapitalize={'none'}
                    placeholder={''}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigFour: text }, () => {
                            if (onComplete && typeof onComplete == 'function') onComplete(this.getCode())
                            // if (this.fieldCodeDigFive) this.fieldCodeDigFive.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigThree == '') if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        this.setState({ codeDigFour: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigFour: '' })
                            if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // Keyboard.dismiss()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />

            </View>
        )
    }
}

