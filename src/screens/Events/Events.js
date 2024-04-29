import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import R from '../../resources/R';
import { useDispatch, useSelector } from 'react-redux';
import { eventsSelector } from '../../store/slices/user/user.slice';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import { Calendar } from 'react-native-calendars';
import { fetchEvents } from '../../store/actions/userActions';

const Events = () => {


  const dispatch = useDispatch()
  
  const Events = useSelector(eventsSelector)
  console.log("Events",Events);
  
  const [selectedItem, setSelectedItem] = useState({})
  
  
    useEffect(() => {
      if (Events?.length < 1) {
        getAllTask();
      }
    }, []);
    const getAllTask = async () => {
      try {
        await dispatch(fetchEvents());
      } catch (error) {
        console.log(error);
        // Alert.alert('something went wrong please try again laterp');
      }
    };
    const leaves = {
      '2024-03-10': {marked: true, dotColor: 'red'},
      '2024-03-15': {marked: true, dotColor: 'red'},
    };
  
    const EventsList ={}
   Events?.forEach((i,index)=>{
  
      EventsList[i?.date?.slice(0,10)]= { marked: true , color: 'blue',...i} ;
    
    })
  
    console.log('EventsList',EventsList)
    const events = {
      '2024-04-12': {marked: true, dotColor: 'blue'},
      '2024-03-18': {marked: true, dotColor: 'blue'},
    };
    return (
      <ScreenWrapper header={false}>
        <ChildScreensHeader
          style={{
            backgroundColor: R.colors.PRIMARY_LIGHT,
            borderBottomWidth: 0.5,
          }}
          screenName={'Holiday'}
        />
        <ImageBackground
          source={require('../../assets/Images/mainbg.png')}
          style={{flex: 1, justifyContent: "flex-start"}}>
          <Calendar
          onMonthChange={month=>{
            console.log(month)
          }}
          onDayPress={day=>{
            setSelectedItem(EventsList[day.dateString])
            console.log(day)
          }}
            markedDates={{
              ...EventsList,
              ...EventsList,
            }}
            style={{ borderWidth: 0}}
            // Your other calendar configurations here
          />
  {/* 
          <FlatList
          data={Events}
          renderItem={({item,index})=><HolidayItem item={item} index={index} />}
          /> */}
  
  {/* {selectedItem &&
  <HolidayItem item={selectedItem} index={0} />
  } */}
        </ImageBackground>
      </ScreenWrapper>
    );
};

export default Events;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
