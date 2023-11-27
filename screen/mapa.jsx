import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker

export default function MapaJanda() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Não tem permissão');
            return;
          }
    
          let info = await Location.getCurrentPositionAsync({});
          console.log(info);
          setLocation(info);
        })();
      }, []);

  return (
    <View style={styles.container}>
        <Text>AAAAAAAAA</Text>

        <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Latitude: {location?.coords.latitude}, Longitude: {location?.coords.longitude}
        </Text>
      </View>

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="This is where I am"
          />
        </MapView>
      )}

    </View>
    </View>
  );
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
});