// Fil: src/screens/MyProfileScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import { getAuth } from '@react-native-firebase/auth';

const auth = getAuth();
const themeColors = { /* ... (colors) ... */ };

const MyProfileScreen = () => {
  const user = auth.currentUser;

  const handleChangePassword = () => {
    Alert.alert('Kommer snart', 'Funktion för att ändra lösenord är inte implementerad än.');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Min Profil</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Förnamn:</Text>
            <Text style={styles.infoValue}>[Ej implementerat]</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Efternamn:</Text>
            <Text style={styles.infoValue}>[Ej implementerat]</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>E-post:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Ändra lösenord</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 40, marginTop: 40, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10, },
  infoBox: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 8, marginBottom: 10, width: '100%', },
  infoLabel: { color: '#E0E0E0', fontSize: 16, flex: 1 },
  infoValue: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: '#2E7D32', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 30, width: '100%', },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', },
});

export default MyProfileScreen;