// Fil: src/screens/NewObservationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // Byt ut Button mot TouchableOpacity
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';

const themeColors = {
  primaryGreen: '#2E7D32',
  lightText: '#FFFFFF',
};

const NewObservationScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Gör en ny observation</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Gå tillbaka till Hem</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themeColors.lightText,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Papyrus' : 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.lightText,
  },
  buttonText: {
    color: themeColors.lightText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewObservationScreen;