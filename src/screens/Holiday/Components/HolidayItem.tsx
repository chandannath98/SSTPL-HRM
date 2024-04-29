import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


type  Props = {item:any, index:any}

export default function HolidayItem({item,index}:Props) {

    console.log(item)
  return (
    <View  style={styles.itemContainer}>
      <Text>{item?.date?.slice(0,10)}</Text>
      <Text>{item?.occassion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    itemContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"white",
        elevation:10,
        padding:10
    }
})