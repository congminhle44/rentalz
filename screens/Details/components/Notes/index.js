/** @format */

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Notes = ({note, baseApi}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.customer}>Customer</Text>
      <Text style={styles.content}>{note.content}</Text>
      {note.image !== '' && (
        <Image
          style={{width: 120, height: 120, marginTop: 6}}
          source={{uri: `${baseApi}/${note.image}`}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
  },
  customer: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
  },
});

export default Notes;
