import React from 'react';
import { Text,
   View,
   TouchableOpacity,
   TextInput,
   Image,
   StyleSheet,
  KeyboardAvoidingView ,} from 'react-native';
import * as firebase from 'firebase'
import db from '../config.js'
import { RFValue } from "react-native-responsive-fontsize";
import { Alert } from 'react-native';
export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            Email_ID:'',
            Password:'',
        }
    }
    login = async(Email,Password)=>{
        console.log("login")
        if(Email && Password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(Email,Password)
                
                if(response){
                    console.log("working")
                    
                    this.props.navigation.navigate('ProductUpdateScreen')

                }
            }

            catch(error){
                console.log("catch"+error.code)
                switch (error.code){
                    case 'auth/user-not-found':
                        Alert.alert("User Dosen't Exits")
                        break
                    case 'auth/invalid-email':
                        Alert.alert("Incorrect E-mail or Password")
                        break  
                }
            }
        }
        else{
            console.log("alert")
            Alert.alert('Enter E-mail and Password')
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center',marginTop:60,justifyContent:'center'}}>
                <View>
                    <Image source={require('../assets/logo.jpg')} style={{width:400,height:210,padding:20}}/>
                    <Text style={{textAlign:'center',fontSize:35,color:'orange',backgroundColor:'black',}}>PANCH BHAI DAIRY</Text>
                </View>
                <View>
                    <TextInput 
                    style={styles.loginBox} 
                    placeholder={'Enter E-mail Address'} 
                    placeholderTextColor="green"
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                            Email_ID:text
                        })
                    }} />

                    <TextInput 
                    style={styles.loginBox} 
                    placeholder={'Enter Password'} 
                    placeholderTextColor="blue"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            Password:text
                        })
                    }} />
                </View>
                <View>
                <TouchableOpacity  
                style={styles.button}
                onPress={()=>{
                    console.log("navigation")
                    this.login(this.state.Email_ID,this.state.Password)
                }}>
                    <Text style={{textAlign:'center'}}>
                        Login
                    </Text>
                </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
        )
    }
}
const styles=StyleSheet.create({
    loginBox:{
        justifyContent:'center',
        width:300,
        height:40,
        borderWidth:1.5,
        margin:10,
    },
    button:{
        width: 300,
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(40),
        backgroundColor: "yellow",
        shadowColor: "red",
        marginBottom: RFValue(10),
        borderWidth:2,
        shadowOffset: {
          width: 0,
          height: 8
        }},
})