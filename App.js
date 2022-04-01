import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

console.disableYellowBox=true;

export default function App(){
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0121,
  });

  async function localizacaoAtual() {
    await navigator.geolocation.getCurrentPosition(
      async ({ coords:{latitude, longitude} }) => {
        setRegion({
          ...region,
          latitude: latitude,
          longitude: longitude,
        });
      },
      () => {},
      {
        timeout: 2000,
        maximumAge: 1000,
      }
    );
  }

  useEffect(() => {
    localizacaoAtual();
  }, []);

  function moverLocal(latitude, longitude) {
    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
    });
  }

  function mudouLocal(region){
    setRegion({
      ...region,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  }

  function clicouMapa(e) {
    setRegion({
      ...region,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  }

  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row', marginBottom: 16}}>
        <Button title='Casa' onPress={() => moverLocal(-23.666500, -46.591794)}/>
        <Button title='Meus Pais' onPress={() => moverLocal(-23.652735, -46.613439)}/>
        <Button title='Minha Sogra' onPress={() => moverLocal(-23.668046, -46.590544)}/>
      </View>
      <Text style={{marginBottom: 16}}>{region.latitude.toFixed(6)} | {region.longitude.toFixed(6)}</Text>
      
      <MapView
      //Arrastou e soltou o mapa
      onRegionChangeComplete={(region) => mudouLocal(region)}
      onPress={clicouMapa}
      rotateEnabled={false}
      style={styles.mapa}
      region={region}
      showsUserLocation
      loadingEnabled
      >
        <Marker
        coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  mapa: {
    width: '100%',
    height: 550,
  }
});