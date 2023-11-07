import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { createContext, useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Overlay } from 'react-native-elements';
import { baseUrl, clinetId, clientsecret } from './src/constants/Constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children, props }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [googleuser, setgoogleuser] = useState({});
  const [facebookuser, setFacebookuser] = useState({});

  const [currentUser, setcurrentUser] = useState({});
  const [isvisible, setisVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [phone, setphone] = useState('');
  const [Token, settoken] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [phonematcherror, setphonematcherror] = useState('');
  const [cartNumber, setCartnumber] = useState(0)
  const [notificationNumber, setNotificationnumber] = useState(0)
  const [refresh, setRefreshing] = useState(false)
  const phonematch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/



  const toggleOverlay = () => {
    setisVisible(!isvisible);
  };

  const submit = () => {
    if (phonenumber == null)
      return setphonenumber('Enter phone')
    if (!phonematch.test(phone))
      return setphonematcherror('Enter valid number')
    else
      if(facebookuser) 
      facebooklogin(facebookuser, phone, toggleOverlay(!isvisible)), toggleOverlay(false)
      else
      Socaillogin(googleuser, phone, toggleOverlay(!isvisible)), toggleOverlay(false)
  }


  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setgoogleuser({ user: null });
    } catch (error) {
      // console.errorgoogleuser
    }
  };


  const updateUser = () => {
    fetch(`${baseUrl}/update-user-info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userInfo?.id,
            token: userInfo?.auth_token
        }),
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res?.data) {
              console.log(res?.data)
              setUserInfo(res?.data);
              AsyncStorage.setItem('userInfo', JSON.stringify(res?.data));
              setIsLoading(false);
            }
        })
        .catch((error) => console.error(error))
}


  const register = (name, email, phone, password, cb) => {
    setIsLoading(true);
    console.log(`${baseUrl}/v1/register? name=${name}& email=${email}&phone=${phone}&password=${password}`, 'registration url')
    axios
      .post(`${baseUrl}/v1/register? name=${name}& email=${email}&phone=${phone}&password=${password}`, {
        name,
        email,
        phone,
        password,

      })
      .then(res => {
        console.log("register data ==================>", res.data)
        setIsLoading(false);
        if (res?.data?.original?.need_phone_verification) {
          cb(res?.data)
        }
        else if (res?.data?.original?.need_email_verification) {
          cb(res?.data)
        }
        else {
          console.log("registration success ******************* data flowwwwwwww")
          let userInfo = res.data;

          if (res?.data?.success) {
            setUserInfo(userInfo.data);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
          }
          if (userInfo.data == 'Email or phone number already used' || userInfo.data.email == 'The email has already been taken.')
            return alert('Email or Phone already exists')
        }
      }).catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password,cb) => {
    setIsLoading(true);

    axios
      .post(`${baseUrl}/v1/login?email=${email}&password=${password}`, {
        email,
        password,
      })
      .then(res => {
        console.log(res?.data,"login data ")
        if(res?.data?.need_phone_verification === 1)
        {
          cb(res?.data)
          setIsLoading(false);


        }
        if(res?.data?.need_email_verification === true)
        {
          cb(res?.data)
          setIsLoading(false);


        }
       else{
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if (userInfo.data == 'DONOTMATCH') {
          return alert('Email and Password mismatch')
        }
       }

              })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const mobilelogin = (phone, password,cb) => {
    setIsLoading(true);
    console.log(`${baseUrl}/v1/login-phone`, {
      phone,
      password,
    })
    axios
      .post(`${baseUrl}/v1/login-phone`, {
        phone,
        password,
      })
      .then(res => {
        console.log(res?.data,"login data ")
        if(res?.data?.original?.need_phone_verification === 1)
        {
          setIsLoading(false);
          cb(res?.data)
          setIsLoading(false);
        }
        if(res?.data?.original?.need_email_verification === true)
        {
          setIsLoading(false);
          cb(res?.data)
          setIsLoading(false);

        }
       else{
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if (userInfo.data == 'DONOTMATCH') {
          return alert('Email and Password mismatch')
        }
       }
      })
      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };
  const MobileWithOTPScreen = (phone, cb) => {
    //  setIsLoading(true);
    console.log(`${baseUrl}/v1/login-phone`, {
      phone,
    })
    axios
      .post(`${baseUrl}/v1/login-phone`, {
        phone
      })
      .then(res => {
        console.log(res?.data,"login data ")
        if(res?.data?.need_phone_verification === 1)
        {
          cb(res?.data)
          setIsLoading(false);


        }
        if(res?.data?.need_email_verification === true)
        {
          cb(res?.data)
          setIsLoading(false);


        }
       else{
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if (userInfo.data == 'DONOTMATCH') {
          return alert('Email and Password mismatch')
        }
       }
      })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };
  const ResendOTP = (phone, cb) => {
    //  setIsLoading(true);
    console.log(`${baseUrl}/v1/resend-otp`, {
      phone,
    })
    axios
      .post(`${baseUrl}/v1/resend-otp`, {
        phone
      })
      .then(res => {
        console.log(JSON.stringify(res), "response data -------->")
        if (res?.data?.success) {
          setIsLoading(false);
          cb(res?.data)
        }
        else {
          setIsLoading(false);
          alert(res?.data?.message);
        }
        // let userInfo = res.data;
        // setUserInfo(userInfo.data);
        // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        // setIsLoading(false);
        // if(userInfo.data == 'DONOTMATCH'){
        // return alert ('Phone number and Password mismatch')}

        // if (errorms == 'hello')
        // return alert ('hello')
        // alert(userInfo.data);
      })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };
  const DefaultAddress = (address_id, userdata) => {
    setIsLoading(true);
    console.log(userdata?.id)
    const token = userdata?.auth_token
    const id = userdata?.id
    axios
      .post(`${baseUrl}/set-default-address`, {
        token,
        "user_id": id,
        address_id
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo)
        axios
          .post(`${baseUrl}/update-user-info`, {
            token,
            "user_id": id,
          })
          .then(res => {
            let userInfo = res.data;
            console.log(userInfo)
            setUserInfo(userInfo.data);

            setIsLoading(false);

          })

          .catch(e => {
            alert(`login error ${e}`);
            setIsLoading(false);
          });
      })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //  ---------Google login--------- //
  const googlelogin = async () => {
    GoogleSignin.configure({
      webClientId:
        '839958938726-eac3hpk5gpvjc83goc28tn0us1d5j1ha.apps.googleusercontent.com',

    });
    try {
      GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
          const { idToken } = GoogleSignin.signIn()

            .then((user) => {
              console.log(user)
              var user = user
              setgoogleuser(user)
              Socaillogin(user)
                .catch((e) => {
                  console.log("ERROR IS: " + JSON.stringify(e));
                })
            }).catch((error) => console.log(error))



        }
      })
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('Play Services Not Available or Outdated');
      }
      else {
        console.log(error.message);
      }
    }
  };

  const facebooklogin = (currentUser, phone) => {

    console.log(currentUser)
    setIsLoading(true);
    const id = currentUser.accessToken
    const email = currentUser.result.email
    const name = currentUser.result.name
    const provider = 'facebook'
    const verify_type = 'id_token'


    axios
      .post(`${baseUrl}/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone===undefined? '':phone}`, {
        phone
      })
      .then(res => {
        console.log('response of socila 0------------------------------------------------------------------------------', res)
        let userInfo = res.data;
        console.log("hel",userInfo)
        if (userInfo.enter_phone_after_social_login == true)
        {
          toggleOverlay(isvisible)
          setFacebookuser(currentUser)
        } 
        if (userInfo.email_phone_already_used !== true) {
          setUserInfo(userInfo.data);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          toggleOverlay(false)
          setphonematcherror(' Mobile Number already exist')
          alert(' Mobile Number already exist')
        }
      })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };



  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '839958938726-eac3hpk5gpvjc83goc28tn0us1d5j1ha.apps.googleusercontent.com',

    });
  }, [])


  //  ------------Social Login---------- //
  const Socaillogin = (currentUser, phone = '') => {

    console.log("current login ------------------------------------------------------------------------------------------------------------------>",currentUser)
    setIsLoading(true);
    const id = currentUser.idToken
    const email = currentUser.user.email
    const name = currentUser.user.name
    const provider = 'google'
    const verify_type = 'id_token'


    axios
      .post(`${baseUrl}/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone}`, {
        phone
      })
      .then(res => {
        console.log('response of socila', res)
        let userInfo = res.data;
        // console.log("hel",userInfo)
        if (userInfo.enter_phone_after_social_login == true)
          return toggleOverlay(isvisible)
        if (userInfo.email_phone_already_used !== true) {
          setUserInfo(userInfo.data);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          toggleOverlay(false)
          setphonematcherror(' Mobile Number already exist')
          alert(' Mobile Number already exist')
        }
      })

      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  //  --------phone number for socail login -------- //
  const Socailloginphone = (currentUser, phone) => {
    const id = currentUser.idToken
    const email = currentUser.user.email
    const name = currentUser.user.name
    const provider = 'google'
    const verify_type = 'id_token'


    axios
      .post(`${baseUrl}/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone}`, {
        phone
      })
      .then(res => {
        let userInfo = res.data;
        // console.log(userInfo)
        // alert( 'Login Successfull');
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const registeradd = (address, latitude, longitude, house, landmark) => {
    console.log("_________________________________________________________________")
    setIsLoading(true);
    const token = userInfo.auth_token
    const id = userInfo?.id
    axios
      .post(`${baseUrl}/save-address?token=${token}&user_id=${id}`, {
        address,
        latitude,
        longitude,
        house,
        landmark,
      })
      .then(res => {
        let userinfo = res.data;
        console.log("sabaris address", userinfo)
        setUserinfo(userinfo);
        AsyncStorage.setItem('userinfo', JSON.stringify(userinfo));
        setIsLoading(false);
        if (userInfo !== undefined && userInfo !== null) {
          DefaultAddress(userinfo[0].id, userInfo)
        }
        // console.log(Object.values(userinfo[0]));
        // alert('address saved success')
      })
      .catch(e => {
        console.log(`save add error ${e}`);
        setIsLoading(false);
      });
  };

  const verifyotpAPI = async (data, cb) => {
    const url = `${baseUrl}/v1/verify-otp`
    const postformData = {
      phone: data.phone,
      otp: data.otp

    }
    setIsLoading(true)
    await axios.post(url, postformData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res?.data)
        if (res?.data?.original?.need_email_verification) {
          setIsLoading(false);
          cb(res?.data)
        }
        else if (res?.data?.success) {
          setIsLoading(false);

          let userInfo = res.data;
          setUserInfo(userInfo.data);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          alert(res?.data?.message);
        }

      })
      .catch(err => {
        console.log(err);
      });

  }

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${baseUrl}/login?`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.auth_token}`
          },
        },
      )
      .then(res => {
        // console.log(res);
        AsyncStorage.removeItem('userInfo');
        setNotificationnumber(0)
        signOut()
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo.data) {
        setUserInfo(userInfo.data);
      }
      let Token = await AsyncStorage.getItem('Token');
      Token = JSON.parse(Token);

      if (Token) {
        settoken(Token);
      }

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        // splashLoading,
        userinfo,
        currentUser,
        googleuser,
        Token,
        cartNumber,
        notificationNumber,
        refresh,
        setRefreshing,
        setNotificationnumber,
        setCartnumber,
        signOut,
        googlelogin,
        Socaillogin,
        register,
        login,
        DefaultAddress,
        registeradd,
        Socailloginphone,
        logout,
        signOut,
        mobilelogin,
        MobileWithOTPScreen,
        verifyotpAPI,
        facebooklogin,
        ResendOTP,
        updateUser
      }}>
      {children}
      <Overlay isVisible={isvisible} onBackdropPress={toggleOverlay}>
        <View style={{ padding: 30 }}>
          <View style={{ alignItems: 'center', padding: 25 }}>
            <Image style={{ width: 80, height: 80 }}
              source={require('./src/assets/usermobile.png')} />
            <View style={{ right: 13 }}>
              <Text style={{ top: 15, fontFamily: 'FontAwesome5_Solid', right: 13 }}>Enter Mobile Number</Text>
            </View>

          </View>

          <TextInput
            style={{ borderWidth: 0.8, borderColor: '#57575730', borderRadius: 3, paddingLeft: 6 }}
            value={phone}
            placeholder="Mobile Number"
            onChangeText={text => setphone(text)}
            keyboardType={'numeric'}
            maxLength={12}
          />
          <View >
            {/* <Text>{phone != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{phoneerror}</Text>) }</Text> */}
            <Text>{!phonematch.test(phone) ? (<Text style={{ color: 'red', textAlign: 'center', left: 10, fontSize: 12 }}>{phonematcherror}</Text>) : (<Text></Text>)}</Text>
          </View>
          <View style={{ width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{
              width: 120,
              height: 50,
              backgroundColor: !phonematch.test(phone) ? '#f3f3f3' : 'orange',
              padding: 10,
              borderRadius: 5,
              borderWidth: 0.3,
              borderColor: '#57575730'
            }} onPress={() => submit()}>
              <Text style={{
                textAlign: 'center',
                fontFamily: 'FontAwesome5_Solid', right: 4,
                top: 6, color: 'white'
              }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </AuthContext.Provider>
  );
};