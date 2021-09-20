/** @format */

import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

const DeleteModal = ({
  modalVis,
  closeModal,
  payload,
  loading,
  deleteProperty,
}) => {
  return (
    <Modal
      style={{ backgroundColor: '#000' }}
      animationType='slide'
      visible={modalVis}
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Caution</Text>
          <Text>Are you sure you want to remove "{payload.name}"?</Text>
          <View style={styles.buttons}>
            <View style={{ marginRight: 8 }}>
              <Button disabled={loading} onPress={closeModal} title='Cancel' />
            </View>
            <Button
              disabled={loading}
              onPress={() => deleteProperty(payload._id)}
              title='Delete'
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    marginBottom: 6,
  },
  buttons: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default DeleteModal;
