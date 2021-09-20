/** @format */

import React from 'react';
import {Image, Text, View} from 'react-native';

const Home = () => {
  return (
    <View>
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
    </View>
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
