/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BTextInput from '../../library/commons/BTextInput';
import Loader from '../../library/commons/Loader';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import ScreenNameEnum from '../../constants/ScreensNameEnum';
import AuthApi from '../../datalib/services/authentication.api';
import Button from '../../library/commons/Button';
import R from '../../resources/R';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../store/contexts/AuthContext';
import ValidationHelper from '../../helpers/ValidationHelper';

/*
 * This function Component is used to render Login Screen
 * @author Kindajobs <mohitkumar.webdev@gmail.com>
 */
const LogInScreen = () => {
  const navigation = useNavigation();
  const [remindMe, setRemindMe] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [err, setError] = useState({});
  const authContext = useContext(AuthContext);
  const [secText, setSecText] = useState(true);

  const validate = () => {
    var valid = true;
    const err = {};
    if (!ValidationHelper.isEmail(email)) {
      valid = false;
      err.email = 'please enter a valid email address';
    }
    if (password.length < 8) {
      valid = false;
      err.pass = 'your password must be 8 characters long';
    }
    setError(err);
    return valid;
  };

  const handleOnSubmit = async () => {
    const valid = await validate();
    if (valid) {
      setLoading(true);
      const urlEncodedData = new URLSearchParams({
        email: email,
        password: password,
      }).toString();
      const res = await new AuthApi().login(urlEncodedData);
      console.log('___res', res);
      if (res) {
        setLoading(false);
        authContext.signIn();
      } else {
        Alert.alert('Invalid username or password');
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper header={false}>
      <ChildScreensHeader
        style={{
          backgroundColor: R.colors.PRIMARY_LIGHT,
          borderBottomWidth: 0.5,
        }}
        screenName={'Sign in'}
      />

      {/* <View style={styles.container}> */}
      <ImageBackground
        source={require('../../assets/Images/mainbg.png')}
        style={{flex: 1}}
        resizeMode="stretch">
        <ScrollView>
          <View style={styles.inputBlock}>
            <Image
              source={require('../../assets/Images/logo.png')}
              style={{width: '90%', alignSelf: 'center'}}
              resizeMode="contain"
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <Text style={{textTransform: 'capitalize'}}>Welcome Back!</Text>
              </Text>
              <Text style={styles.tagline}>
                <Text>Sign in to continue</Text>
              </Text>
              <View style={styles.mobileContainer}>
                <Icon
                  name={'email'}
                  size={22}
                  color={R.colors.primary}
                  style={{position: 'absolute', right: 15, top: 24}}
                />
                <BTextInput
                  autoFocus
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  placeholderTextColor={R.colors.DARKGRAY}
                  maxLength={40}
                  style={styles.textInput}
                />
              </View>
              {err?.email && (
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {err?.email}
                </Text>
              )}
              <View style={[styles.mobileContainer]}>
             
                <BTextInput
                  secureTextEntry={secText}
                  value={password}
                  onChangeText={setPassword}
                  style={[
                    styles.textInput,
                    {
                      // textAlign: 'center',
                      borderRadius: 60,
                      // borderColor: 'rgba(0, 0, 0, 0.39)',
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor={R.colors.DARKGRAY}
                />
               <Pressable
                  style={{position: 'absolute', right: 15, top: 24,}}
                  onPress={() => setSecText(!secText)}>
                  <Icon name={'lock'} size={22} color={R.colors.primary} />
                </Pressable>
              </View>
              {err?.pass && (
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {err?.pass}
                </Text>
              )}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical:10
                }}>
                <View style={styles.remind}>
                  <Icon
                    name={
                      !remindMe
                        ? 'checkbox-blank-outline'
                        : 'checkbox-marked-outline'
                    }
                    size={30}
                    color={R.colors.primary}
                    onPress={() => setRemindMe(!remindMe)}
                  />
                  <Text style={{color: R.colors.PRIMARI_DARK}}>Remind Me</Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigation.navigate(ScreenNameEnum.FORGET_SCREEN)
                  }>
                  <Text
                    style={{
                      color: R.colors.lightYellow,
                      fontWeight: 'bold',
                      fontSize: R.fontSize.M,
                    }}>
                    Forget Password?
                  </Text>
                </Pressable>
              </View> */}
            </View>
            <Button
              title={'SIGN IN'}
              onPress={handleOnSubmit}
              // disabled={isNextDisabled}
              buttonStyle={{backgroundColor: '#002147'}}
              textColor="#ffb606"
              textStyle={{
                fontWeight: 'bold',
                fontSize: R.fontSize.XL,
                fontFamily: 'sans-serif',
              }}
            />
          </View>

          {/* <View
          style={{
            flexDirection: 'row',
            paddingLeft: 60,
            marginBottom: 40,
            justifyContent: 'space-around',
            width: '80%',
            alignSelf: 'center',
          }}>
          <Text style={{color: R.colors.PRIMARI_DARK, fontWeight: '900'}}>
            Don't have an account?
          </Text>
          <Text
            style={{color: 'red', fontWeight: 'bold', fontSize: R.fontSize.L}}>
            Sign Up!
          </Text>
        </View> */}
        </ScrollView>
      </ImageBackground>
      {/* </View> */}

      <Loader loading={isLoading} />
    </ScreenWrapper>
  );
};
export default LogInScreen;

const styles = StyleSheet.create({
  label: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 25,
    display: 'flex',
    fontFamily: 'nunito',
    flexDirection: 'column',
    fontFamily: R.fonts.Medium,
    paddingVertical: 20,
    textTransform: 'capitalize',
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 46,
    borderWidth: 0.5,
    paddingLeft: 10,
    fontFamily: 'nunito',
  },
  imageBlock: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 200,
    alignSelf: 'center',
    marginVertical: 50,
  },
  container: {
    // flex: 1,
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F9F9FF',
    alignItems: 'center',
  },

  inputBlock: {
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: '25%',
  },
  pressableText: {
    color: '#3366FF',
    fontSize: 16,
    justifyContent: 'space-between',
    fontFamily: R.fonts.Regular,
    fontFamily: 'nunito',
  },
  tagline: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 30,
  },
  btn: {
    textAlign: 'center',
    backgroundColor: '#E3AB1A',
    paddingVertical: 20,
    borderRadius: 35,
    marginTop: 40,
    marginHorizontal: 30,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  inputContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
  },
  otpInput: {
    borderBottomWidth: 1,
    width: 35,
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    fontFamily: R.fonts.Bold,
    fontSize: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: R.fonts.Regular,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    // textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
  },
  screenTitle: {
    fontFamily: R.fonts.Bold,
    fontSize: 22,
  },
  mobileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: '1C67F6',
    marginBottom: 100,
    width: '90%',
  },
  remind: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
