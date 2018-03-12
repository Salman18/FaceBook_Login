import React,{ Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import FBSDK, { LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';
export default class App extends Component{
  _fbauth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if(result.isCancelled){
        console.log('Login cancelled');
      }else{
        console.log('Login Success ' + result.grantedPermissions);
      }
    }, function(error){
      console.log('Login error');
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: "+ result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});