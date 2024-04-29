import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../library/wrapper/ScreenWrapper'
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader'
import R from '../../resources/R'
import WebView from 'react-native-webview'

export default function AdminScreen() {
  return (
    <ScreenWrapper header={false}>
    <ChildScreensHeader
      style={{backgroundColor: R.colors.PRIMARY_LIGHT}}
      screenName={'Admin'}
    />
    <WebView
    source={{ uri: 'https://hrm.wathelp.com/public/login' }} style={{ flex: 1 }} />
    </ScreenWrapper>
   
  )
}

const styles = StyleSheet.create({})