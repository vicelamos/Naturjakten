// Fil: src/screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { getAuth, signOut } from '@react-native-firebase/auth';

const auth = getAuth();
const themeColors = { /* ... (oförändrad) ... */ };

// VI LÄGGER TILL `navigation` HÄR
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const user = auth.currentUser;

  const handleSignOut = async () => { /* ... (oförändrad) ... */ };

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Välkommen till Skogen</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Dina Äventyr</Text>
            
            {/* UPPDATERADE KNAPPAR MED onPress-FUNKTIONER */}
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('NewObservation')}>
              <Text style={styles.featureButtonText}>Starta en ny jakt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Myobservations')}>
              <Text style={styles.featureButtonText}>Visa mina fynd</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Map')}>
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

// ... (Resten av koden och styles är oförändrad)
// KOPIERA IN HELA DIN GAMLA STYLES-SEKTION HÄR
const styles = StyleSheet.create({
  background: { flex: 1, },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', },
  container: { flex: 1, padding: 20, justifyContent: 'space-between', },
  header: { alignItems: 'center', marginTop: 40, },
  title: { fontSize: 36, fontWeight: 'bold', color: "#FFFFFF", textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10, },
  emailText: { fontSize: 16, color: "#FFFFFF", fontStyle: 'italic', marginTop: 8, },
  featureContainer: { alignItems: 'center', },
  featureTitle: { fontSize: 22, color: "#FFFFFF", fontWeight: '600', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: "#2E7D32", paddingBottom: 5, },
  featureButton: { width: '100%', backgroundColor: 'rgba(46, 125, 50, 0.8)', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10, },
  featureButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: 'bold', },
  logoutButton: { backgroundColor: 'transparent', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: "#FFFFFF", },
  logoutButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: 'bold', },
});

export default HomeScreen;