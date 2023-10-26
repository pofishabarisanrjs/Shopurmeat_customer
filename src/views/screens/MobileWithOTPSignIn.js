import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../AuthContext';
import LottieView from 'lottie-react-native';
import { domainUrl } from '../../constants/Constants';
import FacebookLogin from './FaceBookLogin';
const MobileWithOTPScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState(null);
    const [OTP, setOTP] = useState(null);
    const [OTPdata, setOTPdata] = useState(null);

    const { isLoading, userInfo, MobileWithOTPScreen, googlelogin, signOut,verifyotpAPI } = useContext(AuthContext);
    const [errormsg, seterrormsg] = useState('');
    const [errorms, seterrorms] = useState('');
const [showOTP,SetshowOTP]=useState(false);
    const [erroremailmsg, seterroremailmsg] = useState('');
    const [errorotpmsg, seterrorotpmsg] = useState('');

    const [errorpassmsg, seterrorpassmsg] = useState('');
    const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');
    // console.log(fromcart)
    const emailmatch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    const otpmatch = /^[A-Za-z0-9]+$/

    global.MyVar = errorms;

    const fromcart = (route.params != null && route.params != undefined) ? (Object.values(route.params)) : (<Text></Text>)
    console.log(Object.values(fromcart))
    const Validatenav = (fromcart) => {
        console.log(fromcart)
        if (fromcart == [3006])
            return seterrorms('somevalue')
        console.log('something', errorms)
    }

    const submit = () => {
        console.log('mobile number and password', email === null)

       if (email == null)
            return seterroremailmsg('Mobile number is required ')
       else if (!emailmatch.test(email))
            return seterrormsg ('Enter your valid Mobile number')
      
        else
        return Validatenav(fromcart),MobileWithOTPScreen(email,(data)=>{
    console.log(data)
    SetshowOTP(true)
    })
    }

    const Validate = () => {
        console.log('mobile number and password', OTP === null)

       if (OTP === null)
            return seterrorotpmsg('OTP is required ')
           
        else
        return Validatenav(fromcart),verifyotpAPI({phone:email,otp:OTP},(data)=>{
    console.log(data)
    SetshowOTP(true)
    setOTPdata(data)
    })
    }

    return (
        isLoading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Image style={{ width: 250, height: 250 }}
                    source={require('../../assets/loader.gif')} >
                </Image>
            </View>
            :

            <View style={styles.container}>
               { 
               <ScrollView keyboardShouldPersistTaps={'always'}>
                   {
                    !showOTP?
                    <>
                     <View style={styles.head}>
                        <View style={styles.backbutn}>
                            <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{ left: 30 }} />
                        </View>
                        <View style={{ flexDirection: 'row', height: 155 }}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.login}>LOGIN</Text>
                                <Text style={styles.log}>Enter your Mobile Number </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Image
                                    style={{ width: '100%', height: 150, justifyContent: "center", left: 18 }}
                                    source={require('../../assets/login.png')}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}

                        >
                            <TextInput
                                style={styles.input}
                                value={email}
                                placeholder="Enter Mobile number"
                                onChangeText={text => {
                                    const re = /^[0-9\b]+$/;

                                    // if value is not blank, then test the regex
                  
                                    if (text === "" || re.test(text)) {
                                      setEmail(text);
                                    }
                                }}
                                // onChangeText={(e) => setEmail( e.target.value)}
                                maxLength={12}
                            />
                            <View style={{ bottom: 6 }}>
                                {/* <Text>{email != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errormsg}</Text>) }</Text> */}
                                <Text>{!emailmatch.test(email) ? (<Text style={{ color: 'red', textAlign: 'center', left: 10 }}>{erroremailmsg}{errormsg}</Text>) : (<Text></Text>)}</Text>
                            </View>
                            {/* <TextInput
                                style={styles.input}
                                value={password}
                                placeholder="Enter password"
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                                maxLength={15}
                            /> */}
                        </KeyboardAvoidingView>
                        <TouchableOpacity title="Login" onPress={() => submit()}>

                            <Text style={styles.button}>SEND OTP </Text></TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: 30, top: 5, borderBottomColor: 'grey', borderBottomWidth: 0.3 }}></View>
                            <Text style={{ textAlign: 'center', top: 13, fontWeight: '300', color: 'grey' }}>  OR  </Text>
                            <View style={{ width: 30, top: 5, borderBottomColor: 'grey', borderBottomWidth: 0.3 }}></View>
                        </View>

                        <View style={{ top: 10, alignItems: 'center' }}>

                            <TouchableOpacity style={{ top: 14, borderWidth: 0.3, padding: 10, borderRadius: 5, backgroundColor: 'white', borderColor: '#57575730',marginBottom:30 }}
                                onPress={() => { googlelogin(), Validatenav(fromcart) }} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 20, height: 20, }}
                                        source={{
                                            uri: `${domainUrl}assets/img/various/google.png`
                                        }}
                                    ></Image>
                                    <Text style={{ fontFamily: 'FontAwesome5_Solid', top: 2 }}> Login with Google</Text>

                                </View>
                            </TouchableOpacity>
                            <FacebookLogin/>
                        </View> 
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 44, justifyContent: 'center' }}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register', {
                                fromlogin: 4001
                            })}>
                                <Text style={styles.link}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>

                            {/* <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                                <Text style={styles.link}>Forgot Password ?</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    </>
                    :
                    <>
                     <View style={styles.head}>
                        <View style={styles.backbutn}>
                            <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{ left: 30 }} />
                        </View>
                        <View style={{ flexDirection: 'row', height: 155 }}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.login}>Mobile Verification</Text>
                                <Text style={styles.log}>Enter your OTP </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Image
                                    style={{ width: '100%', height: 150, justifyContent: "center", left: 18 }}
                                    source={require('../../assets/login.png')}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}

                        >
                             <TextInput
                                style={styles.input}
                                value={email}
                                placeholder="Enter Mobile number"
                                onChangeText={text => {
                                    const re = /^[0-9\b]+$/;

                                    // if value is not blank, then test the regex
                  
                                    if (text === "" || re.test(text)) {
                                      setEmail(text);
                                    }
                                }}
                                // onChangeText={(e) => setEmail( e.target.value)}
                                maxLength={12}
                                editable={false}
                            />
                            <TextInput
                                style={styles.input}
                                value={OTP}
                                placeholder="Enter OTP"
                                onChangeText={text => {
                                    setOTP(text);
                                }}
                                // onChangeText={(e) => setEmail( e.target.value)}
                                maxLength={6}
                            />
                            <View style={{ bottom: 6 }}>
                                {/* <Text>{email != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errormsg}</Text>) }</Text> */}
                                <Text>{errorotpmsg !==''? (<Text style={{ color: 'red', textAlign: 'center', left: 10,marginBottom:10 }}>{errorotpmsg}</Text>) : (<Text></Text>)}</Text>

                            </View>
                          
                        </KeyboardAvoidingView>
                        <TouchableOpacity title="Login" onPress={() => Validate()}>

                            <Text style={styles.button}>Verify </Text></TouchableOpacity>
                    
                         <TouchableOpacity style={{ color: 'red', textAlign: 'center', left: 10,marginTop:10 }} onPress={() => 
                        MobileWithOTPScreen(email,(data)=>{
                            console.log(data)
                            SetshowOTP(true)
                            setOTPdata(data)
                            })
                        }>
                                <Text style={styles.link}>Resend OTP</Text>
                            </TouchableOpacity>
                            {
                                OTPdata?.show_otp &&
                                <Text>

                                    {
                                        OTPdata?.otp_str
                                    }
                                </Text>
                            }
                    </View>
                    </>
                   }


                </ScrollView>
                
                }
                <View style={styles.bottomView}>
                    <LottieView
                        style={{ width: '100%', opacity: 0.8 }}
                        source={require('../../assets/customewave2.json')}
                        colorFilters={[
                            {
                                keypath: 'button',
                                color: '#F00000',
                            },
                            {
                                keypath: 'Sending Loader',
                                color: '#F00000',
                            },
                        ]}
                        autoPlay
                        loop
                    />
                </View>
            </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        width: '80%',
        top: 50,
        left: 40,
        height: 570
    },
    input: {
        width: '100%',
        borderRadius: 6,
        marginBottom: 12,
        height: 56,
        paddingLeft: 30,
        backgroundColor: 'white'
    },
    link: {
        color: 'orange',

    },
    button: {
        backgroundColor: 'orange',
        color: 'white',
        height: 44,
        textAlign: 'center',
        borderRadius: 5,
        paddingTop: 12,
        fontWeight: 'bold',
        fontSize: 16
    },
    head: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
    },
    backbutn: {
        backgroundColor: 'white',
        width: '100%',
        top: 10
    },
    login: {
        top: 80,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        left: 16,
        fontFamily: "Segoe UI",
    },
    log: {
        top: 90,
        left: 16
    },
    content: {
        width: '100%',
        height: 400,
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        bottom: -20,
    },
});

export default MobileWithOTPScreen