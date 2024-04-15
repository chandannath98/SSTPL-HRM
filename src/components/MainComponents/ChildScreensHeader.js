import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import R from '../../resources/R';
// import colors from '../../../colors';

export default function ChildScreensHeader({screenName, style}) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center', padding: 5, elevation: 5},
        style,
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={40} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Rubik',
          fontSize: 17,
          marginHorizontal: 10,
           color: R.colors.PRIMARI_DARK,
          textAlign: 'center',
          width: '75%',
          fontWeight:"bold"
        }}>
        {screenName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
