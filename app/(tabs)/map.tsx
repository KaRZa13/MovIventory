import { fetchAllCinemas, MapData } from "@/services/api/mapApi";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";

export default function MapScreen() {
  const [locations, setLocations] = React.useState<MapData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [region] = React.useState<Region>({
    latitude: 46.6,
    longitude: 2.5,
    latitudeDelta: 9,
    longitudeDelta: 10,
  });
  const mapRef = React.useRef<MapView | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cinemas = await fetchAllCinemas();
        setLocations(cinemas);

        if (cinemas.length > 0 && mapRef.current) {
          const coordinates = cinemas.map((c) => ({
            latitude: c.latitude,
            longitude: c.longitude,
          }));
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 80, right: 40, bottom: 80, left: 40 },
            animated: true,
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des cinémas :", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            pinColor="red"
            title={loc.name}
            description={
              loc.description ||
              `${loc.address1}, ${loc.city}` ||
              "Cinéma"
            }
            onCalloutPress={() => router.push({ pathname: "/cinema", params: { id: loc.id } })}
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <View style={styles.calloutCard}>
                  <View style={styles.calloutHeader}>
                    <Text style={styles.calloutTitle}>{loc.name}</Text>
                  </View>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calloutContainer: {
    backgroundColor: "transparent",
  },
  calloutCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 160,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  calloutHeader: {
    marginBottom: 2,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 0,
    lineHeight: 18,
  },
});
