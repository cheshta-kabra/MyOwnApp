import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, Alert,KeyboardAvoidingView, ImageBackgroundComponent} from 'react-native';
import db from '../config';
import { Avatar } from "react-native-elements";
import firebase from 'firebase';
import * as ImagePicker from "expo-image-picker";
import { RFValue } from "react-native-responsive-fontsize";

export default class ProductUpdateScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        ProductName:'',
        ProductPrice:'',
          image: "#",
          ProductID:'',
        }
    }
    createUniqueId() {
      return Math.random().toString(36).substring(7);
    }
    addProduct = async()=>{
      if(this.state.ProductPrice && this.state.ProductName &&this.state.image){
         try{
        db.collection("products").add({
          ProductPrice:this.state.ProductPrice,
          ProductName:this.state.ProductName,
          ProductImage:this.state.image,
          ProductID: this.state.ProductID ,    
          
        })
      }
      catch(error){
        console.log(error)
      }

        
        Alert.alert('Product added')
        //ToastAndroid.show('Book Issued',ToastAndroid.SHORT)
        this.setState({ProductName:'',ProductPrice:'',ProductImage:'',ProductID:''})
    }
    else{
      Alert.alert('Please enter the data')
    }
  }
    selectPicture = async () => {
      var id=this.createUniqueId()
           this.setState({
             ProductID:id
           })
      Alert.alert("working")
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!cancelled) {
        this.uploadImage(uri, this.state.ProductID);
      }
    };
  
    uploadImage = async (uri, imageName) => {
      var response = await fetch(uri);
      var blob = await response.blob();
  
      var ref = firebase
        .storage()
        .ref()
        .child("product_image/" + imageName);
  
      return ref.put(blob).then((response) => {
        this.fetchImage(imageName);
      });
    };
  
    fetchImage = (imageName) => {
      var storageRef = firebase
        .storage()
        .ref()
        .child("product_image/" + imageName);
  
      // Get the download URL
      storageRef
        .getDownloadURL()
        .then((url) => {
          this.setState({ image: url });
          console.log(this.state.image)
        })
        .catch((error) => {
          this.setState({ image: "#" });
        });
    };
  
    componentDidMount() {
      this.fetchImage(this.state.ProductID);
      console.log("productUpdate")
    }
    render() {
      
        return(
          <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            <View>
            <Image source={require("../assets/add.jpg")} />
              <Text style={styles.displayText}>Add Product</Text>
            </View>
            <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />
            <View>
              
            <TextInput 
              style={styles.loginBox}
              placeholder="Enter Product Name "
              onChangeText={(text)=>{this.setState({
                ProductName:text
              })}}
              value={this.state.ProductName}/>
              
              <TextInput 
              style={[styles.loginBox,{margin:20}]}
              placeholder="Enter Product Price"
              onChangeText={(text)=>{this.setState({
                ProductPrice:text
              })}}
              value={this.state.ProductPrice}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={this.addProduct}>
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
            </View>
            
            
          </KeyboardAvoidingView>
        );
      
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 25,
      textDecorationLine: 'underline',
      textAlign:'center',
      justifyContent:'flex-start'
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
      color:'green'
    },
    loginBox:{
      justifyContent:'center',
      width:300,
      height:40,
      borderWidth:1.5,
      margin:10,
      fontSize:20,
      color:'purple'
  },
    scanButton:{
      width: 300,
        height: RFValue(50),
        justifyContent: "center",
        alignItems:'center',
        borderRadius: RFValue(40),
        backgroundColor: "yellow",
        shadowColor: "red",
        marginBottom: RFValue(10),
        borderWidth:2,
        shadowOffset: {
          width: 0,
          height: 8
        }
    },
      sumbitButton:{
        padding: 10, 
        textAlign: 'center', 
        fontSize: 20,
        fontWeight:"bold",
        color: 'white'
    },
  });