// Fil: App.tsx
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import TabNavigator from './src/navigation/TabNavigator'; // Importera din nya meny

const auth = getAuth();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, userState => {
      setUser(userState);
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Om inloggad, visa hela appen med menyraden
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          // Annars, visa bara inloggningssidan
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;