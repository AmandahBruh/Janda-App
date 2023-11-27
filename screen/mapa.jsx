import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import * as ScreenOrientation from "expo-screen-orientation";
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker

export default function MapaJanda() {
  const [location, setLocation] = useState(null);
  const [magnetometro, setMagnetometro] = useState({});
  const [subscription, setSubscription] = useState(null);
  
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
  
  useEffect(() => {
    async function setDefaultScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    setDefaultScreenOrientation();
    }, []);

  const toggleListener = () => {
    subscription ? unsubscribe() : subscribe();
  };

  const subscribe = () => {
    setSubscription(Magnetometer.addListener(magnetometroListener));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status === 'granted') {
      let info = await Location.getCurrentPositionAsync({});
      setLocation(info);
    }
  };
  

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let info = await Location.getCurrentPositionAsync({});
      setLocation(info);
    };

    requestLocationPermission();

    return () => {
      setLocation(null);
      unsubscribe(); // Make sure to unsubscribe when the component unmounts
    };
  }, []);

  const magnetometroListener = (data) => {
    setMagnetometro(data);
    };

    useEffect(() => {
        toggleListener();
        return () => {
            unsubscribe();
        };
    }, []);

    const getPositiveHeading = (heading) => {
        return heading < 0 ? 360 + heading : heading;
      };


      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Magnetometro:{'\n'}
              z: {magnetometro?.z || 'Loading...'} {'\n'}
              Latitude: {location?.coords?.latitude || 'Loading...'}, Longitude: {location?.coords?.longitude || 'Loading...'}
            </Text>
          </View>
          
          
            <Image
              source={require('../assets/crepah.png')}
              style={{
                marginTop: 20,
                width: 100,
                height: 100,
                alignSelf: 'center',
                zIndex: 1,
                transform: [{ rotate: `${getPositiveHeading(magnetometro.z || 0)}deg` }],
              }}
            />
            <View style={styles.mapcont}>
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
      paddingTop: 100,
      paddingBottom: 100,
    },
    mapcont: {
      flex: 1,
      width: "100%", 
      height: "100%",
      alignItems: 'center',
    },
  
    infoText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    map: {
      width: 300,
      height: 300,
    },
  });


