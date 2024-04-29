import {View, Text, StyleSheet, Image, Dimensions, Platform, PermissionsAndroid, Alert, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import R from '../../resources/R';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../library/commons/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list';
import Geocoder from 'react-native-geocoding';
import { useDispatch, useSelector } from 'react-redux';
import GetLocation from 'react-native-get-location';
import { clockinSelector } from '../../store/slices/user/user.slice';
import Geolocation from '@react-native-community/geolocation';
import UserApi from "../../datalib/services/user.api"
import Loader from '../../library/commons/Loader';
import { fetchClockinStatus } from '../../store/actions/userActions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

Geocoder.init('AIzaSyDr7xXKTxIAB0t3HQN9WdolJMY0q93x0qE');

const AttendanceScreen = ({navigation,route}) => {



  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const clockin = useSelector(clockinSelector);
  const handleConfirm = () => {
    onModalClose();
    onConfirm && onConfirm();
  };
  const [office, setOffice] = useState('Office');
  const [type, setType] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  // console.log(currentLocation, currentAddress);
  useFocusEffect(
    React.useCallback(() => {
      // Request permission to access location
      if (Platform.OS === 'android') {
        requestLocationPermission();
      } else {
        Geolocation.requestAuthorization();
      }
      // fetchCurrentPosition();
    }, [])
  );
  async function fetchCurrentPosition() {
   
    // Get current location
    setLoading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(position => {
    const {latitude, longitude} = position;
    console.log("__________",{latitude, longitude});
    setCurrentLocation({latitude, longitude});

    // Reverse geocode to get address
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('______', json.results[0].formatted_address);
        const addressComponent = json.results[0].formatted_address;
        setCurrentAddress(addressComponent);
        setLoading(false);
      })
      .catch(error => {
        console.warn(error);
        setLoading(false);
      });
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  
  }

  const requestLocationPermission = async () => {
    try {
      const grantedFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location for better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      const grantedCoarseLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location for better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (
        grantedFineLocation === PermissionsAndroid.RESULTS.GRANTED &&
        grantedCoarseLocation === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log(grantedFineLocation,grantedCoarseLocation)
        fetchCurrentPosition();

        // Both permissions granted, you can now access the location
        // Proceed with your location-based functionality
      } else {
        // Permissions denied, handle accordingly
        // You may want to inform the user about the importance of these permissions
        // and guide them to enable permissions in the app settings
      }
    } catch (err) {
      console.warn(err);
    }
  };


  // Function to calculate distance between two points using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Function to check if current location is within the range of given latitude and longitude
function isWithinRange(currentLat, currentLon, targetLat, targetLon, range) {
  const distance = getDistanceFromLatLonInKm(currentLat, currentLon, targetLat, targetLon);
  const distanceInMeters = distance * 1000; // Convert distance to meters
  return distanceInMeters <= range;
}

// Example usage
const targetLatitude = 28.547884; // Latitude of the target location
const targetLongitude = 77.251276; // Longitude of the target location
const rangeInMeters = 200; // Range in meters

// Assuming currentLatitude and currentLongitude are obtained from the device's GPS
const currentLatitude = currentLocation?.latitude
const currentLongitude = currentLocation?.longitude;

// Check if current location is within the range of the target location
const withinRange = isWithinRange(currentLatitude, currentLongitude, targetLatitude, targetLongitude, rangeInMeters);


if (withinRange) {
  console.log("Current location is within the range of the target location.");
} else {
  console.log("Current location is not within the range of the target location.");
}


  function getCurrentDateTime() {
    const currentDate = new Date();

    // Get day, month, and year
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear();

    // Get hours, minutes, and AM/PM
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12-hour format

    // Construct the formatted date-time string
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes} ${amPM}`;

    return formattedDateTime;
  }
  const openCamera = () => {
    launchCamera({ mediaType: 'photo',cameraType:"front" }, (response) => {
      if (!response.didCancel) {
        // Process the image response
        handleImageResponse(response);
      }
    });
  };
  
  const openImageLibrary = () => {
    launchImageLibrary( {
      mediaType: 'photo',
      cameraType: 'front', // Set the camera type to 'front'
    }, (response) => {
      if (!response.didCancel) {
        // Process the image response
        handleImageResponse(response);
      }
    });
  };
  
  const handleImageResponse = (response) => {
    // Here you can process the image response
    // For example, you can set the response.uri to state
    console.log(response)
    setImageUri(response.assets[0]?.uri);
  };


  const handleClockin = async () => {
const withinRange = isWithinRange(currentLatitude, currentLongitude, targetLatitude, targetLongitude, rangeInMeters);
if(withinRange){
    setLoading(true)
    try {
      const res = await new UserApi().clockIn({
        currentLatitude: currentLocation?.latitude
          ? currentLocation?.latitude
          : null,
        currentLongitude: currentLocation?.longitude
          ? currentLocation?.longitude
          : null,
        working_from: office,
      });
      if (res) {
        Alert.alert(res?.message);
        await dispatch(fetchClockinStatus());
        setLoading(false)
        navigation?.goBack()
      }
    } catch (error) {
      console.log(error);
    }
  }else{
    Alert.alert("Current location is not within the site range")
  }
  
};
  const handleClockout = async () => {
    try {
      const res = await new UserApi().clockOut({
        id: clockin?.attendance?.id,
      });
      if (res) {
        Alert.alert(res?.message);
        await dispatch(fetchClockinStatus());
        onModalClose(false);
      }
    } catch (error) {
      console.log(error);
    }
  };







  return (
    <ScreenWrapper

    
    header={false}>

<ChildScreensHeader
        style={{backgroundColor: R.colors.PRIMARY_LIGHT}}
        screenName={'Mark Attandence'}
      />

    <View style={{
      paddingHorizontal:10
    }}>

      



      <View>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            fontSize: 15,
            color: R.colors.PRIMARI_DARK,
          }}>
          Clock In
        </Text>
        <View 
       style={{
        flexDirection:"row",
        gap:10
       }}
        >
          <View
           style={{
            backgroundColor:'#158780',
            padding:10,
            borderRadius:50
          }}
          >
            <Image source={require("../../assets/Images/3.png")}
            style={{height:30,aspectRatio:1}}
            />
           
          </View>
          <View>
              <Text>{getCurrentDateTime()}</Text>
              <Text>General Shift</Text>
            </View>
        </View>
      </View>




      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-around',
        }}>
        {/* <TextInput
          style={{
            borderWidth: 0.1,
            borderRadius: 10,
            color: R.colors.PRIMARY_LIGHT,
            width: '45%',
            fontSize: 20,
          }}
          placeholder="Location"
        /> */}
      <SelectList
      defaultOption={{key:'Office', value:'Office'}}
      boxStyles={{
        width:Dimensions.get("window").width-50,
        backgroundColor:"white"
        
      }}
        setSelected={(val) => setOffice(val)} 
        data={[
          {key:'Office', value:'Office'},
          {key:'Home', value:'Home'},
          {key:'Other', value:'Other'},
         
      ]} 
        save="value"
    />
      

        {/* <TextInput
          style={{
            borderWidth: 0.1,
            borderRadius: 10,
            width: '45%',
            fontWeight: 'bold',
            color: R.colors.PRIMARI_DARK,
            fontSize: 20,
          }}
          placeholder="Working From    *"
        /> */}
      </View>


      <View
     style={{
      borderRadius:10,
      borderWidth:1,
      backgroundColor:"white",
      padding:13,
      marginTop:10,
      marginHorizontal:15
     }} 
      >
      <Text>{currentAddress}</Text>
      </View>
      <View style={{
        alignSelf:"center",
        // width: '40%',
    
    }}>

<Pressable
onPress={openCamera}
style={{
  marginTop:20,
  borderRadius:50,
  // backgroundColor:"red",
  // width:210,
  alignItems:"center",
  justifyContent:"center"
}}
>
{imageUri?
<Image source={!imageUri? require("../../assets/Images/1.png"):{ uri: imageUri }} style={{ width: 200, height: 200,borderRadius:500 }} />
:
<Ionicons
          name="person-circle-outline"
          size={200}
          color={'gray'}
          // style={{color: '#FFA200'}}
        />
}
        <Text>Click to capture</Text>
</Pressable>
      {/* <Button title="Open Camera" onPress={openCamera} /> */}

        <Button
          title={clockin?.attendance?.clock_out_time == null &&
            clockin?.attendance != null
              ? 'Clock out'
              : 'Clock in'}
          buttonStyle={{
            alignSelf: 'center',
            marginTop: 20,
            borderRadius:10,
            width:150
          }}
          onPress={
            clockin?.attendance?.clock_out_time == null &&
            clockin?.attendance != null
              ? handleClockout
              : handleClockin
          }
        />
      </View>
      <View style={styles.textbar}>
        <View style={styles.ImageView}>
          <Image source={require('../../assets/Images/Image.png')} />
        </View>
        {/* <View>
          <Text
            style={{
              color: R.colors.PRIMARI_DARK,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Check-in
          </Text>
          <Text
            style={{
              color: R.colors.SECONDARY,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            09:30 AM
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: R.colors.PRIMARI_DARK,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Check-out
          </Text>

          <Text style={{color: '#FF5C3A', fontWeight: 'bold', fontSize: 20}}>
            09:30 PM
          </Text>
        </View> */}
      </View>
      {/* <View
        style={{
          paddingLeft: 130,
          flexDirection: 'row',
          color: R.colors.PRIMARI_DARK,
        }}>
        <Icon
          name="map-marker"
          size={25}
          color={R.colors.PRIMARI_DARK}
          style={{color: '#FFA200'}}
        />
        <Text style={{fontSize: 15, color: R.colors.PRIMARI_DARK}}>
          8 S Jefferson St, New Ulm, MN
        </Text>
      </View> */}
      </View>
      <Loader loading={loading} message={''} />

    </ScreenWrapper>
  );



};

export default AttendanceScreen;
const styles = StyleSheet.create({
  textbar: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});
