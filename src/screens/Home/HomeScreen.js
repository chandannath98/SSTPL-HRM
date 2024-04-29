import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TextInput,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import R from '../../resources/R';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreensNameEnum from '../../constants/ScreensNameEnum';
import {useDispatch, useSelector} from 'react-redux';
import {
  clockinSelector,
  currentUserSelector,
  tasksSelector,
} from '../../store/slices/user/user.slice';
import Button from '../../library/commons/Button';
import ClockInModal from '../../library/modals/ClockInModal';
import {
  fetchAllTasks,
  fetchAttendanceReport,
  fetchClockinStatus,
} from '../../store/actions/userActions';
import moment from 'moment';
import { screenOptions } from '../../navigator/screenOptions';
const DATA = [
  {
    id: 1,
    icon: 'calendar-check-outline',
    title: 'Profile',
    screen: ScreensNameEnum.ACCOUNT_SCREEN,
    color: '#1DB7AE',
    image: require('../../assets/Images/1.png'),
  },
  {
    id: 2,
    icon: 'party-popper',
    title: 'Attendence',
    screen: ScreensNameEnum.ATTENDANCEREPORT_SCREEN,
    color: '#158780',
    image: require('../../assets/Images/2.png'),
  },
  {
    id: 3,
    icon: 'party-popper',
    title: 'Leaves',
    screen: ScreensNameEnum.ALL_LEAVES,
    color: '#FF5C3A',
    image: require('../../assets/Images/3.png'),
  },
  {
    id: 4,
    icon: 'gift-open-outline',
    title: 'Apply Leave',
    screen: ScreensNameEnum.LEAVE_SCREEN,
    color: '#4DB948',
    image: require('../../assets/Images/4.png'),
  },
  {
    id: 5,
    icon: 'gift-open-outline',
    title: 'Project',
    screen: ScreensNameEnum.PROJECT_SCREEN,
    color: '#2C5CB7',
    image: require('../../assets/Images/5.png'),
  },
  {
    id: 6,
    icon: 'gift-open-outline',
    title: 'Task',
    screen: ScreensNameEnum.TASK_SCREEN,
    color: '#FF9D00',
    image: require('../../assets/Images/6.png'),
  },
  // {
  //   id: 7,
  //   icon: 'gift-open-outline',
  //   title: 'Payslip',
  //   screen: null,
  //   color: '#C97C00',
  //   image: require('../../assets/Images/7.png'),
  // },
  {
    id: 8,
    icon: 'gift-open-outline',
    title: 'Events',
    screen:null,
    color: '#4DB948',
    image: require('../../assets/Images/8.png'),
  },
  {
    id: 9,
    icon: 'gift-open-outline',
    title: 'Holidays',
    screen: ScreensNameEnum.HOLIDAY_SCREEN,
    color: '#AA1224',
    image: require('../../assets/Images/9.png'),
  },
  // {
  //   id: 10,
  //   icon: 'gift-open-outline',
  //   title: 'Appriciation',
  //   screen: null,
  //   color: '#646762',
  //   image: require('../../assets/Images/10.png'),
  // },
  // {
  //   id: 11,
  //   icon: 'gift-open-outline',
  //   title: 'Timesheet',
  //   screen: null,
  //   color: '#FF5C3A',
  //   image: require('../../assets/Images/11.png'),
  // },
  // {
  //   id: 12,
  //   icon: 'gift-open-outline',
  //   title: 'Notice',
  //   screen: null,
  //   color: '#FFA200',
  //   image: require('../../assets/Images/12.png'),
  // },
];
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [modalVis, setModalVis] = useState(false);
  const clockin = useSelector(clockinSelector);
  const user = useSelector(currentUserSelector);
  const tasks = useSelector(tasksSelector);
  useEffect(() => {
    if (tasks?.length < 1) {
      getAllTask();
    }
  }, []);
  const getAllTask = async () => {
    try {
      await dispatch(fetchAllTasks());
      await dispatch(fetchClockinStatus());
    } catch (error) {
      console.log(error);
      // Alert.alert('something went wrong please try again laterp');
    }
  };
  // console.log('______________', clockin);

  const Item = ({item}) => (
    <Pressable
    android_ripple={{color: 'gray', borderless: false}}
    onPress={() =>item.screen? navigation.navigate(item.screen):{}}
    
    style={[styles.cardView]}>
      <View
        style={{justifyContent: 'space-between', alignItems: 'center'}}>
        {/* <Icon name={item.icon} size={50} color={item?.color} /> */}
        <View  style={{backgroundColor:item?.color,padding:15,borderRadius:50}} >

        <Image source={ item?.image} style={{height:30,aspectRatio:1}} />
        </View>
        <Text style={{color: R.colors.PRIMARI_DARK, fontWeight: 'bold'}}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <ScreenWrapper header={false}>
      <StatusBar
        backgroundColor={R.colors.PRIMARY_LIGHT}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={require('../../assets/Images/mainbg.png')}
        resizeMode="stretch"
        style={styles.container}>
        <View style={styles.headerView}>
          <Icon
            onPress={() => navigation.toggleDrawer()}
            name="menu"
            size={35}
            color={R.colors.PRIMARI_DARK}
          />
          <View
          style={{
            flexDirection: 'row',
            // borderBottomWidth: 0.5,
            paddingBottom: 10,
            borderColor: R.colors.LIGHTGRAY,
            // marginTop: 10,
            // backgroundColor:"red",
            flex:1

          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',flexWrap:"wrap"}}>
            <Image
              source={{uri: user?.image_url}}
              style={{height: 50, width: 50, borderRadius: 30, marginLeft: 20}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.userName}>
                {user?.name ? user.name : 'N/A'}
              </Text>
              <Text
                style={[
                  styles.userName,
                  {color: R.colors.DARKGRAY, fontSize: R.fontSize.L},
                ]}>
                ( {user?.employee_detail?.designation?.name} )
              </Text>
            </View>
          </View>
          <View
            style={{
              // flex: 1,
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              paddingHorizontal: 5,
            }}>
            {/* <Button
              title={
                clockin?.attendance?.clock_out_time == null &&
                clockin?.attendance != null
                  ? 'Clock out'
                  : 'Clock in'
              }
              buttonStyle={{
                alignSelf: 'left',
                width: '50%',
                marginTop: 20,
                backgroundColor:
                  clockin?.attendance?.clock_out_time == null &&
                  clockin?.attendance != null
                    ? 'red'
                    : R.colors.primary,
              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={() => setModalVis(true)}
            /> */}
          </View>
        </View>
          {/* <Icon name="bell-outline" size={35} color={R.colors.PRIMARI_DARK} /> */}
        </View>

        <Button
              
              title={
                clockin?.attendance?.clock_out_time == null &&
                clockin?.attendance != null
                  ? 'Clock out'
                  : 'Mark Attendence'
              }
              buttonStyle={{
                alignSelf: 'center',
                borderRadius:15,
                width: '50%',
                marginTop: 20,
                backgroundColor:
                  clockin?.attendance?.clock_out_time == null &&
                  clockin?.attendance != null
                    ? 'red'
                    : R.colors.primary,
              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={() => navigation.navigate(ScreensNameEnum.ATTENDANCE_SCREEN)}
            />
        {/* <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            borderColor: R.colors.LIGHTGRAY,
            marginTop: 10,
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: user?.image_url}}
              style={{height: 50, width: 50, borderRadius: 30, marginLeft: 20}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.userName}>
                {user?.name ? user.name : 'N/A'}
              </Text>
              <Text
                style={[
                  styles.userName,
                  {color: R.colors.DARKGRAY, fontSize: R.fontSize.L},
                ]}>
                ( {user?.employee_detail?.designation?.name} )
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              paddingHorizontal: 5,
            }}>
            <Button
              title={
                clockin?.attendance?.clock_out_time == null &&
                clockin?.attendance != null
                  ? 'Clock out'
                  : 'Clock in'
              }
              buttonStyle={{
                alignSelf: 'left',
                width: '50%',
                marginTop: 20,
                backgroundColor:
                  clockin?.attendance?.clock_out_time == null &&
                  clockin?.attendance != null
                    ? 'red'
                    : R.colors.primary,
              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={() => setModalVis(true)}
            />
          </View>
        </View> */}

        {/* <View style={styles.filterView}>
          <View style={styles.searchView}>
            <Icon
              name="magnify"
              size={35}
              color={R.colors.PRIMARI_DARK}
              style={styles.icon}
            />
            <TextInput placeholder="Search Here" style={styles.textInput} />
          </View>
          <View style={styles.iconView}>
            <Icon
              name="filter-variant"
              size={35}
              color={R.colors.primary}
              style={{}}
            />
          </View>
        </View> */}
        <View style={[styles.headerView, {paddingVertical: 20}]}>
          {/* <Text style={styles.catText}>HR Management</Text>
          <Text style={styles.seeAllText}></Text> */}
        </View>
        <View style={styles.categoryView}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{gap:20}}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* <View style={[styles.headerView, {paddingVertical: 10}]}>
          <Text style={styles.catText}>Work Management</Text>
          <Text style={styles.seeAllText}></Text>
        </View> */}

       
      </ImageBackground>
      {modalVis && (
        <ClockInModal isVisible={modalVis} onModalClose={setModalVis} />
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems:"center"
    // borderBottomWidth:0.5
  },
  helloText: {
    color: R.colors.PRIMARI_DARK,
    fontWeight: 'bold',
    fontSize: R.fontSize.XL,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userName: {
    color: R.colors.primary,
    fontWeight: 'bold',
    fontSize: R.fontSize.XL,
    paddingHorizontal: 10,
  },
  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  searchView: {
    borderWidth: 0.5,
    borderColor: R.colors.DARKGRAY,
    width: '80%',
    borderRadius: 30,
    backgroundColor: R.colors.PRIMARY_LIGHT,
    height: 40,
  },
  iconView: {
    borderColor: R.colors.DARKGRAY,
    borderRadius: 10,
    backgroundColor: R.colors.PRIMARY_LIGHT,
    padding: 5,
  },
  icon: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  textInput: {
    fontFamily: R.fonts.Regular,
    fontSize: 18,
    width: '90%',
    textAlign: 'center',
    padding: 0,
    height: 40,
  },
  catText: {
    color: R.colors.PRIMARI_DARK,
    fontWeight: 'bold',
    fontSize: R.fontSize.L,
    marginTop: 10,
    marginBottom: 10,
  },
  seeAllText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    paddingTop: 18,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },
  cardView: {
    marginHorizontal:'3%',
    // backgroundColor: R.colors.PRIMARY_LIGHT,
    // borderRadius: 20,
    // padding: 5,
    // paddingVertical: 10,
    // borderColor: R.colors.LIGHTGRAY,
    // shadowOffset: {
    //   height: 2,
    //   width: 5,
    // },
    // shadowOpacity: 1,
    // shadowColor: R.colors.LIGHTGRAY,
    // elevation:10
    backgroundColor: R.colors.PRIMARY_LIGHT,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 10,
    // borderColor: R.colors.LIGHTGRAY,
    // Add elevation for Android
    elevation: 5,
    // Set shadow properties for iOS
    shadowOffset: {
      height: 5,
      width: 0, // Adjust as needed
    },
    shadowOpacity: 0.5, // Adjust as needed
    shadowRadius: 5, // Adjust as needed
    shadowColor: R.colors.LIGHTGRAY,
    // Add dimensions to the container
    width: '28%', // Adjust as needed
    height: 120, // Adjust as needed
    // borderColor: '#ccc',
    // borderWidth: 0.5,
    
  },
  taskView: {
    flexDirection: 'row',
    backgroundColor: R.colors.PRIMARY_LIGHT,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: R.colors.LIGHTGRAY,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {
      height: 5,
      width: 0, // Adjust as needed
    },
    shadowOpacity: 0.5, // Adjust as needed
    shadowRadius: 5, // Adjust as needed
    shadowColor: R.colors.LIGHTGRAY,
    borderColor: '#ccc',
    marginTop: 10,
  },
  nameText: {fontWeight: 'bold', fontSize: 20, color: R.colors.PRIMARI_DARK},
  dateText: {color: R.colors.primary, fontSize: 15},
  ImageView: {paddingRight: 20, paddingLeft: 20},
  acceptView: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // flex: 1,
  },
  pendingView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  cancelView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  pendingText: {
    color: R.colors.TEXT_COLOR,
    fontWeight: 'bold',
    // backgroundColor: '#FFF7E5',
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cancelText: {
    color: R.colors.PRIMARY_LIGHT,
    fontWeight: 'bold',
    borderRadius: 20,
    backgroundColor: 'red',
    padding: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  attView: {
    flexDirection: 'column',
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: R.colors.LIGHTGRAY,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
  },
  presentText: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    padding: 20,
    borderRadius: 50,
    color: '#1C67F6',
    backgroundColor: '#E8F0FE',
  },
  lateText: {
    fontWeight: 'bold',
    backgroundColor: '#FFF6E5',
    textAlign: 'center',
    color: '#FFA200',
    fontSize: 35,
    borderRadius: 50,
    padding: 20,
  },
  absentText: {
    fontWeight: 'bold',
    backgroundColor: '#FFEFEB',
    textAlign: 'center',
    color: '#FFA200',
    fontSize: 35,
    borderRadius: 50,
    padding: 20,
  },
});
