import React, { useEffect, useContext, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Pressable,Text} from 'react-native';
import { baseUrl, domainUrl } from '../../constants/Constants';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserAvatarList = (props) => {
    const { navigation } = props

    const { updateUser, userInfo } = useContext(AuthContext);

    const userAvatars = [];
    for (let i = 1; i <= 10; i++) {
        userAvatars.push(`${domainUrl}/assets/img/various/avatars/user${i}.gif`);
    }
    const rows = [];
    for (let i = 0; i < userAvatars.length; i += 4) {
        rows.push(userAvatars.slice(i, i + 4));
    }
    const changeAvatar = (item) => {
        const url = item;

        // Use the JavaScript string manipulation functions to split the URL and extract 'user1'
        const parts = url.split('/');
        const fileName = parts[parts.length - 1]; // 'user1.gif'
        const userPart = fileName.split('.')[0]; // 'user1'

        console.log(userPart); // 'user1
        // console.log(user_id)
        fetch(`${baseUrl}/change-avatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: userPart,
                token: userInfo?.auth_token
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res?.success) {
                    updateUser()
                    navigation.goBack()
                }
            })
            .catch((error) => console.error(error))
    }
 


    return (
        <>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 50 }}>
                    <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{ left: 20, top: 15 }} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '500',
                        left: 40,
                        top: 15,
                        color: 'black'
                    }}>Change avatar</Text>
                </View>
            </View>
            <View style={styles.container}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.rowContainer}>
                        {row.map((avatar, index) => (
                            <Pressable key={index} style={styles.avatarContainer} onPress={() => { changeAvatar(avatar) }}>
                                <Image
                                    source={{ uri: avatar }}
                                    style={styles.avatar}
                                />
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer: {
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
    },
});

export default UserAvatarList;