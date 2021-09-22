/** @format */

import React from 'react';
import {Button, Image, Text, View, Vibration, ScrollView} from 'react-native';

import RNBeep from 'react-native-a-beep';

const Home = () => {
  return (
    <ScrollView>
      <Button
        onPress={() => {
          RNBeep.beep();
        }}
        title="Press to beep"
      />
      <Button onPress={() => Vibration.vibrate()} title="Press to vibrate" />
      <Text style={styles.tite}>Welcome to RentalZ</Text>
      <Text style={styles.content}>
        Enjoy your house rental with us. We bring the best service on renting
        house
      </Text>
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/brand.png')}
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  tite: {
    fontSize: 32,
    lineHeight: 64,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgWrap: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  image: {
    width: '100%',
    height: 350,
  },
};

export default Home;
