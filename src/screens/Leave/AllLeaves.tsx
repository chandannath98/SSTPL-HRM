import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../library/wrapper/ScreenWrapper'
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader'
import R from '../../resources/R'
import UserApi from '../../datalib/services/user.api';
import LeaveItem from './Components/LeaveItem'


type screenProps ={navigation:any,route:any}
export default function AllLeaves({navigation,route}:screenProps) {

    const [Leaves, setLeaves] = useState([])

    
    const getTaskDetails = async () => {
        try {
          const res = await new UserApi().fetchLeaves();
          if (res) {
            setLeaves(res)
           console.log("........................",res)
          }
        } catch (error) {
          console.log(error);
        }
      };


      useEffect(() => {
        
       getTaskDetails()
      }, []);


  return (
    <ScreenWrapper header={false}>
    <ChildScreensHeader
      style={{backgroundColor: R.colors.PRIMARY_LIGHT}}
      screenName={'Leaves'}
    />

    <FlatList
    contentContainerStyle={{
        gap:10,paddingTop:20,
        paddingHorizontal:10
    }}
    data={Leaves}
    renderItem={({item,index})=><LeaveItem item={item} index={index} /> }

    />


    </ScreenWrapper>

  )
}

const styles = StyleSheet.create({})