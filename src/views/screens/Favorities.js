import { StyleSheet, Text, View, SafeAreaView,Image,FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { baseUrl } from '../../constants/Constants';
import { AuthContext } from '../../../AuthContext';
import { ImageUrl } from '../../constants/Constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Favorities = (props) => {
    const { navigation } = props
    const {userInfo,userinfo, splashLoading,setNotificationnumber} = useContext(AuthContext);

    const token = userInfo?.auth_token;
const [favorites,setfavourites]=useState()
    const Favoritiesapi =()=>{
    // console.log(user_id)
    fetch(`${baseUrl}/get-favorite-stores`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude:"11.4673663",
        longitude : "77.4357739",
         token
      }),
      })
        .then((response) =>response.json())
        .then((result) => {
         console.log("sabaris ---->",result)
         setfavourites(result)
        })
        .catch((error) => console.error(error))
       
    }

    useEffect(()=>{
        Favoritiesapi()
    },[])
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 50 }}>
                    <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{ left: 20, top: 15 }} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '500',
                        left: 40,
                        top: 15,
                        color: 'black'
                    }}>Favorities</Text>
                </View>
            </View>

            <FlatList
            data={favorites}
            keyExtractor={({ item }, index) => item}
            renderItem={({ item }) => {

              console.log(item)
              if (item.is_active === 1)
                return (
                  (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Hoteldetails', {
                          id: item.id,
                          name: item.name,
                          slug: item.slug
                        })
                      }
                    >
                     <View style={styles.container}>
                <View style={styles.rowcontainer}>
                    <View style={styles.ImageContainer}>
                    <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain', justifyContent: "center", borderRadius: 2 }}
                            source={{
                              uri: `${ImageUrl}${item.image}`
                            }}
                          >

                          </Image>
                    </View>
                    <View style={styles.fhoteltitle} >
                          <View style={{ flexDirection: 'row', width: '92%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: item.is_featured == 1 ? '60%' : '100%' }}>
                              <Text style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "black",
                                fontFamily: 'FontAwesome', left: 7
                              }}>{item.name}</Text>
                            </View>
                            {item.is_featured == 1 ? (
                              <View style={{ flexDirection: 'row', width: '38%', alignItems: 'flex-end' }}>
                                <View style={{ left: 12, zIndex: 2, bottom: 5 }}>
                                  <Icon name='arrow-right' color={'white'} size={34}></Icon>
                                </View>

                                <Text style={{ fontWeight: 'bold', backgroundColor: 'orange', height: 23, color: 'white', fontSize: 14, textAlign: 'right', bottom: 10, right: 3 }}>    Featured  </Text>
                              </View>) : (<Text></Text>)}
                          </View>

                          <Text style={styles.hdes} numberOfLines={1}  >{item.description}</Text>
                          <View style={styles.hdetails}  >
                            <Icon size={15} style={{ left: 34, bottom: 2 }}
                              name='star' color={'orange'} />
                            <View style={styles.hrate} >
                              <Text style={styles.rating}>{item.rating}</Text></View>
                            <View style={styles.hrate} >
                              {/* <Image
         style={{ width: 8, height: 10,justifyContent:"center",bottom:3,}}
         source={require('../../assets/catergories/lo.png')}></Image> */}
                              <EvilIcons style={{ bottom: 3, left: 3 }} color='#565656' name='location' size={15}></EvilIcons>
                              <Text adjustsFontSizeToFit={true}
                                numberOfLines={1} minLength={2}
                                style={styles.hdist}> {item.distance}</Text>
                              <Text style={{ left: 1, bottom: 4 }}>km</Text>
                            </View>
                            <View style={styles.hprice} >
                              <AntDesign style={{ right: 22 }} name='wallet' size={14}></AntDesign>
                              <Image
                                style={{ width: 10, height: 10, justifyContent: "center", right: 20 }}
                                source={require('../../assets/rupee.png')}></Image>

                              <Text style={{ fontSize: 12, color: 'grey', right: 16 }}>{item.price_range}</Text></View>
                          </View>
                        </View>
                </View>
            </View>
                    </TouchableOpacity>
                  )
                )

            }
          
          }
          />

            


        </SafeAreaView>
    )
}

export default Favorities

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5
    },
    rowcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categories: {
        width: '100%',
        height: 'auto',
      },
      categoriesname: {
        width: '100%',
        height: 40,
      },
      catname: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: "black",
        left: 20
      },
      fhotel: {
        width: "100%",
        height: "auto",
      },
      fhotel1: {
        width: "100%",
        height: 120,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "row",
        left: 20
      },
      fhotelimg: {
        width: "25%",
        height: 85,
        borderRadius: 10,
        marginLeft: 15,
        marginTop: 14,
        alignItems: "center",
        justifyContent: "center"
      },
      fhoteltitle: {
        width: "70%",
        height: 120,
    
      },
      htitle: {
        marginTop: 14,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
        fontFamily: 'FontAwesome'
      },
      hdes: {
        marginLeft: 10,
        color: "grey",
        fontSize: 12,
        marginTop: 6,
        width: '80%',
        paddingBottom: 10,
        height: 26,
        borderBottomColor: '#57575730',
        borderBottomWidth: 0.3,
        fontFamily: 'FontAwesome',
    
      },
      hdetails: {
        width: "95%",
        height: 40,
        // marginTop:8,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent:"flex-start",
        // flexWrap:1
        fontFamily: 'FontAwesome'
      },
      hrate: {
        width: "28%",
        height: 26,
        borderRightColor: '#57575730',
        borderRightWidth: 0.3,
        alignItems: "center",
        paddingTop: 6,
        flexDirection: "row",
        fontSize: 12,
        color: "#7F7F7F",
        justifyContent: "center",
        fontWeight: 500
      },
      hdist: {
        width: "34%",
        height: 18,
        alignItems: "center",
        flexDirection: "row",
        fontSize: 12,
        color: "#7F7F7F",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: 'wrap',
        fontFamily: 'FontAwesome',
        fontWeight: '500'
      },
      hprice: {
        width: "42%",
        height: 26,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'center',
        color: "#7F7F7F",
    
      },
      rating: {
        right: 10,
        bottom: 3,
        left: 8,
        color: 'grey',
        fontSize: 12,
        fontFamily: 'FontAwesome'
      }
    
})