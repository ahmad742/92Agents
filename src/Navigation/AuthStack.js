import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from '../Screens/Auth/SignUp';
import AccountTypes from '../Screens/Auth/AccountTypes';
import VerifyAccount from '../Screens/Auth/VerifyAccount';
import AccountCreated from '../Screens/Auth/AccountCreated'
import Welcome from '../Screens/Auth/Welcome'
import TermsAndConsitions from '../Screens/Home/TermsAndConsitions';
import Privacy from '../Screens/Home/Privacy'
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import ResetPassword from '../Screens/Auth/ResetPassword';
const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name='Welcome' component={Welcome} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='AccountTypes' component={AccountTypes} />
                <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
                <Stack.Screen name='AccountCreated' component={AccountCreated} />
                <Stack.Screen name='TermsAndConsitions' component={TermsAndConsitions} />
                <Stack.Screen name='Privacy' component={Privacy} />
                <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                <Stack.Screen name='ResetPassword' component={ResetPassword} />

        </Stack.Navigator>
    );
};

export default AuthStack;
