import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const location = {
    id: "0009",
    name: "Odéon (côté St Michel)",
    latitude: 48.8616,
    longitude: 2.3524,
    address1: "MK2 ODEON COTE",
    address2: "7 RUE HAUTEFEUILLE",
    city: "PARIS",
    description:
      "VÉRITABLE SYMBOLE DU RÉSEAU, LE MK2 ODÉON EST IDÉALEMENT SITUÉ EN PLEIN CŒUR DU QUARTIER LATIN...",
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01, // zoom
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={location.name}
          description={location.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
