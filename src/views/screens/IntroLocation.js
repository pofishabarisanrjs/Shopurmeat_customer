import React from 'react';
import {SafeAreaView,View,Text,Platform,StyleSheet,Image,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FlatListSlider} from 'react-native-flatlist-slider';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Settings from '../../constants/Settings';
import AsyncStorage from '@react-native-community/async-storage';

const IntroLocation = (props) => {
  const { route, navigation } = props
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  
  const imageWidth = dimensions.width;
  console.log(imageHeight,imageWidth)
  const onLocationEnablePressed = () => {
    if (Platform.OS === 'android') {

    }
  }
  const images = [
    {
     banner:require('../../assets/intro1.png'),
    
    },
    {
      banner:require('../../assets/intro2.png'),
     
     },
     {
      banner:require('../../assets/intro3.png'),
     
     },
  //  {
  //    banner:require('./images/banner2.png'),
  //    desc:
  //      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  //  },
   ]

  return (
   
      <View style={{width:'100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
   <View style={{width:'100%',height:imageWidth}}>
   <FlatListSlider
                      data={images}
                      width={dimensions.width}
                      height={imageWidth}
                      timer={3000}
                      imageKey={'banner'}
                      local
                      resizeMode={'contain'}
                       onPress={item => console.log(JSON.stringify(item))}
                      // indicatorContainerStyle={{position:'absolute', bottom: 20}}
                      indicatorActiveColor={'orange'}
                      indicatorInActiveColor={'#ffffff'}
                      indicator={true}
                      indicatorActiveWidth={24}
                      animation
                     />
    </View>
      <View style={{flex:1,width:dimensions.width,justifyContent:'center',alignItems:'center'}}>
      <View>
                  <Text style={{bottom:25,fontSize:25,color:'black',textAlign:'center'}}>Order from top & favourite restaurants</Text>
                  <Text style={{bottom:25,textAlign:'center'}}>Ready to see top restaurant to order?</Text>
                  <TouchableOpacity activeOpacity={1} style={{bottom:14}} 
                  onPress={
                    () => {
                      Settings((cb)=>{
                        AsyncStorage.setItem("AppSettings",JSON.stringify(cb))
                        navigation.navigate('LocationView')
                        console.log("data",cb)
                      });
                      
                    }
                     }>
                      <Text style={styles.titleStyle}>
                      SETUP YOUR LOCATION
                      </Text>
                      </TouchableOpacity>
                      {/* <View style={{flexDirection:'row'}}>
                        <Text>Have an account ?</Text>
                      <TouchableOpacity  onPress={
                      () => navigation.navigate('Login')}>
                        <Text style={{color:'red',}}> Login</Text>
                      </TouchableOpacity>
                      </View> */}
                    </View>
    </View>
  </View>            
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
   

  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 14,
    color:'white',
    backgroundColor:'red',
    width:'100%',
    
  },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize:26,
    color:'white',
    bottom:40,
    fontWeight:'bold'

  },
  contentcontainer:{
    width: '94%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:76,
    borderRadius:10,
    left:10
  }
});
export default IntroLocation;