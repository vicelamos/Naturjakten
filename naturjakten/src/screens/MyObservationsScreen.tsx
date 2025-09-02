// Fil: src/screens/MyObservationsScreen.tsx (med modern Firestore-syntax)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// NYA IMPORTER FÖR FIRESTORE
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  FirebaseFirestoreTypes 
} from '@react-native-firebase/firestore';

import { getAuth } from '@react-native-firebase/auth';

const auth = getAuth();
const db = getFirestore(); // Hämta en referens till databasen

interface Observation {
    id: string;
    animalName: string;
    description: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    imageUrl: string | null;
    location: { latitude: number, longitude: number } | null;
}

const MyObservationsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [observations, setObservations] = useState<Observation[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Skapa en referens till collectionen
    const observationsCollection = collection(db, 'observations');

    // Skapa en sökfråga (query) med den nya syntaxen
    const q = query(
      observationsCollection,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    // Sätt upp prenumerationen med den nya syntaxen
    const subscriber = onSnapshot(q, (querySnapshot) => {
      const obsList: Observation[] = [];
      querySnapshot.forEach(documentSnapshot => {
        obsList.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        } as Observation);
      });
      
      setObservations(obsList);
      setLoading(false);
    }, (error) => {
      console.error("Fel vid hämtning av observationer: ", error);
      setLoading(false);
    });

    return () => subscriber();
  }, []);

  if (loading) {
    return (
        <ImageBackground source={require('../../assets/images/forest_background.jpg')} style={styles.background}>
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}><ActivityIndicator size="large" color="#FFFFFF" /></View>
            </SafeAreaView>
        </ImageBackground>
    );
  }

  const renderItem = ({ item }: { item: Observation }) => (
    <View style={styles.itemContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      )}
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.animalName}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {item.location && (
          <Text style={styles.itemLocation}>
            Plats: {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
          </Text>
        )}
        <Text style={styles.itemDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString('sv-SE') : 'Datum saknas'}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Mina Observationer</Text>
          <FlatList
            data={observations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>Du har inte gjort några observationer än.</Text>}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

// ... (Dina styles är oförändrade)
const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    container: { flex: 1, alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20, marginTop: 40, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10, },
    list: { width: '100%' },
    itemContainer: { backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
    itemImage: { width: '100%', height: 150 },
    itemTextContainer: { padding: 15 },
    itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
    itemDescription: { fontSize: 14, color: '#E0E0E0', marginTop: 5 },
    itemLocation: { fontSize: 12, color: '#A0A0A0', fontStyle: 'italic', marginTop: 10 },
    itemDate: { fontSize: 12, color: '#A0A0A0', marginTop: 10, textAlign: 'right' },
    emptyText: { color: '#FFFFFF', fontSize: 16, marginTop: 50, textAlign: 'center', fontStyle: 'italic' }
});


export default MyObservationsScreen;