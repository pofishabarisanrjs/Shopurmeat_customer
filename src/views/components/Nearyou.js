
import React, {useState} from 'react';
import {View,Text,} from 'react-native';
import CustomSwitch from '../../../Custom';
import Featured from '../components/Featured';
import Nearby from '../components/Nearby';
export default function HomeScreen({updaterefresh}) {
    const [gamesTab, setGamesTab] = useState(1);

    const onSelectSwitch = value => {
        setGamesTab(value);
      };
      return (
<View style={{bottom:30,top:5}}>
{/* <Text style={{top:24,left:20,fontSize:12}}> Resturants Near You</Text> */}
<View style={{width:'50%',alignSelf:'flex-end',right:20}} >
<CustomSwitch
  selectionMode={1}
  option1="Delivery"
  option2="Self pickup"
  onSelectSwitch={onSelectSwitch}
  />
</View>


{gamesTab == 1 &&
<View style={{width:'108%',height:'auto',right:20,top:16,marginBottom:30}}><Nearby updaterefresh/></View>
}
{gamesTab == 2 &&
  <View style={{width:'108%',height:'auto',right:20,top:16,marginBottom:30}}><Featured/></View>
}

</View>
);
}