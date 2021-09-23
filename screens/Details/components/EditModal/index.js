/** @format */

import axios from 'axios';
import React, {useCallback, useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {PropertyContext} from '../../../../Context';

import {districts} from '../../../../data/district';

const EditModal = ({modalVis, closeModal, property, getProperty}) => {
  const {getProperties} = useContext(PropertyContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState(property.district);
  const [propertyType, setPropertyType] = useState(property.type);
  const [furnitureType, setFurnitureType] = useState(property.furnitureType);

  const showAlert = (title, content) =>
    Alert.alert(title, content, [
      {
        text: 'Confirm',
        onPress: () => {
          closeModal();
          getProperty();
        },
      },
    ]);

  const editProperty = payload => {
    setLoading(true);
    Object.keys(payload).map(
      k =>
        (payload[k] =
          typeof payload[k] == 'string' ? payload[k].trim() : payload[k]),
    );
    const editedProperty = {
      ...payload,
      price: parseInt(payload.price),
      district,
      type: propertyType,
      furnitureType,
    };
    return axios
      .put(
        `https://rentalzback.herokuapp.com/properties/${property._id}`,
        editedProperty,
      )
      .then(() => {
        setLoading(false);
        getProperties();
        showAlert(
          'Edit successfully',
          'Property information updated successfully',
        );
      })
      .catch(err => {
        setLoading(false);
        showAlert('Error', err.response.data?.message);
      });
  };

  const onSubmit = data => {
    editProperty(data);
  };

  return (
    <Modal
      style={{backgroundColor: '#000'}}
      animationType="slide"
      visible={modalVis}
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit property</Text>
          <ScrollView>
            <View>
              <Text>Property name</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputView}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Type property name here"
                  />
                )}
                name="name"
                defaultValue={property.name}
              />
              {errors.name && (
                <Text style={styles.errorText}>This is required.</Text>
              )}
            </View>
            <View>
              <Text style={{marginBottom: 8}}>District</Text>
              <View style={styles.pickerView}>
                <RNPickerSelect
                  value={district}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={useCallback(
                    value => setDistrict(value),
                    [district],
                  )}
                  items={districts}
                />
              </View>
            </View>
            <View>
              <Text>Property address</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputView}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter the exact address, street and ward"
                  />
                )}
                name="address"
                defaultValue={property.address}
              />
              {errors.address && (
                <Text style={styles.errorText}>This is required.</Text>
              )}
            </View>
            <View>
              <Text>Bedrooms</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputView}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Type bedrooms here"
                  />
                )}
                name="bedrooms"
                defaultValue={property.bedrooms}
              />
              {errors.bedrooms && (
                <Text style={styles.errorText}>This is required.</Text>
              )}
            </View>
            <View>
              <Text style={{marginBottom: 8}}>Property type</Text>
              <View style={styles.pickerView}>
                <RNPickerSelect
                  value={propertyType}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={useCallback(
                    value => setPropertyType(value),
                    [propertyType],
                  )}
                  items={[
                    {label: 'Flat', value: 'flat'},
                    {label: 'House', value: 'house'},
                    {label: 'Bungalow', value: 'bungalow'},
                  ]}
                />
              </View>
            </View>
            <View>
              <Text>Monthly renting price ($)</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  max: 10000,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputView}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Type renting price here"
                  />
                )}
                name="price"
                defaultValue={property.price.toString()}
              />
              {errors.price && (
                <Text style={styles.errorText}>
                  {errors.price.type === 'max'
                    ? 'The max price is 10000$'
                    : 'This is required.'}
                </Text>
              )}
            </View>
            <View>
              <Text style={{marginBottom: 8}}>Furniture type</Text>
              <View style={styles.pickerView}>
                <RNPickerSelect
                  value={furnitureType}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={useCallback(
                    value => setFurnitureType(value),
                    [furnitureType],
                  )}
                  items={[
                    {label: 'Furnished', value: 'furnished'},
                    {label: 'Unfurnished', value: 'unfurnished'},
                    {label: 'Past furnished', value: 'past furnished'},
                  ]}
                />
              </View>
            </View>
            <View>
              <Text>Reporter name</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputView}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Type your name here"
                  />
                )}
                name="reporter"
                defaultValue={property.reporter}
              />
              {errors.reporter && (
                <Text style={styles.errorText}>This is required.</Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.buttons}>
            <View style={{marginRight: 8}}>
              <Button disabled={loading} onPress={closeModal} title="Cancel" />
            </View>
            <Button
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              title="Edit"
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
    minWidth: 300,
    maxHeight: 500,
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
  inputView: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  pickerView: {
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  errorText: {
    color: '#eb4034',
  },
});

export default EditModal;
