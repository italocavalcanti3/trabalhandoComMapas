import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

console.disableYellowBox=true;

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={{fontSize:18, fontWeight: 'bold', marginBottom:16}}>Trabalhando com Mapas</Text>

      <MapView
      style={{width:350, height:350}}
      initialRegion={{
        latitude: -23.666500,
        longitude: -46.591794,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});