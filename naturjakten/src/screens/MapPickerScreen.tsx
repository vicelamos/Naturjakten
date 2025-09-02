// Fil: src/screens/MapPickerScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Startposition (ungefär i mitten av Sverige)
const initialRegion = {
  latitude: 62.0,
  longitude: 15.0,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

const MapPickerScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialRegion);

  const handleSelectLocation = () => {
    // Skicka tillbaka den valda platsen till NewObservationScreen
    navigation.navigate('NewObservation', { pickedLocation: selectedLocation });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={(region) => setSelectedLocation(region)}
      >
        <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectLocation}>
          <Text style={styles.buttonText}>Välj denna plats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center' },
  map: { ...StyleSheet.absoluteFillObject },
  buttonContainer: { position: 'absolute', bottom: 30, },
  button: { backgroundColor: '#2E7D32', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default MapPickerScreen;