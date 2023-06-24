import React from 'react';
import {Image} from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from '../assets/Images';
import Home from '../Screens/Home/Home';
import Jobs from '../Screens/Home/Jobs';
import Message from '../Screens/Home/Message';
import Profile from '../Screens/Home/Profile';
import Search from '../Screens/Home/Search'
import ChangePassword from '../Screens/Home/ChangePassword'
import PersonalBio from '../Screens/Home/PersonalBio';
import SecurityQuestion from '../Screens/Home/SecurityQuestion';
import TermsAndConsitions from '../Screens/Home/TermsAndConsitions'
import Notes from '../Screens/Home/Notes';
import Bookmarks from '../Screens/Home/Bookmarks';
import Tests from '../Screens/Home/Tests';
import Privacy from '../Screens/Home/Privacy';
import SellerScreen from '../Screens/Home/SellerScreen'
import BuyersScreen from '../Screens/Home/BuyersScreen';
import PofileSetting from '../Screens/Home/PofileSetting';
import ChatScreen from '../Screens/Home/ChatScreen';
import JobDetails from '../Screens/Home/JobDetails';
import ContactUs from '../Screens/Home/ContactUs';
import PaymentMethod from '../Screens/Home/PaymentMethod';
import AddCard from '../Screens/Home/AddCard';
import AgentScreen from '../Screens/Home/AgentScreen';
import AgentProfile from '../Screens/Home/AgentProfile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const bottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
          height:75,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          width: '100%',
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor:'#FFFFFF',
          borderTopWidth:0,
      },
      "tabBarHideOnKeyboard":"true",
  }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 22,
                  height: 24,
                  marginTop: 10,
                  resizeMode:'contain',
                  tintColor: focused ? '#59AB02' : '#1C1939',
                  // backgroundColor:'red'1
                }}
                source={Images.Home}
              />
            )
          }
        }}
        name="Home" component={Home}
         />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 22,
                  height: 24,
                  marginTop: 10,
                  resizeMode:'contain',
                  tintColor: focused ? '#59AB02' : '#1C1939',
                  // backgroundColor:'red'1
                }}
                source={Images.Job}
              />
            )
          }
        }}
        name="Jobs" component={Jobs} 
        />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 22,
                  height: 24,
                  marginTop: 10,
                  resizeMode:'contain',
                  tintColor: focused ? '#59AB02' : '#1C1939',
                  // backgroundColor:'red'1
                }}
                source={Images.Search}
              />
            )
          }
        }}
        name="Search" component={Search}
         />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 22,
                  height: 24,
                  marginTop: 10,
                  resizeMode:'contain',
                  tintColor: focused ? '#59AB02' : '#1C1939',
                  // backgroundColor:'red'1
                }}
                source={Images.message}
              />
            )
          }
        }}
        name="Message" component={Message}
         />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 22,
                  height: 24,
                  marginTop: 10,
                  resizeMode:'contain',
                  tintColor: focused ? '#59AB02' : '#1C1939',
                  // backgroundColor:'red'1
                }}
                source={Images.ProfileTab}
              />
            )
          }
        }}
        name="Profile" component={Profile} 
        />
    </Tab.Navigator>
  );
}
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'bottomTab'} component={bottomTab}/>
      <Stack.Screen name={'ChangePassword'} component={ChangePassword}/>
      <Stack.Screen name={'PersonalBio'} component={PersonalBio}/>
      <Stack.Screen name={'SecurityQuestion'} component={SecurityQuestion}/>
      <Stack.Screen name={'TermsAndConsitions'} component={TermsAndConsitions}/>
      <Stack.Screen name={'Notes'} component={Notes}/>
      <Stack.Screen name={'Bookmarks'} component={Bookmarks}/>
      <Stack.Screen name={'Tests'} component={Tests}/>
      <Stack.Screen name={'Privacy'} component={Privacy}/>
      <Stack.Screen name={'SellerScreen'} component={SellerScreen}/>
      <Stack.Screen name={'BuyersScreen'} component={BuyersScreen}/>
      <Stack.Screen name={'PofileSetting'} component={PofileSetting}/>
      <Stack.Screen name={'ChatScreen'} component={ChatScreen}/>
      <Stack.Screen name={'JobDetails'} component={JobDetails}/>
      <Stack.Screen name={'ContactUs'} component={ContactUs}/>
      <Stack.Screen name={'PaymentMethod'} component={PaymentMethod}/>
      <Stack.Screen name={'AddCard'} component={AddCard}/>
      <Stack.Screen name={'AgentScreen'} component={AgentScreen}/>
      <Stack.Screen name={'AgentProfile'} component={AgentProfile}/>

    </Stack.Navigator>
  );
};

export default HomeStack;
