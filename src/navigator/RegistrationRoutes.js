import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import React, {useContext, useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import ScreensNameEnum from '../constants/ScreensNameEnum';
import LoginScreen from '../screens/registration/LogInScreen';
import AppIntroScreen from '../screens/registration/AppIntroScreen';
import WelcomeScreen from '../screens/registration/WelcomeScreen';
import RegistrationScreen from '../screens/registration/RegistrationScreen';
import ForgetPasswordScreen from '../screens/registration/ForgetPasswordScreen';
import HomeScreen from '../screens/Home/HomeScreen';
// import OtpScreen from '../screens/registration/OtpScreen';
// import EmailOtpScreen from '../screens/registration/EmailOtpScreen';
// import VerifyEmailScreen from '../screens/registration/VerifyEmailScreen';
import DrawerRoutes from './DrawerRoutes';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';

import LeaveScreen from '../screens/Leave/LeaveScreen';
import SuccessScreen from '../screens/success/SuccessScreen';
import AttendancereportScreen from '../screens/attendancereport/AttendancereportScreen';
import TaskScreen from '../screens/task/TaskScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HolidayScreen from '../screens/Holiday/HolidayScreen';
import AppreciationScreen from '../screens/Appreciatoin/AppreciationScreen';
import ProjectScreen from '../screens/Project/ProjectScreen';
import TimesheetScreen from '../screens/Timesheet/TimesheetScreen';
// import Messages from '../screens/Messages/Messages';
import Account from '../screens/Account/Account';
import Events from '../screens/Events/Events';
import Messages from '../screens/chats/Messages';
import TaskDetailsScreen from '../screens/task/TaskDetailsScreen';
import ProjectDetailsScreen from '../screens/Project/ProjectDetailsScreen';
import {AuthContext} from '../store/contexts/AuthContext';
import sInfoUtil from '../utils/sInfo.util';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllLeaves from '../screens/Leave/AllLeaves';
import AdminScreen from '../screens/Admin/AdminScreen';
import ProfileScreen from '../screens/profiles/ProfileScreen';
const RegistrationStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// import UpdateUserName from '../screens/registration/UpdateUserName';
// import UpdateProfilePicture from '../screens/registration/UpdateProfilePicture';
// import MyJobScreen from '../screens/job/MyJobScreen';
// import PostJobScreen from '../screens/job/PostJobScreen';
// import AddCardScreen from '../screens/job/AddCardScreen';
// import ViewCandidateScreen from '../screens/job/ViewCandidateScreen';
// import PaymentOverviewScreen from '../screens/payment/PaymentOverviewScreen';
// import UserExperience from '../screens/job/UserExperience';
// import SelectACardScreen from '../screens/payment/SelectACardScreen';
// import PaymentStatus from '../screens/payment/PaymentStatus';
// import CandidateScreen from '../screens/job/CandidateScreen';
// import OpenJobScreen from '../screens/job/OpenJobScreen';
// import MapScreen from '../screens/map/MapScreen';
// import BottomTabNavigator from './BottomTabNavigator';
// import JobHistoryScreen from '../screens/job/JobHistoryScreen';
// import Messages from '../screens/chats/Messages';
// import UserLocation from '../screens/profiles/UserLocation';
// import WorkWithUs from '../screens/profiles/WorkWithUs';
// import AllJobsScreen from '../screens/profiles/AllJobsScreen';
// import ChatScreen from '../screens/chats/Chats';
// import HelpScreen from '../screens/profiles/HelpScreen';
// import SettingsScreen from '../screens/settings/SettingsScreen';
// TODO: Can we use Options Hierarchy...or atleast stop repeatation like headerShown: false
/*
 * Here we handle the navigation of screens in authenticated user case and also for unauthenticated user also
 * @author Kindajobs <mohitkumar.webdev@gmail.com>
 */
const RegistrationRoutes = ({isAuthenticated, initialRoutName}) => {
  // const [currentJob, setCurrentJob] = React.useState(null);
  // useEffect(() => {
  //   getCurrentJob;
  // }, []);
  // function getCurrentJob() {
  // const currentJob = useSelector(state => state?.job.currentJob);
  // setCurrentJob(currentJob);
  // console.log(currentJob, 'Inside RegistrationRoutes');
  // }
  return (
    <RegistrationStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
      initialRouteName={
        initialRoutName && !isAuthenticated
          ? initialRoutName
          : ScreensNameEnum.GET_STARTED
      }>
      {!isAuthenticated ? (
        <>
          <RegistrationStack.Screen
            component={AppIntroScreen}
            name={ScreensNameEnum.GET_STARTED}
          />
          <RegistrationStack.Screen
            component={LoginScreen}
            name={ScreensNameEnum.LOGIN_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={AdminScreen}
            name={ScreensNameEnum.ADMIN_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={WelcomeScreen}
            name={ScreensNameEnum.WELCOME_SCREEN}
          />
          <RegistrationStack.Screen
            component={RegistrationScreen}
            name={ScreensNameEnum.REGISTRATION_SCREEN}
          />
          <RegistrationStack.Screen
            component={ForgetPasswordScreen}
            name={ScreensNameEnum.FORGET_SCREEN}
          />
          <RegistrationStack.Screen
            component={SuccessScreen}
            name={ScreensNameEnum.SUCCESS_SCREEN}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          {/* <RegistrationStack.Screen
            component={MyTabs}
            name={ScreensNameEnum.BOTTOM_TAB}
          /> */}
          <RegistrationStack.Screen
            component={DrawerRoute}
            name={ScreensNameEnum.OTP_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={AttendanceScreen}
            name={ScreensNameEnum.ATTENDANCE_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={LeaveScreen}
            name={ScreensNameEnum.LEAVE_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={LeaveScreen}
            name={ScreensNameEnum.SUCCESS_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={TaskDetailsScreen}
            name={ScreensNameEnum.TASK_DETAILS_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={ProjectDetailsScreen}
            name={ScreensNameEnum.PROJECT_DETAILS_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={TimesheetScreen}
            name={ScreensNameEnum.TIMESHEETS_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={ProfileScreen}
            name={ScreensNameEnum.PROFILE_SCREEN}
            options={{headerShown: false}}
          />
          {/* <RegistrationStack.Screen
            component={AllLeaves}
            name={ScreensNameEnum.ALL_LEAVES}
            options={{headerShown: false}}
          /> */}
        </>
      )}
    </RegistrationStack.Navigator>
  );
};

export default RegistrationRoutes;

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ScreensNameEnum.DRAWER_STACK}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ScreensNameEnum.MESSAGE_SCREEN}
        component={Messages}
        options={{
          headerShown: false,
          tabBarLabel: 'Notes',
          tabBarIcon: ({color, size}) => (
            <Icon name="message-reply-text-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ScreensNameEnum.MARK_ATTENDENCE}
        component={AttendanceScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Attendence',
          tabBarIcon: ({color, size}) => (
            <Icon name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ScreensNameEnum.ACCOUNT_SCREEN}
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="message-reply-text-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ScreensNameEnum.PROFILE_SCREEN}
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ScreensNameEnum.EVENTS_SCREENS}
        component={Events}
        options={{
          headerShown: false,
          tabBarLabel: 'Event',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-range" color={color} size={size} />
          ),
        }}
      /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

function DrawerRoute() {
  const authContext = useContext(AuthContext);
  const HandleLogout = () => {
    const logout = async () => {
      await AsyncStorage.removeItem("USER_CONTEXT")
      await AsyncStorage.removeItem("JWT")
      await authContext.signOut();
    };
    logout();
    return <View></View>;
  };
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen
        component={HomeScreen}
        name={ScreensNameEnum.HOME_SCREEN}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        component={AttendancereportScreen}
        name={ScreensNameEnum.ATTENDANCEREPORT_SCREEN}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        component={TaskScreen}
        name={ScreensNameEnum.TASK_SCREEN}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name={ScreensNameEnum.HOME_SCREEN}
        component={MyTabs}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="monitor-dashboard"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.ACCOUNT_SCREEN}
        component={Account}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="account-outline"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={ScreensNameEnum.ALL_LEAVES}
        component={AllLeaves}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="tent" size={size} color={focused ? 'blue' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.EVENTS_SCREENS}
        component={Events}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="tent" size={size} color={focused ? 'blue' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.ATTENDANCEREPORT_SCREEN}
        component={AttendancereportScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="calendar-check-outline"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.HOLIDAY_SCREEN}
        component={HolidayScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="party-popper"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.APPRECIATION_SCREEN}
        component={AppreciationScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="gift-open-outline"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.PROJECT_SCREEN}
        component={ProjectScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="camera-document"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={ScreensNameEnum.TASK_SCREEN}
        component={TaskScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="file-tree"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name={ScreensNameEnum.TIMESHEETS_SCREEN}
        component={TimesheetScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="archive-clock"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      /> */}
      <Drawer.Screen
        name={'Logout'}
        component={HandleLogout}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="logout" size={size} color={focused ? 'blue' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
