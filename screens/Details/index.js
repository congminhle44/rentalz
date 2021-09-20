/** @format */

import axios from 'axios';
import React, {useEffect, useState, Fragment, useContext} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {PropertyContext} from '../../Context';

import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import Notes from './components/Notes';

const Details = ({route, navigation}) => {
  const {itemId} = route.params;

  const {getProperties} = useContext(PropertyContext);

  const [loading, setLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [property, setProperty] = useState();
  const [notes, setNotes] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [note, setNote] = useState('');
  const [noteImage, setNoteImage] = useState(null);

  const baseApi = 'https://rentalzback.herokuapp.com';

  const showAlert = (title, content, onClose) =>
    Alert.alert(title, content, [{text: 'Confirm', onPress: onClose}]);

  const getPropertyDetails = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get(`${baseApi}/properties/${itemId}`);
      setProperty(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getPropertyNotes = async () => {
    setNoteLoading(true);
    try {
      const {data} = await axios.get(`${baseApi}/properties/${itemId}/notes`);
      setNotes(data);
      setNoteLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProperty = async propertyId => {
    setLoading(true);
    try {
      await axios.delete(`${baseApi}/properties/${propertyId}`);
      getProperties();
      getPropertyDetails();
      setLoading(false);
      showAlert('Notification', 'Property removed successfully', () => {
        navigation.navigate('All properties');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addNewNote = async () => {
    const selectedNoteImage = {
      type: noteImage.type,
      uri: noteImage.uri,
      name: noteImage.fileName,
    };
    try {
      const formData = new FormData();
      formData.append('content', note);
      formData.append('image', selectedNoteImage);
      await axios.post(`${baseApi}/properties/${itemId}/notes`, formData);
      setNoteImage(null);
      setNote('');
      getPropertyNotes();
    } catch (err) {
      if (err) {
        console.log(err.response.data);
      }
    }
  };

  const renderPropertyNotes = () => {
    if (notes.length > 0) {
      return notes.map(note => {
        return <Notes key={note._id} note={note} baseApi={baseApi} />;
      });
    } else {
      return <Text>This property haven't had any note yet</Text>;
    }
  };

  const chooseImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel) {
        try {
          const body = new FormData();
          body.append('thumb', {
            type: response.assets[0].type,
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
          });

          const result = await axios({
            url: `${baseApi}/properties/${itemId}/thumbnail`,
            method: 'PATCH',
            data: body,
          });
          console.log(result.status);
          getPropertyDetails();
        } catch (err) {
          console.log(err.response);
        }
      }
    });
  };

  const handleChooseNoteImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setNoteImage(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    getPropertyDetails();
    getPropertyNotes();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <Fragment>
          {property && (
            <ScrollView style={styles.container}>
              <DeleteModal
                modalVis={showDeleteModal}
                closeModal={() => setShowDeleteModal(false)}
                payload={property}
                loading={loading}
                deleteProperty={deleteProperty}
              />
              <EditModal
                modalVis={showEditModal}
                closeModal={() => setShowEditModal(false)}
                property={property}
                getProperty={getPropertyDetails}
              />
              <View style={styles.header}>
                <Button
                  onPress={chooseImage}
                  title="Change property thumbnail"
                />
                <Image
                  style={styles.thumbnail}
                  source={{uri: `${baseApi}/${property.thumbnail}`}}
                />
                <View style={styles.details}>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 32,
                      textAlign: 'center',
                    }}>
                    {property.name}
                  </Text>
                  <View style={{marginTop: 8}}>
                    <Text style={{textAlign: 'center'}}>
                      {property.address}, {property.district}, {property.city}
                    </Text>
                    <Text style={{textAlign: 'center'}}>${property.price}</Text>
                  </View>
                  <View style={{marginTop: 8}}>
                    <Text style={{textAlign: 'center'}}>
                      {property.type} type, {property.furnitureType} furniture,{' '}
                      {property.bedrooms} bedrooms
                    </Text>
                    <Text style={{textAlign: 'center'}}>
                      Reported by {property.reporter}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttons}>
                  <View style={{marginRight: 8}}>
                    <Button
                      onPress={() => setShowEditModal(true)}
                      title="Edit"
                    />
                  </View>
                  <Button
                    onPress={() => setShowDeleteModal(true)}
                    title="Delete"
                  />
                </View>
              </View>
              <View>
                <View style={styles.noteForm}>
                  <TextInput
                    onChangeText={value => setNote(value)}
                    value={note}
                    style={styles.inputView}
                    placeholder="Enter your note here"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {noteImage !== null && (
                      <Image
                        style={{width: 200, height: 200, marginRight: 16}}
                        source={{uri: noteImage.uri}}
                      />
                    )}
                    <View>
                      <View style={{width: 150}}>
                        <Button
                          onPress={handleChooseNoteImage}
                          title={noteImage === null ? '+ Add image' : 'Edit'}
                        />
                      </View>
                      {noteImage !== null && (
                        <View
                          style={{
                            width: 150,
                            marginTop: 8,
                          }}>
                          <Button
                            color="#eb4034"
                            onPress={() => setNoteImage(null)}
                            title="Remove"
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <Button
                  onPress={addNewNote}
                  disabled={note.length === 0}
                  title="Submit"
                />
                <Text style={styles.notesTitle}>
                  All notes of this property
                </Text>
                {noteLoading ? <Text>Loading...</Text> : renderPropertyNotes()}
              </View>
            </ScrollView>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 280,
    height: 280,
    borderRadius: 8,
  },
  details: {
    marginTop: 12,
  },
  buttons: {
    marginTop: 8,
    flexDirection: 'row',
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
  notesTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
  },
  noteForm: {
    marginBottom: 16,
  },
});

export default Details;
