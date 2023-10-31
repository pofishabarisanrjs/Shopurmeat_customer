import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const data = [
//   { key: '1', text: 'Item 1' },
//   { key: '2', text: 'Item 2' },
//   { key: '3', text: 'Item 3' },
//   // Add more items as needed
// ];

const MyVerticalSectionList = (props) => {
    const {storeCoupon}=props
    console.log("abdsfasj dafdasf",storeCoupon)

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={storeCoupon}
        renderItem={({ item }) =>{
            console.log(item)
            {
               if(item.is_active ===1 )
               return (
                <>
                <View style={{  borderColor: 'lightgray',borderWidth:1, margin: 10}}>
                <View style={{ margin: 10, justifyContent: 'flex-start', alignItems: 'center',flexDirection:'row',width:200 }}>
                    <Icon name='brightness-percent' size={32} color={'red'}/>
                  {/* <Text style={{marginLeft:10,color:'red',fontWeight:'bold'}}>{item.code}</Text> */}
                  <Text style={{fontSize:13,marginHorizontal:12}}>
                  <Text style={{fontWeight:'bold',fontSize:13}}>{item?.discount} % off</Text> upto ₹{item?.min_subtotal} Use <Text style={{color:'red',fontWeight:'bold'}}>{item?.code}</Text> | Above {item?.max_count}
                </Text>
                </View>
                
                </View>
               
                </>
              )
              else
              return null
                
            }
           
        }}
      />
    </View>
  );
};

export default MyVerticalSectionList;
