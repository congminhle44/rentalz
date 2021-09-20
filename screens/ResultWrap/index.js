/** @format */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Result from '../Result';
import Details from '../Details';

const Stack = createNativeStackNavigator();

const ResultWrap = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='All properties'
        options={{
          headerStyle: { backgroundColor: '#418aec' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Result}
      />
      <Stack.Screen
        name='Details'
        options={{
          headerStyle: { backgroundColor: '#418aec' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Details}
      />
    </Stack.Navigator>
  );
};

export default ResultWrap;
