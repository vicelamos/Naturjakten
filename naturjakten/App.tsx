// Fil: App.tsx

import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Uppdaterade importer
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewObservationScreen from './src/screens/NewObservationScreen';
import MyObservationsScreen from './src/screens/MyObservationsScreen';
import MapScreen from './src/screens/MapScreen';

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
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            {/* Uppdaterade skärmar och titlar */}
            <Stack.Screen name="NewObservation" component={NewObservationScreen} options={{ title: 'Ny Observation' }} />
            <Stack.Screen name="MyObservations" component={MyObservationsScreen} options={{ title: 'Mina Observationer' }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Karta' }} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;