import { fetchCinemaById, MapData } from "@/services/api/mapApi";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CinemaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cinema, setCinema] = React.useState<MapData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        if (typeof id === "string") {
          const data = await fetchCinemaById(id);
          setCinema(data ?? null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!cinema) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinéma introuvable</Text>
        <Text>Vérifiez l&apos;identifiant et réessayez.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cinema.name}</Text>
      <Text style={styles.sectionTitle}>Adresse</Text>
      <Text>{cinema.address1}</Text>
      {cinema.address2 ? <Text>{cinema.address2}</Text> : null}
      <Text>{cinema.city}</Text>

      {cinema.description ? (
        <>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text>{cinema.description}</Text>
        </>
      ) : null}

      {cinema.parkingInfo ? (
        <>
          <Text style={styles.sectionTitle}>Parking</Text>
          <Text>{cinema.parkingInfo}</Text>
        </>
      ) : null}

      {cinema.publicTransportInfo ? (
        <>
          <Text style={styles.sectionTitle}>Transports</Text>
          <Text>{cinema.publicTransportInfo}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    gap: 12,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 12,
    fontWeight: "600",
  },
});


