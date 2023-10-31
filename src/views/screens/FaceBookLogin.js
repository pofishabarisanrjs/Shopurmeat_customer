import React, { useEffect, useState,useContext,useRef } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {AuthContext} from '../../../AuthContext'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const FacebookLogin = () => {
  // Function to request user information, including email
  const {facebooklogin} = useContext(AuthContext);

  const requestUserInfo = (accessToken) => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'id,email,name',
          },
        },
      },
      (error, result) => {
        if (error) {
          console.log('Error fetching user info: ' + error);
        } else {
          console.log('User info: ' + JSON.stringify(result));

          // Handle the user information as needed
          const { id, email, name } = result ;
          console.log('User ID: ' + id);
          console.log('Email: ' + email);
          facebooklogin({result,accessToken})
          // Update your UI with the user information
        }
      }
    );

    // Start the request
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  // Function to fetch user information
  const fetchUserInfo = () => {
    // Check if the user is already logged in
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (!data) {
          // If not logged in, initiate the login process with 'email' permission
          LoginManager.logInWithPermissions(['email']).then(
            (result) => {
              if (result.isCancelled) {
                console.log('Login was cancelled');
              } else {
                console.log(
                  'Login was successful with permissions: ' +
                    result.grantedPermissions
                );

                // Once logged in, fetch user info
                requestUserInfo(data.accessToken);

                // Access the access token
                const accessToken = data.accessToken;
                console.log('Access Token: ' + accessToken);
              }
            },
            (error) => {
              console.log('Login failed with error: ' + error);
            }
          );
        } else {
          // If the user is already logged in, fetch user info
          console.log(data);
          requestUserInfo(data.accessToken);

          // Access the access token
          const accessToken = data.accessToken;
          console.log('Access Token: ' + accessToken);
        }
      })
      .catch((error) => {
        console.log('Error getting access token: ' + error);
      });
  };

  return (
    <View>
      <Pressable onPress={fetchUserInfo}  style={{backgroundColor:'#3b5998',padding:10,flexDirection:'row'}}>
      <EvilIcons style={{ bottom: 3, left: 3 }} color='#ffffff' name='sc-facebook' size={25}></EvilIcons>

        <Text style={{color:'#fff'}}>Login with Facebook</Text>
      </Pressable>
      {/* <Button title="login with facebook" onPress={fetchUserInfo} /> */}
    </View>
  );
};

export default FacebookLogin;
