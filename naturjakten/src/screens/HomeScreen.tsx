// Fil: src/screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
// NYA IMPORTER
import { getAuth, signOut } from '@react-native-firebase/auth';

// Hämta en referens till auth-tjänsten
const auth = getAuth();

const themeColors = {
  primaryGreen: '#2E7D32',
  lightText: '#FFFFFF',
};

const HomeScreen = () => {
  const user = auth.currentUser; // Hämta användaren från den nya auth-referensen

  const handleSignOut = async () => {
    try {
      // NY SYNTAX för utloggning
      await signOut(auth);
    } catch (error: any) {
      Alert.alert('Fel', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Välkommen till Naturen</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Dina Äventyr</Text>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Checka in ett djur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Visa mina fynd</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>Utforska kartan</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Text style={styles.logoutButtonText}>Logga ut</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Styles (inga ändringar här)
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 40 },
  title: { fontSize: 36, fontWeight: 'bold', color: themeColors.lightText, textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  emailText: { fontSize: 16, color: themeColors.lightText, fontStyle: 'italic', marginTop: 8 },
  featureContainer: { alignItems: 'center' },
  featureTitle: { fontSize: 22, color: themeColors.lightText, fontWeight: '600', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: themeColors.primaryGreen, paddingBottom: 5 },
  featureButton: { width: '100%', backgroundColor: 'rgba(46, 125, 50, 0.8)', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  featureButtonText: { color: themeColors.lightText, fontSize: 18, fontWeight: 'bold' },
  logoutButton: { backgroundColor: 'transparent', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: themeColors.lightText },
  logoutButtonText: { color: themeColors.lightText, fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;