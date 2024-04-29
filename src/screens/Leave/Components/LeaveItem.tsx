import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import R from '../../../resources/R'


type  Props = {item:any, index:any}

export default function LeaveItem({item,index}:Props) {


    const leaveColors={
        pending:'#ddb78a',
        approved:R.colors.GREEN,
        rejected:R.colors.RED
    }

  return (
    <View style={styles.itemContainer}>
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between"
        }}>

      <Text>Casual Leave</Text>
      <Text style={styles.dateText}>{item?.leave_date?.slice(0,10)}</Text>
        </View>
      <Text
      style={[styles.leaveStatus,{color:leaveColors[item?.status]}]}
      >{item?.status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    itemContainer:{
        padding:10,
        gap:2,
        borderRadius:10,
        backgroundColor:"white",
        elevation:10
    },
    dateText:{
        fontWeight:"bold",
        color:"black"
    },
    leaveStatus:{
        color:R.colors.GREEN
    }

})