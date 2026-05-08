import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

interface Props {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  title?: string;
}

export default function LomiMap({ region, title }: Props) {
  const safeLat = parseFloat(String(region?.latitude))  || 9.0012;
  const safeLng = parseFloat(String(region?.longitude)) || 38.7813;

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: safeLat,
          longitude: safeLng,
          latitudeDelta:  region.latitudeDelta  ?? 0.01,
          longitudeDelta: region.longitudeDelta ?? 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: safeLat, longitude: safeLng }}
          title={title}
        />
      </MapView>
    </View>
  );
}
