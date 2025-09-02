// Fil: src/screens/NewObservationScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image, Alert, ScrollView, Platform
} from 'react-native';

import { 
  getFirestore, collection, onSnapshot, addDoc, serverTimestamp 
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const auth = getAuth();
const db = getFirestore();

interface Animal {
  id: string;
  name: string;
  latinName: string;
}

const NewObservationScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [animalsList, setAnimalsList] = useState<Animal[]>([]);

  // Ta emot den valda platsen från MapPickerScreen
    useEffect(() => {
    if (route.params?.pickedLocation) {
      const { latitude, longitude } = route.params.pickedLocation;
      const loc = { latitude, longitude };
      setLocation(loc);
      Alert.alert('Plats vald från kartan!', `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
    }
  }, [route.params?.pickedLocation]);
  

  // useEffect för att hämta djur
  useEffect(() => {
    const animalsCollection = collection(db, 'animals');
    const subscriber = onSnapshot(animalsCollection, querySnapshot => {
      const animals: Animal[] = [];
      querySnapshot.forEach(documentSnapshot => {
        animals.push({ id: documentSnapshot.id, ...documentSnapshot.data() } as Animal);
      });
      setAnimalsList(animals);
    });
    return () => subscriber();
  }, []);

  // Funktion för att rensa formuläret
  const clearForm = () => {
    setSelectedAnimal(null);
    setDescription('');
    setImageUri(null);
    setLocation(null);
    setLoading(false);
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) { console.log('User cancelled image picker'); } 
      else if (response.errorCode) { Alert.alert('Fel', 'Något gick fel: ' + response.errorMessage); } 
      else if (response.assets && response.assets[0].uri) { setImageUri(response.assets[0].uri); }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) { console.log('User cancelled camera'); } 
        else if (response.errorCode) { Alert.alert('Fel', 'Något gick fel: ' + response.errorMessage); } 
        else if (response.assets && response.assets[0].uri) { setImageUri(response.assets[0].uri); }
    });
  };

  const handleGetLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const loc = { latitude: position.coords.latitude, longitude: position.coords.longitude, };
        setLocation(loc);
        Alert.alert('Plats hämtad!', `Lat: ${loc.latitude.toFixed(4)}, Lon: ${loc.longitude.toFixed(4)}`);
      },
      (error) => Alert.alert('Kunde inte hämta plats', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleSaveObservation = async () => {
    if (!selectedAnimal) {
      Alert.alert('Inget djur valt', 'Vänligen välj ett djur från listan.');
      return;
    }
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) { setLoading(false); return; }

      let imageUrl: string | null = null;
      if (imageUri) {
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
        const storageRef = storage().ref(`observations/${user.uid}/${filename}`);
        await storageRef.putFile(uploadUri);
        imageUrl = await storageRef.getDownloadURL();
      }
      
      const observationsCollection = collection(db, 'observations');
      await addDoc(observationsCollection, {
        userId: user.uid,
        userEmail: user.email,
        animalId: selectedAnimal.id,
        animalName: selectedAnimal.name,
        description: description,
        imageUrl: imageUrl,
        location: location,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Sparat!', 'Din observation har sparats.');
      
      // Anropa clearForm() här efter att allt har sparats
      clearForm();

    } catch (error) {
      console.error("Fel vid spara/uppladdning: ", error);
      Alert.alert('Fel', 'Kunde inte spara observationen.');
      setLoading(false);
    }
  };
    
  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Ny Observation</Text>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={animalsList}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder="Välj ett djur"
            searchPlaceholder="Sök..."
            value={selectedAnimal ? selectedAnimal.id : null}
            onChange={item => {
              setSelectedAnimal(item);
            }}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Beskrivning (valfritt)"
            placeholderTextColor="#E0E0E0"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.iconButton} onPress={handleTakePhoto}>
              <Text style={styles.buttonText}>Ta bild</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.iconButton} onPress={handleChoosePhoto}>
              <Text style={styles.buttonText}>Välj bild</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleGetLocation}>
              <Text style={styles.buttonText}>Hämta plats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('MapPicker')}>
      <Text style={styles.buttonText}>Välj från karta</Text>
    </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveObservation} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Sparar...' : 'Spara Observation'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20, marginTop: 20, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10, },
  imagePreview: { width: '100%', height: 200, borderRadius: 8, marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  input: { width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF', borderColor: '#2E7D32', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, fontSize: 16, },
  textArea: { height: 100, textAlignVertical: 'top', paddingTop: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 30, },
  iconButton: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 8 },
  saveButton: { width: '100%', backgroundColor: '#2E7D32', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  dropdown: { width: '100%', height: 50, backgroundColor: 'white', borderRadius: 8, padding: 12, marginBottom: 15, },
  placeholderStyle: { fontSize: 16, },
  selectedTextStyle: { fontSize: 16, color: 'black' },
  iconStyle: { width: 20, height: 20, },
  inputSearchStyle: { height: 40, fontSize: 16, },
});


export default NewObservationScreen;