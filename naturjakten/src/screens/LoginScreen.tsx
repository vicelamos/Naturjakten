// Fil: src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
// NYA IMPORTER: Vi importerar funktionerna vi behöver direkt
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

// Definiera en färgpalett för temat
const themeColors = {
  primaryGreen: '#2E7D32',
  lightText: '#FFFFFF',
  placeholder: '#E0E0E0',
  inputBackground: 'rgba(0, 0, 0, 0.4)',
};

// Hämta en referens till auth-tjänsten
const auth = getAuth();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Fel', 'Fyll i både e-post och lösenord.');
      return;
    }
    try {
      // NY SYNTAX: createUserWithEmailAndPassword(auth, email, password)
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Fel vid registrering', error.message);
    }
  };

  const handleSignIn = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Fel', 'Fyll i både e-post och lösenord.');
      return;
    }
    try {
      // NY SYNTAX: signInWithEmailAndPassword(auth, email, password)
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Fel vid inloggning', 'Felaktig e-post eller lösenord.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/forest_background.jpg')}
      style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Naturjakten</Text>
          <Text style={styles.subtitle}>Ett äventyr i det vilda</Text>

          <TextInput
            style={styles.input}
            placeholder="E-post"
            placeholderTextColor={themeColors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Lösenord"
            placeholderTextColor={themeColors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleSignUp}>
              <Text style={styles.buttonText}>Registrera konto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles (inga ändringar här)
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: themeColors.primaryGreen,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Papyrus' : 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: themeColors.lightText,
    textAlign: 'center',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  input: {
    height: 50,
    backgroundColor: themeColors.inputBackground,
    color: themeColors.lightText,
    borderColor: themeColors.primaryGreen,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: themeColors.primaryGreen,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: themeColors.primaryGreen,
  },
  buttonText: {
    color: themeColors.lightText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;