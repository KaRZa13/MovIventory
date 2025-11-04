import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {fetchCinemas, Cinema} from "@/services/api/cinemasApi"
import {router} from "expo-router"
import React, {useState, useEffect, useRef} from "react"
import MapView, {Marker, Region} from "react-native-maps"

export default function MapScreen() {

  const [cinemas, setCinemas] = useState<Cinema[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [frenchLocation] = useState<Region>({
    latitude: 46.6,
    longitude: 2.5,
    latitudeDelta: 9,
    longitudeDelta: 10,
  })

  const mapRef = useRef<MapView | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const locations = await fetchCinemas()
        setCinemas(locations.record)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <ActivityIndicator size="large" style={styles.center}/>
  if (error) return <Text style={styles.center}>Erreur : {error}</Text>

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={frenchLocation}>
        {cinemas.map((cine, index) => (
          <Marker
            key={index}
            coordinate={cine}
            onPress={() => {router.push(`/cinema/${cine.id}`)}}
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  calloutTxt: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
