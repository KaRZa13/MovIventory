import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator, StyleSheet, FlatList, Image, Pressable, useColorScheme} from "react-native";
import {fetchMovies, Movie} from "@/services/api/moviesApi"
import {Stack, useRouter} from "expo-router"
import {Colors} from "@/constants/theme"

export default function MoviesScreen() {
  const colorScheme = useColorScheme()

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchMovies()
        setMovies(result.record)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <ActivityIndicator size="large" style={styles.center}/>
  if (error) return <Text style={styles.center}>Erreur : {error}</Text>

  return (
    <View style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <Stack.Screen
        options={{
          headerBackTitle: 'Liste des films :',
          headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].headerBackground},
          headerTintColor: '#fff',
        }}
      />
      <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>Liste des films :</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push({pathname: '/movie/[id]', params: {id: item.id}})}
          >
            <View style={styles.card}>
              <Image source={{uri: item.graphicUrl}} style={styles.image}/>
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={[styles.movieTitle, {color: Colors[colorScheme ?? 'light'].textPrimary}]}>{item.title}</Text>
                <Text style={[styles.desc, {color: Colors[colorScheme ?? 'light'].textTertiary}]} numberOfLines={3}>{item.description}</Text>
                <Text style={[styles.date, {color: Colors[colorScheme ?? 'light'].textSecondary}]}>Sortie : {item.openingDate}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingTop: 30
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8
  },
  movieTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginTop: 4
  },
  desc: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginTop: 6
  }
})