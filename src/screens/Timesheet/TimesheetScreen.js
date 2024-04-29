import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import R from '../../resources/R';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimesheetScreen = () => {

  const [data, setData] = useState([
    {
    id:"Id",task:"Task",employee:"Employee",startData:"Start Date",endDate:"End Date",hours: "Hours"
  },
    {
    id:"i00000000d",task:"Task",employee:"Employee",startData:"Start Date",endDate:"End Date",hours: "Hours"
  },
])
  return (
    <ScreenWrapper header={false}>
      <ChildScreensHeader
        style={{backgroundColor: R.colors.PRIMARY_LIGHT}}
        screenName={'Timesheet'}
      />
      <ScrollView horizontal={true}>
        {/* <View style={styles.placeview}> */}
          
     <FlatList
     data={data}
     renderItem={({item,index})=>(

      <View style={{flexDirection:"row",gap:15}}>

<Text style={{width:100}}>{item?.id}</Text>
<Text style={{width:100}}>{item?.task}</Text>
<Text style={{width:100}}>{item?.employee}</Text>
<Text style={{width:100}}>{item?.startData}</Text>
<Text style={{width:100}}>{item?.endDate}</Text>
<Text style={{width:100}}>{item?.hours}</Text>

        </View>

     )}   
     /> 
          
        {/* </View> */}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default TimesheetScreen;
const styles = StyleSheet.create({
  placeview: {
    height: 50,
    width: 600,
    backgroundColor: R.colors.LIGHTGRAY,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:10
    
  },
  textinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: R.colors.PRIMARI_DARK,
  },
});
