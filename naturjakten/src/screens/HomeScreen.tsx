// Fil: src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

const auth = getAuth();

const HomeScreen = () => {
  const user = auth.currentUser;

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Välkommen till Skogen</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
          <Text style={styles.infoText}>Använd menyn nedan för att navigera.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: "#FFFFFF", textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  emailText: { fontSize: 16, color: "#FFFFFF", fontStyle: 'italic', marginTop: 8 },
  infoText: { fontSize: 18, color: '#E0E0E0', marginTop: 40, textAlign: 'center' },
});

export default HomeScreen;