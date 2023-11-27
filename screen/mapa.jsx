import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Animated, Easing } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import MapView, { Marker } from 'react-native-maps';

export default function MapaJanda() {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [magnetometro, setMagnetometro] = useState({});
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const magnetometroListener = (data) => {
      setMagnetometro(data);
      const magneticHeading = data?.magnetic?.z || 0;
      setHeading(magneticHeading);
      const positiveHeading = magneticHeading < 0 ? 360 + magneticHeading : magneticHeading;
      Animated.timing(spinValue, {
        toValue: positiveHeading,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };
  
    Magnetometer.addListener(magnetometroListener);
  
    return () => {
      Magnetometer.removeAllListeners();
    };
  }, [spinValue]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Não tem permissão');
        return;
      }

      let info = await Location.getCurrentPositionAsync({});
      setLocation(info);
    };

    requestLocationPermission();

    return () => {
      // Cleanup location subscription when component unmounts
      setLocation(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Magnetometer:{'\n'}
            x: {magnetometro.x} {'\n'}
            y: {magnetometro.y} {'\n'}
            z: {magnetometro.z} {'\n'}
            Latitude: {location?.coords?.latitude || 'Loading...'}, Longitude: {location?.coords?.longitude || 'Loading...'}
          </Text>
        </View>

        <View style={styles.mapcont}>
          {location && location.coords && (
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

        <Animated.Image
          source={require('../assets/crepah.png')}
          style={{
            marginTop: 175,
            width: 300,
            height: 300,
            alignSelf: 'center',
            transform: [
              {
                rotate: spinValue.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
            zIndex: -1,
            position: 'absolute',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  mapcont: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
