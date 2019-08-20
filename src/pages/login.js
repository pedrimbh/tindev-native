/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text,View, StyleSheet, Image, TextInput,TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}){
  
  const [user, setUser] = useState('');

  

  async function handleLogin(){
    const response = await api.post('/devs', {username: user});
    const {_id} = response.data;
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', {user: _id});
  }
  return (
    <View style={styles.container}>
      <Image source={Logo}/>
      <TextInput
      autoCapitalize= "none"
      autoCorrect={false}
      placeholder="Digite seu usuario do github"
      placeholderTextColor="#999"
      style = {styles.input}
      value= {user}
      onChangeText = {setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text  style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,

},
input:{
  textAlign: 'center',
  height: 60,
  alignSelf: 'stretch',
  backgroundColor: '#ffff',
  borderWidth: 1 ,
  borderColor: '#ddd', 
  borderRadius: 4 ,
  marginTop: 20,
  paddingHorizontal: 15,

},
button:{
  height: 46,
  alignSelf: 'stretch',
  backgroundColor: '#de4723',
  borderRadius: 4,
  marginTop: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
buttonText:{
  color: '#fff',
  fontWeight:'bold',
  fontSize: 16,

}
})
