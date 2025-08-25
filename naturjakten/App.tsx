// Fil: App.tsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// NYA IMPORTER
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

// Hämta en referens till auth-tjänsten
const auth = getAuth();

function App(): React.JSX.Element {
  // Ändra typen för user-state till den nya User-typen
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // NY SYNTAX för lyssnaren
    const subscriber = onAuthStateChanged(auth, (userState) => {
      setUser(userState);
    });

    return subscriber;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {user ? <HomeScreen /> : <LoginScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;