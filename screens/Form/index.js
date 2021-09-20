/** @format */

import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Text, Alert, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import {districts} from '../../data/district';

import {PropertyContext} from '../../Context';
import ConfirmModal from './components/Modal';

const Form = () => {
  const {getProperties} = useContext(PropertyContext);

  const [values, setValues] = useState();
  const [modalVis, setModalVis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState('flat');
  const [furnitureType, setFurnitureType] = useState('furnished');
  const [district, setDistrict] = useState('Quan 1');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onShowModal = data => {
    setValues(data);
    setModalVis(true);
  };

  const onCloseModal = () => {
    setModalVis(false);
  };

  const showAlert = (title, content) =>
    Alert.alert(title, content, [{text: 'Confirm', onPress: onCloseModal}]);

  const postStation = payload => {
    setLoading(true);
    const newProperty = {
      ...payload,
      price: parseInt(payload.price),
      district,
      type: propertyType,
      furnitureType,
    };
    return axios
      .post('https://rentalzback.herokuapp.com/properties', newProperty)
      .then(() => {
        showAlert('Create successfully', 'Create new property successfully');
        setLoading(false);
        getProperties();
      })
      .catch(err => {
        setLoading(false);
        showAlert('Error', err.response.data?.message);
      });
  };

  const onSubmit = () => {
    postStation(values);
  };

  return (
    <ScrollView style={{marginVertical: 16, paddingHorizontal: 24}}>
      <ConfirmModal
        values={values}
        loading={loading}
        onCloseModal={onCloseModal}
        propertyType={propertyType}
        furnitureType={furnitureType}
        onSubmit={onSubmit}
        modalVis={modalVis}
        district={district}
      />
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
          defaultValue=""
        />
        {errors.name && <Text style={styles.errorText}>This is required.</Text>}
      </View>
      <View style={{marginBottom: 8}}>
        <Text style={{marginBottom: 8}}>City</Text>
        <View>
          <Text>Ho Chi Minh city</Text>
        </View>
      </View>
      <View>
        <Text style={{marginBottom: 8}}>District</Text>
        <View style={styles.pickerView}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setDistrict(value)}
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
          defaultValue=""
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
          defaultValue=""
        />
        {errors.bedrooms && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>
      <View>
        <Text style={{marginBottom: 8}}>Property type</Text>
        <View style={styles.pickerView}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setPropertyType(value)}
            items={[
              {label: 'Flat', value: 'Flat'},
              {label: 'House', value: 'House'},
              {label: 'Bungalow', value: 'Bungalow'},
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
          defaultValue="0"
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
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setFurnitureType(value)}
            items={[
              {label: 'Furnished', value: 'Furnished'},
              {label: 'Unfurnished', value: 'Unfurnished'},
              {label: 'Past furnished', value: 'Past furnished'},
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
          defaultValue=""
        />
        {errors.reporter && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>

      <View style={{marginTop: 24}}>
        <Button
          onPress={handleSubmit(onShowModal)}
          title="Submit"
          color="#f4511e"
        />
      </View>
    </ScrollView>
  );
};

const styles = {
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
};

export default Form;
