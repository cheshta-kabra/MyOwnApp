import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Image ,TouchableOpacity} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
//import MyHeader from "../components/MyHeader";
//import SwipeableFlatlist from "../components/SwipeableFlatlist";
import db from '../config';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      allNotifications: [],
      order: [],
      userName: '',
      address: '',
      contact: '',
    };

    this.notificationRef = null;
  }
  getUserDetails = (userId) => {
    var userDetails = 1;
    db.collection('users')
      .where('email_id', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          userDetails = {
            userName: doc.data().first_name + ' ' + doc.data().last_name,
            address: doc.data().address,
            contact: doc.data().contact,
            status:doc.data().status
          };
        });
      });
  };
  getNotifications = () => {
    var userDetails = null;
    this.notificationRef = db
      .collection('order')
      .where('status', '==', 'placed')
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification['doc_id'] = doc.id;

          var userId = notification['email_id'];

          const user_ref = db
            .collection('users')
            .where('email_id', '==', userId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                userDetails = {
                  userName: doc.data().first_name + ' ' + doc.data().last_name,
                  address: doc.data().address,
                  contact: doc.data().contact,
                };
                //console.log(userDetails)
                //console.log(notification)
                notification['user_details'] = userDetails;
                //console.log(notification)
                allNotifications.push(notification);
                //console.log(allNotifications);
                this.setState({
          allNotifications: allNotifications,
        });
              });
            });
        });
        
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.13 }}></View>
        <View style={{ flex: 0.8 }}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.imageView}>
              <Text style={{ fontSize: 25 }}>You have no Orders</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={({ item }) => (
                <View style={{ borderBottomWidth: 2}}>
                  <Text style={{color:'green'}}>{'User Name : ' + item.user_details.userName}</Text>
                  <Text style={{color:'purple'}}>{'User Contact : ' + item.user_details.contact}</Text>
                  <Text style={{color:'#ff1476'}}>{'User Address : '+item.user_details.address}</Text>
                  <Text style={{color:'red'}}>{'Date : ' + item.timestamp}</Text>

                  {item.finalorder.map((doc, index) => {
                    return (
                      <View>
                        <Text style={{ color: 'blue' }}>
                          PRODUCT NAME {doc.ProductName}
                        </Text>
                        <Text style={{ color: 'orange' }}>
                          PRICE PER UNIT {doc.ProductPrice}
                        </Text>
                        <Text style={{ color: 'teal' }}>
                          QUANTITY ORDERED {doc.Quantity}
                        </Text>
                        
                      </View>
                    );
                  })}
                  <TouchableOpacity
                  style={styles.button}><Text>Order Ready</Text></TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deeeed',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    button:{
    width:80,
    height:30,
    justifyContent:'center',
    alignSelf:'center',
    backgroundColor:"#ff1476",
    color:'black'
  },
});
