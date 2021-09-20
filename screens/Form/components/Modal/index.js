/** @format */

import React from 'react';
import { Button, Modal, Text, View } from 'react-native';

const ConfirmModal = ({
  modalVis,
  values,
  onCloseModal,
  onSubmit,
  furnitureType,
  propertyType,
  loading,
  district,
}) => {
  return (
    <Modal animationType='slide' visible={modalVis} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 24, lineHeight: 32, fontWeight: '700' }}>
            Confirmation notification
          </Text>
          <Text>Once you confirm, the property will be created</Text>
          <Text>Please check the information below before create</Text>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.valueView}>Name: {values?.name}</Text>
            <Text style={styles.valueView}>
              Address: {values?.address}, {district}, Ho Chi Minh city
            </Text>
            <Text style={styles.valueView}>Bedrooms: {values?.bedrooms}</Text>
            <Text style={styles.valueView}>Price: {values?.price}$</Text>
            <Text style={styles.valueView}>
              Furniture type: {furnitureType}
            </Text>
            <Text style={styles.valueView}>Type: {propertyType}</Text>
            <Text style={styles.valueView}>Reporter: {values?.reporter}</Text>
          </View>
          <View style={styles.modalButton}>
            <Button
              disabled={loading}
              onPress={onCloseModal}
              title='Close'
              color='#f4511e'
            />
            <View style={{ marginLeft: 16 }}>
              <Button
                disabled={loading}
                onPress={onSubmit}
                title='Confirm'
                color='#f4511e'
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  valueView: {
    marginVertical: 6,
  },
};

export default ConfirmModal;
