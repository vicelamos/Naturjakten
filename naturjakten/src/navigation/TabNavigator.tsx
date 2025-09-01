// Fil: src/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importera dina skärmar
import HomeScreen from '../screens/HomeScreen';
import MyObservationsScreen from '../screens/MyObservationsScreen';
import NewObservationScreen from '../screens/NewObservationScreen';
import MapScreen from '../screens/MapScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help-circle'; // En standardikon

          if (route.name === 'Hem') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Observationer') {
            iconName = focused ? 'leaf' : 'leaf-outline'; // Bytte elefant mot löv, mer passande
          } else if (route.name === 'Ny') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          } else if (route.name === 'Karta') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32', // Färgen på aktiv knapp
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Vi vill inte ha dubbla rubriker
        tabBarStyle: { backgroundColor: '#F5F5F5' }, // Bakgrundsfärg på menyn
      })}
    >
      <Tab.Screen name="Hem" component={HomeScreen} />
      <Tab.Screen name="Observationer" component={MyObservationsScreen} />
      <Tab.Screen name="Ny" component={NewObservationScreen} />
      <Tab.Screen name="Karta" component={MapScreen} />
      <Tab.Screen name="Profil" component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;