// Fil: src/screens/MapScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MapScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karta</Text>
      <Button title="Gå tillbaka till Hem" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
});

export default MapScreen;