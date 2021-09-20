/** @format */

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Form from './screens/Form';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ResultWrap from './screens/ResultWrap';
import {PropertyContext} from './Context';
import Home from './screens/Home';
import {House, List, Paper} from './icons';

export default function App() {
  const Tab = createBottomTabNavigator();

  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const getProperties = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get(
        'https://rentalzback.herokuapp.com/properties',
        {
          params: {
            keyword,
            minPrice,
            maxPrice,
          },
        },
      );
      setResults(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProperties();
  }, [keyword, minPrice, maxPrice]);

  return (
    <NavigationContainer>
      <PropertyContext.Provider
        value={{
          loading,
          results,
          getProperties,
          setKeyword,
          minPrice,
          maxPrice,
          setMaxPrice,
          setMinPrice,
        }}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            options={{
              headerStyle: {backgroundColor: '#cc026a'},
              headerTintColor: '#fff',
              tabBarIcon: () => <House />,
            }}
            component={Home}
          />
          <Tab.Screen
            name="Form"
            options={{
              headerTitle: 'Create new property',
              headerStyle: {backgroundColor: '#f4511e'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              tabBarIcon: () => <Paper />,
            }}
            component={Form}
          />
          <Tab.Screen
            options={{headerShown: false, tabBarIcon: () => <List />}}
            name="Properties"
            component={ResultWrap}
          />
        </Tab.Navigator>
      </PropertyContext.Provider>
    </NavigationContainer>
  );
}
