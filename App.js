import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import {AuthProvider} from './AuthContext';
import Navigation from './Navigation';
import VersionCheck from 'react-native-version-check';

// import { AddProvider } from './Addcontext';
import SplashScreen from  "react-native-splash-screen";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { baseurl } from './src/constants/Constants';
import { Alert, BackHandler, Linking } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    checkUpdateNeeded();
  }, []);
  
  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded.isNeeded) {
  Alert.alert(
    'Please update',
    'You will have to update your app to the latest version to continue using .',
    [
  {
    text:'Update',
    onPress:()=>{
      BackHandler.exitApp();
      Linking.openURL('https://play.google.com/store/apps/details?id=com.shopurmeatapp&pcampaignid=web_share')
    }
  }
    ],
    {
      cancelable:false
    }
  )
    }
  }
  
  React.useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus) {
          console.log('Notification permission granted:', authorizationStatus);
        } else {
          console.log('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <InternetConnectionAlert
    onChange={(connectionState) => {
      // console.log("Connection State: ", connectionState.details);
     }}>

    <AuthProvider>
          <Navigation/>
    </AuthProvider>
   
    </InternetConnectionAlert>
  );
};

export default App;

