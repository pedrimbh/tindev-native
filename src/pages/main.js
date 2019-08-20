/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text ,View,SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../../assets/logo.png';
import Cancel from '../../assets/cancel.png';
import Like from '../../assets/like.png';

export default function Main({navigation}) {
  const id = navigation.getParam('user');
  const [users, setUsers ] = useState([]);

  useEffect(()=>{
    async function loadUsers(){
        const response = await api.get('/devs', 
        {headers:{
            user:id,
        }});
        setUsers(response.data);
    }
    loadUsers();
}, [id])
async function handleLike(id){
    await api.post(`devs/${id}/likes`, null, {
        headers:{user: id},
    })

    setUsers(users.filter(user => user._id !== id));
}

async function handleDislike(id){
    await api.post(`devs/${id}/dislikes`, null, {
        headers:{user:id},
    })

    setUsers(users.filter(user => user._id !== id));
}

async function hendleLogout(){
    await AsyncStorage.clear();

    navigation.navigate('Login');
}
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={hendleLogout}>
      <Image style={styles.logo} source={Logo}/>
      </TouchableOpacity>
    <View style={styles.cardContainer}>
      {users.length === 0 
      ? <Text style={styles.empty} >Acabou :(</Text>
      : (
        users.map((user, index)=>(
          <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}>

          <Image style={styles.avatar} source={{uri: user.avatar}}/>
            <View style={styles.footer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.bio} >{user.bio}</Text>
            </View>
        </View> 
        ))
        
      )}
      </View>

      <View style={styles.buttondContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={Cancel}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={Like}/>
        </TouchableOpacity>
        
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logo:{
    marginTop: 30,
  },
  empty:{
    alignSelf: 'center',
    color: '#999',
    fontSize: 26,
    fontWeight: 'bold',
  },
  container:{
    flex: 1 ,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardContainer:{
    marginTop: 0,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card:{
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 8 ,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  footer:{
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    paddingVertical: 15,

  },
  name:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bio:{
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 20,

  },
  avatar:{
    flex: 1, 
    height: 300,
  },

  buttondContainer:{
    flexDirection: 'row',
    marginBottom: 30,

  },
  button:{
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 5  ,

  },
})